export const WELCOME_MESSAGE = `Hi! I'm here to help you with questions about the property, check-in, amenities, local recommendations, and more. 

Try asking about:
- Wi-Fi password and tech setup
- Check-in procedures and smart lock code
- House rules and policies
- How to use appliances and amenities
- Local restaurants and activities
- Checkout procedures

What would you like to know?`;

export const QUICK_ACTIONS = [
  {
    id: 'wifi',
    label: "What's the Wi-Fi password?",
    question: "What's the Wi-Fi password?",
  },
  {
    id: 'checkin',
    label: 'How do I check in?',
    question: 'How do I check in?',
  },
  {
    id: 'rules',
    label: 'What are the house rules?',
    question: 'What are the house rules?',
  },
  {
    id: 'restaurants',
    label: 'Where can I find local restaurants?',
    question: 'Where can I find local restaurants?',
  },
  {
    id: 'pool',
    label: 'How do I use the pool?',
    question: 'How do I use the pool?',
  },
  {
    id: 'checkout',
    label: 'What is the checkout process?',
    question: 'What is the checkout process?',
  },
] as const;

