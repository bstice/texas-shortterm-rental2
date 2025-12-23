import React from 'react';
import type { ContentData } from '@shared/types/content';
import PdfDocument from '../templates/PdfDocument';
import { preprocessImages } from './imagePreprocessor';
import {
  PdfGenerationError,
  PdfRenderingError,
  PdfDownloadError,
  InvalidContentError,
  logError,
} from './errors';

/**
 * Validates content data structure
 * 
 * Handles edge cases gracefully:
 * - Missing or null content
 * - Missing required fields
 * - Empty arrays (allowed, but logged)
 * - Very long content (warned but allowed)
 * 
 * @param content - Content data to validate
 * @throws InvalidContentError if content is invalid
 */
function validateContent(content: ContentData): void {
  if (!content) {
    throw new InvalidContentError('Content data is required');
  }
  
  if (typeof content !== 'object') {
    throw new InvalidContentError('Content data must be an object');
  }
  
  // Validate property information
  if (!content.property) {
    throw new InvalidContentError('Property information is required');
  }
  
  if (!content.property.address || typeof content.property.address !== 'string' || content.property.address.trim().length === 0) {
    throw new InvalidContentError('Property address is required and must be a non-empty string');
  }
  
  // Validate required sections exist (but allow empty objects)
  const requiredSections = [
    'beforeYouArrive',
    'duringYourStay',
    'localGuide',
    'checkout',
  ];
  
  for (const section of requiredSections) {
    if (!content[section as keyof ContentData]) {
      throw new InvalidContentError(`Required section "${section}" is missing`);
    }
    if (typeof content[section as keyof ContentData] !== 'object') {
      throw new InvalidContentError(`Section "${section}" must be an object`);
    }
  }
  
  // Warn about empty arrays (non-critical)
  const emptyArrayWarnings: string[] = [];
  
  if (content.localGuide?.restaurants && Array.isArray(content.localGuide.restaurants) && content.localGuide.restaurants.length === 0) {
    emptyArrayWarnings.push('restaurants');
  }
  if (content.localGuide?.coffee && Array.isArray(content.localGuide.coffee) && content.localGuide.coffee.length === 0) {
    emptyArrayWarnings.push('coffee');
  }
  if (content.checkout?.checklist && Array.isArray(content.checkout.checklist) && content.checkout.checklist.length === 0) {
    emptyArrayWarnings.push('checklist');
  }
  
  if (emptyArrayWarnings.length > 0) {
    logError(null, {
      step: 'validation_warning',
      message: `Empty arrays detected: ${emptyArrayWarnings.join(', ')}`,
      warning: true,
    });
  }
  
  // Warn about very long content (non-critical)
  const longContentWarnings: string[] = [];
  
  if (content.property.address && content.property.address.length > 200) {
    longContentWarnings.push('property address');
  }
  if (content.beforeYouArrive?.addressParking?.address && content.beforeYouArrive.addressParking.address.length > 500) {
    longContentWarnings.push('address & parking');
  }
  
  if (longContentWarnings.length > 0) {
    logError(null, {
      step: 'validation_warning',
      message: `Very long content detected: ${longContentWarnings.join(', ')}`,
      warning: true,
    });
  }
}

/**
 * Progress callback type for PDF generation
 */
export type ProgressCallback = (progress: number, message?: string) => void;

/**
 * Generates a PDF Blob from content data
 * 
 * Uses dynamic import for code splitting to reduce initial bundle size.
 * Pre-processes images to base64 to avoid CORS issues.
 * 
 * @param content - Content data to generate PDF from
 * @param onProgress - Optional callback for progress updates (0-100)
 * @returns Promise that resolves to PDF Blob
 * @throws PdfGenerationError if generation fails
 */
export async function generatePdf(
  content: ContentData,
  onProgress?: ProgressCallback
): Promise<Blob> {
  const startTime = performance.now();
  
  try {
    // Step 1: Validate content data (0-5%)
    onProgress?.(0, 'Validating content...');
    const validateStart = performance.now();
    validateContent(content);
    const validateTime = performance.now() - validateStart;
    logError(null, { 
      step: 'performance_validation', 
      duration: `${validateTime.toFixed(2)}ms` 
    });
    onProgress?.(5, 'Content validated');
    
    // Step 2: Pre-process images: convert all image URLs to base64 (5-40%)
    // This avoids CORS issues with @react-pdf/renderer
    onProgress?.(5, 'Processing images...');
    const imageStart = performance.now();
    let processedContent: ContentData;
    try {
      processedContent = await preprocessImages(content, (progress, message) => {
        // Map image preprocessing progress (0-100%) to overall progress (5-40%)
        const overallProgress = 5 + (progress * 0.35);
        onProgress?.(overallProgress, message || 'Processing images...');
      });
      const imageTime = performance.now() - imageStart;
      logError(null, { 
        step: 'performance_image_processing', 
        duration: `${imageTime.toFixed(2)}ms` 
      });
      onProgress?.(40, 'Images processed');
    } catch (err) {
      logError(err instanceof Error ? err : new Error('Image preprocessing failed'), {
        step: 'image_preprocessing',
      });
      // Continue with original content if image preprocessing fails
      // Images will be skipped, but PDF can still be generated
      processedContent = content;
      onProgress?.(40, 'Continuing without some images...');
    }
    
    // Step 3: Dynamically import @react-pdf/renderer (40-45%)
    onProgress?.(40, 'Loading PDF library...');
    let reactPdf;
    try {
      reactPdf = await import('@react-pdf/renderer');
      onProgress?.(45, 'PDF library loaded');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to import PDF library');
      logError(error, { step: 'library_import' });
      throw new PdfRenderingError(
        'PDF generation library failed to load. Please refresh and try again.',
        error
      );
    }
    
    // Step 4: Create PdfDocument component (45-50%)
    onProgress?.(45, 'Creating PDF structure...');
    let pdfDocument: React.ReactElement;
    try {
      pdfDocument = React.createElement(PdfDocument, { content: processedContent }) as React.ReactElement;
      onProgress?.(50, 'PDF structure created');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create PDF document');
      logError(error, { step: 'document_creation' });
      throw new PdfRenderingError('Failed to create PDF document structure.', error);
    }
    
    // Step 5: Render PDF to Blob (50-95%)
    onProgress?.(50, 'Rendering PDF...');
    const renderStart = performance.now();
    let blob: Blob;
    try {
      const pdfInstance = reactPdf.pdf(pdfDocument as any);
      
      // Render PDF (this is the longest step)
      // Since toBlob() doesn't provide progress, we'll simulate it
      let renderProgress = 50;
      const progressInterval = setInterval(() => {
        if (renderProgress < 90) {
          renderProgress += 5;
          onProgress?.(renderProgress, 'Rendering PDF...');
        }
      }, 500);
      
      blob = await pdfInstance.toBlob();
      clearInterval(progressInterval);
      
      const renderTime = performance.now() - renderStart;
      const totalTime = performance.now() - startTime;
      const fileSizeMB = (blob.size / (1024 * 1024)).toFixed(2);
      
      logError(null, { 
        step: 'performance_pdf_generation',
        renderTime: `${renderTime.toFixed(2)}ms`,
        totalTime: `${totalTime.toFixed(2)}ms`,
        fileSize: `${fileSizeMB}MB`,
        fileSizeBytes: blob.size,
      });
      
      // Warn if performance targets not met
      if (totalTime > 10000) {
        logError(new Error(`PDF generation took ${totalTime.toFixed(2)}ms (target: < 10s)`), {
          step: 'performance_warning',
          warning: true,
        });
      }
      if (blob.size > 5 * 1024 * 1024) {
        logError(new Error(`PDF file size is ${fileSizeMB}MB (target: < 5MB)`), {
          step: 'performance_warning',
          warning: true,
        });
      }
      
      onProgress?.(95, 'PDF rendered');
      
      // Validate blob
      if (!blob || blob.size === 0) {
        throw new Error('Generated PDF is empty');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to render PDF');
      logError(error, { step: 'pdf_rendering' });
      throw new PdfRenderingError(
        'Failed to render PDF. Please check the content and try again.',
        error
      );
    }
    
    onProgress?.(100, 'PDF ready');
    return blob;
  } catch (err) {
    // Re-throw known errors
    if (err instanceof PdfGenerationError) {
      throw err;
    }
    
    // Wrap unknown errors
    const error = err instanceof Error ? err : new Error('Unknown error occurred');
    logError(error, { step: 'pdf_generation' });
    throw new PdfGenerationError('PDF generation failed. Please try again.', error);
  }
}

/**
 * Triggers browser download of PDF Blob
 * 
 * @param blob - PDF Blob to download
 * @param filename - Filename for downloaded PDF
 * @throws PdfDownloadError if download fails
 */
export function downloadPdf(blob: Blob, filename: string): void {
  try {
    // Validate blob
    if (!blob) {
      throw new Error('PDF blob is required');
    }
    
    if (!(blob instanceof Blob)) {
      throw new Error('Invalid PDF blob type');
    }
    
    if (blob.size === 0) {
      throw new Error('PDF blob is empty');
    }
    
    // Validate filename
    if (!filename || filename.trim().length === 0) {
      throw new Error('Filename is required');
    }
    
    // Check if browser supports required APIs
    if (typeof URL === 'undefined' || typeof URL.createObjectURL === 'undefined') {
      throw new Error('Browser does not support file downloads');
    }
    
    // Create object URL
    let url: string;
    try {
      url = URL.createObjectURL(blob);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create object URL');
      logError(error, { step: 'create_object_url' });
      throw new PdfDownloadError('Failed to prepare PDF for download.', error);
    }
    
    // Create temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    // Append to document body
    try {
      document.body.appendChild(link);
    } catch (err) {
      URL.revokeObjectURL(url);
      const error = err instanceof Error ? err : new Error('Failed to append download link');
      logError(error, { step: 'append_link' });
      throw new PdfDownloadError('Failed to initiate download.', error);
    }
    
    // Trigger click to download
    try {
      link.click();
    } catch (err) {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      const error = err instanceof Error ? err : new Error('Failed to trigger download');
      logError(error, { step: 'trigger_download' });
      throw new PdfDownloadError('Failed to trigger download. Please try right-clicking and saving.', error);
    }
    
    // Clean up
    try {
      document.body.removeChild(link);
    } catch (err) {
      // Link might have been removed already, ignore error
      logError(err instanceof Error ? err : new Error('Failed to remove link'), {
        step: 'cleanup_link',
        warning: true,
      });
    }
    
    // Revoke object URL after a short delay to ensure download starts
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch (err) {
        logError(err instanceof Error ? err : new Error('Failed to revoke URL'), {
          step: 'revoke_url',
          warning: true,
        });
      }
    }, 100);
  } catch (err) {
    // Re-throw known errors
    if (err instanceof PdfDownloadError) {
      throw err;
    }
    
    // Wrap unknown errors
    const error = err instanceof Error ? err : new Error('Unknown download error');
    logError(error, { step: 'pdf_download' });
    throw new PdfDownloadError('PDF download failed. Please try again.', error);
  }
}

