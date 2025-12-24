import { useContent } from '@shared/hooks/useContent';
import { Home, Star } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './IndoorSpacesPage.module.css';

export default function IndoorSpacesPage() {
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

  const { indoor } = content.duringYourStay.propertyFeatures;

  return (
    <div className={styles.container}>
      <h1>
        <Home size={32} className={styles.icon} />
        Indoor Spaces
      </h1>

      <section className={styles.contentSection}>
        <Markdown content={indoor.content} />
      </section>

      {indoor.highlights && indoor.highlights.length > 0 && (
        <section className={styles.highlightsSection}>
          <h2>Highlights</h2>
          <ul className={styles.highlightsList}>
            {indoor.highlights.map((highlight, index) => (
              <li key={index}>
                <Star size={18} className={styles.highlightIcon} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

