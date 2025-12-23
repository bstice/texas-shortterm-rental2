import { useState, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  disabled: boolean;
}

const MAX_LENGTH = 1000;

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: ChatInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_LENGTH) {
      onChange(newValue);
      setError(null);
    } else {
      setError(`Message must be ${MAX_LENGTH} characters or less`);
    }
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Please enter a message');
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Message must be ${MAX_LENGTH} characters or less`);
      return;
    }
    setError(null);
    onSend(trimmed);
    onChange(''); // Clear input after sending
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const remainingChars = MAX_LENGTH - value.length;
  const showCharCount = value.length > MAX_LENGTH * 0.8; // Show when 80% full

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.inputWrapper}>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          maxLength={MAX_LENGTH}
          aria-label="Chat input"
          title="Press Enter to send, Shift+Enter for new line"
          aria-describedby={error ? 'chat-input-error' : undefined}
        />
        <button
          className={styles.sendButton}
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
      {showCharCount && (
        <div className={styles.charCount}>
          {remainingChars} characters remaining
        </div>
      )}
    </div>
  );
}

