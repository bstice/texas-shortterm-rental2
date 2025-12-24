#!/usr/bin/env tsx
/**
 * Interactive chatbot evaluation script
 * 
 * Runs test cases against the chatbot and displays results
 * 
 * Usage: npm run eval:chatbot
 * Or: tsx scripts/eval-chatbot.ts
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { testCases } from '../src/features/chatbot/evals/testCases';
import { evaluateResponse, calculateStats } from '../src/features/chatbot/evals/evaluateResponse';

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
  console.log('✓ Loaded environment variables from .env.local');
} catch (err) {
  console.warn('⚠ Could not load .env.local:', (err as Error).message);
  console.warn('   Make sure .env.local exists in the guidebook-app directory');
}

// Check if API is available
const API_URL = process.env.API_URL || 'http://localhost:3001/api/chat';
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error('\n❌ OPENAI_API_KEY environment variable is not set\n');
  console.error('To fix this:');
  console.error('1. Create a .env.local file in the guidebook-app directory');
  console.error('2. Add your OpenAI API key:');
  console.error('   OPENAI_API_KEY=your-api-key-here\n');
  console.error('Or set it as an environment variable:');
  console.error('   export OPENAI_API_KEY=your-api-key-here');
  console.error('   npm run eval:chatbot\n');
  process.exit(1);
}

/**
 * Get chatbot response for a question
 */
async function getChatbotResponse(question: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    // Handle streaming response from AI SDK v5
    // The toUIMessageStreamResponse() returns a ReadableStream with specific format
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let fullResponse = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      // AI SDK v5 streams in a specific format
      // Each chunk may contain multiple messages or deltas
      // Parse line by line (each line is typically a separate message chunk)
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line
      
      for (const line of lines) {
        if (!line.trim()) continue;
        
        try {
          // Try to parse as JSON first
          const data = JSON.parse(line);
          
          // AI SDK v5 format: look for text content in various possible structures
          if (data.type === 'text-delta' && data.textDelta) {
            fullResponse += data.textDelta;
          } else if (data.type === 'text' && data.text) {
            fullResponse += data.text;
          } else if (data.text) {
            fullResponse += data.text;
          } else if (data.content) {
            // Some formats have content field
            if (typeof data.content === 'string') {
              fullResponse += data.content;
            } else if (Array.isArray(data.content)) {
              // Content might be an array of text parts
              data.content.forEach((part: any) => {
                if (part.type === 'text' && part.text) {
                  fullResponse += part.text;
                }
              });
            }
          }
        } catch (e) {
          // If not JSON, might be plain text or different format
          // Try to extract text from the line
          const textMatches = [
            line.match(/"text":"([^"]+)"/),
            line.match(/text[":\s]+([^",}]+)/),
            line.match(/content[":\s]+([^",}]+)/),
          ];
          
          for (const match of textMatches) {
            if (match && match[1]) {
              fullResponse += match[1];
              break;
            }
          }
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim()) {
      try {
        const data = JSON.parse(buffer);
        if (data.text) fullResponse += data.text;
        if (data.content) fullResponse += typeof data.content === 'string' ? data.content : '';
      } catch {
        // If buffer isn't JSON, try to extract text
        const textMatch = buffer.match(/"text":"([^"]+)"/);
        if (textMatch) {
          fullResponse += textMatch[1];
        }
      }
    }

    return fullResponse.trim() || 'No response received';
  } catch (error) {
    console.error(`Error getting response: ${error}`);
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Run evaluations
 */
async function runEvaluations() {
  console.log('🧪 Starting Chatbot Evaluations\n');
  console.log(`API URL: ${API_URL}`);
  console.log(`Test Cases: ${testCases.length}\n`);
  console.log('─'.repeat(60) + '\n');

  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`[${i + 1}/${testCases.length}] Testing: ${testCase.id}`);
    console.log(`Question: ${testCase.question}`);
    
    if (testCase.description) {
      console.log(`Description: ${testCase.description}`);
    }

    console.log('Getting response...');
    const response = await getChatbotResponse(testCase.question);
    
    const result = evaluateResponse(response, testCase);
    results.push(result);

    console.log(`Score: ${(result.score * 100).toFixed(1)}% ${result.passed ? '✅ PASS' : '❌ FAIL'}`);
    result.checks.forEach((check) => {
      console.log(`  ${check.passed ? '✓' : '✗'} ${check.check}`);
      if (check.details) {
        console.log(`    ${check.details}`);
      }
    });
    
    // Show full response for failed tests
    if (!result.passed) {
      console.log(`\n  Full Response:`);
      console.log(`  ${'─'.repeat(56)}`);
      const lines = response.split('\n');
      lines.forEach(line => {
        console.log(`  ${line}`);
      });
      console.log(`  ${'─'.repeat(56)}`);
    } else {
      // For passed tests, just show a preview
      console.log(`  Response preview: ${response.substring(0, 150)}${response.length > 150 ? '...' : ''}`);
    }
    console.log('─'.repeat(60) + '\n');

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  const stats = calculateStats(results);
  console.log('\n📊 Evaluation Summary');
  console.log('═'.repeat(60));
  console.log(`Total Tests: ${stats.total}`);
  console.log(`Passed: ${stats.passed} (${(stats.passRate * 100).toFixed(1)}%)`);
  console.log(`Failed: ${stats.failed}`);
  console.log(`Average Score: ${(stats.averageScore * 100).toFixed(1)}%`);
  console.log('═'.repeat(60));

  // Failed tests
  const failed = results.filter(r => !r.passed);
  if (failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    failed.forEach(result => {
      console.log(`  - ${result.testCaseId}: ${result.question}`);
      console.log(`    Score: ${(result.score * 100).toFixed(1)}%`);
    });
  }

  // Exit with error code if any tests failed
  process.exit(failed.length > 0 ? 1 : 0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runEvaluations().catch(error => {
    console.error('Evaluation failed:', error);
    process.exit(1);
  });
}

