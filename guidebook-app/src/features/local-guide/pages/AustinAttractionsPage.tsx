import { useContent } from '@shared/hooks/useContent';
import { useParams } from 'react-router-dom';
import { MapPin, Building2 } from 'lucide-react';
import LocalRecommendation from '../components/LocalRecommendation';
import styles from './AustinAttractionsPage.module.css';

export default function AustinAttractionsPage() {
  const { attractionType } = useParams<{ attractionType: string }>();
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

  const { austinAttractions } = content.localGuide;
  let attractions: typeof austinAttractions.downtown = [];
  let title = 'Austin Attractions';
  let icon = <Building2 size={32} />;

  if (attractionType === 'downtown') {
    attractions = austinAttractions.downtown;
    title = 'Downtown Austin';
    icon = <Building2 size={32} />;
  } else if (attractionType === 'local-spots') {
    attractions = austinAttractions.localSpots;
    title = 'Local Spots';
    icon = <MapPin size={32} />;
  }

  return (
    <div className={styles.container}>
      <h1>
        <span className={styles.icon}>{icon}</span>
        {title}
      </h1>

      <div className={styles.grid}>
        {attractions.map((attraction, index) => (
          <LocalRecommendation key={index} recommendation={attraction} />
        ))}
      </div>
    </div>
  );
}

