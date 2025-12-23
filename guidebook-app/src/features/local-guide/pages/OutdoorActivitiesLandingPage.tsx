import { Link } from 'react-router-dom';
import { Mountain, MapPin, Trees, ArrowRight } from 'lucide-react';
import styles from './OutdoorActivitiesLandingPage.module.css';

export default function OutdoorActivitiesLandingPage() {
  return (
    <div className={styles.container}>
      <h1>Outdoor Activities</h1>
      <p className={styles.subtitle}>
        Explore hiking trails, Hill Country attractions, and beautiful parks
        and nature preserves in the Austin area
      </p>

      <div className={styles.cardsGrid}>
        <Link
          to="/local-guide/outdoor-activities/hiking-trails"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Mountain size={32} />
          </div>
          <h2>Hiking & Trails</h2>
          <p>Scenic trails and paths for walking, running, and cycling</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/local-guide/outdoor-activities/hill-country"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <MapPin size={32} />
          </div>
          <h2>Hill Country Attractions</h2>
          <p>Iconic Hill Country destinations and scenic overlooks</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/local-guide/outdoor-activities/parks-nature"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Trees size={32} />
          </div>
          <h2>Parks & Nature</h2>
          <p>State parks, nature preserves, and protected areas</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>
      </div>
    </div>
  );
}

