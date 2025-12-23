import { useContent } from '@shared/hooks/useContent';
import { ShoppingCart } from 'lucide-react';
import LocalRecommendation from '../components/LocalRecommendation';
import styles from './GroceriesPage.module.css';

export default function GroceriesPage() {
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

  const groceries = content.localGuide.groceries;

  return (
    <div className={styles.container}>
      <h1>
        <ShoppingCart size={32} className={styles.icon} />
        Groceries
      </h1>

      <div className={styles.grid}>
        {groceries.map((store, index) => (
          <LocalRecommendation key={index} recommendation={store} />
        ))}
      </div>
    </div>
  );
}

