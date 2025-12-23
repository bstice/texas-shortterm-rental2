import type {
  ContentData,
  ChecklistItem,
  LocalRecommendation,
} from '@shared/types/content';
import type {
  FormattedRecommendation,
  SectionHeading,
} from '../types/pdf';

/**
 * Groups checklist items by category
 * 
 * @param checklist - Array of checklist items
 * @returns Checklist items grouped by category
 */
export function formatChecklistByCategory(
  checklist: ChecklistItem[]
): Record<string, ChecklistItem[]> {
  return checklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );
}

/**
 * Formats a local recommendation with all fields for PDF display
 * 
 * @param rec - Local recommendation to format
 * @returns Formatted recommendation
 */
export function formatLocalRecommendation(
  rec: LocalRecommendation
): FormattedRecommendation {
  return {
    name: rec.name,
    type: rec.type,
    description: rec.description,
    distance: rec.distance,
    priceRange: rec.priceRange,
    address: rec.address,
    phone: rec.phone,
    website: rec.website,
    social: rec.social,
    image: rec.image,
    imageAlt: rec.imageAlt,
  };
}

/**
 * Extracts section headings for table of contents generation
 * 
 * @param _content - Content data (unused, but kept for future dynamic extraction)
 * @returns Array of section headings
 */
export function extractSectionHeadings(
  _content: ContentData
): SectionHeading[] {
  const sections: SectionHeading[] = [
    { title: 'Property Overview' },
    { title: 'Before You Arrive' },
    { title: 'During Your Stay' },
    { title: 'Local Guide' },
    { title: 'Checkout' },
  ];

  return sections;
}

