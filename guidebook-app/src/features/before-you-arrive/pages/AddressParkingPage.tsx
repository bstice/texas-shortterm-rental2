import { useContent } from '@shared/hooks/useContent';
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard';
import { Copy, Check } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './AddressParkingPage.module.css';

export default function AddressParkingPage() {
  const { content, loading, error } = useContent();
  const { copy, copied } = useCopyToClipboard();

  const handleCopyAddress = () => {
    if (!content) return;
    copy(content.beforeYouArrive.addressParking.address);
  };

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

  const { addressParking } = content.beforeYouArrive;

  return (
    <div className={styles.container}>
      <h1>Address & Parking</h1>
      
      <section className={styles.addressSection}>
        <h2>Property Address</h2>
        <div className={styles.addressBox}>
          <p className={styles.address}>{addressParking.address}</p>
          <button
            onClick={handleCopyAddress}
            className={styles.copyButton}
            aria-label="Copy address to clipboard"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </section>

      <section className={styles.parkingSection}>
        <h2>Parking Information</h2>
        <ul className={styles.parkingList}>
          {addressParking.parking.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.directionsSection}>
        <h2>Directions</h2>
        <Markdown content={addressParking.directions} />
      </section>
    </div>
  );
}

