/**
 * Evaluation utilities for chatbot responses
 * 
 * Provides functions to evaluate chatbot responses against test cases
 */

import type { TestCase } from './testCases';

export interface EvaluationResult {
  testCaseId: string;
  question: string;
  passed: boolean;
  score: number; // 0-1, where 1 is perfect
  checks: CheckResult[];
  response: string;
}

export interface CheckResult {
  check: string;
  passed: boolean;
  details?: string;
}

/**
 * Evaluates a chatbot response against a test case
 * 
 * @param response - The chatbot's response text
 * @param testCase - The test case to evaluate against
 * @returns Evaluation result with score and detailed checks
 */
export function evaluateResponse(
  response: string,
  testCase: TestCase
): EvaluationResult {
  const checks: CheckResult[] = [];
  let score = 0;
  const maxScore = 1.0;
  let pointsEarned = 0;

  // Normalize response for checking (lowercase, remove extra whitespace)
  const normalizedResponse = response.toLowerCase().replace(/\s+/g, ' ');

  // Check 1: Must include required phrases (critical - 40% of score)
  if (testCase.mustInclude && testCase.mustInclude.length > 0) {
    const requiredChecks = testCase.mustInclude.map(phrase => {
      const found = normalizedResponse.includes(phrase.toLowerCase());
      if (found) {
        pointsEarned += 0.4 / testCase.mustInclude.length;
      }
      return {
        check: `Must include: "${phrase}"`,
        passed: found,
        details: found ? 'Found in response' : 'Not found in response',
      };
    });
    checks.push(...requiredChecks);
  } else {
    // If no mustInclude, give points for having a response
    if (response.trim().length > 0) {
      pointsEarned += 0.4;
      checks.push({
        check: 'Response provided',
        passed: true,
      });
    }
  }

  // Check 2: Must not include forbidden phrases (critical - 30% of score)
  if (testCase.mustNotInclude && testCase.mustNotInclude.length > 0) {
    const forbiddenChecks = testCase.mustNotInclude.map(phrase => {
      const found = normalizedResponse.includes(phrase.toLowerCase());
      if (!found) {
        pointsEarned += 0.3 / testCase.mustNotInclude.length;
      }
      return {
        check: `Must not include: "${phrase}"`,
        passed: !found,
        details: found ? 'Forbidden phrase found' : 'Not found (good)',
      };
    });
    checks.push(...forbiddenChecks);
  } else {
    // If no mustNotInclude, give points
    pointsEarned += 0.3;
    checks.push({
      check: 'No forbidden content',
      passed: true,
    });
  }

  // Check 3: Should include link (20% of score)
  if (testCase.shouldIncludeLink) {
    // Check for markdown link format [text](url) or just the URL
    const linkPattern = new RegExp(
      `\\[.*?\\]\\(${testCase.shouldIncludeLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)|${testCase.shouldIncludeLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
      'i'
    );
    const hasLink = linkPattern.test(response);
    if (hasLink) {
      pointsEarned += 0.2;
    }
    checks.push({
      check: `Should include link: ${testCase.shouldIncludeLink}`,
      passed: hasLink,
      details: hasLink ? 'Link found' : 'Link not found',
    });
  } else {
    // If no link required, give points
    pointsEarned += 0.2;
    checks.push({
      check: 'Link check (not required)',
      passed: true,
    });
  }

  // Check 4: Response quality (10% of score)
  // Check if response is not too short (at least 20 characters)
  const hasMinimumLength = response.trim().length >= 20;
  // Check if response doesn't look like an error
  const notError = !normalizedResponse.includes('error') && 
                   !normalizedResponse.includes('sorry, i cannot') &&
                   !normalizedResponse.includes('i don\'t know');
  
  if (hasMinimumLength && notError) {
    pointsEarned += 0.1;
    checks.push({
      check: 'Response quality',
      passed: true,
      details: 'Response has adequate length and doesn\'t appear to be an error',
    });
  } else {
    checks.push({
      check: 'Response quality',
      passed: false,
      details: hasMinimumLength 
        ? 'Response may be an error message' 
        : 'Response is too short',
    });
  }

  score = Math.min(pointsEarned, maxScore);
  const passed = score >= 0.7; // 70% threshold for passing

  return {
    testCaseId: testCase.id,
    question: testCase.question,
    passed,
    score,
    checks,
    response,
  };
}

/**
 * Evaluates multiple responses against their test cases
 * 
 * @param results - Array of { response, testCase } pairs
 * @returns Array of evaluation results
 */
export function evaluateMultiple(
  results: Array<{ response: string; testCase: TestCase }>
): EvaluationResult[] {
  return results.map(({ response, testCase }) =>
    evaluateResponse(response, testCase)
  );
}

/**
 * Calculates aggregate statistics from evaluation results
 */
export function calculateStats(results: EvaluationResult[]) {
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const averageScore = results.reduce((sum, r) => sum + r.score, 0) / total;
  const byCategory = results.reduce((acc, result) => {
    const testCase = results.find(r => r.testCaseId === result.testCaseId);
    // We'd need to pass testCase through, but for now just count
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    passed,
    failed: total - passed,
    passRate: passed / total,
    averageScore,
  };
}

