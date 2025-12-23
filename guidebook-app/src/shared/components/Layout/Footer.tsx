import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.footerNav}>
          <Link to="/">Home</Link>
          <Link to="/before-you-arrive">Before You Arrive</Link>
          <Link to="/during-your-stay">During Your Stay</Link>
          <Link to="/local-guide">Local Guide</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
        <div className={styles.footerInfo}>
          <p className={styles.copyright}>
            © {currentYear} Hill Country Retreat. All rights reserved.
          </p>
          <p className={styles.propertyInfo}>
            9926 Ledgestone Ter, Austin, TX 78737
          </p>
        </div>
      </div>
    </footer>
  );
}

