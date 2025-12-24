import { Download } from 'lucide-react';
import { downloadPdf } from '../utils/downloadPdf';
import styles from './PdfDownloadButton.module.css';

/**
 * PDF download button component
 * 
 * Provides a button to download the guidebook PDF file.
 * Accessible from all pages via header integration.
 */
export default function PdfDownloadButton() {
  const handleDownload = () => {
    try {
      downloadPdf();
    } catch (error) {
      // Error is logged in downloadPdf function
      // Could show a toast notification here in the future
      console.error('PDF download error:', error);
    }
  };

  return (
    <button
      className={styles.button}
      onClick={handleDownload}
      aria-label="Download PDF Guidebook"
      title="Download PDF Guidebook"
    >
      <Download size={18} className={styles.icon} />
      <span className={styles.label}>Download PDF</span>
    </button>
  );
}
