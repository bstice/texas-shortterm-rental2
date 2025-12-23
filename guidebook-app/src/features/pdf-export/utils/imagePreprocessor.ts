import type { ContentData } from '@shared/types/content';
import { resolveImagePath, imageUrlToBase64, isImageAccessible } from './imageHandler';
import { ImageProcessingError, logError } from './errors';

/**
 * Progress callback type for image preprocessing
 */
export type ImageProgressCallback = (progress: number, message?: string) => void;

/**
 * Pre-processes all images in content data, converting them to base64
 * 
 * @react-pdf/renderer has issues loading images from URLs, especially external ones
 * due to CORS. This function pre-converts all images to base64 data URLs.
 * 
 * If image processing fails for any image, it will be skipped (set to undefined)
 * and processing will continue. The PDF can still be generated without images.
 * 
 * @param content - Original content data
 * @returns Promise that resolves to content data with base64 images
 * @throws ImageProcessingError if critical errors occur (but continues processing)
 */
/**
 * Helper function to process a single image with error tracking
 * 
 * Optimized to skip accessibility check if image is already base64.
 * Handles edge cases:
 * - Empty or invalid image paths
 * - Network errors
 * - CORS errors
 * - Timeout errors
 * 
 * Note: Currently unused but kept for potential future use
 */
// @ts-expect-error - Unused but kept for potential future use
async function processImageWithErrorTracking(
  imagePath: string,
  imageErrors: Array<{ path: string; error: Error }>
): Promise<string | undefined> {
  // Handle empty or invalid image paths
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim().length === 0) {
    imageErrors.push({
      path: imagePath || '(empty)',
      error: new Error('Empty or invalid image path'),
    });
    return undefined;
  }
  
  try {
    // Skip processing if already base64
    if (imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    const base64 = await convertImage(imagePath);
    return base64 || undefined;
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    
    // Categorize errors for better handling
    if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('timeout')) {
      // Network errors - will be retried by caller
      throw error;
    }
    
    // Other errors - log and skip
    imageErrors.push({
      path: imagePath,
      error,
    });
    return undefined;
  }
}

export async function preprocessImages(
  content: ContentData,
  onProgress?: ImageProgressCallback
): Promise<ContentData> {
  if (!content) {
    throw new ImageProcessingError('Content data is required');
  }
  
  // Handle network errors with retry logic
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 1000; // 1 second
  
  const processedContent = { ...content };
  const imageErrors: Array<{ path: string; error: Error }> = [];
  
  /**
   * Helper to retry image processing on network errors
   */
  async function processImageWithRetry(
    imagePath: string,
    retries = MAX_RETRIES
  ): Promise<string | undefined> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Handle empty or invalid image paths
        if (!imagePath || typeof imagePath !== 'string' || imagePath.trim().length === 0) {
          imageErrors.push({
            path: imagePath || '(empty)',
            error: new Error('Empty or invalid image path'),
          });
          return undefined;
        }
        
        // Skip processing if already base64
        if (imagePath.startsWith('data:')) {
          return imagePath;
        }
        
        const base64 = await convertImage(imagePath);
        return base64 || undefined;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        const isNetworkError = err.message.includes('network') ||
          err.message.includes('fetch') ||
          err.message.includes('timeout') ||
          err.message.includes('Failed to fetch');
        
        if (isNetworkError && attempt < retries) {
          // Wait before retrying with exponential backoff
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
          continue;
        }
        
        // Not a network error or out of retries
        imageErrors.push({
          path: imagePath,
          error: err,
        });
        return undefined;
      }
    }
    return undefined;
  }
  
  // Collect all images to process
  const allImages: Array<{ path: string; category: string }> = [];
  
  // Collect images from local guide
  if (processedContent.localGuide) {
    if (processedContent.localGuide.restaurants) {
      processedContent.localGuide.restaurants.forEach(rec => {
        if (rec.image) allImages.push({ path: rec.image, category: 'restaurant' });
      });
    }
    if (processedContent.localGuide.coffee) {
      processedContent.localGuide.coffee.forEach(rec => {
        if (rec.image) allImages.push({ path: rec.image, category: 'coffee' });
      });
    }
    if (processedContent.localGuide.groceries) {
      processedContent.localGuide.groceries.forEach(rec => {
        if (rec.image) allImages.push({ path: rec.image, category: 'grocery' });
      });
    }
    if (processedContent.localGuide.outdoorActivities) {
      ['hiking', 'hillCountry', 'parks'].forEach(category => {
        const items = processedContent.localGuide.outdoorActivities?.[category as keyof typeof processedContent.localGuide.outdoorActivities] as typeof processedContent.localGuide.restaurants;
        items?.forEach(rec => {
          if (rec.image) allImages.push({ path: rec.image, category });
        });
      });
    }
    if (processedContent.localGuide.austinAttractions) {
      ['downtown', 'localSpots'].forEach(category => {
        const items = processedContent.localGuide.austinAttractions?.[category as keyof typeof processedContent.localGuide.austinAttractions] as typeof processedContent.localGuide.restaurants;
        items?.forEach(rec => {
          if (rec.image) allImages.push({ path: rec.image, category });
        });
      });
    }
  }
  
  // Collect images from how-to guides
  if (processedContent.duringYourStay?.howToGuides) {
    processedContent.duringYourStay.howToGuides.forEach(guide => {
      guide.steps?.forEach(step => {
        if (step.image) allImages.push({ path: step.image, category: 'guide' });
      });
    });
  }
  
  const totalImages = allImages.length;
  onProgress?.(0, totalImages > 0 ? `Processing ${totalImages} image${totalImages !== 1 ? 's' : ''}...` : 'No images to process');
  
  // Track progress with a shared counter
  let processedCount = 0;
  const updateProgress = () => {
    if (totalImages > 0) {
      const progress = Math.round((processedCount / totalImages) * 100);
      onProgress?.(progress, `Processing images... (${processedCount}/${totalImages})`);
    }
  };
  
  // Process local guide images
  if (processedContent.localGuide) {
    // Process restaurants
    if (processedContent.localGuide.restaurants && Array.isArray(processedContent.localGuide.restaurants)) {
      processedContent.localGuide.restaurants = await Promise.all(
        processedContent.localGuide.restaurants.map(async (rec) => {
          if (rec && rec.image) {
            const base64 = await processImageWithRetry(rec.image);
            processedCount++;
            updateProgress();
            return { ...rec, image: base64 };
          }
          return rec;
        })
      );
    }
    
    // Process coffee
    if (processedContent.localGuide.coffee && Array.isArray(processedContent.localGuide.coffee)) {
      processedContent.localGuide.coffee = await Promise.all(
        processedContent.localGuide.coffee.map(async (rec) => {
          if (rec && rec.image) {
            const base64 = await processImageWithRetry(rec.image);
            processedCount++;
            updateProgress();
            return { ...rec, image: base64 };
          }
          return rec;
        })
      );
    }
    
    // Process groceries
    if (processedContent.localGuide.groceries && Array.isArray(processedContent.localGuide.groceries)) {
      processedContent.localGuide.groceries = await Promise.all(
        processedContent.localGuide.groceries.map(async (rec) => {
          if (rec && rec.image) {
            const base64 = await processImageWithRetry(rec.image);
            processedCount++;
            updateProgress();
            return { ...rec, image: base64 };
          }
          return rec;
        })
      );
    }
    
    // Process outdoor activities
    if (processedContent.localGuide.outdoorActivities) {
      if (processedContent.localGuide.outdoorActivities.hiking && Array.isArray(processedContent.localGuide.outdoorActivities.hiking)) {
        processedContent.localGuide.outdoorActivities.hiking = await Promise.all(
          processedContent.localGuide.outdoorActivities.hiking.map(async (rec) => {
            if (rec && rec.image) {
              const base64 = await processImageWithRetry(rec.image);
              processedCount++;
              updateProgress();
              return { ...rec, image: base64 };
            }
            return rec;
          })
        );
      }
      
      if (processedContent.localGuide.outdoorActivities.hillCountry && Array.isArray(processedContent.localGuide.outdoorActivities.hillCountry)) {
        processedContent.localGuide.outdoorActivities.hillCountry = await Promise.all(
          processedContent.localGuide.outdoorActivities.hillCountry.map(async (rec) => {
            if (rec && rec.image) {
              const base64 = await processImageWithRetry(rec.image);
              processedCount++;
              updateProgress();
              return { ...rec, image: base64 };
            }
            return rec;
          })
        );
      }
      
      if (processedContent.localGuide.outdoorActivities.parks && Array.isArray(processedContent.localGuide.outdoorActivities.parks)) {
        processedContent.localGuide.outdoorActivities.parks = await Promise.all(
          processedContent.localGuide.outdoorActivities.parks.map(async (rec) => {
            if (rec && rec.image) {
              const base64 = await processImageWithRetry(rec.image);
              processedCount++;
              updateProgress();
              return { ...rec, image: base64 };
            }
            return rec;
          })
        );
      }
    }
    
    // Process Austin attractions
    if (processedContent.localGuide.austinAttractions) {
      if (processedContent.localGuide.austinAttractions.downtown && Array.isArray(processedContent.localGuide.austinAttractions.downtown)) {
        processedContent.localGuide.austinAttractions.downtown = await Promise.all(
          processedContent.localGuide.austinAttractions.downtown.map(async (rec) => {
            if (rec && rec.image) {
              const base64 = await processImageWithRetry(rec.image);
              processedCount++;
              updateProgress();
              return { ...rec, image: base64 };
            }
            return rec;
          })
        );
      }
      
      if (processedContent.localGuide.austinAttractions.localSpots && Array.isArray(processedContent.localGuide.austinAttractions.localSpots)) {
        processedContent.localGuide.austinAttractions.localSpots = await Promise.all(
          processedContent.localGuide.austinAttractions.localSpots.map(async (rec) => {
            if (rec && rec.image) {
              const base64 = await processImageWithRetry(rec.image);
              processedCount++;
              updateProgress();
              return { ...rec, image: base64 };
            }
            return rec;
          })
        );
      }
    }
  }
  
  // Process how-to guide images
  if (processedContent.duringYourStay?.howToGuides && Array.isArray(processedContent.duringYourStay.howToGuides)) {
    processedContent.duringYourStay.howToGuides = await Promise.all(
      processedContent.duringYourStay.howToGuides.map(async (guide) => {
        if (guide && guide.steps && Array.isArray(guide.steps)) {
          const processedSteps = await Promise.all(
            guide.steps.map(async (step) => {
              if (step && step.image) {
                const base64 = await processImageWithRetry(step.image);
                processedCount++;
                updateProgress();
                return { ...step, image: base64 };
              }
              return step;
            })
          );
          return { ...guide, steps: processedSteps };
        }
        return guide;
      })
    );
  }
  
  // Log any image processing errors (non-critical)
  if (imageErrors.length > 0) {
    logError(new Error(`Failed to process ${imageErrors.length} image(s)`), {
      step: 'image_preprocessing',
      imageErrors: imageErrors.map(e => ({ path: e.path, message: e.error.message })),
      warning: true,
    });
  }
  
  onProgress?.(100, totalImages > 0 ? `Processed ${totalImages - imageErrors.length}/${totalImages} images` : 'Images processed');
  return processedContent;
}

/**
 * Converts an image path/URL to base64
 * 
 * First checks if the image is accessible, then converts to base64.
 * Returns null if image is not accessible or conversion fails.
 * 
 * @param imagePath - Image path (relative or absolute URL)
 * @returns Base64 data URL or null if conversion fails
 */
/**
 * Converts an image path/URL to base64
 * 
 * @param imagePath - Image path (relative or absolute URL)
 * @returns Base64 data URL or null if conversion fails
 * @throws Error if a critical error occurs (network timeout, etc.)
 */
async function convertImage(imagePath: string): Promise<string | null> {
  if (!imagePath || imagePath.trim().length === 0) {
    return null;
  }
  
  try {
    const imageUrl = resolveImagePath(imagePath);
    console.log(`Converting image: ${imagePath} -> ${imageUrl}`);
    
    // Check if image is accessible before attempting conversion
    let accessible: boolean;
    try {
      accessible = await isImageAccessible(imageUrl);
    } catch (err) {
      // If accessibility check fails, try conversion anyway
      accessible = true;
      logError(err instanceof Error ? err : new Error('Accessibility check failed'), {
        step: 'check_image_accessibility',
        imagePath,
        warning: true,
      });
    }
    
    if (!accessible) {
      console.warn(`Image not accessible, skipping: ${imagePath}`);
      return null;
    }
    
    // Convert to base64 with timeout
    const base64 = await Promise.race([
      imageUrlToBase64(imageUrl),
      new Promise<string | null>((resolve) => {
        setTimeout(() => {
          console.warn(`Image conversion timeout: ${imagePath}`);
          resolve(null);
        }, 10000); // 10 second timeout
      }),
    ]);
    
    if (base64) {
      console.log(`Successfully converted image: ${imagePath} (base64 length: ${base64.length})`);
      return base64;
    } else {
      console.warn(`Failed to convert image to base64: ${imagePath}`);
      return null;
    }
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown image conversion error');
    logError(err, { step: 'convert_image', imagePath });
    // Don't throw - return null to allow PDF generation to continue
    return null;
  }
}

