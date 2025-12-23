import { View, Text, StyleSheet, Image, Link } from '@react-pdf/renderer';
import type { ContentData } from '@shared/types/content';
import { renderMarkdownString } from '../utils/markdownToPdf';
import { getImageAltText } from '../utils/imageHandler';
import { formatLocalRecommendation } from '../utils/contentProcessor';
import { sharedStyles } from './sharedStyles';

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  recommendation: {
    marginBottom: 18,
    paddingBottom: 14,
    borderBottom: '1 solid #e0e0e0',
  },
  recommendationName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1a1a1a',
  },
  recommendationMeta: {
    fontSize: 10,
    color: '#666',
    marginBottom: 6,
  },
  recommendationImage: {
    width: 160,
    height: 110,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
});

interface PdfLocalGuideProps {
  content: ContentData['localGuide'];
}

/**
 * Local Guide section component
 */
export default function PdfLocalGuide({ content }: PdfLocalGuideProps) {
  const renderRecommendation = (rec: typeof content.restaurants[0], index: number, prefix: string) => {
    const formatted = formatLocalRecommendation(rec);
    
    return (
      <View key={`${prefix}-${index}`} style={styles.recommendation}>
        <Text style={styles.recommendationName}>{formatted.name}</Text>
        
        {(formatted.distance || formatted.priceRange) && (
          <Text style={styles.recommendationMeta}>
            {formatted.distance && `${formatted.distance} `}
            {formatted.priceRange && `• ${formatted.priceRange}`}
          </Text>
        )}

        {formatted.description && (
          <View style={{ marginBottom: 6 }}>
            {renderMarkdownString(formatted.description)}
          </View>
        )}

        {formatted.address && (
          <Text style={sharedStyles.text}>
            <Text style={sharedStyles.label}>Address: </Text>
            {formatted.address}
          </Text>
        )}

        {formatted.phone && (
          <Text style={sharedStyles.text}>
            <Text style={sharedStyles.label}>Phone: </Text>
            {formatted.phone}
          </Text>
        )}

        {formatted.website && (
          <Link src={formatted.website} style={{ color: '#0066cc', fontSize: 11 }}>
            Website
          </Link>
        )}

        {formatted.social && (
          <View style={{ marginTop: 4 }}>
            {formatted.social.facebook && (
              <Link src={formatted.social.facebook} style={{ color: '#0066cc', fontSize: 10, marginRight: 8 }}>
                Facebook
              </Link>
            )}
            {formatted.social.instagram && (
              <Link src={formatted.social.instagram} style={{ color: '#0066cc', fontSize: 10, marginRight: 8 }}>
                Instagram
              </Link>
            )}
            {formatted.social.twitter && (
              <Link src={formatted.social.twitter} style={{ color: '#0066cc', fontSize: 10, marginRight: 8 }}>
                Twitter
              </Link>
            )}
            {formatted.social.yelp && (
              <Link src={formatted.social.yelp} style={{ color: '#0066cc', fontSize: 10, marginRight: 8 }}>
                Yelp
              </Link>
            )}
            {formatted.social.tripadvisor && (
              <Link src={formatted.social.tripadvisor} style={{ color: '#0066cc', fontSize: 10 }}>
                TripAdvisor
              </Link>
            )}
          </View>
        )}

        {formatted.image && (
          <View style={{ marginTop: 8, marginBottom: 8 }}>
            {/* Only render image if it's a valid base64 data URL or URL */}
            {formatted.image.startsWith('data:') || formatted.image.startsWith('http') ? (
              <Image
                src={formatted.image}
                style={styles.recommendationImage}
              />
            ) : (
              // Fallback: show placeholder text if image failed to load
              <View style={{
                width: 160,
                height: 110,
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                border: '1 solid #e0e0e0',
              }}>
                <Text style={{ fontSize: 9, color: '#999', textAlign: 'center' }}>
                  Image unavailable: {getImageAltText(rec)}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={sharedStyles.heading}>Local Guide</Text>

      {content.restaurants && content.restaurants.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <Text style={sharedStyles.subheading}>Restaurants</Text>
          {content.restaurants.map((rec, index) => renderRecommendation(rec, index, 'restaurant'))}
        </View>
      )}

      {content.coffee && content.coffee.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <Text style={sharedStyles.subheading}>Coffee Shops</Text>
          {content.coffee.map((rec, index) => renderRecommendation(rec, index, 'coffee'))}
        </View>
      )}

      {content.groceries && content.groceries.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <Text style={sharedStyles.subheading}>Grocery Stores</Text>
          {content.groceries.map((rec, index) => renderRecommendation(rec, index, 'grocery'))}
        </View>
      )}

      {content.outdoorActivities && (
        <View style={{ marginBottom: 16 }}>
          <Text style={sharedStyles.subheading}>Outdoor Activities</Text>
          
          {content.outdoorActivities.hiking && content.outdoorActivities.hiking.length > 0 && (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Hiking & Trails</Text>
              {content.outdoorActivities.hiking.map((rec, index) => renderRecommendation(rec, index, 'hiking'))}
            </View>
          )}

          {content.outdoorActivities.hillCountry && content.outdoorActivities.hillCountry.length > 0 && (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Hill Country Attractions</Text>
              {content.outdoorActivities.hillCountry.map((rec, index) => renderRecommendation(rec, index, 'hillcountry'))}
            </View>
          )}

          {content.outdoorActivities.parks && content.outdoorActivities.parks.length > 0 && (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Parks & Nature</Text>
              {content.outdoorActivities.parks.map((rec, index) => renderRecommendation(rec, index, 'parks'))}
            </View>
          )}
        </View>
      )}

      {content.austinAttractions && (
        <View style={{ marginBottom: 16 }}>
          <Text style={sharedStyles.subheading}>Austin Attractions</Text>
          
          {content.austinAttractions.downtown && content.austinAttractions.downtown.length > 0 && (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Downtown Austin</Text>
              {content.austinAttractions.downtown.map((rec, index) => renderRecommendation(rec, index, 'downtown'))}
            </View>
          )}

          {content.austinAttractions.localSpots && content.austinAttractions.localSpots.length > 0 && (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Local Spots</Text>
              {content.austinAttractions.localSpots.map((rec, index) => renderRecommendation(rec, index, 'localspots'))}
            </View>
          )}
        </View>
      )}

      {content.transportation && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.subheading}>Transportation</Text>
          
          {content.transportation.driving && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Driving</Text>
              {renderMarkdownString(content.transportation.driving)}
            </View>
          )}

          {content.transportation.rideSharing && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Ride Sharing</Text>
              {renderMarkdownString(content.transportation.rideSharing)}
            </View>
          )}

          {content.transportation.parking && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Parking</Text>
              {renderMarkdownString(content.transportation.parking)}
            </View>
          )}

          {content.transportation.carRental && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Car Rental</Text>
              {renderMarkdownString(content.transportation.carRental)}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

