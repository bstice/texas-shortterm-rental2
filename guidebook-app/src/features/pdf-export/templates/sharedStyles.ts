import { StyleSheet } from '@react-pdf/renderer';

/**
 * Shared styles for PDF document components
 * 
 * Provides consistent styling across all PDF sections with:
 * - Improved typography and readability
 * - Better visual hierarchy
 * - Optimized spacing for screen and print
 */
export const sharedStyles = StyleSheet.create({
  // Section container
  section: {
    marginBottom: 24,
  },

  // Typography - Headings
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#2a2a2a',
    letterSpacing: 0.3,
  },
  subsubheading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    color: '#3a3a3a',
  },

  // Typography - Body text
  text: {
    fontSize: 11,
    lineHeight: 1.7,
    marginBottom: 10,
    color: '#333',
  },
  textSmall: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 8,
    color: '#444',
  },
  textLarge: {
    fontSize: 12,
    lineHeight: 1.8,
    marginBottom: 12,
    color: '#2a2a2a',
  },

  // Lists
  listItem: {
    fontSize: 11,
    lineHeight: 1.7,
    marginBottom: 6,
    paddingLeft: 16,
    color: '#333',
  },
  listItemTight: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 4,
    paddingLeft: 16,
    color: '#333',
  },
  listContainer: {
    marginBottom: 12,
    marginTop: 4,
  },

  // Special text styles
  highlight: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#c62828',
    marginTop: 10,
    marginBottom: 6,
    backgroundColor: '#fff3e0',
    padding: 8,
    borderRadius: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#2a2a2a',
  },
  meta: {
    fontSize: 10,
    color: '#666',
    marginBottom: 6,
  },

  // Spacing utilities
  spacingSmall: {
    marginBottom: 8,
  },
  spacingMedium: {
    marginBottom: 12,
  },
  spacingLarge: {
    marginBottom: 16,
  },
  spacingTop: {
    marginTop: 12,
  },
  spacingTopLarge: {
    marginTop: 20,
  },

  // Containers
  container: {
    marginBottom: 16,
  },
  containerTight: {
    marginBottom: 10,
  },
  containerLoose: {
    marginBottom: 20,
  },

  // Borders and dividers
  divider: {
    borderBottom: '1 solid #e0e0e0',
    marginTop: 12,
    marginBottom: 12,
  },
  dividerThick: {
    borderBottom: '2 solid #d0d0d0',
    marginTop: 16,
    marginBottom: 16,
  },
});

