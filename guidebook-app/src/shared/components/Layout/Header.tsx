import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Navigation from './Navigation';
import PdfDownloadButton from '@features/pdf-export/components/PdfDownloadButton';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          {!logoError && (
            <img
              src="/images/logo/logo.png"
              alt="Hill Country Retreat"
              className={styles.logoImage}
              onError={() => setLogoError(true)}
            />
          )}
          <h1>Hill Country Retreat</h1>
        </Link>
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>
        <nav
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}
        >
          <Navigation onNavigate={() => setIsMobileMenuOpen(false)} />
        </nav>
        <div className={styles.pdfButton}>
          <PdfDownloadButton />
        </div>
      </div>
    </header>
  );
}

