import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useChatContext } from '../hooks/useChatContext';
import { useChatbot } from '../hooks/useChatbot';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';
import styles from './ChatbotWindow.module.css';

export default function ChatbotWindow() {
  const { isOpen, toggleOpen } = useChatContext();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    clearMessages,
  } = useChatbot();

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleOpen();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, toggleOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <>
      <div className={styles.backdrop} onClick={toggleOpen} aria-hidden="true" />
      <div
        className={styles.window}
        role="dialog"
        aria-labelledby="chatbot-title"
        aria-modal="true"
      >
        <header className={styles.header}>
          <h2 id="chatbot-title" className={styles.title}>
            Chat Assistant
          </h2>
          <div className={styles.headerActions}>
            {messages.length > 0 && (
              <button
                className={styles.clearButton}
                onClick={clearMessages}
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                Clear
              </button>
            )}
            <button
              className={styles.closeButton}
              onClick={toggleOpen}
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <MessageList messages={messages} />
          {isLoading && <LoadingIndicator />}
          {error && (
            <div className={styles.error}>
              <p>Sorry, something went wrong. Please try again.</p>
            </div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <form onSubmit={handleFormSubmit}>
            <ChatInput
              value={input}
              onChange={(value) => {
                const syntheticEvent = {
                  target: { value },
                } as React.ChangeEvent<HTMLTextAreaElement>;
                handleInputChange(syntheticEvent);
              }}
              onSend={(message) => {
                // Set input and submit
                handleInputChange({ target: { value: message } } as React.ChangeEvent<HTMLTextAreaElement>);
                setTimeout(() => {
                  handleSubmit({ preventDefault: () => {} });
                }, 0);
              }}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </>
  );
}

