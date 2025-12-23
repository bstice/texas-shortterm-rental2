import { useContent } from '@shared/hooks/useContent';
import { Trees } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './OutdoorSpacesPage.module.css';

export default function OutdoorSpacesPage() {
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

  const { outdoor } = content.duringYourStay.propertyFeatures;

  return (
    <div className={styles.container}>
      <h1>
        <Trees size={32} className={styles.icon} />
        Outdoor Spaces (8.4 acres)
      </h1>

      <section className={styles.contentSection}>
        <Markdown content={outdoor.content} />
      </section>

      {outdoor.highlights && outdoor.highlights.length > 0 && (
        <section className={styles.highlightsSection}>
          <h2>Highlights</h2>
          <ul className={styles.highlightsList}>
            {outdoor.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

