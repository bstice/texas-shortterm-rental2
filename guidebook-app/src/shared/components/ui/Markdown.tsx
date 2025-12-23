import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Markdown.module.css';

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Markdown rendering component
 * 
 * Renders markdown content with GitHub Flavored Markdown support
 */
export default function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <div className={`${styles.markdown} ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

