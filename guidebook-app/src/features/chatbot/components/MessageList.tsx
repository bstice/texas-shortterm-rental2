import { useEffect, useRef, useState } from 'react';
import type { UIMessage } from 'ai';
import { useChatContext } from '../hooks/useChatContext';
import { WELCOME_MESSAGE } from '../utils/constants';
import MessageBubble from './MessageBubble';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: UIMessage[];
}

export default function MessageList({ messages }: MessageListProps) {
  const { hasSeenWelcome, markWelcomeSeen } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);
  const lastUserMessageIdRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll helper function
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    // Clear any pending scroll
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      // Small delay to ensure message is fully rendered
      scrollTimeoutRef.current = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior });
      }, 100);
    });
  };

  // Track when a new user message is added and ensure it's visible
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const messageCount = messages.length;
    const previousCount = previousMessageCountRef.current;
    
    // Check if a new user message was just added
    if (lastMessage && lastMessage.role === 'user' && lastMessage.id !== lastUserMessageIdRef.current) {
      lastUserMessageIdRef.current = lastMessage.id;
      
      // Wait for the message to render, then scroll to show it fully
      // Use multiple requestAnimationFrame calls to ensure DOM is fully updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            // Scroll to bottom to show the full user message
            // Use 'smooth' behavior and ensure we scroll to the end
            messagesEndRef.current?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'end',
              inline: 'nearest'
            });
          }, 100);
        });
      });
    } else if (messageCount > previousCount) {
      // Any other new message (assistant response starting)
      scrollToBottom();
    }
    
    previousMessageCountRef.current = messageCount;
  }, [messages]);

  // Scroll during streaming (when assistant message content is being updated)
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      // During streaming, scroll more frequently to keep up with content
      // Use a shorter delay for smoother scrolling during streaming
      const timeoutId = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Mark welcome as seen when component mounts with messages
  useEffect(() => {
    if (messages.length > 0 && !hasSeenWelcome) {
      markWelcomeSeen();
    }
  }, [messages.length, hasSeenWelcome, markWelcomeSeen]);

  const showWelcome = messages.length === 0 && !hasSeenWelcome;

  return (
    <div ref={containerRef} className={styles.container} role="log" aria-live="polite">
      {showWelcome && (
        <div className={styles.welcome}>
          <p className={styles.welcomeText}>{WELCOME_MESSAGE}</p>
          {/* Quick actions placeholder - will be implemented in Phase 4 */}
        </div>
      )}
      {messages.map((message) => {
        const isUser = message.role === 'user';
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isUser={isUser}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

