import { useContent } from '@shared/hooks/useContent';
import { useParams } from 'react-router-dom';
import { Wrench, AlertTriangle } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './HowToGuidePage.module.css';

export default function HowToGuidePage() {
  const { guideId } = useParams<{ guideId: string }>();
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

  // Find the guide by ID
  const guide = content.duringYourStay.howToGuides.find(
    (g) => g.id === guideId
  );

  if (!guide) {
    return (
      <div className={styles.error}>
        <p>Guide not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>
        <Wrench size={32} className={styles.icon} />
        {guide.title}
      </h1>

      <section className={styles.stepsSection}>
        <h2>Instructions</h2>
        <ol className={styles.stepsList}>
          {guide.steps.map((step, index) => (
            <li key={index}>
              <h3>{step.title}</h3>
              <Markdown content={step.description} />
            </li>
          ))}
        </ol>
      </section>

      {guide.safety && guide.safety.length > 0 && (
        <section className={styles.safetySection}>
          <h2>
            <AlertTriangle size={24} className={styles.safetyIcon} />
            Safety Information
          </h2>
          <ul className={styles.safetyList}>
            {guide.safety.map((item, index) => (
              <li key={index}>
                <Markdown content={item} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {guide.troubleshooting && guide.troubleshooting.length > 0 && (
        <section className={styles.troubleshootingSection}>
          <h2>Troubleshooting</h2>
          <ul className={styles.troubleshootingList}>
            {guide.troubleshooting.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

