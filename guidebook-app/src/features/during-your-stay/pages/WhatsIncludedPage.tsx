import { useContent } from '@shared/hooks/useContent';
import { Package } from 'lucide-react';
import styles from './WhatsIncludedPage.module.css';

export default function WhatsIncludedPage() {
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

  const { whatsIncluded } = content.duringYourStay;

  return (
    <div className={styles.container}>
      <h1>
        <Package size={32} className={styles.icon} />
        What's Included (Furnished)
      </h1>

      <div className={styles.grid}>
        <section className={styles.categorySection}>
          <h2>Furniture</h2>
          <ul className={styles.list}>
            {whatsIncluded.furniture.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.categorySection}>
          <h2>Kitchen</h2>
          <ul className={styles.list}>
            {whatsIncluded.kitchen.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.categorySection}>
          <h2>Linens</h2>
          <ul className={styles.list}>
            {whatsIncluded.linens.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.categorySection}>
          <h2>Entertainment</h2>
          <ul className={styles.list}>
            {whatsIncluded.entertainment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.categorySection}>
          <h2>Outdoor</h2>
          <ul className={styles.list}>
            {whatsIncluded.outdoor.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {whatsIncluded.limo && (
          <section className={styles.categorySection}>
            <h2>Special</h2>
            <ul className={styles.list}>
              <li>{whatsIncluded.limo}</li>
            </ul>
          </section>
        )}
      </div>

      {whatsIncluded.guestsNeedToBring && whatsIncluded.guestsNeedToBring.length > 0 && (
        <section className={styles.bringSection}>
          <h2>What Guests Need to Bring</h2>
          <ul className={styles.bringList}>
            {whatsIncluded.guestsNeedToBring.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

