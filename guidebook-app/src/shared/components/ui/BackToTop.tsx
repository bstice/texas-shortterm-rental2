import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './BackToTop.module.css';

/**
 * Back-to-top button component
 * 
 * Appears when user scrolls down and smoothly scrolls to top when clicked
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={styles.button}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}

