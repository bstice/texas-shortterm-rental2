import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { PropertyInfo } from '@shared/types/content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    color: '#4a4a4a',
    lineHeight: 1.6,
  },
  subtitleSecondary: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
    lineHeight: 1.5,
  },
  details: {
    marginTop: 50,
    fontSize: 13,
    lineHeight: 2,
    width: '100%',
    maxWidth: 400,
  },
  detailRow: {
    marginBottom: 10,
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    color: '#2a2a2a',
  },
  date: {
    marginTop: 60,
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

interface PdfCoverProps {
  property: PropertyInfo;
}

/**
 * PDF cover page component
 */
export default function PdfCover({ property }: PdfCoverProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest Guidebook</Text>
      <Text style={styles.subtitle}>{property.address}</Text>
      <Text style={styles.subtitleSecondary}>
        {property.city}, {property.state} {property.zip}
      </Text>

      <View style={styles.details}>
        <Text style={styles.detailRow}>
          <Text style={styles.label}>Bedrooms: </Text>
          {property.size.bedrooms}
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.label}>Bathrooms: </Text>
          {property.size.bathrooms}
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.label}>Square Feet: </Text>
          {property.size.squareFeet.toLocaleString()}
        </Text>
        <Text style={styles.detailRow}>
          <Text style={styles.label}>Acres: </Text>
          {property.size.acres}
        </Text>
      </View>

      <Text style={styles.date}>
        Generated on {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
    </View>
  );
}

