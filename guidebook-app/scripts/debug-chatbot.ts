#!/usr/bin/env tsx
/**
 * Debug script to test specific chatbot questions
 * 
 * Usage: tsx scripts/debug-chatbot.ts
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../.env.local');

try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0 && !key.trim().startsWith('#')) {
      const value = valueParts.join('=').trim();
      if (value && !process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
} catch (err) {
  // Ignore
}

const API_URL = process.env.API_URL || 'http://localhost:3001/api/chat';

async function getResponse(question: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: question }],
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let fullResponse = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const data = JSON.parse(line);
        if (data.type === 'text-delta' && data.textDelta) {
          fullResponse += data.textDelta;
        } else if (data.type === 'text' && data.text) {
          fullResponse += data.text;
        } else if (data.text) {
          fullResponse += data.text;
        } else if (data.content) {
          if (typeof data.content === 'string') {
            fullResponse += data.content;
          }
        }
      } catch (e) {
        const textMatch = line.match(/"text":"([^"]+)"/);
        if (textMatch) {
          fullResponse += textMatch[1];
        }
      }
    }
  }

  return fullResponse.trim();
}

async function testQuestion(question: string, searchTerms: string[]) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Question: ${question}`);
  console.log(`Looking for: ${searchTerms.join(', ')}`);
  console.log(`${'='.repeat(60)}\n`);
  
  const response = await getResponse(question);
  const normalized = response.toLowerCase().replace(/\s+/g, ' ');
  
  console.log('Response:');
  console.log(response);
  console.log(`\nResponse length: ${response.length} characters`);
  console.log(`\nNormalized (first 300 chars):`);
  console.log(normalized.substring(0, 300) + (normalized.length > 300 ? '...' : ''));
  
  console.log(`\nSearch Results:`);
  searchTerms.forEach(term => {
    const normalizedTerm = term.toLowerCase();
    const found = normalized.includes(normalizedTerm) || 
                  normalized.replace(/\s+/g, '').includes(normalizedTerm);
    console.log(`  ${found ? '✓' : '✗'} "${term}": ${found ? 'FOUND' : 'NOT FOUND'}`);
    if (found) {
      const index = normalized.indexOf(normalizedTerm);
      const context = normalized.substring(Math.max(0, index - 30), index + normalizedTerm.length + 30);
      console.log(`    Context: ...${context}...`);
    }
  });
}

async function main() {
  console.log('🔍 Chatbot Debug Tool\n');
  console.log(`API URL: ${API_URL}\n`);
  
  await testQuestion('What is the WiFi password?', ['welcome2025', 'guest']);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testQuestion('Where can I get good BBQ nearby?', ['franklin', 'switch']);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testQuestion('How many bedrooms does the property have?', ['5', 'five']);
}

main().catch(console.error);

