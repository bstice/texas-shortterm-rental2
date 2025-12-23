import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import type { ContentData } from '@shared/types/content';
import PdfCover from './PdfCover';
import PdfTableOfContents from './PdfTableOfContents';
import PdfPropertyOverview from './PdfPropertyOverview';
import PdfBeforeYouArrive from './PdfBeforeYouArrive';
import PdfDuringYourStay from './PdfDuringYourStay';
import PdfLocalGuide from './PdfLocalGuide';
import PdfCheckout from './PdfCheckout';
import { extractSectionHeadings } from '../utils/contentProcessor';

/**
 * Global styles for PDF document
 * 
 * Optimized for both screen viewing and printing
 */
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.7,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
    fontFamily: 'Helvetica',
  },
});

interface PdfDocumentProps {
  content: ContentData;
}

/**
 * Main PDF document component
 * 
 * Wraps all PDF sections in a Document component
 */
export default function PdfDocument({ content }: PdfDocumentProps) {
  // Extract section headings for table of contents
  const sections = extractSectionHeadings(content);
  
  // Approximate page numbers based on typical content lengths
  // Cover = page 1, TOC = page 2, then sections start at page 3
  const pageEstimates = [3, 4, 5, 7, 9]; // Approximate pages for each section
  const sectionsWithPages = sections.map((section, index) => ({
    ...section,
    page: pageEstimates[index] || index + 3,
  }));

  // Safely get document title with fallback
  const documentTitle = content?.property?.address 
    ? `Guest Guidebook - ${content.property.address}` 
    : 'Guest Guidebook';

  return (
    <Document
      title={documentTitle}
      author="Texas Short-Term Rental"
      subject="Guest Guidebook"
      keywords="guest guidebook, vacation rental, property information"
      language="en-US"
    >
      {/* Cover Page */}
      <Page size="LETTER" style={styles.page}>
        <PdfCover property={content.property} />
      </Page>

      {/* Table of Contents */}
      <Page size="LETTER" style={styles.page} break>
        <PdfTableOfContents sections={sectionsWithPages} />
      </Page>

      {/* Property Overview */}
      <Page size="LETTER" style={styles.page} break>
        <PdfPropertyOverview property={content.property} />
      </Page>

      {/* Before You Arrive */}
      <Page size="LETTER" style={styles.page} break>
        <PdfBeforeYouArrive content={content.beforeYouArrive} />
      </Page>

      {/* During Your Stay */}
      <Page size="LETTER" style={styles.page} break>
        <PdfDuringYourStay content={content.duringYourStay} />
      </Page>

      {/* Local Guide */}
      <Page size="LETTER" style={styles.page} break>
        <PdfLocalGuide content={content.localGuide} />
      </Page>

      {/* Checkout */}
      <Page size="LETTER" style={styles.page} break>
        <PdfCheckout content={content.checkout} />
      </Page>
    </Document>
  );
}

