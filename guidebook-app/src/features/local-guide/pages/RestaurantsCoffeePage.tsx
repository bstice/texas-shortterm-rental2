import { useContent } from '@shared/hooks/useContent';
import { UtensilsCrossed, Coffee } from 'lucide-react';
import LocalRecommendation from '../components/LocalRecommendation';
import styles from './RestaurantsCoffeePage.module.css';

export default function RestaurantsCoffeePage() {
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

  const restaurants = content.localGuide.restaurants;
  const coffee = content.localGuide.coffee;

  return (
    <div className={styles.container}>
      <h1>Restaurants & Coffee</h1>

      {restaurants.length > 0 && (
        <section className={styles.section}>
          <h2>
            <UtensilsCrossed size={24} className={styles.icon} />
            Restaurants
          </h2>
          <div className={styles.grid}>
            {restaurants.map((restaurant, index) => (
              <LocalRecommendation key={index} recommendation={restaurant} />
            ))}
          </div>
        </section>
      )}

      {coffee.length > 0 && (
        <section className={styles.section}>
          <h2>
            <Coffee size={24} className={styles.icon} />
            Coffee Shops
          </h2>
          <div className={styles.grid}>
            {coffee.map((shop, index) => (
              <LocalRecommendation key={index} recommendation={shop} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

