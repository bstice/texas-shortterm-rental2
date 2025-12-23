import { Link } from 'react-router-dom';
import { MapPin, Key, ArrowRight, Home } from 'lucide-react';
import { useContent } from '@shared/hooks/useContent';
import styles from './BeforeYouArrivePage.module.css';

export default function BeforeYouArrivePage() {
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

  const { property } = content;

  return (
    <div className={styles.container}>
      <h1>Before You Arrive</h1>
      <p className={styles.subtitle}>
        Everything you need to know to prepare for your stay at{' '}
        {property.address}
      </p>

      <div className={styles.cardsGrid}>
        <Link to="/before-you-arrive/address-parking" className={styles.card}>
          <div className={styles.cardIcon}>
            <MapPin size={32} />
          </div>
          <h2>Address & Parking</h2>
          <p>Property address, parking instructions, and directions</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link to="/before-you-arrive/check-in" className={styles.card}>
          <div className={styles.cardIcon}>
            <Home size={32} />
          </div>
          <h2>Check-in Instructions</h2>
          <p>Step-by-step check-in process and what to expect</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link to="/before-you-arrive/smart-lock" className={styles.card}>
          <div className={styles.cardIcon}>
            <Key size={32} />
          </div>
          <h2>Smart Lock Code</h2>
          <p>Access code and instructions for the smart lock</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>
      </div>

      <section className={styles.propertyInfo}>
        <h2>Property Overview</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <strong>Address:</strong>
            <span>
              {property.address}, {property.city}, {property.state}{' '}
              {property.zip}
            </span>
          </div>
          <div className={styles.infoItem}>
            <strong>Size:</strong>
            <span>
              {property.size.bedrooms} bedrooms, {property.size.bathrooms}{' '}
              bathrooms, {property.size.squareFeet.toLocaleString()} sqft
            </span>
          </div>
          <div className={styles.infoItem}>
            <strong>Property:</strong>
            <span>{property.size.acres} acres</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Location:</strong>
            <span>{property.location.distanceToDowntown} from downtown</span>
          </div>
        </div>
      </section>
    </div>
  );
}

