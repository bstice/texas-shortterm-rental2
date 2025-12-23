import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ContentData } from '@shared/types/content';
import { renderMarkdownString } from '../utils/markdownToPdf';
import { sharedStyles } from './sharedStyles';

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  codeBox: {
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 12,
    borderLeft: '4 solid #ff9800',
  },
});

interface PdfBeforeYouArriveProps {
  content: ContentData['beforeYouArrive'];
}

/**
 * Before You Arrive section component
 */
export default function PdfBeforeYouArrive({ content }: PdfBeforeYouArriveProps) {
  return (
    <View style={styles.section}>
      <Text style={sharedStyles.heading}>Before You Arrive</Text>

      <Text style={sharedStyles.subheading}>Address & Parking</Text>
      <Text style={sharedStyles.text}>{content.addressParking.address}</Text>
      
      {content.addressParking.parking && content.addressParking.parking.length > 0 && (
        <View style={sharedStyles.listContainer}>
          {content.addressParking.parking.map((item, index) => (
            <View key={`parking-${index}`} style={sharedStyles.spacingSmall}>
              {renderMarkdownString(item)}
            </View>
          ))}
        </View>
      )}

      {content.addressParking.map && (
        <Text style={sharedStyles.text}>
          <Text style={sharedStyles.label}>Map: </Text>
          {content.addressParking.map}
        </Text>
      )}

      {content.addressParking.directions && (
        <View style={sharedStyles.spacingMedium}>
          <Text style={sharedStyles.subheading}>Directions</Text>
          {renderMarkdownString(content.addressParking.directions)}
        </View>
      )}

      <View style={sharedStyles.divider} />

      <Text style={sharedStyles.subheading}>Check-in Instructions</Text>
      {content.checkIn.steps && content.checkIn.steps.length > 0 && (
        <View style={sharedStyles.listContainer}>
          {content.checkIn.steps.map((step, index) => (
            <View key={`checkin-step-${index}`} style={sharedStyles.spacingSmall}>
              {renderMarkdownString(step)}
            </View>
          ))}
        </View>
      )}

      {content.checkIn.keyCollection && (
        <View style={sharedStyles.spacingMedium}>
          <Text style={sharedStyles.subheading}>Key Collection</Text>
          {renderMarkdownString(content.checkIn.keyCollection)}
        </View>
      )}

      {content.checkIn.arrivalExpectations && (
        <View style={sharedStyles.spacingMedium}>
          <Text style={sharedStyles.subheading}>Arrival Expectations</Text>
          {renderMarkdownString(content.checkIn.arrivalExpectations)}
        </View>
      )}

      <View style={sharedStyles.divider} />

      <Text style={sharedStyles.subheading}>Smart Lock</Text>
      <View style={styles.codeBox}>
        <Text style={sharedStyles.highlight}>
          Code: {content.smartLock.code}
        </Text>
      </View>
      {content.smartLock.instructions && (
        <View style={sharedStyles.spacingMedium}>
          {renderMarkdownString(content.smartLock.instructions)}
        </View>
      )}

      {content.smartLock.troubleshooting && content.smartLock.troubleshooting.length > 0 && (
        <View style={sharedStyles.spacingTop}>
          <Text style={sharedStyles.subheading}>Troubleshooting</Text>
          <View style={sharedStyles.listContainer}>
            {content.smartLock.troubleshooting.map((item, index) => (
              <View key={`smartlock-troubleshooting-${index}`} style={sharedStyles.spacingSmall}>
                {renderMarkdownString(item)}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

