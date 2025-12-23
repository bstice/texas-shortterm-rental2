import { useContent } from '@shared/hooks/useContent';
import { useParams } from 'react-router-dom';
import { Mountain, MapPin, Trees } from 'lucide-react';
import LocalRecommendation from '../components/LocalRecommendation';
import styles from './OutdoorActivitiesPage.module.css';

export default function OutdoorActivitiesPage() {
  const { activityType } = useParams<{ activityType: string }>();
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

  const { outdoorActivities } = content.localGuide;
  let activities: typeof outdoorActivities.hiking = [];
  let title = 'Outdoor Activities';
  let icon = <Mountain size={32} />;

  if (activityType === 'hiking-trails') {
    activities = outdoorActivities.hiking;
    title = 'Hiking & Trails';
    icon = <Mountain size={32} />;
  } else if (activityType === 'hill-country') {
    activities = outdoorActivities.hillCountry;
    title = 'Hill Country Attractions';
    icon = <MapPin size={32} />;
  } else if (activityType === 'parks-nature') {
    activities = outdoorActivities.parks;
    title = 'Parks & Nature';
    icon = <Trees size={32} />;
  }

  return (
    <div className={styles.container}>
      <h1>
        <span className={styles.icon}>{icon}</span>
        {title}
      </h1>

      <div className={styles.grid}>
        {activities.map((activity, index) => (
          <LocalRecommendation key={index} recommendation={activity} />
        ))}
      </div>
    </div>
  );
}

