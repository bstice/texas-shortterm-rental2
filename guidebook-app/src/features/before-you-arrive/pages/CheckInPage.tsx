import { useContent } from '@shared/hooks/useContent';
import Markdown from '@shared/components/ui/Markdown';
import styles from './CheckInPage.module.css';

export default function CheckInPage() {
  const { content, loading, error } = useContent();

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

  const { checkIn } = content.beforeYouArrive;

  return (
    <div className={styles.container}>
      <h1>Check-in Instructions</h1>

      <section className={styles.stepsSection}>
        <h2>Check-in Steps</h2>
        <ol className={styles.stepsList}>
          {checkIn.steps.map((step, index) => (
            <li key={index}>
              <Markdown content={step} />
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.expectationsSection}>
        <h2>What to Expect</h2>
        <Markdown content={checkIn.arrivalExpectations} />
      </section>

      {checkIn.keyCollection && (
        <section className={styles.keySection}>
          <h2>Key Collection</h2>
          <Markdown content={checkIn.keyCollection} />
        </section>
      )}
    </div>
  );
}

