import { Link } from 'react-router-dom';
import {
  Wind,
  Waves,
  Thermometer,
  Tv,
  ChefHat,
  Car,
  ArrowRight,
} from 'lucide-react';
import { useContent } from '@shared/hooks/useContent';
import styles from './HowToGuidesPage.module.css';

export default function HowToGuidesPage() {
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

  const { howToGuides } = content.duringYourStay;

  // Map guide IDs to icons and labels
  const guideInfo: Record<
    string,
    { icon: React.ReactNode; label: string }
  > = {
    'ac-heating': { icon: <Wind size={32} />, label: 'A/C & Heating' },
    pool: { icon: <Waves size={32} />, label: 'Pool' },
    'hot-tub': { icon: <Thermometer size={32} />, label: 'Hot Tub' },
    'tv-streaming': { icon: <Tv size={32} />, label: 'TV & Streaming' },
    appliances: { icon: <ChefHat size={32} />, label: 'Appliances' },
    limo: { icon: <Car size={32} />, label: 'Limo' },
  };

  return (
    <div className={styles.container}>
      <h1>How-to Guides</h1>
      <p className={styles.subtitle}>
        Step-by-step instructions for using the property's amenities and
        features
      </p>

      <div className={styles.cardsGrid}>
        {howToGuides.map((guide) => {
          const info = guideInfo[guide.id] || {
            icon: <ChefHat size={32} />,
            label: guide.title,
          };
          return (
            <Link
              key={guide.id}
              to={`/during-your-stay/how-to-guides/${guide.id}`}
              className={styles.card}
            >
              <div className={styles.cardIcon}>{info.icon}</div>
              <h2>{info.label}</h2>
              <p>{guide.title}</p>
              <ArrowRight className={styles.arrow} size={20} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

