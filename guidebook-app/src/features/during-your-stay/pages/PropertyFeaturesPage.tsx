import { Link } from 'react-router-dom';
import { Home, TreePine, Package, Sunset, ArrowRight } from 'lucide-react';
import styles from './PropertyFeaturesPage.module.css';

export default function PropertyFeaturesPage() {
  return (
    <div className={styles.container}>
      <h1>Property Features</h1>
      <p className={styles.subtitle}>
        Explore the indoor and outdoor spaces, amenities, and special features
        of the property
      </p>

      <div className={styles.cardsGrid}>
        <Link
          to="/during-your-stay/property-features/indoor-spaces"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Home size={32} />
          </div>
          <h2>Indoor Spaces</h2>
          <p>Bedrooms, bathrooms, living areas, and interior highlights</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/during-your-stay/property-features/outdoor-spaces"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <TreePine size={32} />
          </div>
          <h2>Outdoor Spaces</h2>
          <p>8.4 acres of Hill Country property, trails, and outdoor areas</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/during-your-stay/property-features/whats-included"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Package size={32} />
          </div>
          <h2>What's Included</h2>
          <p>Furniture, kitchen items, linens, entertainment, and more</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/during-your-stay/property-features/sunsets"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Sunset size={32} />
          </div>
          <h2>Hill Country Sunsets</h2>
          <p>Best locations and times to enjoy spectacular sunsets</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>
      </div>
    </div>
  );
}

