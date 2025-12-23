import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  ShoppingCart,
  Mountain,
  Building2,
  Navigation,
  ArrowRight,
} from 'lucide-react';
import styles from './LocalGuidePage.module.css';

export default function LocalGuidePage() {
  return (
    <div className={styles.container}>
      <h1>Local Guide</h1>
      <p className={styles.subtitle}>
        Discover the best restaurants, activities, and attractions in the Hill
        Country and Austin area
      </p>

      <div className={styles.cardsGrid}>
        <Link
          to="/local-guide/restaurants-coffee"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <UtensilsCrossed size={32} />
          </div>
          <h2>Restaurants & Coffee</h2>
          <p>Local dining and coffee shop recommendations</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link to="/local-guide/groceries" className={styles.card}>
          <div className={styles.cardIcon}>
            <ShoppingCart size={32} />
          </div>
          <h2>Groceries</h2>
          <p>Grocery stores and specialty food shops</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/local-guide/outdoor-activities"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Mountain size={32} />
          </div>
          <h2>Outdoor Activities</h2>
          <p>Hiking trails, parks, and Hill Country attractions</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/local-guide/austin-attractions"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Building2 size={32} />
          </div>
          <h2>Austin Attractions</h2>
          <p>Downtown Austin and local spots to explore</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link to="/local-guide/transportation" className={styles.card}>
          <div className={styles.cardIcon}>
            <Navigation size={32} />
          </div>
          <h2>Transportation</h2>
          <p>Driving, ride-sharing, parking, and car rental info</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>
      </div>
    </div>
  );
}

