import { useEffect, useRef } from 'react';
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

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark welcome as seen when component mounts with messages
  useEffect(() => {
    if (messages.length > 0 && !hasSeenWelcome) {
      markWelcomeSeen();
    }
  }, [messages.length, hasSeenWelcome, markWelcomeSeen]);

  const showWelcome = messages.length === 0 && !hasSeenWelcome;

  return (
    <div className={styles.container} role="log" aria-live="polite">
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

