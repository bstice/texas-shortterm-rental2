# Implementation Plan: AI Chatbot for Guest Guidebook

## Overview

This plan outlines the technical implementation approach for adding an AI-powered chatbot to the guidebook website. The chatbot will provide instant answers to guest questions using AI services and guidebook content.

**Property**: 9926 Ledgestone Ter, Austin, TX 78737 - A Hill Country retreat on 8.4 acres

**Integration**: This feature integrates with the existing guidebook website (spec 001)

---

## Technology Stack

### AI Service
- **Primary Option**: OpenAI GPT-4 or GPT-3.5-turbo (cost-effective, reliable)
- **Alternative**: Anthropic Claude (excellent for long context, helpful responses)
- **SDK**: Vercel AI SDK (`ai`) - provides unified interface and streaming support
- **Fallback**: Consider multiple providers for redundancy

### Backend/API
- **Platform**: Vercel Serverless Functions (recommended for security)
  - Keeps API keys secure on server-side
  - Easy deployment with existing Vercel setup
  - Automatic scaling
- **Alternative**: Netlify Functions, AWS Lambda, or similar serverless platform
- **API Route**: `/api/chat` endpoint for handling AI requests

### Frontend Libraries
- **AI SDK**: `ai` from Vercel (handles streaming, error handling, React hooks)
  - Uses `useChat` hook from `ai/react` for chat functionality
  - Supports streaming responses out of the box
  - Works with OpenAI, Anthropic, and other providers
- **State Management**: React Context API for chat UI state (open/closed, session persistence)
- **Markdown Rendering**: Reuse existing `Markdown` component from `@shared/components/ui/Markdown`
- **Icons**: Lucide React (consistent with existing design)
- **Styling**: CSS Modules (consistent with existing approach, co-located with components)

### Development Tools
- **TypeScript**: Full type safety for chat messages, API responses
- **Environment Variables**: `.env.local` for API keys (never committed)
- **Testing**: Jest + React Testing Library for component tests

---

## Project Structure

```
guidebook-app/
├── src/
│   ├── features/
│   │   └── chatbot/              # New chatbot feature
│   │       ├── components/
│   │       │   ├── ChatbotButton.tsx
│   │       │   │   └── ChatbotButton.module.css
│   │       │   ├── ChatbotWindow.tsx
│   │       │   │   └── ChatbotWindow.module.css
│   │       │   ├── MessageList.tsx
│   │       │   │   └── MessageList.module.css
│   │       │   ├── MessageBubble.tsx
│   │       │   │   └── MessageBubble.module.css
│   │       │   ├── ChatInput.tsx
│   │       │   │   └── ChatInput.module.css
│   │       │   └── LoadingIndicator.tsx
│   │       │       └── LoadingIndicator.module.css
│   │       ├── hooks/
│   │       │   ├── useChatbot.ts          # Wrapper around useChat from AI SDK
│   │       │   └── useChatContext.ts      # Context for UI state (open/closed)
│   │       ├── utils/
│   │       │   └── constants.ts           # Welcome message, quick actions, route mappings
│   │       └── types/
│   │           └── chat.ts
│   │
│   ├── shared/
│   │   └── utils/
│   │       └── systemPrompt.ts            # System prompt generation (cached, accessible to API route)
│   │
│   ├── shared/
│   │   └── utils/
│   │       └── systemPrompt.ts            # System prompt generation (cached, accessible to API route)
│   │
├── api/                          # API routes at project root (Vercel serverless functions)
│   └── chat/
│       └── route.ts              # Serverless function for AI API
│
├── public/
│   └── (no new public assets needed)
│
└── .env.local                    # Environment variables (gitignored)
    └── OPENAI_API_KEY=...
```

---

## Component Architecture

### ChatbotButton Component
- **Location**: `src/features/chatbot/components/ChatbotButton.tsx`
- **Purpose**: Floating action button to open/close chatbot
- **Props**: None (uses context for state)
- **Features**:
  - Fixed position (bottom-right, above back-to-top button)
  - Z-index: 60 (above BackToTop which is 50, below modals which are 1000+)
  - Badge indicator for unread messages (optional)
  - Smooth open/close animation
  - Accessible (keyboard, ARIA labels)
  - Uses Lucide MessageCircle or Bot icon

### ChatbotWindow Component
- **Location**: `src/features/chatbot/components/ChatbotWindow.tsx`
- **Purpose**: Main chatbot interface container
- **Props**: `isOpen`, `onClose`
- **Features**:
  - Modal overlay on desktop, full-screen on mobile
  - Header with title and close button
  - Message list area (scrollable)
  - Input area at bottom
  - Loading states
  - Error states

### MessageList Component
- **Location**: `src/features/chatbot/components/MessageList.tsx`
- **Purpose**: Renders conversation history
- **Props**: `messages: Message[]` (from `ai` package)
- **Features**:
  - Auto-scroll to bottom on new messages (including during streaming)
  - Virtual scrolling for long conversations (optional, use `react-window` if needed)
  - Grouped messages by sender
  - Timestamp display (optional)
  - Handle streaming updates smoothly

### MessageBubble Component
- **Location**: `src/features/chatbot/components/MessageBubble.tsx`
- **Purpose**: Individual message display
- **Props**: `message: Message` (from `ai` package), `isUser: boolean`
- **Features**:
  - Different styling for user vs. bot messages
  - Markdown rendering for bot responses (uses existing `Markdown` component)
  - Link handling: 
    - Internal guidebook links use React Router `Link` component (same window navigation)
    - External links use regular anchor tags (new tab)
    - Convert markdown links to React Router links when route matches guidebook paths
  - Code block formatting (via react-markdown)
  - Timestamp display (optional, relative time format)
  - Handle partial/streaming messages gracefully

### ChatInput Component
- **Location**: `src/features/chatbot/components/ChatInput.tsx`
- **Purpose**: Message input and send functionality
- **Props**: `onSend: (message: string) => void`, `disabled: boolean`, `value: string`, `onChange: (value: string) => void`
- **Features**:
  - Textarea with auto-resize
  - Send button (keyboard shortcut: Enter, Shift+Enter for new line)
  - Character limit (max 1000 characters, validated client and server)
  - Placeholder text with suggestions
  - Input validation and sanitization
  - Mobile keyboard handling (viewport adjustment)

### LoadingIndicator Component
- **Location**: `src/features/chatbot/components/LoadingIndicator.tsx`
- **Purpose**: Shows AI is thinking
- **Props**: None
- **Features**:
  - Animated dots or spinner
  - Accessible loading announcement

---

## Data Models & Types

### Message Types

**Note**: Use the `Message` type from Vercel AI SDK (`ai` package) directly:
```typescript
import type { Message } from 'ai';

// Message type from AI SDK includes:
// - id: string
// - role: 'user' | 'assistant' | 'system'
// - content: string
// Additional fields may be present for streaming
```

**Custom Types** (if needed for UI state):
```typescript
// Only define custom types if needed for UI-specific state
interface ChatbotUIState {
  isOpen: boolean;
  hasSeenWelcome: boolean;
}
```


### API Request/Response Types
```typescript
interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  context?: string; // Guidebook content context
}

interface ChatResponse {
  message: string;
  error?: string;
}
```

---

## AI Service Integration

### System Prompt Strategy

Create a comprehensive system prompt that includes:

1. **Property Information**:
   - Address, size, amenities
   - Key features and highlights

2. **Content Context**:
   - Summary of guidebook sections
   - Common questions and answers
   - How-to guide topics

3. **Response Guidelines**:
   - Tone: helpful, friendly, professional
   - Format: Use markdown for formatting
   - Links: Provide links to relevant guidebook pages when appropriate
   - Accuracy: Only provide information from the guidebook content

4. **Error Handling**:
   - What to do when information isn't available
   - How to suggest exploring the guidebook

### Context Management

- **Initial Context**: Load guidebook content and create a summary for the system prompt
- **Conversation Context**: Maintain conversation history (last 10-15 messages)
- **Context Window**: Manage token limits (GPT-3.5: 16k tokens, GPT-4: 128k tokens)
- **RAG Approach** (Optional Enhancement): Implement retrieval-augmented generation for better accuracy

### API Route Implementation

**Location**: `api/chat/route.ts` (Vercel Serverless Function at project root)

**Note**: Vercel automatically detects API routes in the `api/` directory at project root. For Vite projects, this is separate from `src/`.

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
// System prompt utility moved to shared location for serverless function access
import { generateSystemPrompt } from '../../src/shared/utils/systemPrompt';

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Cache system prompt (generated once, reused)
let cachedSystemPrompt: string | null = null;
const SYSTEM_PROMPT_TTL = 1000 * 60 * 60; // 1 hour
let promptCacheTime = 0;

async function getSystemPrompt(): Promise<string> {
  const now = Date.now();
  if (cachedSystemPrompt && (now - promptCacheTime) < SYSTEM_PROMPT_TTL) {
    return cachedSystemPrompt;
  }
  
  cachedSystemPrompt = await generateSystemPrompt();
  promptCacheTime = now;
  return cachedSystemPrompt;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }
    
    const { messages } = await request.json();
    
    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
    
    // Validate message length
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content || lastMessage.content.length > 1000) {
      return Response.json({ error: 'Message too long' }, { status: 400 });
    }
    
    // Truncate conversation history to last 15 messages (manage context window)
    // System prompt is ~1000 tokens, 15 messages ~3000 tokens, response ~500 tokens
    // Total: ~4500 tokens, well within GPT-3.5-turbo's 16k limit
    const recentMessages = messages.slice(-15);
    
    const systemPrompt = await getSystemPrompt();
    
    const result = await streamText({
      model: openai(process.env.OPENAI_MODEL || 'gpt-3.5-turbo'),
      system: systemPrompt,
      messages: recentMessages,
      temperature: 0.7,
      maxTokens: 500,
    });
    
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Don't expose internal error details
    if (error instanceof Error && error.message.includes('API key')) {
      return Response.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }
    
    return Response.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
```

**Alternative**: If using Next.js App Router structure, use `app/api/chat/route.ts` instead.

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
**Goal**: Basic chatbot UI and infrastructure

**Deliverables**:
- ChatbotButton component
- ChatbotWindow component (basic structure)
- MessageList and MessageBubble components
- ChatInput component
- Basic styling and responsive design
- Integration into Layout component

**Tasks**:
1. Create chatbot feature folder structure (with co-located CSS files)
2. Create constants file with welcome message and quick actions
3. Create ChatbotProvider context for UI state management
4. Add ChatbotProvider to Layout component (wraps all pages for global access)
5. Implement ChatbotButton with fixed positioning (z-index: 60)
6. Implement ChatbotWindow modal/overlay (z-index: 1000)
7. Create MessageList and MessageBubble components
8. Integrate existing Markdown component for bot responses (handle React Router links)
9. Create ChatInput component with validation (1000 char limit)
10. Create LoadingIndicator component
11. Add welcome message display (show on first open, includes example questions)
12. Add CSS Modules styling (co-located with components)
13. Integrate ChatbotButton into Layout component (lazy-loaded with React.lazy)
14. Implement session state management (sessionStorage for open/closed)
15. Add feature flag check (CHATBOT_ENABLED env var, default: enabled)
16. Test responsive behavior

### Phase 2: AI Integration (Week 2)
**Goal**: Connect chatbot to AI service

**Deliverables**:
- API route for AI service
- System prompt generation
- Content context loading
- Message sending and receiving
- Error handling
- Loading states

**Tasks**:
1. Set up Vercel API route at `api/chat/route.ts` (project root)
2. Install AI SDK: `ai` and `@ai-sdk/openai`
3. Move system prompt utility to `src/shared/utils/systemPrompt.ts` for API route access
4. Create system prompt utility with caching
5. Implement content context loading in system prompt
5. Create useChatbot hook (wrapper around useChat from AI SDK)
6. Implement streaming responses (automatic with useChat, document behavior)
7. Add input validation (client: 1000 char limit, server: same validation)
8. Add comprehensive error handling (network, API, rate limit, timeout)
9. Implement rate limiting (in-memory, per IP, 10 req/min)
10. Add CORS configuration if needed
11. Test API integration with various scenarios

### Phase 3: Content Integration (Week 3)
**Goal**: Enhance AI responses with guidebook content

**Deliverables**:
- Comprehensive system prompt with property info
- Content context integration
- Link generation to guidebook pages
- Improved response accuracy
- Context window management

**Tasks**:
1. Enhance system prompt with comprehensive property details
2. Integrate guidebook content into system prompt context
3. Create route mapping utility for link generation
4. Implement link detection and generation in responses
5. Add page reference functionality (link to relevant guidebook pages)
6. Implement context window management (truncate to last 15 messages)
7. Add token counting utility (optional, for monitoring)
8. Test response accuracy with various questions
9. Refine prompts based on testing
10. Test link generation and clickability

### Phase 4: Polish & Optimization (Week 4)
**Goal**: UX improvements and performance optimization

**Deliverables**:
- Smooth animations
- Accessibility improvements
- Performance optimization
- Mobile experience refinement
- Error state improvements
- Quick action buttons (optional)

**Tasks**:
1. Add smooth open/close animations (300ms ease)
2. Implement full keyboard navigation (Tab, Enter, Escape)
3. Add ARIA labels, roles, and screen reader announcements
4. Add conversation clearing functionality (clear button in ChatbotWindow header)
5. Implement quick action buttons (chips/pills below welcome message, send question directly)
6. Add timestamp display (optional, relative time like "2 minutes ago")
7. Optimize rendering performance (lazy loading already done, verify code splitting)
8. Improve mobile experience:
   - Keyboard handling:
     ```css
     /* In ChatbotWindow.module.css */
     .chatWindow {
       /* Use viewport height with safe area insets */
       height: 100vh;
       height: 100dvh; /* Dynamic viewport height for mobile */
       max-height: -webkit-fill-available; /* iOS Safari */
     }
     
     .inputContainer {
       /* Keep input above keyboard */
       padding-bottom: env(safe-area-inset-bottom, 0);
       position: sticky;
       bottom: 0;
     }
     ```
   - JavaScript: Use `visualViewport` API if needed for precise keyboard detection
   - Ensure input stays visible when keyboard opens
   - Test on iOS Safari and Android Chrome
9. Add ChatbotErrorBoundary component:
   - Wrap ChatbotWindow (not ChatbotButton)
   - Show friendly error message with retry button
   - Log errors for debugging
   - Prevent chatbot errors from breaking main app
10. Final accessibility audit (WCAG 2.1 Level AA)
11. Final testing and bug fixes

---

## Key Implementation Details

### System Prompt Generation

**Location**: `src/shared/utils/systemPrompt.ts`

**Note**: Moved to shared location so it can be accessed by both client (for testing) and server (API route). This ensures proper path resolution in Vercel serverless functions.

```typescript
import { loadContent } from '@shared/utils/content';
import type { ContentData } from '@shared/types/content';

// Route mapping for link generation (also used in constants)
export const ROUTE_MAP = {
  'check-in': '/before-you-arrive/check-in',
  'smart lock': '/before-you-arrive/smart-lock',
  'address': '/before-you-arrive/address-parking',
  'parking': '/before-you-arrive/address-parking',
  'wifi': '/during-your-stay/wifi-tech',
  'wi-fi': '/during-your-stay/wifi-tech',
  'house rules': '/during-your-stay/house-rules',
  'pool': '/during-your-stay/how-to-guides/pool',
  'hot tub': '/during-your-stay/how-to-guides/hot-tub',
  'ac': '/during-your-stay/how-to-guides/ac-heating',
  'heating': '/during-your-stay/how-to-guides/ac-heating',
  'appliances': '/during-your-stay/how-to-guides/appliances',
  'tv': '/during-your-stay/how-to-guides/tv-streaming',
  'restaurants': '/local-guide/restaurants-coffee',
  'coffee': '/local-guide/restaurants-coffee',
  'groceries': '/local-guide/groceries',
  'activities': '/local-guide/outdoor-activities/hiking-trails',
  'checkout': '/checkout/checklist',
} as const;

export async function generateSystemPrompt(): Promise<string> {
  const content = await loadContent();
  
  // Build comprehensive system prompt with property details
  const routeList = Object.entries(ROUTE_MAP)
    .map(([key, route]) => `${key} -> ${route}`)
    .join(', ');
  
  return `You are a helpful assistant for guests staying at ${content.property.address}, ${content.property.city}, ${content.property.state} ${content.property.zip}.

Property Details:
- ${content.property.size.bedrooms} bedrooms, ${content.property.size.bathrooms} bathrooms
- ${content.property.size.squareFeet.toLocaleString()} square feet on ${content.property.size.acres} acres
- Located in Texas Hill Country, ${content.property.location.distanceToDowntown} from downtown Austin

Your role is to answer questions about:
- Check-in procedures and smart lock code
- Wi-Fi information and technology setup
- House rules and policies
- How to use appliances and amenities (A/C, pool, appliances, etc.)
- Local recommendations (restaurants, activities, attractions)
- Property features and what's included
- Checkout procedures

Guidelines:
- Be helpful, friendly, and professional
- Provide accurate information based on the guidebook content
- When appropriate, suggest visiting specific guidebook pages using this format: [Link text](route)
- Available routes: ${routeList}
- If you don't know something, suggest exploring the guidebook or contacting the host
- Use markdown formatting for better readability (headings, lists, bold text)
- Keep responses concise but complete

Format your responses clearly and concisely.`;
}
```

### Welcome Message and Quick Actions

**Location**: `src/features/chatbot/utils/constants.ts`

```typescript
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
```

### Chatbot Hook Implementation

**Location**: `src/features/chatbot/hooks/useChatbot.ts`

```typescript
import { useChat } from 'ai/react';

export function useChatbot() {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    error,
    setMessages,
  } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chatbot error:', error);
    },
    initialMessages: [], // Start with empty conversation
  });

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    clearMessages,
  };
}
```

**Note**: The `useChat` hook from Vercel AI SDK handles:
- Message state management
- Streaming responses (updates incrementally as tokens arrive - messages array updates in real-time)
- Error handling
- API communication

**Streaming Behavior**: Messages update incrementally as AI generates tokens. The `messages` array from `useChat` automatically includes partial assistant messages during streaming. MessageBubble component should handle both complete and partial messages gracefully.

**Type Note**: `useChat` returns `Message[]` type from `ai` package. Use this type directly instead of custom ChatMessage interface for consistency.

No need for separate `useChatMessages` hook - `useChat` provides all needed functionality.

### Chatbot Context Implementation

**Location**: `src/features/chatbot/hooks/useChatContext.ts`

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  toggleOpen: () => void;
  hasSeenWelcome: boolean;
  markWelcomeSeen: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(() => {
    // Load from sessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('chatbot-open');
      return stored === 'true';
    }
    return false;
  });

  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('chatbot-welcome-seen') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Persist open state to sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chatbot-open', String(isOpen));
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const markWelcomeSeen = () => {
    setHasSeenWelcome(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chatbot-welcome-seen', 'true');
    }
  };

  return (
    <ChatbotContext.Provider
      value={{ isOpen, toggleOpen, hasSeenWelcome, markWelcomeSeen }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within ChatbotProvider');
  }
  return context;
}
```

**Purpose**: Manages UI state (open/closed, welcome message seen) separately from chat messages.

**Integration**: Place ChatbotProvider in Layout component to wrap all pages:
```typescript
// In Layout.tsx
import { ChatbotProvider } from '@features/chatbot/hooks/useChatContext';
import ChatbotButton from '@features/chatbot/components/ChatbotButton';

export default function Layout({ children }: LayoutProps) {
  const isChatbotEnabled = process.env.VITE_CHATBOT_ENABLED !== 'false';
  
  return (
    <div className={styles.layout}>
      <Header />
      <Breadcrumbs />
      <main className={styles.main}>{children}</main>
      <Footer />
      <BackToTop />
      {isChatbotEnabled && (
        <ChatbotProvider>
          <ChatbotButton />
        </ChatbotProvider>
      )}
    </div>
  );
}
```

**Note**: ChatbotWindow should be rendered inside ChatbotProvider but can be conditionally rendered based on `isOpen` state.

### Error Handling Strategy

1. **Network Errors**: Show user-friendly message, allow retry button
2. **API Errors**: Log error server-side, show generic message, suggest alternatives
3. **Rate Limiting**: 
   - Server-side: Track requests per IP (in-memory map, reset every minute)
   - Limit: 10 requests per minute per IP
   - Response: 429 status with "Rate limit exceeded" message
   - Client-side: Show rate limit message, disable input temporarily
4. **Timeout**: Show timeout message, allow retry (Vercel has 30s default, configurable)
5. **Invalid Response**: Show error, allow user to rephrase question
6. **Input Validation Errors**: Show inline validation errors, prevent submission
7. **Error Boundary**: Local error boundary for chatbot to prevent breaking main app
8. **API Key Errors**: Log server-side, show generic "service unavailable" message

### Rate Limiting Implementation

**Note**: Rate limiting function is included in the API route code block above. For production at scale, consider using Redis or Vercel's built-in rate limiting features.

### Session State Management

- **Chat Messages**: In-memory only (cleared on page refresh)
- **UI State** (open/closed): Stored in `sessionStorage` (persists during session)
- **Welcome Message**: Show once per session (tracked in sessionStorage)
- **State Clearing**: Clear button resets messages but not UI state

### Performance Optimization

1. **Lazy Loading**: Load chatbot code only when button is clicked using `React.lazy()`
2. **Code Splitting**: Separate chatbot bundle from main app (Vite automatic code splitting)
3. **Message Virtualization**: For long conversations (optional, use `react-window` if needed)
4. **Debouncing**: Not needed for input (useChat handles this)
5. **Caching**: Cache system prompt generation (implemented in API route)
6. **Streaming**: Automatic with useChat - messages update incrementally

### Token Management Strategy

- **System Prompt**: ~500-1000 tokens (essential, always included)
- **Message History**: Keep last 15 messages (~2000-3000 tokens)
- **Total Budget**: GPT-3.5-turbo has 16k token limit
- **Strategy**: 
  - System prompt: ~1000 tokens
  - Recent messages: ~3000 tokens
  - Response: ~500 tokens
  - Buffer: ~11500 tokens remaining (safe margin)
- **If Limit Approached**: Reduce message count before truncating system prompt

---

## Styling Approach

### Design System Integration

- Use existing CSS variables from `src/shared/styles/variables.css`
- Match color scheme (primary, secondary, text colors)
- Use existing typography (font families, sizes)
- Match spacing system (spacing variables)
- Use Lucide icons consistently

### Responsive Breakpoints

- **Mobile** (< 768px): Full-screen chatbot
- **Tablet** (768px - 1024px): Modal overlay, medium size
- **Desktop** (> 1024px): Modal overlay, larger size

### Animation Strategy

- **Open/Close**: Smooth slide-up animation (300ms ease)
- **Message Appearance**: Fade-in with slight slide (200ms)
- **Loading**: Pulsing dots animation
- **Error**: Shake animation for error states

### Z-Index Hierarchy

- **BackToTop button**: `z-index: 50`
- **ChatbotButton**: `z-index: 60` (above BackToTop)
- **ChatbotWindow/Modal**: `z-index: 1000` (above everything)
- **Modal overlay/backdrop**: `z-index: 999` (below window, above content)

---

## Testing Strategy

### Unit Tests
- Test system prompt generation
- Test message formatting utilities
- Test error handling logic

### Component Tests
- Test ChatbotButton rendering and interactions
- Test ChatbotWindow open/close behavior
- Test MessageBubble rendering
- Test ChatInput functionality
- Test loading and error states

### Integration Tests
- Test API route with mock AI responses
- Test full conversation flow
- Test error scenarios
- Test mobile responsiveness

### E2E Tests (Optional)
- Test chatbot on different pages
- Test conversation flow
- Test mobile experience
- Test accessibility with screen reader

---

## Deployment Configuration

### Environment Variables

**Required**:
- `OPENAI_API_KEY`: OpenAI API key (server-side only)

**Optional**:
- `OPENAI_MODEL`: Model to use (default: 'gpt-3.5-turbo')
- `VITE_CHATBOT_ENABLED`: Feature flag to enable/disable chatbot (default: 'true', set to 'false' to disable)

**Note**: Vite requires `VITE_` prefix for environment variables exposed to client. Server-side variables (like `OPENAI_API_KEY`) don't need the prefix.

### Vercel Configuration

**vercel.json** (if needed):
```json
{
  "functions": {
    "api/chat/route.ts": {
      "maxDuration": 30
    }
  }
}
```

**Note**: API routes should be in `api/` directory at project root, not in `src/`. Vercel automatically detects and deploys these as serverless functions.

### Cost Management

- Monitor API usage in OpenAI dashboard
- Set usage limits/alerts
- Consider implementing rate limiting per user
- Use GPT-3.5-turbo for cost efficiency (can upgrade to GPT-4 later)

---

## Security Considerations

1. **API Key Security**: Never expose API keys in client-side code (server-side only in API route)
2. **Rate Limiting**: Implement rate limiting to prevent abuse (10 requests per minute per IP)
3. **Input Validation**: 
   - Validate message length (max 1000 characters)
   - Sanitize user inputs (strip HTML if any)
   - Validate on both client and server
4. **Error Messages**: Don't expose sensitive information in errors (generic messages only)
5. **CORS**: Configure CORS properly for API routes (allow only your domain in production)
6. **Request Size Limits**: Limit request body size to prevent abuse
7. **Timeout Protection**: Set appropriate timeout limits (30s default on Vercel)

---

## Accessibility Implementation

1. **Keyboard Navigation**: Full keyboard support
2. **ARIA Labels**: Proper labels for all interactive elements
3. **Screen Reader**: Announce new messages, loading states
4. **Focus Management**: Proper focus handling when opening/closing
5. **Color Contrast**: Ensure WCAG 2.1 Level AA compliance

---

## Dependencies

### Production Dependencies
```json
{
  "ai": "^3.0.0",
  "@ai-sdk/openai": "^1.0.0"
}
```

**Note**: Use `@ai-sdk/openai` adapter instead of direct `openai` package when using Vercel AI SDK. This provides better integration and streaming support.

### Development Dependencies
```json
{
  "@types/node": "^20.0.0"
}
```

---

## Success Metrics

1. **Response Time**: < 5 seconds for 90% of queries
2. **Accuracy**: 80%+ of responses are helpful and accurate
3. **Usage**: Chatbot used by 50%+ of visitors
4. **Support Reduction**: 30%+ reduction in support requests
5. **Accessibility**: Passes WCAG 2.1 Level AA audit

---

## Future Enhancements

- Voice input/output
- Multi-language support
- Conversation history persistence
- Admin dashboard for analytics
- Proactive suggestions based on page content
- Integration with booking systems
- Custom training on property-specific data

