import { useState } from 'react';
import type { ContentData } from '@shared/types/content';
import { generatePdf as generatePdfBlob, downloadPdf, type ProgressCallback } from '../utils/pdfGenerator';
import { PdfGenerationError, logError } from '../utils/errors';

/**
 * Hook to manage PDF generation state and logic
 * 
 * Follows the same pattern as useContent and useChatbot hooks
 * 
 * @returns PDF generation state and functions
 */
export function usePdfGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [progressMessage, setProgressMessage] = useState<string | undefined>(undefined);

  /**
   * Generate and download PDF
   * 
   * @param content - Content data to generate PDF from
   */
  const generatePdf = async (content: ContentData): Promise<void> => {
    try {
      setIsGenerating(true);
      setError(null);
      setProgress(undefined);
      setProgressMessage(undefined);
      
      console.log('Starting PDF generation...');
      console.log('Content has images:', {
        restaurants: content.localGuide?.restaurants?.filter(r => r.image).length || 0,
        coffee: content.localGuide?.coffee?.filter(r => r.image).length || 0,
        groceries: content.localGuide?.groceries?.filter(r => r.image).length || 0,
      });

      // Progress callback for PDF generation
      const progressCallback: ProgressCallback = (progress, message) => {
        setProgress(progress);
        setProgressMessage(message);
        if (message) {
          console.log(`PDF Generation Progress: ${progress}% - ${message}`);
        }
      };

      // Generate PDF Blob with progress tracking
      const blob = await generatePdfBlob(content, progressCallback);
      
      console.log('PDF generated successfully, size:', blob.size, 'bytes');
      
      // Download PDF
      setProgress(100);
      downloadPdf(blob, 'Guidebook-9926-Ledgestone-Ter.pdf');
      
      setIsGenerating(false);
      setProgress(undefined);
    } catch (err) {
      // Handle known error types
      let error: Error;
      if (err instanceof PdfGenerationError) {
        error = err;
      } else if (err instanceof Error) {
        error = new PdfGenerationError('PDF generation failed. Please try again.', err);
      } else {
        error = new PdfGenerationError('PDF generation failed. Please try again.');
      }
      
      logError(error, {
        step: 'pdf_generation_hook',
        hasContent: !!content,
      });
      
      setError(error);
      setIsGenerating(false);
      setProgress(undefined);
      setProgressMessage(undefined);
      
      // Re-throw to allow caller to handle if needed
      throw error;
    }
  };

  return {
    isGenerating,
    error,
    generatePdf,
    progress,
    progressMessage,
  };
}

