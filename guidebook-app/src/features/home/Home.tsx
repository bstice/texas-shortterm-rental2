import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          {!imageError ? (
            <img
              src="/images/hero/hero.png"
              alt="Property entrance with driveway and gate at twilight"
              className={styles.heroImage}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.heroImagePlaceholder}>
              <div className={styles.placeholderContent}>
                <p>Property Image</p>
              </div>
            </div>
          )}
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Welcome to Your Hill Country Retreat</h1>
            <p className={styles.heroSubtitle}>
              9926 Ledgestone Ter, Austin, TX 78737
            </p>
            <p className={styles.heroDescription}>
              Your complete guide to making the most of your stay at this beautiful
              8.4-acre property in the heart of Texas Hill Country.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.quickLinks}>
        <h2 className={styles.sectionTitle}>Quick Links</h2>
        <div className={styles.linksGrid}>
          <Link to="/before-you-arrive" className={styles.quickLink}>
            <h3>Before You Arrive</h3>
            <p>Address, parking, and check-in instructions</p>
            <ArrowRight className={styles.linkIcon} />
          </Link>
          <Link to="/during-your-stay" className={styles.quickLink}>
            <h3>During Your Stay</h3>
            <p>Wi-Fi, house rules, and property features</p>
            <ArrowRight className={styles.linkIcon} />
          </Link>
          <Link to="/local-guide" className={styles.quickLink}>
            <h3>Local Guide</h3>
            <p>Restaurants, activities, and attractions</p>
            <ArrowRight className={styles.linkIcon} />
          </Link>
          <Link to="/checkout" className={styles.quickLink}>
            <h3>Checkout</h3>
            <p>Checklist and departure instructions</p>
            <ArrowRight className={styles.linkIcon} />
          </Link>
        </div>
      </section>
    </div>
  );
}

