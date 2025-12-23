import { MessageSquare } from 'lucide-react';
import { useChatContext } from '../hooks/useChatContext';
import styles from './ChatbotButton.module.css';

export default function ChatbotButton() {
  const { isOpen, toggleOpen } = useChatContext();

  return (
    <button
      className={styles.button}
      onClick={toggleOpen}
      aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      aria-expanded={isOpen}
      type="button"
      style={{ 
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 10000,
        visibility: 'visible',
        opacity: 1
      }}
    >
      <MessageSquare 
        size={24} 
        color="white"
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}

