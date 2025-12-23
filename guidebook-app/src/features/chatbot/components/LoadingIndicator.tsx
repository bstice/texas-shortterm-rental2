import { Loader } from 'lucide-react';
import styles from './LoadingIndicator.module.css';

export default function LoadingIndicator() {
  return (
    <div className={styles.container} aria-live="polite" aria-label="AI is thinking">
      <Loader size={20} className={styles.icon} />
      <span className={styles.text}>Thinking...</span>
    </div>
  );
}

