import { useContent } from '@shared/hooks/useContent';
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard';
import { Copy, Check } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './SmartLockPage.module.css';

export default function SmartLockPage() {
  const { content, loading, error } = useContent();
  const { copy, copied } = useCopyToClipboard();

  const handleCopyCode = () => {
    if (!content) return;
    copy(content.beforeYouArrive.smartLock.code);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !content) {
    return (
      <div className={styles.error}>
        <p>Failed to load content. Please try again later.</p>
      </div>
    );
  }

  const { smartLock } = content.beforeYouArrive;

  return (
    <div className={styles.container}>
      <h1>Smart Lock Code</h1>

      <section className={styles.codeSection}>
        <h2>Access Code</h2>
        <div className={styles.codeBox}>
          <p className={styles.code}>{smartLock.code}</p>
          <button
            onClick={handleCopyCode}
            className={styles.copyButton}
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </section>

      <section className={styles.instructionsSection}>
        <h2>How to Use</h2>
        <Markdown content={smartLock.instructions} />
      </section>

      {smartLock.troubleshooting && smartLock.troubleshooting.length > 0 && (
        <section className={styles.troubleshootingSection}>
          <h2>Troubleshooting</h2>
          <ul className={styles.troubleshootingList}>
            {smartLock.troubleshooting.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

