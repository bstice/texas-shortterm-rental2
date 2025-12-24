/**
 * Test cases for chatbot evaluation
 * 
 * Each test case defines a question and expected behaviors/assertions
 */

export interface TestCase {
  id: string;
  question: string;
  category: 'info' | 'recommendations' | 'how-to' | 'checkout' | 'general';
  expectedBehaviors: string[]; // What the response should include/do
  mustInclude?: string[]; // Required text/phrases
  mustNotInclude?: string[]; // Forbidden text/phrases
  shouldIncludeLink?: string; // Expected guidebook link
  description?: string; // What this test validates
}

export const testCases: TestCase[] = [
  // Wi-Fi Information
  {
    id: 'wifi-password',
    question: 'What is the WiFi password?',
    category: 'info',
    expectedBehaviors: [
      'Provides the WiFi password',
      'Mentions the network name (SSID)',
      'Includes troubleshooting tips if available',
    ],
    mustInclude: ['Welcome2025', 'GuestNetwork'],
    shouldIncludeLink: '/during-your-stay/wifi-tech',
    description: 'Validates that chatbot provides accurate WiFi credentials',
  },
  
  // Smart Lock
  {
    id: 'smart-lock-code',
    question: 'What is the smart lock code?',
    category: 'info',
    expectedBehaviors: [
      'Provides the smart lock code',
      'Includes instructions for using the smart lock',
    ],
    shouldIncludeLink: '/before-you-arrive/smart-lock',
    description: 'Validates smart lock code retrieval',
  },
  
  // Local Recommendations
  {
    id: 'bbq-recommendations',
    question: 'Where can I get good BBQ nearby?',
    category: 'recommendations',
    expectedBehaviors: [
      'Recommends Franklin Barbecue',
      'Recommends The Switch BBQ & Craft House',
      'Includes distance information',
      'Mentions that Franklin is 30-40 min away',
      'Mentions that The Switch is 7 min away',
    ],
    mustInclude: ['Franklin', 'Switch'],
    description: 'Validates BBQ restaurant recommendations',
  },
  
  {
    id: 'coffee-shops',
    question: 'What coffee shops are nearby?',
    category: 'recommendations',
    expectedBehaviors: [
      'Lists coffee shops from guidebook',
      'Includes distance and price information',
      'Provides addresses or websites when available',
    ],
    description: 'Validates coffee shop recommendations',
  },
  
  // How-to Guides
  {
    id: 'pool-usage',
    question: 'How do I use the pool?',
    category: 'how-to',
    expectedBehaviors: [
      'Provides pool access instructions',
      'Includes safety information',
      'Links to pool guide',
    ],
    shouldIncludeLink: '/during-your-stay/how-to-guides/pool',
    description: 'Validates pool usage instructions',
  },
  
  {
    id: 'ac-heating',
    question: 'How do I adjust the temperature?',
    category: 'how-to',
    expectedBehaviors: [
      'Explains thermostat usage',
      'Provides step-by-step instructions',
      'Links to A/C guide',
    ],
    shouldIncludeLink: '/during-your-stay/how-to-guides/ac-heating',
    description: 'Validates A/C and heating instructions',
  },
  
  // Property Information
  {
    id: 'property-details',
    question: 'How many bedrooms does the property have?',
    category: 'info',
    expectedBehaviors: [
      'Provides accurate bedroom count',
      'May include other property details',
    ],
    mustInclude: ['5'],
    description: 'Validates property information accuracy',
  },
  
  {
    id: 'checkout-time',
    question: 'What time is checkout?',
    category: 'checkout',
    expectedBehaviors: [
      'Provides checkout time',
      'Includes checkout procedures',
      'Links to checkout page',
    ],
    shouldIncludeLink: '/checkout',
    description: 'Validates checkout information',
  },
  
  // Edge Cases
  {
    id: 'unknown-question',
    question: 'What is the weather like?',
    category: 'general',
    expectedBehaviors: [
      'Politely indicates it cannot answer',
      'Suggests contacting host or exploring guidebook',
      'Does not make up information',
    ],
    mustNotInclude: ['sunny', 'rainy', 'temperature'], // Should not guess weather
    description: 'Validates handling of questions outside guidebook scope',
  },
  
  {
    id: 'ambiguous-question',
    question: 'Where is it?',
    category: 'info',
    expectedBehaviors: [
      'Asks for clarification or provides property address',
      'Does not guess what "it" refers to',
    ],
    description: 'Validates handling of ambiguous questions',
  },
  
  // Link Generation
  {
    id: 'link-to-wifi',
    question: 'I need help with the WiFi',
    category: 'info',
    expectedBehaviors: [
      'Provides WiFi information',
      'Includes link to WiFi page',
    ],
    shouldIncludeLink: '/during-your-stay/wifi-tech',
    description: 'Validates link generation to relevant pages',
  },
  
  {
    id: 'link-to-house-rules',
    question: 'What are the house rules?',
    category: 'info',
    expectedBehaviors: [
      'Summarizes house rules',
      'Links to house rules page',
    ],
    shouldIncludeLink: '/during-your-stay/house-rules',
    description: 'Validates house rules information and linking',
  },
];

/**
 * Get test cases by category
 */
export function getTestCasesByCategory(category: TestCase['category']): TestCase[] {
  return testCases.filter(tc => tc.category === category);
}

/**
 * Get test case by ID
 */
export function getTestCaseById(id: string): TestCase | undefined {
  return testCases.find(tc => tc.id === id);
}

