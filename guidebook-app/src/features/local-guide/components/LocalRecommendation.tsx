import type { LocalRecommendation as LocalRecommendationType } from '@shared/types/content';
import { ExternalLink, Facebook, Instagram, Twitter, Star } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './LocalRecommendation.module.css';

interface LocalRecommendationProps {
  recommendation: LocalRecommendationType;
}

export default function LocalRecommendation({
  recommendation,
}: LocalRecommendationProps) {
  return (
    <div className={styles.card}>
      {recommendation.image && (
        <div className={styles.imageContainer}>
          <img
            src={recommendation.image}
            alt={recommendation.imageAlt || recommendation.name}
            className={styles.image}
            loading="lazy"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className={styles.cardContent}>
        <h3>{recommendation.name}</h3>
        <Markdown content={recommendation.description} />
        <div className={styles.details}>
          {recommendation.distance && (
            <span className={styles.detail}>
              <strong>Distance:</strong> {recommendation.distance}
            </span>
          )}
          {recommendation.priceRange && (
            <span className={styles.detail}>
              <strong>Price:</strong> {recommendation.priceRange}
            </span>
          )}
          {recommendation.address && (
            <span className={styles.detail}>
              <strong>Address:</strong> {recommendation.address}
            </span>
          )}
          {recommendation.phone && (
            <span className={styles.detail}>
              <strong>Phone:</strong>{' '}
              <a href={`tel:${recommendation.phone}`} className={styles.phoneLink}>
                {recommendation.phone}
              </a>
            </span>
          )}
          {recommendation.website && (
            <a
              href={recommendation.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.websiteLink}
              aria-label={`Visit ${recommendation.name} website (opens in new tab)`}
            >
              <ExternalLink size={16} className={styles.externalIcon} />
              Visit Website
            </a>
          )}
          {recommendation.social && (
            <div className={styles.socialLinks}>
              {recommendation.social.facebook && (
                <a
                  href={recommendation.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visit ${recommendation.name} on Facebook (opens in new tab)`}
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {recommendation.social.instagram && (
                <a
                  href={recommendation.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visit ${recommendation.name} on Instagram (opens in new tab)`}
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {recommendation.social.twitter && (
                <a
                  href={recommendation.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visit ${recommendation.name} on Twitter/X (opens in new tab)`}
                  title="Twitter/X"
                >
                  <Twitter size={18} />
                </a>
              )}
              {recommendation.social.yelp && (
                <a
                  href={recommendation.social.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visit ${recommendation.name} on Yelp (opens in new tab)`}
                  title="Yelp"
                >
                  <Star size={18} />
                </a>
              )}
              {recommendation.social.tripadvisor && (
                <a
                  href={recommendation.social.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visit ${recommendation.name} on TripAdvisor (opens in new tab)`}
                  title="TripAdvisor"
                >
                  <Star size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

