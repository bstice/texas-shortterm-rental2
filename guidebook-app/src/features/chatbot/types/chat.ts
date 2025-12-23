/**
 * Chatbot Type Definitions
 * 
 * We use the UIMessage type from Vercel AI SDK v5 directly.
 */

// Re-export UIMessage type from AI SDK (v5 uses UIMessage instead of Message)
export type { UIMessage } from 'ai';

// Alias for convenience (UIMessage in v5)
export type Message = import('ai').UIMessage;

// UI-specific types
export interface ChatbotUIState {
  isOpen: boolean;
  hasSeenWelcome: boolean;
}

