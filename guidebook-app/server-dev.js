/**
 * Simple Express server for local API development
 * Runs alongside Vite dev server
 * 
 * Usage: npm run dev:api (or tsx server-dev.js)
 * Then access API at http://localhost:3001/api/chat
 * 
 * Note: This file uses .js extension but imports TypeScript files.
 * tsx handles the TypeScript compilation on the fly.
 */

// Register path aliases before any imports
import { register } from 'tsconfig-paths';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

register({
  baseUrl: resolve(__dirname),
  paths: {
    '@/*': ['./src/*'],
    '@shared/*': ['./src/shared/*'],
    '@features/*': ['./src/features/*'],
    '@data/*': ['./src/data/*'],
  },
});

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';

// Load environment variables from .env.local
const envPath = resolve(__dirname, '.env.local');
try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
  console.log('✓ Loaded environment variables from .env.local');
} catch (err) {
  console.warn('⚠ Could not load .env.local:', err.message);
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Test endpoint to verify server is working
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Import and use the API route
app.post('/api/chat', async (req, res) => {
  try {
    // Dynamically import the API route handler
    // tsx handles TypeScript compilation automatically
    // Use file:// URL for better compatibility
    const apiRoutePath = resolve(__dirname, 'api/chat/index.ts');
    const apiRouteUrl = `file://${apiRoutePath}`;
    console.log('📦 Importing API route from:', apiRoutePath);
    console.log('   URL:', apiRouteUrl);
    
    let apiRoute;
    try {
      // Try with file:// URL first, fallback to regular path
      try {
        apiRoute = await import(apiRouteUrl);
      } catch (urlError) {
        console.log('   File URL import failed, trying direct path...');
        apiRoute = await import(apiRoutePath);
      }
      console.log('✓ API route imported successfully');
      console.log('  Exports:', Object.keys(apiRoute));
    } catch (importError) {
      console.error('✗ Failed to import API route');
      console.error('  Error message:', importError.message);
      console.error('  Error code:', importError.code);
      console.error('  Stack:', importError.stack);
      throw importError;
    }
    
    if (!apiRoute.POST) {
      console.error('✗ POST handler not found in API route');
      console.error('  Available exports:', Object.keys(apiRoute));
      return res.status(500).json({ error: 'API route handler not found' });
    }
    
    // Create a Request-like object with proper headers
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        headers.set(key, value);
      } else if (Array.isArray(value)) {
        headers.set(key, value.join(', '));
      }
    });
    
    const request = new Request(`http://localhost:${PORT}${req.url}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req.body),
    });

    console.log('  Calling API route POST handler...');
    const response = await apiRoute.POST(request);
    console.log('  ✓ API route returned, status:', response.status);
    
    // Copy response status and headers
    res.status(response.status);
    response.headers.forEach((value, key) => {
      // Skip content-length as it will be set automatically for streaming
      if (key.toLowerCase() !== 'content-length') {
        res.setHeader(key, value);
      }
    });
    
    // Stream the response
    if (response.body) {
      console.log('  Streaming response body...');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      const pump = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              console.log('  ✓ Stream complete');
              break;
            }
            res.write(decoder.decode(value, { stream: true }));
          }
          res.end();
        } catch (err) {
          console.error('  ✗ Error streaming response:', err);
          res.end();
        }
      };
      
      pump();
    } else {
      console.log('  No response body to stream');
      res.end();
    }
  } catch (error) {
    console.error('=== API ERROR ===');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    console.error('=================');
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      // Only include stack in development
      ...(process.env.NODE_ENV !== 'production' && { 
        stack: error.stack,
        details: error.toString()
      })
    });
  }
});

// Handle uncaught errors before starting server
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = app.listen(PORT, () => {
  console.log(`\n🚀 API server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? '✓ Set' : '✗ Missing!'}\n`);
});

// Keep the process alive
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

