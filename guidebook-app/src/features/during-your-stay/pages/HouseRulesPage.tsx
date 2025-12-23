import { useContent } from '@shared/hooks/useContent';
import { Users, Clock, Ban } from 'lucide-react';
import styles from './HouseRulesPage.module.css';

export default function HouseRulesPage() {
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

  const { houseRules } = content.duringYourStay;

  return (
    <div className={styles.container}>
      <h1>House Rules</h1>

      <section className={styles.rulesSection}>
        <h2>Property Rules</h2>
        <ul className={styles.rulesList}>
          {houseRules.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </section>

      <div className={styles.infoGrid}>
        <section className={styles.infoCard}>
          <Clock size={24} className={styles.cardIcon} />
          <h3>Quiet Hours</h3>
          <p>{houseRules.quietHours}</p>
        </section>

        <section className={styles.infoCard}>
          <Users size={24} className={styles.cardIcon} />
          <h3>Guest Capacity</h3>
          <p>Maximum {houseRules.guestCapacity} guests</p>
        </section>
      </div>

      <section className={styles.policiesSection}>
        <h2>Policies</h2>
        <div className={styles.policiesGrid}>
          <div className={styles.policyItem}>
            <Ban size={20} className={styles.policyIcon} />
            <div>
              <h3>Smoking Policy</h3>
              <p>{houseRules.smokingPolicy}</p>
            </div>
          </div>

          {houseRules.petPolicy && (
            <div className={styles.policyItem}>
              <Ban size={20} className={styles.policyIcon} />
              <div>
                <h3>Pet Policy</h3>
                <p>{houseRules.petPolicy}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {houseRules.outdoorGuidelines && houseRules.outdoorGuidelines.length > 0 && (
        <section className={styles.outdoorSection}>
          <h2>Outdoor Guidelines</h2>
          <ul className={styles.guidelinesList}>
            {houseRules.outdoorGuidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

