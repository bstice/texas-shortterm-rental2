import { Download } from 'lucide-react';
import { useContent } from '@shared/hooks/useContent';
import { usePdfGeneration } from '../hooks/usePdfGeneration';
import PdfGenerationProgress from './PdfGenerationProgress';
import {
  InvalidContentError,
  ImageProcessingError,
  PdfRenderingError,
  PdfDownloadError,
} from '../utils/errors';
import styles from './PdfDownloadButton.module.css';

/**
 * Gets a user-friendly error message from an error
 */
function getUserFriendlyErrorMessage(error: Error | null): string {
  if (!error) {
    return 'An error occurred. Please try again.';
  }
  
  // Handle specific error types
  if (error instanceof InvalidContentError) {
    return 'Content data is incomplete. Please refresh the page and try again.';
  }
  
  if (error instanceof ImageProcessingError) {
    return 'Some images could not be loaded, but the PDF was generated.';
  }
  
  if (error instanceof PdfRenderingError) {
    if (error.message.includes('library failed to load')) {
      return 'PDF generation library failed to load. Please refresh the page and try again.';
    }
    return 'Failed to generate PDF. Please check your content and try again.';
  }
  
  if (error instanceof PdfDownloadError) {
    if (error.message.includes('right-clicking')) {
      return 'Download failed. Try right-clicking the button and selecting "Save link as".';
    }
    return 'Failed to download PDF. Please try again.';
  }
  
  // Use error message if available, otherwise generic message
  return error.message || 'Failed to generate PDF. Please try again.';
}

/**
 * PDF download button component
 * 
 * Accessible from all pages via header integration
 */
export default function PdfDownloadButton() {
  const { content, loading: contentLoading, error: contentError } = useContent();
  const { isGenerating, error: generationError, generatePdf, progress, progressMessage } = usePdfGeneration();

  const handleDownload = async () => {
    if (!content || contentLoading || isGenerating) {
      return;
    }

    try {
      await generatePdf(content);
    } catch (err) {
      // Error is handled by hook state
      console.error('PDF generation error:', err);
    }
  };

  const isDisabled = contentLoading || isGenerating || !content;
  const error = contentError || generationError;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleDownload}
        disabled={isDisabled}
        aria-label={isGenerating 
          ? `Generating PDF... ${progress !== undefined ? `${Math.round(progress)}% complete` : ''}` 
          : 'Download PDF Guidebook'}
        aria-busy={isGenerating}
        aria-describedby={error ? 'pdf-error-message' : undefined}
        type="button"
      >
        <Download 
          size={18} 
          className={styles.icon}
          aria-hidden="true"
        />
        <span className={styles.label}>
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </span>
      </button>

      {isGenerating && (
        <PdfGenerationProgress 
          isGenerating={isGenerating}
          progress={progress}
          message={progressMessage}
        />
      )}

      {error && (
        <div 
          id="pdf-error-message"
          className={styles.error} 
          role="alert"
          aria-live="polite"
        >
          {getUserFriendlyErrorMessage(error)}
        </div>
      )}
    </div>
  );
}

