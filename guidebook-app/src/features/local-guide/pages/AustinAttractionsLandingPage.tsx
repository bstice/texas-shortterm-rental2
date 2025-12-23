import { Link } from 'react-router-dom';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import styles from './AustinAttractionsLandingPage.module.css';

export default function AustinAttractionsLandingPage() {
  return (
    <div className={styles.container}>
      <h1>Austin Attractions</h1>
      <p className={styles.subtitle}>
        Discover downtown Austin attractions and local spots near the property
      </p>

      <div className={styles.cardsGrid}>
        <Link
          to="/local-guide/austin-attractions/downtown"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Building2 size={32} />
          </div>
          <h2>Downtown Austin</h2>
          <p>Parks, districts, and attractions in the heart of Austin</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/local-guide/austin-attractions/local-spots"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <MapPin size={32} />
          </div>
          <h2>Local Spots</h2>
          <p>Restaurants, breweries, and hangouts close to the property</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>
      </div>
    </div>
  );
}

