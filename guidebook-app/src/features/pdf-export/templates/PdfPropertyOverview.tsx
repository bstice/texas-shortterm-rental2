import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { PropertyInfo } from '@shared/types/content';
import { sharedStyles } from './sharedStyles';

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    borderLeft: '3 solid #4a90e2',
  },
});

interface PdfPropertyOverviewProps {
  property: PropertyInfo;
}

/**
 * Property overview section component
 */
export default function PdfPropertyOverview({ property }: PdfPropertyOverviewProps) {
  return (
    <View style={styles.section}>
      <Text style={sharedStyles.heading}>Property Overview</Text>

      <View style={styles.infoBox}>
        <Text style={sharedStyles.subheading}>Address</Text>
        <Text style={sharedStyles.text}>
          {property.address}
        </Text>
        <Text style={sharedStyles.text}>
          {property.city}, {property.state} {property.zip}
        </Text>
      </View>

      <Text style={sharedStyles.subheading}>Location</Text>
      <Text style={sharedStyles.text}>
        {property.location.distanceToDowntown} from downtown Austin
      </Text>
      <Text style={sharedStyles.text}>
        Approximately {property.location.minutes} minutes away
      </Text>

      <Text style={sharedStyles.subheading}>Property Details</Text>
      <View style={sharedStyles.listContainer}>
        <Text style={sharedStyles.listItem}>
          • {property.size.bedrooms} bedrooms, {property.size.bathrooms} bathrooms
        </Text>
        <Text style={sharedStyles.listItem}>
          • {property.size.squareFeet.toLocaleString()} square feet
        </Text>
        <Text style={sharedStyles.listItem}>
          • {property.size.acres} acres
        </Text>
      </View>
    </View>
  );
}

