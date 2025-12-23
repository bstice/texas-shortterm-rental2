import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './ExpandableSection.module.css';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * Expandable/collapsible section component
 * 
 * Provides accessible, keyboard-navigable collapsible content sections
 */
export default function ExpandableSection({
  title,
  children,
  defaultExpanded = false,
  className = '',
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        className={styles.header}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`expandable-content-${title}`}
      >
        <span className={styles.title}>{title}</span>
        {isExpanded ? (
          <ChevronUp size={20} className={styles.icon} aria-hidden="true" />
        ) : (
          <ChevronDown size={20} className={styles.icon} aria-hidden="true" />
        )}
      </button>
      <div
        id={`expandable-content-${title}`}
        className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
}

