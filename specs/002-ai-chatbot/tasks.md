# Task Breakdown: AI Chatbot for Guest Guidebook

## Overview

This document breaks down the AI chatbot implementation plan into detailed, actionable tasks organized by phase. Each task includes specific implementation steps and acceptance criteria.

**Property**: 9926 Ledgestone Ter, Austin, TX 78737 - A Hill Country retreat on 8.4 acres

**Integration**: This feature integrates with the existing guidebook website (spec 001)

---

## Phase 1: Foundation (Week 1)

**Goal**: Basic chatbot UI and infrastructure

**Deliverables**:
- ChatbotButton component
- ChatbotWindow component (basic structure)
- MessageList and MessageBubble components
- ChatInput component
- Basic styling and responsive design
- Integration into Layout component

---

### Task 1.1: Create Feature Folder Structure

**Description**: Set up the chatbot feature directory structure with co-located CSS files.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/` directory
2. Create subdirectories:
   - `components/`
   - `hooks/`
   - `utils/`
   - `types/`
3. Verify structure matches plan specification

**Acceptance Criteria**:
- [ ] All directories created
- [ ] Structure matches plan.md specification
- [ ] Ready for component files

**Estimated Time**: 5 minutes

---

### Task 1.2: Create Constants File

**Description**: Create constants file with welcome message and quick actions.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/utils/constants.ts`
2. Add `WELCOME_MESSAGE` constant with example questions
3. Add `QUICK_ACTIONS` array with 6 common questions:
   - Wi-Fi password
   - Check-in procedures
   - House rules
   - Local restaurants
   - Pool usage
   - Checkout process
4. Export both constants

**Acceptance Criteria**:
- [ ] Constants file created
- [ ] Welcome message includes example questions
- [ ] Quick actions array has 6 items with id, label, and question
- [ ] All constants properly typed and exported

**Estimated Time**: 15 minutes

---

### Task 1.3: Create ChatbotProvider Context

**Description**: Create React Context for managing chatbot UI state (open/closed, welcome seen).

**Steps**:
1. Create `guidebook-app/src/features/chatbot/hooks/useChatContext.ts`
2. Define `ChatbotContextType` interface:
   - `isOpen: boolean`
   - `toggleOpen: () => void`
   - `hasSeenWelcome: boolean`
   - `markWelcomeSeen: () => void`
3. Create `ChatbotContext` using `createContext`
4. Implement `ChatbotProvider` component:
   - Initialize `isOpen` from `sessionStorage` (with SSR guard)
   - Initialize `hasSeenWelcome` from `sessionStorage` (with SSR guard)
   - Persist `isOpen` to `sessionStorage` on change
   - Persist `hasSeenWelcome` to `sessionStorage` on change
5. Implement `useChatContext` hook with error handling
6. Add TypeScript types

**Acceptance Criteria**:
- [ ] Context file created with proper structure
- [ ] ChatbotProvider manages UI state correctly
- [ ] State persists to sessionStorage (with SSR guards)
- [ ] useChatContext hook throws error if used outside provider
- [ ] All TypeScript types defined

**Estimated Time**: 30 minutes

---

### Task 1.4: Create Type Definitions

**Description**: Create TypeScript type definitions for chatbot.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/types/chat.ts`
2. Import `Message` type from `ai` package
3. Export type aliases if needed
4. Document that we use AI SDK's `Message` type directly

**Acceptance Criteria**:
- [ ] Types file created
- [ ] Uses AI SDK's `Message` type
- [ ] Properly documented

**Estimated Time**: 10 minutes

---

### Task 1.5: Implement ChatbotButton Component

**Description**: Create floating action button to open/close chatbot.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/components/ChatbotButton.tsx`
2. Import `useChatContext` hook
3. Use `MessageCircle` or `Bot` icon from Lucide React
4. Implement fixed positioning:
   - `position: fixed`
   - `bottom: var(--spacing-xl)` (or equivalent)
   - `right: var(--spacing-xl)`
   - `z-index: 60`
5. Add click handler to toggle chatbot open/closed
6. Add smooth animation (CSS transition)
7. Add accessibility:
   - `aria-label` for button state
   - Keyboard support (Enter/Space)
   - Focus styles
8. Create `ChatbotButton.module.css` with styles
9. Match design system (colors, spacing, typography)

**Acceptance Criteria**:
- [ ] Button renders correctly
- [ ] Fixed position in bottom-right corner
- [ ] Z-index 60 (above BackToTop button)
- [ ] Toggles chatbot open/closed on click
- [ ] Keyboard accessible
- [ ] Smooth animations
- [ ] Matches design system

**Estimated Time**: 45 minutes

---

### Task 1.6: Implement ChatbotWindow Component (Basic Structure)

**Description**: Create main chatbot interface container.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/components/ChatbotWindow.tsx`
2. Import `useChatContext` hook
3. Implement modal overlay:
   - Full-screen on mobile (< 768px)
   - Modal overlay on tablet/desktop
   - `z-index: 1000`
   - Backdrop/overlay with click-to-close
4. Add header section:
   - Title: "Chat Assistant" or similar
   - Close button (X icon from Lucide)
   - Placeholder for clear button (will be added in Phase 4, Task 4.4)
5. Add message list area:
   - Placeholder for MessageList component
   - Will be connected to useChatbot hook in Phase 2, Task 2.8
6. Add loading indicator area:
   - Placeholder for LoadingIndicator component
   - Will show when AI is processing (Phase 2)
7. Add error display area:
   - Placeholder for error messages
   - Will show errors from useChatbot hook (Phase 2)
8. Add input area placeholder (will be ChatInput component)
9. Conditionally render based on `isOpen` from context
10. Handle close on backdrop click and Escape key
11. Create `ChatbotWindow.module.css` with responsive styles
12. Add smooth open/close animation (slide-up, 300ms)

**Note**: AI integration (useChatbot hook) will be added in Phase 2, Task 2.8. This task creates the UI structure only.

**Acceptance Criteria**:
- [ ] Window renders when `isOpen` is true
- [ ] Full-screen on mobile, modal on desktop
- [ ] Z-index 1000 (above everything)
- [ ] Close button works
- [ ] Backdrop click closes window
- [ ] Escape key closes window
- [ ] Smooth animations
- [ ] Responsive design works

**Estimated Time**: 1 hour

---

### Task 1.7: Create MessageList Component

**Description**: Component to render conversation history.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/components/MessageList.tsx`
2. Accept `messages: Message[]` prop (from `ai` package)
3. Implement auto-scroll to bottom:
   - Use `useRef` for message container
   - Use `useEffect` to scroll on new messages
   - Smooth scroll behavior
4. Map messages to `MessageBubble` components
5. Handle empty state (show welcome message)
6. Create `MessageList.module.css` with styles
7. Make scrollable container

**Acceptance Criteria**:
- [ ] Renders list of messages
- [ ] Auto-scrolls to bottom on new messages
- [ ] Shows welcome message when empty
- [ ] Scrollable container
- [ ] Proper styling

**Estimated Time**: 30 minutes

---

### Task 1.8: Create MessageBubble Component

**Description**: Individual message display component.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/components/MessageBubble.tsx`
2. Accept `message: Message` and `isUser: boolean` props
3. Different styling for user vs. bot messages:
   - User: right-aligned, primary color
   - Bot: left-aligned, surface color
4. For bot messages, use existing `Markdown` component:
   - Import from `@shared/components/ui/Markdown`
   - Pass message content
5. For bot messages, render markdown content:
   - Markdown component handles basic link rendering
   - **Note**: Full link conversion (internal to React Router Links) will be implemented in Phase 3, Task 3.4
   - For now, markdown links will render as regular anchor tags
6. Create `MessageBubble.module.css` with styles
7. Add optional timestamp display (relative time)

**Acceptance Criteria**:
- [ ] Renders user and bot messages differently
- [ ] Bot messages use Markdown component
- [ ] Markdown links render (basic implementation)
- [ ] Proper styling for both message types
- [ ] Handles partial/streaming messages gracefully
- [ ] **Note**: Full link conversion to React Router Links will be done in Phase 3, Task 3.4

**Estimated Time**: 1 hour

---

### Task 1.9: Create ChatInput Component

**Description**: Message input and send functionality.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/components/ChatInput.tsx`
2. Accept props:
   - `value: string`
   - `onChange: (value: string) => void`
   - `onSend: (message: string) => void`
   - `disabled: boolean`
3. Implement textarea:
   - Auto-resize (max 5 lines)
   - Placeholder text with suggestions
   - Character limit: 1000 characters
   - Show character count (optional)
4. Add send button:
   - Icon from Lucide (Send or ArrowRight)
   - Disabled when input is empty or loading
5. Keyboard shortcuts:
   - Enter: send message
   - Shift+Enter: new line
6. Input validation:
   - Trim whitespace
   - Prevent empty messages
   - Show validation errors
7. Create `ChatInput.module.css` with styles
8. Mobile-friendly (keyboard handling)

**Acceptance Criteria**:
- [ ] Textarea with auto-resize
- [ ] Character limit enforced (1000 chars)
- [ ] Send button works
- [ ] Enter sends, Shift+Enter new line
- [ ] Input validation works
- [ ] Disabled state when loading
- [ ] Mobile keyboard friendly

**Estimated Time**: 1 hour

---

### Task 1.10: Create LoadingIndicator Component

**Description**: Shows AI is thinking/processing.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/components/LoadingIndicator.tsx`
2. Use `Loader` icon from Lucide React with animation
3. Or create animated dots (CSS animation)
4. Add `aria-live="polite"` for screen readers
5. Add loading text: "Thinking..." or similar
6. Create `LoadingIndicator.module.css` with animation
7. Match design system colors

**Acceptance Criteria**:
- [ ] Shows loading animation
- [ ] Accessible (screen reader announcement)
- [ ] Smooth animation
- [ ] Matches design system

**Estimated Time**: 20 minutes

---

### Task 1.11: Integrate Welcome Message Display

**Description**: Show welcome message on first open.

**Steps**:
1. In `ChatbotWindow` or `MessageList`, check `hasSeenWelcome` from context
2. If not seen, display welcome message from constants
3. Add placeholder area for quick action buttons (will be implemented in Phase 4, Task 4.5)
4. Mark welcome as seen when displayed
5. Style welcome message appropriately

**Acceptance Criteria**:
- [ ] Welcome message shows on first open
- [ ] Placeholder for quick actions (basic structure)
- [ ] Welcome marked as seen
- [ ] Only shows once per session
- [ ] **Note**: Full quick actions implementation in Phase 4, Task 4.5

**Estimated Time**: 30 minutes

---

### Task 1.12: Add CSS Modules Styling

**Description**: Style all components with CSS Modules matching design system.

**Steps**:
1. For each component, ensure CSS Module file exists
2. Use CSS variables from `src/shared/styles/variables.css`:
   - Colors (primary, secondary, text, surface, etc.)
   - Spacing variables
   - Typography variables
3. Match existing design patterns
4. Ensure responsive breakpoints:
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px
5. Add smooth transitions and animations
6. Ensure proper z-index hierarchy

**Acceptance Criteria**:
- [ ] All components styled
- [ ] Uses design system variables
- [ ] Responsive on all breakpoints
- [ ] Smooth animations
- [ ] Consistent with existing design

**Estimated Time**: 2 hours (distributed across components)

---

### Task 1.13: Integrate into Layout Component

**Description**: Add ChatbotProvider, ChatbotButton, and ChatbotWindow to Layout.

**Steps**:
1. Open `guidebook-app/src/shared/components/Layout/Layout.tsx`
2. Import `ChatbotProvider`, `ChatbotButton`, and `ChatbotWindow`
3. Add feature flag check:
   ```typescript
   const isChatbotEnabled = import.meta.env.VITE_CHATBOT_ENABLED !== 'false';
   ```
4. Wrap components with `ChatbotProvider` (conditionally)
5. Add `ChatbotButton` after `BackToTop` component
6. Add `ChatbotWindow` inside `ChatbotProvider` (conditionally rendered based on `isOpen` from context)
7. Use `React.lazy()` for code splitting:
   ```typescript
   const ChatbotButton = React.lazy(() => import('@features/chatbot/components/ChatbotButton'));
   const ChatbotWindow = React.lazy(() => import('@features/chatbot/components/ChatbotWindow'));
   ```
8. Wrap lazy components in `Suspense` with fallback:
   ```typescript
   <Suspense fallback={null}>
     <ChatbotButton />
   </Suspense>
   ```
9. Test that chatbot button appears on all pages
10. Test that ChatbotWindow opens/closes correctly

**Acceptance Criteria**:
- [ ] ChatbotProvider wraps chatbot components
- [ ] ChatbotButton appears on all pages
- [ ] ChatbotWindow renders when `isOpen` is true
- [ ] Feature flag works (can disable chatbot)
- [ ] Lazy loading implemented with Suspense
- [ ] No console errors

**Estimated Time**: 45 minutes

---

### Task 1.14: Test Responsive Behavior

**Description**: Test chatbot on different screen sizes and devices.

**Steps**:
1. Test on mobile viewport (< 768px):
   - Full-screen chatbot
   - Button positioning
   - Input accessibility
2. Test on tablet viewport (768px - 1024px):
   - Modal overlay
   - Proper sizing
3. Test on desktop viewport (> 1024px):
   - Modal overlay
   - Proper positioning
4. Test keyboard navigation
5. Test touch interactions on mobile
6. Fix any responsive issues

**Acceptance Criteria**:
- [ ] Works on all screen sizes
- [ ] Mobile: full-screen
- [ ] Tablet/Desktop: modal overlay
- [ ] Keyboard navigation works
- [ ] Touch interactions work

**Estimated Time**: 1 hour

---

## Phase 2: AI Integration (Week 2)

**Goal**: Connect chatbot to AI service

**Deliverables**:
- API route for AI service
- System prompt generation
- Content context loading
- Message sending and receiving
- Error handling
- Loading states

---

### Task 2.1: Set Up Vercel API Route

**Description**: Create serverless function for AI API.

**Steps**:
1. Create `guidebook-app/api/chat/` directory at project root
2. Create `guidebook-app/api/chat/route.ts`
3. Set up basic POST handler:
   ```typescript
   export async function POST(request: Request) {
     // Implementation
   }
   ```
4. Add error handling structure
5. Test that route is accessible at `/api/chat`
6. **Note**: Vercel handles CORS automatically for same-origin requests. If CORS is needed for cross-origin, configure in `vercel.json` or add headers in route handler.

**Acceptance Criteria**:
- [ ] API route created at `api/chat/route.ts`
- [ ] POST handler implemented
- [ ] Route accessible
- [ ] Basic error handling

**Estimated Time**: 30 minutes

---

### Task 2.2: Install AI SDK Dependencies

**Description**: Install required packages for AI integration.

**Steps**:
1. Install `ai` package: `npm install ai`
2. Install `@ai-sdk/openai` package: `npm install @ai-sdk/openai`
3. Install `@types/node` if not already installed: `npm install -D @types/node`
4. Verify packages in `package.json`
5. Check for any peer dependency warnings

**Acceptance Criteria**:
- [ ] `ai` package installed (^3.0.0)
- [ ] `@ai-sdk/openai` package installed (^1.0.0)
- [ ] `@types/node` installed
- [ ] No dependency conflicts

**Estimated Time**: 10 minutes

---

### Task 2.2.5: Set Up Environment Variables

**Description**: Configure environment variables for AI service.

**Steps**:
1. Create `.env.local` file in `guidebook-app/` directory (if not exists)
2. Add required environment variable:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
3. Add optional environment variables:
   ```
   OPENAI_MODEL=gpt-3.5-turbo
   VITE_CHATBOT_ENABLED=true
   ```
4. Add `.env.local` to `.gitignore` (verify it's already there)
5. Document environment variables in README or setup guide
6. **Note**: `OPENAI_API_KEY` is server-side only (not exposed to client)
7. **Note**: `VITE_CHATBOT_ENABLED` needs `VITE_` prefix for Vite to expose to client

**Acceptance Criteria**:
- [ ] `.env.local` file created
- [ ] `OPENAI_API_KEY` configured
- [ ] Optional variables configured
- [ ] `.env.local` in `.gitignore`
- [ ] Environment variables documented

**Estimated Time**: 10 minutes

---

### Task 2.3: Create System Prompt Utility in Shared

**Description**: Create system prompt generation utility in shared location for API route access.

**Steps**:
1. Create `guidebook-app/src/shared/utils/systemPrompt.ts`
2. Create route mapping constant (`ROUTE_MAP`):
   - Map common topics to guidebook routes
   - Include all main pages and sub-pages
   - Include common variations (e.g., "wifi" and "wi-fi")
   - Will be enhanced in Phase 3, Task 3.3
3. Implement basic `generateSystemPrompt()` function:
   - Load content using `loadContent()` from `@shared/utils/content`
   - Build basic system prompt with property details
   - Include route mapping in prompt instructions
   - Return formatted prompt string
   - **Note**: Will be enhanced with more content in Phase 3, Tasks 3.1-3.2
4. Export `generateSystemPrompt` and `ROUTE_MAP`
5. Test that function can be imported in API route

**Acceptance Criteria**:
- [ ] System prompt utility in `src/shared/utils/`
- [ ] Function generates basic prompt (will be enhanced in Phase 3)
- [ ] Includes basic property details
- [ ] Includes route mapping constant
- [ ] Properly exported
- [ ] Can be imported in API route

**Estimated Time**: 45 minutes

---

### Task 2.5: Implement System Prompt Caching in API Route

**Description**: Add caching for system prompt generation in API route.

**Steps**:
1. In `api/chat/route.ts`, import `generateSystemPrompt`
2. Add caching variables:
   ```typescript
   let cachedSystemPrompt: string | null = null;
   const SYSTEM_PROMPT_TTL = 1000 * 60 * 60; // 1 hour
   let promptCacheTime = 0;
   ```
3. Implement `getSystemPrompt()` function:
   - Check cache validity
   - Return cached if valid
   - Generate new if expired or missing
   - Update cache
4. Use in POST handler

**Acceptance Criteria**:
- [ ] System prompt cached
- [ ] Cache TTL is 1 hour
- [ ] Cache refreshes when expired
- [ ] Reduces API route execution time

**Estimated Time**: 20 minutes

---

### Task 2.6: Implement Rate Limiting

**Description**: Add rate limiting to prevent abuse.

**Steps**:
1. In `api/chat/route.ts`, add rate limiting map:
   ```typescript
   const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
   const RATE_LIMIT = 10; // requests per window
   const RATE_WINDOW = 60 * 1000; // 1 minute
   ```
2. Implement `checkRateLimit(ip: string)` function:
   - Get or create record for IP
   - Check if within rate limit window
   - Increment count or reset
   - Return true/false
3. Call in POST handler before processing
4. Return 429 status if rate limited
5. Add appropriate error message

**Acceptance Criteria**:
- [ ] Rate limiting implemented
- [ ] 10 requests per minute per IP
- [ ] Returns 429 when limit exceeded
- [ ] Error message is clear

**Estimated Time**: 30 minutes

---

### Task 2.7: Implement AI API Integration

**Description**: Connect API route to OpenAI using Vercel AI SDK.

**Steps**:
1. In `api/chat/route.ts`, import:
   - `openai` from `@ai-sdk/openai`
   - `streamText` from `ai`
2. In POST handler:
   - Parse request body for `messages`
   - Validate messages array
   - Validate last message length (max 1000 chars)
   - Truncate to last 15 messages
   - Get system prompt (cached)
   - Call `streamText()` with:
     - Model: `openai(process.env.OPENAI_MODEL || 'gpt-3.5-turbo')`
     - System prompt
     - Recent messages
     - Temperature: 0.7
     - Max tokens: 500
   - Return `result.toDataStreamResponse()`
3. Add environment variable check for `OPENAI_API_KEY`
4. Handle API errors gracefully

**Acceptance Criteria**:
- [ ] API route calls OpenAI
- [ ] Streaming responses work
- [ ] System prompt included
- [ ] Message history truncated to 15
- [ ] Error handling works
- [ ] Environment variables configured

**Estimated Time**: 1 hour

---

### Task 2.8: Create useChatbot Hook

**Description**: Create wrapper hook around useChat from AI SDK.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/hooks/useChatbot.ts`
2. Import `useChat` from `ai/react`
3. Configure `useChat`:
   - `api: '/api/chat'`
   - `onError` handler (log errors)
   - `initialMessages: []`
4. Add `clearMessages()` function using `setMessages([])`
5. Return:
   - `messages`
   - `input`
   - `handleInputChange`
   - `handleSubmit`
   - `isLoading`
   - `error`
   - `clearMessages`
6. Add TypeScript types

**Acceptance Criteria**:
- [ ] Hook created
- [ ] Wraps useChat correctly
- [ ] Returns all needed values
- [ ] Error handling works
- [ ] TypeScript types correct

**Estimated Time**: 30 minutes

---

### Task 2.9: Integrate useChatbot Hook in ChatbotWindow

**Description**: Connect ChatbotWindow to AI service via useChatbot hook.

**Steps**:
1. In `ChatbotWindow.tsx`, import `useChatbot` hook
2. Call `useChatbot()` to get chat state
3. Pass `messages` to `MessageList`
4. Pass `input`, `handleInputChange`, `handleSubmit`, `isLoading` to `ChatInput`
5. Pass `error` for error display
6. Pass `clearMessages` to clear button
7. Handle loading state (show LoadingIndicator)
8. Handle error state (show error message)

**Acceptance Criteria**:
- [ ] ChatbotWindow uses useChatbot hook
- [ ] Messages display correctly
- [ ] Input works
- [ ] Loading state shows
- [ ] Error state shows
- [ ] Clear messages works

**Estimated Time**: 45 minutes

---

### Task 2.10: Add Input Validation (Client and Server)

**Description**: Validate message input on both client and server.

**Steps**:
1. In `ChatInput.tsx`:
   - Validate length (max 1000 characters)
   - Trim whitespace
   - Prevent empty messages
   - Show validation errors
2. In `api/chat/route.ts`:
   - Validate messages array exists
   - Validate last message content exists
   - Validate length (max 1000 characters)
   - Return 400 error if invalid
3. Ensure both validations match

**Acceptance Criteria**:
- [ ] Client-side validation works
- [ ] Server-side validation works
- [ ] Both validate same rules
- [ ] Error messages are clear
- [ ] Prevents invalid submissions

**Estimated Time**: 30 minutes

---

### Task 2.11: Add Comprehensive Error Handling

**Description**: Handle all error scenarios gracefully.

**Steps**:
1. In `ChatbotWindow.tsx`, handle errors from `useChatbot`:
   - Network errors: Show retry button
   - API errors: Show generic message
   - Rate limit errors: Show rate limit message
   - Timeout errors: Show timeout message
2. In `api/chat/route.ts`:
   - Handle API key errors (don't expose details)
   - Handle OpenAI API errors
   - Handle validation errors
   - Return appropriate status codes
3. Add error display component or section
4. Add retry functionality

**Acceptance Criteria**:
- [ ] All error types handled
- [ ] User-friendly error messages
- [ ] No sensitive information exposed
- [ ] Retry functionality works
- [ ] Error states are clear

**Estimated Time**: 1 hour

---

### Task 2.12: Test API Integration

**Description**: Test full conversation flow with AI service.

**Steps**:
1. Test sending a message
2. Verify streaming response works
3. Test error scenarios:
   - Invalid input
   - Rate limiting
   - Network errors
   - API errors
4. Test conversation context (follow-up questions)
5. Test message history truncation
6. Verify system prompt is included
7. Test on different devices/browsers

**Acceptance Criteria**:
- [ ] Messages send successfully
- [ ] Streaming responses work
- [ ] Error handling works
- [ ] Conversation context maintained
- [ ] Works across browsers

**Estimated Time**: 1 hour

---

## Phase 3: Content Integration (Week 3)

**Goal**: Enhance AI responses with guidebook content

**Deliverables**:
- Comprehensive system prompt with property info
- Content context integration
- Link generation to guidebook pages
- Improved response accuracy
- Context window management

---

### Task 3.1: Enhance System Prompt with Property Details

**Description**: Add comprehensive property information to system prompt.

**Steps**:
1. In `src/shared/utils/systemPrompt.ts`, enhance prompt:
   - Property address, city, state, zip
   - Bedrooms, bathrooms
   - Square feet, acres
   - Location (distance to downtown)
   - Key amenities and features
2. Load property data from content
3. Format property details section
4. Test prompt generation

**Acceptance Criteria**:
- [ ] System prompt includes all property details
- [ ] Information is accurate
- [ ] Formatting is clear
- [ ] Prompt length is reasonable

**Estimated Time**: 30 minutes

---

### Task 3.2: Integrate Guidebook Content into System Prompt

**Description**: Add summaries of guidebook sections to system prompt.

**Steps**:
1. In `src/shared/utils/systemPrompt.ts`, add content summaries:
   - Before You Arrive section overview
   - During Your Stay section overview
   - Local Guide section overview
   - Checkout section overview
2. Include key topics from each section
3. Add how-to guide topics list
4. Format as readable text in prompt
5. Keep prompt length manageable

**Acceptance Criteria**:
- [ ] All guidebook sections summarized
- [ ] Key topics included
- [ ] Prompt is comprehensive but not too long
- [ ] Information is accurate

**Estimated Time**: 1 hour

---

### Task 3.3: Enhance Route Mapping for Link Generation

**Description**: Enhance route mapping to be comprehensive for link generation.

**Steps**:
1. In `src/shared/utils/systemPrompt.ts`, enhance `ROUTE_MAP` (created in Task 2.3):
   - Add all main pages
   - Add all sub-pages
   - Add common topic variations (e.g., "wifi" and "wi-fi")
   - Add how-to guide routes dynamically from content
2. Update system prompt instructions to include comprehensive route mapping
3. Document format for AI to use links
4. Test route mapping is complete and accurate

**Acceptance Criteria**:
- [ ] Route map enhanced with all guidebook pages
- [ ] Common variations covered
- [ ] How-to guide routes included
- [ ] System prompt instructs AI on link format
- [ ] Routes are correct and tested

**Estimated Time**: 30 minutes

---

### Task 3.4: Implement Link Detection and Conversion

**Description**: Convert markdown links in AI responses to React Router links.

**Steps**:
1. In `MessageBubble.tsx`, detect markdown links in message content
2. For internal guidebook links (matching routes):
   - Convert to React Router `Link` component
   - Use route from `ROUTE_MAP`
   - Open in same window
3. For external links:
   - Keep as anchor tag
   - Open in new tab (`target="_blank"`)
   - Add `rel="noopener noreferrer"`
4. Test link conversion works
5. Ensure links are clickable and styled

**Acceptance Criteria**:
- [ ] Internal links use React Router Link
- [ ] External links use anchor tags
- [ ] Links are clickable
- [ ] Navigation works correctly
- [ ] Links are styled appropriately

**Estimated Time**: 1 hour

---

### Task 3.5: Add Page Reference Functionality

**Description**: Enhance system prompt to encourage linking to relevant pages.

**Steps**:
1. Update system prompt instructions:
   - When to provide links
   - How to format links
   - Which topics map to which pages
2. Test AI provides links appropriately
3. Verify links are helpful and relevant
4. Refine prompt if needed

**Acceptance Criteria**:
- [ ] System prompt encourages linking
- [ ] AI provides relevant links
- [ ] Links are helpful
- [ ] Link format is correct

**Estimated Time**: 30 minutes

---

### Task 3.6: Implement Context Window Management

**Description**: Ensure conversation history fits within token limits.

**Steps**:
1. Verify message truncation (already implemented in API route)
2. Document token usage:
   - System prompt: ~1000 tokens
   - 15 messages: ~3000 tokens
   - Response: ~500 tokens
   - Total: ~4500 tokens (within 16k limit)
3. Add comments in code explaining strategy
4. Monitor token usage (optional: add logging)

**Acceptance Criteria**:
- [ ] Message history truncated to 15
- [ ] Token usage is documented
- [ ] Well within token limits
- [ ] Strategy is clear

**Estimated Time**: 20 minutes

---

### Task 3.7: Test Response Accuracy

**Description**: Test chatbot answers questions accurately using guidebook content.

**Steps**:
1. Test common questions:
   - Wi-Fi password
   - Check-in procedures
   - House rules
   - How to use appliances
   - Local recommendations
2. Verify answers match guidebook content
3. Verify links are provided when appropriate
4. Test follow-up questions maintain context
5. Test questions outside guidebook scope
6. Refine system prompt based on results

**Acceptance Criteria**:
- [ ] Answers are accurate
- [ ] Answers match guidebook content
- [ ] Links are provided appropriately
- [ ] Follow-up questions work
- [ ] Unknown questions handled gracefully

**Estimated Time**: 2 hours

---

### Task 3.8: Refine System Prompt

**Description**: Iterate on system prompt based on testing results.

**Steps**:
1. Review test results from Task 3.7
2. Identify areas for improvement:
   - Missing information
   - Unclear instructions
   - Link generation issues
   - Tone/style issues
3. Update system prompt
4. Test again
5. Repeat until satisfied

**Acceptance Criteria**:
- [ ] System prompt refined
- [ ] Response quality improved
- [ ] Link generation works well
- [ ] Tone is appropriate

**Estimated Time**: 1 hour

---

## Phase 4: Polish & Optimization (Week 4)

**Goal**: UX improvements and performance optimization

**Deliverables**:
- Smooth animations
- Accessibility improvements
- Performance optimization
- Mobile experience refinement
- Error state improvements
- Quick action buttons

---

### Task 4.1: Add Smooth Animations

**Description**: Enhance animations for better UX.

**Steps**:
1. In `ChatbotButton.module.css`:
   - Add smooth open/close animation (300ms ease)
   - Add hover effects
2. In `ChatbotWindow.module.css`:
   - Add slide-up animation (300ms ease)
   - Add fade-in for backdrop
3. In `MessageBubble.module.css`:
   - Add fade-in with slight slide (200ms)
4. In `LoadingIndicator.module.css`:
   - Add pulsing animation
5. Test animations are smooth (60fps)

**Acceptance Criteria**:
- [ ] All animations smooth (60fps)
- [ ] Open/close animation works
- [ ] Message appearance animated
- [ ] Loading animation works
- [ ] No jank or stuttering

**Estimated Time**: 1 hour

---

### Task 4.2: Implement Full Keyboard Navigation

**Description**: Ensure complete keyboard accessibility.

**Steps**:
1. Test all interactive elements are keyboard accessible:
   - ChatbotButton (Enter/Space)
   - ChatbotWindow close button (Enter/Space)
   - ChatInput (Tab navigation)
   - Send button (Enter/Space)
   - Quick action buttons (Enter/Space)
2. Implement Escape key to close chatbot
3. Implement Tab order (logical flow)
4. Add focus indicators (visible outlines)
5. Test with keyboard only (no mouse)

**Acceptance Criteria**:
- [ ] All elements keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Escape closes chatbot
- [ ] Can use chatbot with keyboard only

**Estimated Time**: 1 hour

---

### Task 4.3: Add ARIA Labels and Roles

**Description**: Improve screen reader support.

**Steps**:
1. Add ARIA labels to all interactive elements:
   - ChatbotButton: `aria-label` for state
   - ChatbotWindow: `role="dialog"`, `aria-labelledby`
   - MessageList: `role="log"`, `aria-live="polite"`
   - ChatInput: `aria-label`, `aria-describedby`
   - Send button: `aria-label`
2. Add ARIA announcements for:
   - New messages
   - Loading states
   - Error states
3. Test with screen reader (NVDA, JAWS, or VoiceOver)

**Acceptance Criteria**:
- [ ] All elements have ARIA labels
- [ ] Roles are appropriate
- [ ] Screen reader announces changes
- [ ] Tested with actual screen reader

**Estimated Time**: 1 hour

---

### Task 4.4: Add Conversation Clearing Functionality

**Description**: Allow users to clear conversation history.

**Steps**:
1. In `ChatbotWindow.tsx`, add clear button in header
2. Button should:
   - Call `clearMessages()` from `useChatbot`
   - Show confirmation (optional) or clear immediately
   - Use Trash or X icon from Lucide
3. Add `aria-label` for accessibility
4. Style button appropriately
5. Test clearing works

**Acceptance Criteria**:
- [ ] Clear button in header
- [ ] Clears all messages
- [ ] Accessible
- [ ] Styled appropriately

**Estimated Time**: 30 minutes

---

### Task 4.5: Implement Quick Action Buttons

**Description**: Add quick action buttons for common questions.

**Steps**:
1. In `ChatbotWindow.tsx` or `MessageList.tsx`, add quick actions section
2. Display below welcome message (or when no messages)
3. Use `QUICK_ACTIONS` from constants
4. Style as chips/pills
5. On click:
   - Send question directly (call `handleSubmit` with question)
   - Or populate input (user can edit before sending)
6. Hide quick actions after first message sent
7. Style to match design system

**Acceptance Criteria**:
- [ ] Quick actions displayed
- [ ] Click sends question
- [ ] Styled as chips/pills
- [ ] Hidden after first message
- [ ] Matches design system

**Estimated Time**: 1 hour

---

### Task 4.6: Add Timestamp Display (Optional)

**Description**: Show relative timestamps for messages.

**Steps**:
1. In `MessageBubble.tsx`, add timestamp display
2. Use relative time format (e.g., "2 minutes ago")
3. Group messages by time proximity (optional)
4. Show timestamp for first message in group
5. Style appropriately
6. Make it optional (can be toggled or always shown)

**Acceptance Criteria**:
- [ ] Timestamps displayed
- [ ] Relative time format
- [ ] Styled appropriately
- [ ] Optional or always shown

**Estimated Time**: 45 minutes

---

### Task 4.7: Optimize Rendering Performance

**Description**: Ensure chatbot doesn't impact page performance.

**Steps**:
1. Verify lazy loading is working (React.lazy)
2. Check code splitting (separate bundle for chatbot)
3. Consider message virtualization if needed (for very long conversations)
4. Optimize re-renders (use React.memo if needed)
5. Test page load performance
6. Test with many messages

**Acceptance Criteria**:
- [ ] Lazy loading works
- [ ] Code splitting works
- [ ] No performance issues
- [ ] Page load not impacted

**Estimated Time**: 1 hour

---

### Task 4.8: Improve Mobile Experience

**Description**: Refine mobile keyboard handling and viewport adjustments.

**Steps**:
1. In `ChatbotWindow.module.css`, add mobile keyboard handling:
   ```css
   .chatWindow {
     height: 100vh;
     height: 100dvh; /* Dynamic viewport height */
     max-height: -webkit-fill-available; /* iOS Safari */
   }
   
   .inputContainer {
     padding-bottom: env(safe-area-inset-bottom, 0);
     position: sticky;
     bottom: 0;
   }
   ```
2. Test on iOS Safari
3. Test on Android Chrome
4. Ensure input stays visible when keyboard opens
5. Adjust viewport if needed
6. Test in different orientations

**Acceptance Criteria**:
- [ ] Mobile keyboard handled correctly
- [ ] Input stays visible
- [ ] Works on iOS and Android
- [ ] Works in all orientations
- [ ] No viewport issues

**Estimated Time**: 1.5 hours

---

### Task 4.9: Add ChatbotErrorBoundary Component

**Description**: Create error boundary to prevent chatbot errors from breaking main app.

**Steps**:
1. Create `guidebook-app/src/features/chatbot/components/ChatbotErrorBoundary.tsx`
2. Implement React Error Boundary:
   - `componentDidCatch` or `getDerivedStateFromError`
   - Fallback UI with friendly error message
   - Retry button
3. Wrap `ChatbotWindow` (not ChatbotButton)
4. Log errors for debugging
5. Style fallback UI

**Acceptance Criteria**:
- [ ] Error boundary created
- [ ] Wraps ChatbotWindow
- [ ] Shows friendly error message
- [ ] Retry functionality works
- [ ] Errors logged
- [ ] Main app doesn't break

**Estimated Time**: 1 hour

---

### Task 4.10: Final Accessibility Audit

**Description**: Comprehensive accessibility testing and fixes.

**Steps**:
1. Test with keyboard only
2. Test with screen reader (NVDA, JAWS, VoiceOver)
3. Check color contrast (WCAG 2.1 Level AA)
4. Check focus indicators
5. Check ARIA labels and roles
6. Test on different devices
7. Fix any accessibility issues found
8. Run automated accessibility tools (axe, WAVE)

**Acceptance Criteria**:
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] ARIA labels correct
- [ ] No accessibility violations

**Estimated Time**: 2 hours

---

### Task 4.11: Final Testing and Bug Fixes

**Description**: Comprehensive testing and bug fixing.

**Steps**:
1. Test all functionality:
   - Opening/closing chatbot
   - Sending messages
   - Receiving responses
   - Streaming behavior
   - Error handling
   - Link clicking
   - Quick actions
   - Clearing messages
2. Test on different browsers:
   - Chrome
   - Firefox
   - Safari
   - Edge
3. Test on different devices:
   - Desktop
   - Tablet
   - Mobile (iOS and Android)
4. Test edge cases:
   - Very long messages
   - Rapid clicking
   - Network errors
   - API errors
5. Fix any bugs found
6. Test again after fixes

**Acceptance Criteria**:
- [ ] All functionality works
- [ ] Works on all browsers
- [ ] Works on all devices
- [ ] Edge cases handled
- [ ] No critical bugs
- [ ] Ready for production

**Estimated Time**: 3 hours

---

## Summary

**Total Estimated Time**: ~40 hours (1 week for 1 developer, or 2 weeks part-time)

**Phase Breakdown**:
- Phase 1: ~12.5 hours (14 tasks)
- Phase 2: ~8.5 hours (12 tasks, including env setup)
- Phase 3: ~6 hours (8 tasks)
- Phase 4: ~14 hours (11 tasks)

**Dependencies**:
- Phase 2 depends on Phase 1 completion
- Phase 3 depends on Phase 2 completion
- Phase 4 can be done in parallel with Phase 3

**Critical Path**:
1. Phase 1: Foundation (UI components)
2. Phase 2: AI Integration (API and hooks)
3. Phase 3: Content Integration (system prompt)
4. Phase 4: Polish (UX and accessibility)

---

## Notes

- All tasks should be tested as they are completed
- Code should follow existing codebase patterns
- TypeScript types should be defined for all components
- CSS Modules should use design system variables
- All components should be accessible (WCAG 2.1 Level AA)
- Error handling should be comprehensive
- Performance should be optimized (lazy loading, code splitting)

