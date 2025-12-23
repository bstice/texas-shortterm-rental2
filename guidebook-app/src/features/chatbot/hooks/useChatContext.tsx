import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  toggleOpen: () => void;
  closeChatbot: () => void;
  hasSeenWelcome: boolean;
  markWelcomeSeen: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(() => {
    // Load from sessionStorage with SSR guard
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('chatbot-open');
      return stored === 'true';
    }
    return false;
  });

  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    // Load from sessionStorage with SSR guard
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

  const closeChatbot = () => {
    setIsOpen(false);
  };

  const markWelcomeSeen = () => {
    setHasSeenWelcome(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chatbot-welcome-seen', 'true');
    }
  };

  return (
    <ChatbotContext.Provider
      value={{ isOpen, toggleOpen, closeChatbot, hasSeenWelcome, markWelcomeSeen }}
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

