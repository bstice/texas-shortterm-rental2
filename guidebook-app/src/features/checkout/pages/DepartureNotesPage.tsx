import { useContent } from '@shared/hooks/useContent';
import { Clock, Lock, Phone, Mail, AlertCircle } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './DepartureNotesPage.module.css';

export default function DepartureNotesPage() {
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

  const { departureNotes } = content.checkout;

  return (
    <div className={styles.container}>
      <h1>Departure Notes</h1>

      <section className={styles.checkoutTimeSection}>
        <h2>
          <Clock size={24} className={styles.icon} />
          Checkout Time
        </h2>
        <p className={styles.checkoutTime}>{departureNotes.checkoutTime}</p>
      </section>

      <section className={styles.lockSection}>
        <h2>
          <Lock size={24} className={styles.icon} />
          Key & Lock Instructions
        </h2>
        <Markdown content={departureNotes.keyLockInstructions} />
      </section>

      <section className={styles.remindersSection}>
        <h2>Reminders</h2>
        <ul className={styles.remindersList}>
          {departureNotes.reminders.map((reminder, index) => (
            <li key={index}>{reminder}</li>
          ))}
        </ul>
      </section>

      <section className={styles.contactSection}>
        <h2>
          <AlertCircle size={24} className={styles.icon} />
          Contact Information
        </h2>
        <div className={styles.contactInfo}>
          {departureNotes.contactInfo.phone && (
            <div className={styles.contactItem}>
              <Phone size={20} className={styles.contactIcon} />
              <div>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${departureNotes.contactInfo.phone}`}>
                  {departureNotes.contactInfo.phone}
                </a>
              </div>
            </div>
          )}
          {departureNotes.contactInfo.email && (
            <div className={styles.contactItem}>
              <Mail size={20} className={styles.contactIcon} />
              <div>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${departureNotes.contactInfo.email}`}>
                  {departureNotes.contactInfo.email}
                </a>
              </div>
            </div>
          )}
          {departureNotes.contactInfo.emergency && (
            <div className={styles.contactItem}>
              <AlertCircle size={20} className={styles.contactIcon} />
              <div>
                <strong>Emergency:</strong>{' '}
                <a href={`tel:${departureNotes.contactInfo.emergency}`}>
                  {departureNotes.contactInfo.emergency}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

