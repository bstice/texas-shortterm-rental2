import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

/**
 * Custom hook that wraps useChat from Vercel AI SDK v5
 * 
 * Provides chat functionality with streaming responses, error handling,
 * and message management.
 */
export function useChatbot() {
  const [input, setInput] = useState('');
  
  const { 
    messages, 
    status,
    sendMessage,
    error,
    setMessages,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    messages: [], // Start with empty conversation
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    if (input.trim() && status === 'ready') {
      sendMessage({ text: input.trim() });
      setInput('');
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const isLoading = status === 'streaming' || status === 'submitted';

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

