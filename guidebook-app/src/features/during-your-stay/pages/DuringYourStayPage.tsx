import { Link } from 'react-router-dom';
import { Wifi, Home, Wrench, ArrowRight } from 'lucide-react';
import styles from './DuringYourStayPage.module.css';

export default function DuringYourStayPage() {
  return (
    <div className={styles.container}>
      <h1>During Your Stay</h1>
      <p className={styles.subtitle}>
        Everything you need to know to make the most of your stay
      </p>

      <div className={styles.cardsGrid}>
        <Link to="/during-your-stay/wifi-tech" className={styles.card}>
          <div className={styles.cardIcon}>
            <Wifi size={32} />
          </div>
          <h2>Wi-Fi & Tech</h2>
          <p>Network information and connection instructions</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link to="/during-your-stay/house-rules" className={styles.card}>
          <div className={styles.cardIcon}>
            <Home size={32} />
          </div>
          <h2>House Rules</h2>
          <p>Property rules, policies, and guidelines</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/during-your-stay/property-features/indoor-spaces"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Home size={32} />
          </div>
          <h2>Property Features</h2>
          <p>Indoor and outdoor spaces, amenities, and what's included</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link
          to="/during-your-stay/how-to-guides"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <Wrench size={32} />
          </div>
          <h2>How-to Guides</h2>
          <p>Step-by-step instructions for A/C, pool, appliances, and more</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>
      </div>
    </div>
  );
}

