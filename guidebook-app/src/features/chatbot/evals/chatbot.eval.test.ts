/**
 * Jest test suite for chatbot evaluations
 * 
 * These tests verify that the chatbot provides accurate, helpful responses
 * to common questions.
 * 
 * Run with: npm test -- chatbot.eval.test.ts
 */

import { testCases } from './testCases';
import { evaluateResponse } from './evaluateResponse';

// Mock the API call - in real tests, you'd call the actual API
// For now, we'll create a helper that simulates API responses
async function getChatbotResponse(question: string): Promise<string> {
  // In a real implementation, this would call your /api/chat endpoint
  // For testing, you might want to:
  // 1. Use a test API endpoint
  // 2. Mock the API response
  // 3. Use a test OpenAI API key with a test model
  
  // This is a placeholder - replace with actual API call
  const response = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: question }],
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  // For streaming responses, you'd need to handle the stream
  // For now, this is a simplified version
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullResponse = '';

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullResponse += decoder.decode(value, { stream: true });
    }
  }

  // Parse the streamed response (simplified - actual format may differ)
  // The AI SDK returns data in a specific format
  return fullResponse;
}

describe('Chatbot Evaluations', () => {
  // Skip tests if API is not available (for CI/CD)
  const API_AVAILABLE = process.env.OPENAI_API_KEY && process.env.RUN_EVAL_TESTS === 'true';

  (API_AVAILABLE ? describe : describe.skip)('API Integration Tests', () => {
    testCases.forEach((testCase) => {
      test(`Test: ${testCase.id} - ${testCase.description || testCase.question}`, async () => {
        const response = await getChatbotResponse(testCase.question);
        const result = evaluateResponse(response, testCase);

        // Log results for debugging
        console.log(`\nTest: ${testCase.id}`);
        console.log(`Question: ${testCase.question}`);
        console.log(`Response: ${response.substring(0, 200)}...`);
        console.log(`Score: ${(result.score * 100).toFixed(1)}%`);
        console.log(`Passed: ${result.passed}`);
        result.checks.forEach((check) => {
          console.log(`  ${check.passed ? '✓' : '✗'} ${check.check}`);
        });

        // Assert that the test passed
        expect(result.passed).toBe(true);
        expect(result.score).toBeGreaterThanOrEqual(0.7);
      }, 30000); // 30 second timeout for API calls
    });
  });

  // Unit tests for evaluation logic (no API calls needed)
  describe('Evaluation Logic', () => {
    test('evaluateResponse correctly identifies mustInclude phrases', () => {
      const testCase = testCases.find(tc => tc.id === 'wifi-password');
      if (!testCase) return;

      const goodResponse = 'The WiFi password is Welcome2025 for the GuestNetwork.';
      const badResponse = 'I can help you with WiFi setup.';

      const goodResult = evaluateResponse(goodResponse, testCase);
      const badResult = evaluateResponse(badResponse, testCase);

      expect(goodResult.passed).toBe(true);
      expect(badResult.passed).toBe(false);
    });

    test('evaluateResponse correctly identifies mustNotInclude phrases', () => {
      const testCase = testCases.find(tc => tc.id === 'unknown-question');
      if (!testCase) return;

      const goodResponse = 'I don\'t have information about the weather. Please check a weather app or contact the host.';
      const badResponse = 'The weather is usually sunny and warm in Texas.';

      const goodResult = evaluateResponse(goodResponse, testCase);
      const badResult = evaluateResponse(badResponse, testCase);

      expect(goodResult.passed).toBe(true);
      expect(badResult.passed).toBe(false);
    });

    test('evaluateResponse correctly identifies links', () => {
      const testCase = testCases.find(tc => tc.id === 'link-to-wifi');
      if (!testCase) return;

      const goodResponse = 'Here is the WiFi information: [Wi-Fi & Tech](/during-your-stay/wifi-tech)';
      const badResponse = 'The WiFi password is Welcome2025.';

      const goodResult = evaluateResponse(goodResponse, testCase);
      const badResult = evaluateResponse(badResponse, testCase);

      expect(goodResult.passed).toBe(true);
      // Bad response might still pass if it has the required info, just missing link
      expect(goodResult.score).toBeGreaterThan(badResult.score);
    });
  });
});

