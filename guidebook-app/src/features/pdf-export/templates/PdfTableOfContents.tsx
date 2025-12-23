import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { SectionHeading } from '../types/pdf';

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 12,
    textAlign: 'center',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  tocItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: '1 solid #eee',
    alignItems: 'flex-end',
  },
  tocTitle: {
    fontSize: 12,
    color: '#333',
    flexGrow: 1,
    marginRight: 8,
  },
  tocDots: {
    fontSize: 8,
    color: '#999',
    flexShrink: 0,
    minWidth: 60,
    textAlign: 'left',
  },
  tocPage: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'normal',
    width: 25,
    textAlign: 'right',
    flexShrink: 0,
    marginLeft: 8,
  },
  note: {
    fontSize: 9,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 16,
    textAlign: 'center',
  },
});

interface PdfTableOfContentsProps {
  sections: SectionHeading[];
}

/**
 * Table of Contents component for PDF
 * 
 * Displays all major sections with approximate page numbers
 */
export default function PdfTableOfContents({ sections }: PdfTableOfContentsProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Table of Contents</Text>
      
      {sections.map((section, index) => (
        <View key={`toc-${index}`} style={styles.tocItem}>
          <Text style={styles.tocTitle}>{section.title}</Text>
          <Text style={styles.tocDots}>
            {'· '.repeat(15)}
          </Text>
          <Text style={styles.tocPage}>
            {section.page !== undefined ? section.page : index + 3}
          </Text>
        </View>
      ))}
      
      <Text style={styles.note}>
        Page numbers are approximate
      </Text>
    </View>
  );
}

