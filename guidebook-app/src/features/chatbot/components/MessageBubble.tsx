import { useNavigate } from 'react-router-dom';
import type { UIMessage } from 'ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { useChatContext } from '../hooks/useChatContext';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: UIMessage;
  isUser: boolean;
}

/**
 * Extracts text content from UIMessage parts
 */
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(part => part.type === 'text')
    .map(part => (part as { text: string }).text)
    .join('');
}

export default function MessageBubble({ message, isUser }: MessageBubbleProps) {
  const textContent = getMessageText(message);
  const role = message.role;
  const navigate = useNavigate();
  const { closeChatbot } = useChatContext();

  // Custom link component that handles navigation and closes chatbot
  const linkComponents: Partial<Components> = {
    a: ({ href, children, ...props }) => {
      // Check if it's an internal link (starts with /)
      const isInternal = href?.startsWith('/');
      
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isInternal && href) {
          e.preventDefault();
          closeChatbot();
          navigate(href);
        }
        // External links will open normally in a new tab (if target="_blank" is set)
      };

      return (
        <a
          href={href}
          onClick={handleClick}
          {...props}
          {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className={`${styles.container} ${isUser ? styles.user : styles.bot}`}>
      <div className={styles.content}>
        {role === 'user' ? (
          <p className={styles.text}>{textContent}</p>
        ) : (
          <div className={styles.markdown}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={linkComponents}
            >
              {textContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

