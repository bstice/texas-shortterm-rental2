import { useContent } from '@shared/hooks/useContent';
import { Sunset } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './SunsetsPage.module.css';

export default function SunsetsPage() {
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

  const { sunsets } = content.duringYourStay;

  return (
    <div className={styles.container}>
      <h1>
        <Sunset size={32} className={styles.icon} />
        Hill Country Sunsets
      </h1>

      <section className={styles.locationsSection}>
        <h2>Best Viewing Locations</h2>
        <ul className={styles.locationsList}>
          {sunsets.locations.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      </section>

      <section className={styles.timingSection}>
        <h2>Best Times</h2>
        <p className={styles.timing}>{sunsets.bestTimes}</p>
      </section>

      <section className={styles.tipsSection}>
        <h2>Tips for Enjoying the Sunsets</h2>
        <Markdown content={sunsets.tips} />
      </section>

      {sunsets.photography && (
        <section className={styles.photographySection}>
          <h2>Photography Tips</h2>
          <Markdown content={sunsets.photography} />
        </section>
      )}
    </div>
  );
}

