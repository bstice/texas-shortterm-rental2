// PDF export type definitions

import type { LocalRecommendation, PropertyInfo, ContentData } from '@shared/types/content';

/**
 * Props interface for PDF section components
 */
export interface PdfComponentProps {
  content: ContentData;
}

/**
 * Formatted recommendation for PDF display
 * Includes all fields formatted for PDF rendering
 */
export interface FormattedRecommendation {
  name: string;
  type: LocalRecommendation['type'];
  description: string;
  distance?: string;
  priceRange?: string;
  address?: string;
  phone?: string;
  website?: string;
  social?: LocalRecommendation['social'];
  image?: string;
  imageAlt?: string;
}

/**
 * PDF generation state for usePdfGeneration hook
 */
export interface PdfGenerationState {
  isGenerating: boolean;
  error: Error | null;
  progress?: number;
}

/**
 * Section heading for table of contents
 */
export interface SectionHeading {
  title: string;
  page?: number; // Optional page number (approximate for MVP)
}

/**
 * Props for PDF cover component
 */
export interface PdfCoverProps {
  property: PropertyInfo;
}

/**
 * Props for PDF table of contents component
 */
export interface PdfTableOfContentsProps {
  sections: SectionHeading[];
}

