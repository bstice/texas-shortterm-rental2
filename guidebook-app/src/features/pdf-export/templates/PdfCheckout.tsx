import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ContentData } from '@shared/types/content';
import { renderMarkdownString } from '../utils/markdownToPdf';
import { formatChecklistByCategory } from '../utils/contentProcessor';
import { sharedStyles } from './sharedStyles';

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  categoryGroup: {
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 4,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 4,
    color: '#2a2a2a',
  },
});

interface PdfCheckoutProps {
  content: ContentData['checkout'];
}

/**
 * Checkout section component
 */
export default function PdfCheckout({ content }: PdfCheckoutProps) {
  const checklistByCategory = formatChecklistByCategory(content.checklist);
  const categoryLabels: Record<string, string> = {
    clean: 'Cleaning',
    return: 'Return Items',
    trash: 'Trash & Recycling',
    other: 'Other',
  };

  return (
    <View style={styles.section}>
      <Text style={sharedStyles.heading}>Checkout</Text>

      <Text style={sharedStyles.subheading}>Departure Notes</Text>
      
      {content.departureNotes.checkoutTime && (
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#d0021b' }}>
          Checkout Time: {content.departureNotes.checkoutTime}
        </Text>
      )}

      {content.departureNotes.keyLockInstructions && (
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Key/Lock Instructions:</Text>
          {renderMarkdownString(content.departureNotes.keyLockInstructions)}
        </View>
      )}

      {content.departureNotes.reminders && content.departureNotes.reminders.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Reminders:</Text>
          {content.departureNotes.reminders.map((reminder, index) => (
            <View key={`reminder-${index}`} style={{ marginBottom: 4 }}>
              {renderMarkdownString(reminder)}
            </View>
          ))}
        </View>
      )}

      {content.departureNotes.contactInfo && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.subheading}>Contact Information</Text>
          {content.departureNotes.contactInfo.phone && (
            <Text style={sharedStyles.text}>
              <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
              {content.departureNotes.contactInfo.phone}
            </Text>
          )}
          {content.departureNotes.contactInfo.email && (
            <Text style={sharedStyles.text}>
              <Text style={{ fontWeight: 'bold' }}>Email: </Text>
              {content.departureNotes.contactInfo.email}
            </Text>
          )}
          {content.departureNotes.contactInfo.emergency && (
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#d0021b' }}>
              Emergency: {content.departureNotes.contactInfo.emergency}
            </Text>
          )}
        </View>
      )}

      {content.checklist && content.checklist.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.subheading}>Checklist</Text>
          
          {Object.entries(checklistByCategory).map(([category, items]) => (
            <View key={category} style={styles.categoryGroup}>
              <Text style={styles.categoryLabel}>
                {categoryLabels[category] || category}
              </Text>
              {items.map((item) => (
                <Text key={item.id} style={sharedStyles.listItem}>
                  ☐ {item.text}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

