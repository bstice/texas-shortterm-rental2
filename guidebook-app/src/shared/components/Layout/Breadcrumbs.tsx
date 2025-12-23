import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbMap: Record<string, string> = {
    'before-you-arrive': 'Before You Arrive',
    'address-parking': 'Address & Parking',
    'check-in': 'Check-in Instructions',
    'smart-lock': 'Smart Lock Code',
    'during-your-stay': 'During Your Stay',
    'wifi-tech': 'Wi-Fi & Tech',
    'house-rules': 'House Rules',
    'property-features': 'Property Features',
    'indoor-spaces': 'Indoor Spaces',
    'outdoor-spaces': 'Outdoor Spaces',
    'whats-included': "What's Included",
    sunsets: 'Hill Country Sunsets',
    'how-to-guides': 'How-to Guides',
    'ac-heating': 'A/C & Heating',
    pool: 'Pool',
    'hot-tub': 'Hot Tub',
    'tv-streaming': 'TV & Streaming',
    appliances: 'Appliances',
    limo: 'Limo',
    'local-guide': 'Local Guide',
    'restaurants-coffee': 'Restaurants & Coffee',
    groceries: 'Groceries',
    'outdoor-activities': 'Outdoor Activities',
    'hiking-trails': 'Hiking & Trails',
    'hill-country': 'Hill Country Attractions',
    'parks-nature': 'Parks & Nature',
    'austin-attractions': 'Austin Attractions',
    downtown: 'Downtown Austin',
    'local-spots': 'Local Spots',
    transportation: 'Transportation',
    checkout: 'Checkout',
    checklist: 'Checklist',
    'departure-notes': 'Departure Notes',
  };

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        <li>
          <Link to="/" className={styles.breadcrumbLink}>
            <Home size={16} aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbMap[name] || name;

          return (
            <li key={routeTo} className={styles.breadcrumbItem}>
              <ChevronRight size={16} className={styles.separator} aria-hidden="true" />
              {isLast ? (
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  {displayName}
                </span>
              ) : (
                <Link to={routeTo} className={styles.breadcrumbLink}>
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

