# Testing Documentation

## Overview

This project now includes automated tests to validate all website and social media links in the local guide data.

## Test Setup

### Dependencies
- **Jest**: Test runner
- **ts-jest**: TypeScript support for Jest
- **@types/jest**: TypeScript types for Jest

### Configuration
- `jest.config.js`: Jest configuration for ES modules and TypeScript
- `src/__tests__/setup.ts`: Test setup file
- `src/__tests__/links.test.ts`: Link validation tests

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Only Link Validation Tests
```bash
npm run test:links
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## Link Validation Tests

The link validation tests (`src/__tests__/links.test.ts`) automatically:

1. **Loads** all local guide data from `src/data/local-guide.json`
2. **Extracts** all website and social media links:
   - Website links
   - Facebook links
   - Instagram links
   - Twitter/X links
   - Yelp links
   - TripAdvisor links
3. **Validates** each link by making HTTP requests:
   - Uses HEAD requests for website links (faster)
   - Uses GET requests for social media links (some platforms block HEAD)
   - Follows redirects
   - 10-second timeout per link
4. **Reports** broken links with detailed error information

### Test Results

The tests will:
- ✅ Pass for accessible links (HTTP status 200-399)
- ❌ Fail for broken links (404, 500, timeouts, etc.)
- Show a summary of total links by type
- Display detailed error messages for broken links

### Example Output

```
Link Validation
  ✓ should load local guide data and extract links
  Website Links
    ✓ should validate website link: The League Kitchen & Tavern – Belterra - Website
    ✕ should validate website link: Austin Taco Project - Website
      ❌ Broken website link: Austin Taco Project - Website (https://tinyurl.com/austintacoproject)
         Recommendation: Austin Taco Project
         Status: 404
  Facebook Links
    ...
  
📊 Link Summary:
   Total links: 118
   Websites: 33
   Facebook: 27
   Instagram: 27
   Twitter/X: 0
   Yelp: 31
   TripAdvisor: 0
```

## What Gets Tested

The tests validate links from all categories in `local-guide.json`:
- Restaurants
- Coffee shops
- Grocery stores
- Outdoor activities (hiking, hill country, parks)
- Austin attractions (downtown, local spots)

## Handling Broken Links

When tests fail, you'll see:
- The name of the broken link
- The URL that failed
- The recommendation it belongs to
- HTTP status code (if available)
- Error message (if available)

Use this information to:
1. Update broken URLs in `src/data/local-guide.json`
2. Remove links that are no longer available
3. Verify links manually if needed

## Notes

- Some social media platforms may block automated requests. If many social links fail, they might need manual verification.
- The tests use a 10-second timeout per link to avoid hanging on slow responses.
- Tests follow redirects, so temporary redirects (301, 302) are considered valid.
- The test suite takes approximately 1-2 minutes to run all 118+ links.

## Future Enhancements

Potential improvements:
- Add retry logic for flaky network requests
- Cache validation results to speed up repeated runs
- Generate a report file with broken links
- Add validation for URL format (not just accessibility)
- Validate internal navigation links





