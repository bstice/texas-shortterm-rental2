# Chatbot Evaluations

This directory contains evaluation tests for the chatbot to ensure it provides accurate, helpful responses.

## Overview

Evaluations test the chatbot's ability to:
- Answer questions accurately based on guidebook content
- Provide correct information (Wi-Fi password, smart lock code, etc.)
- Recommend appropriate local spots and restaurants
- Generate helpful links to guidebook pages
- Handle edge cases and errors gracefully

## Running Evaluations

### Option 1: Automated Test Suite (Recommended)

```bash
npm run test:chatbot
```

This runs Jest tests that verify chatbot responses meet quality criteria.

### Option 2: Manual Evaluation Script

```bash
npm run eval:chatbot
```

This runs an interactive script that tests the chatbot with predefined questions and shows results.

### Option 3: Production Monitoring

The chatbot logs all interactions (with user consent) for analysis. Review logs to identify:
- Common questions
- Response quality issues
- Areas needing improvement

## Evaluation Criteria

Each test case checks:
1. **Accuracy**: Response contains correct information
2. **Completeness**: Response addresses the full question
3. **Relevance**: Response is relevant to the property/guidebook
4. **Helpfulness**: Response provides actionable information
5. **Formatting**: Response uses proper markdown formatting
6. **Links**: Response includes relevant guidebook links when appropriate

## Adding New Test Cases

Add test cases to `testCases.ts` following the existing pattern.

