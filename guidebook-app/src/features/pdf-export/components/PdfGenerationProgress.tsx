import { Loader2 } from 'lucide-react';
import styles from './PdfGenerationProgress.module.css';

interface PdfGenerationProgressProps {
  isGenerating: boolean;
  progress?: number;
  message?: string;
}

/**
 * Progress indicator component for PDF generation
 * 
 * Shows loading spinner, progress percentage, and status message during PDF generation
 */
export default function PdfGenerationProgress({
  isGenerating,
  progress,
  message,
}: PdfGenerationProgressProps) {
  if (!isGenerating) {
    return null;
  }

  const displayProgress = progress !== undefined ? Math.round(progress) : undefined;
  const displayMessage = message || 'Generating PDF...';

  return (
    <div 
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-label={`PDF generation progress: ${displayProgress !== undefined ? `${displayProgress}%` : 'in progress'}`}
    >
      <Loader2 
        className={styles.spinner} 
        size={20}
        aria-hidden="true"
      />
      <div className={styles.content}>
        <span className={styles.text}>
          {displayMessage}
          {displayProgress !== undefined && ` ${displayProgress}%`}
        </span>
        {displayProgress !== undefined && (
          <div 
            className={styles.progressBar}
            role="progressbar"
            aria-valuenow={displayProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress: ${displayProgress}%`}
          >
            <div 
              className={styles.progressFill} 
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

