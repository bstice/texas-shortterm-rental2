import { useContent } from '@shared/hooks/useContent';
import { Car, Navigation } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './TransportationPage.module.css';

export default function TransportationPage() {
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

  const { transportation } = content.localGuide;

  return (
    <div className={styles.container}>
      <h1>
        <Navigation size={32} className={styles.icon} />
        Transportation
      </h1>

      <section className={styles.section}>
        <h2>
          <Car size={24} className={styles.sectionIcon} />
          Driving
        </h2>
        <Markdown content={transportation.driving} />
      </section>

      <section className={styles.section}>
        <h2>Ride Sharing</h2>
        <Markdown content={transportation.rideSharing} />
      </section>

      <section className={styles.section}>
        <h2>Parking</h2>
        <Markdown content={transportation.parking} />
      </section>

      {transportation.carRental && (
        <section className={styles.section}>
          <h2>Car Rental</h2>
          <Markdown content={transportation.carRental} />
        </section>
      )}
    </div>
  );
}

