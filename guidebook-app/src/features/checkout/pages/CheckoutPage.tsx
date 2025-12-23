import { Link } from 'react-router-dom';
import { CheckSquare, FileText, ArrowRight } from 'lucide-react';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      <p className={styles.subtitle}>
        Everything you need to know for a smooth checkout
      </p>

      <div className={styles.cardsGrid}>
        <Link to="/checkout/checklist" className={styles.card}>
          <div className={styles.cardIcon}>
            <CheckSquare size={32} />
          </div>
          <h2>Checklist</h2>
          <p>Interactive checklist to ensure you've completed everything</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>

        <Link to="/checkout/departure-notes" className={styles.card}>
          <div className={styles.cardIcon}>
            <FileText size={32} />
          </div>
          <h2>Departure Notes</h2>
          <p>Checkout time, key instructions, and contact information</p>
          <ArrowRight className={styles.arrow} size={20} />
        </Link>
      </div>
    </div>
  );
}

