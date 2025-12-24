/**
 * Utility function to download a PDF file
 * 
 * Creates a temporary anchor element, sets the download attribute,
 * triggers a click, and cleans up after the download starts.
 * 
 * @param filename - Optional custom filename for the downloaded file
 *                   Defaults to "Guidebook-9926-Ledgestone-Ter.pdf"
 */
export function downloadPdf(filename = 'Guidebook-9926-Ledgestone-Ter.pdf'): void {
  try {
    // PDF file path (relative to public directory)
    const pdfPath = '/guidebook.pdf';
    
    // Create temporary anchor element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = filename;
    link.style.display = 'none';
    
    // Append to document body
    document.body.appendChild(link);
    
    // Trigger click to start download
    link.click();
    
    // Clean up: remove element after a short delay
    // This ensures the download has started before removing the element
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    // Handle errors gracefully
    console.error('Failed to download PDF:', error);
    throw new Error('Failed to download PDF. Please try again or contact support.');
  }
}

