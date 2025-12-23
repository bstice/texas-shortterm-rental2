import type { LocalRecommendation } from '@shared/types/content';

/**
 * Resolves relative image paths to absolute URLs
 * 
 * For PDF generation, we need absolute URLs that can be fetched and converted to base64.
 * This function converts relative paths (like "/images/local-guide/...") to
 * absolute URLs using the current origin.
 * 
 * @param path - Relative path (e.g., "/images/local-guide/...") or absolute URL
 * @returns Absolute URL for the image
 */
export function resolveImagePath(path: string): string {
  // Handle already absolute URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Convert relative paths to absolute URLs
  // Uses window.location.origin for current domain
  // Handles different deployment scenarios (dev, production, Vercel)
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  
  // For paths starting with '/', keep the leading slash
  // For paths without leading slash, add one
  if (path.startsWith('/')) {
    return `${origin}${path}`;
  }
  
  return `${origin}/${path}`;
}

/**
 * Converts an image URL to a base64 data URL
 * 
 * @react-pdf/renderer has issues loading images from URLs, especially external ones
 * due to CORS. Converting to base64 ensures images work in the PDF.
 * 
 * @param imageUrl - URL of the image to convert
 * @returns Promise that resolves to base64 data URL, or null if conversion fails
 */
export async function imageUrlToBase64(imageUrl: string): Promise<string | null> {
  try {
    console.log(`Fetching image: ${imageUrl}`);
    
    // Fetch the image with no-cors mode for external images that might have CORS issues
    // But first try with normal fetch
    let response: Response;
    try {
      response = await fetch(imageUrl);
    } catch (fetchError) {
      // If normal fetch fails, try with no-cors mode (but this won't work for CORS)
      console.warn(`Normal fetch failed for ${imageUrl}, trying alternative approach...`);
      throw fetchError;
    }
    
    if (!response.ok) {
      console.warn(`Failed to fetch image: ${imageUrl} (${response.status} ${response.statusText})`);
      return null;
    }
    
    // Get the image as a blob
    const blob = await response.blob();
    console.log(`Image blob created: ${blob.type}, ${blob.size} bytes`);
    
    // Convert blob to base64
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (base64String && base64String.startsWith('data:')) {
          console.log(`Successfully converted to base64: ${imageUrl} (${base64String.substring(0, 50)}...)`);
          resolve(base64String);
        } else {
          console.warn(`Invalid base64 result for ${imageUrl}`);
          resolve(null);
        }
      };
      reader.onerror = (error) => {
        console.warn(`FileReader error for ${imageUrl}:`, error);
        resolve(null);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    // Handle CORS errors and other fetch failures gracefully
    console.warn(`Error loading image ${imageUrl}:`, error);
    return null;
  }
}

/**
 * Checks if an image URL is accessible
 * 
 * Uses a HEAD request to check if the image can be loaded without downloading it.
 * Handles CORS errors gracefully.
 * 
 * @param url - Image URL to check
 * @returns Promise that resolves to true if accessible, false otherwise
 */
export async function isImageAccessible(url: string): Promise<boolean> {
  try {
    // Try HEAD request first (more efficient)
    await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors', // This will always succeed but won't tell us if it's actually accessible
    });
    
    // If no-cors mode, we can't check the status, so try a GET request with a timeout
    // For same-origin requests, HEAD should work
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const isSameOrigin = url.startsWith(origin);
      
      if (isSameOrigin) {
        // Same origin - HEAD request should work
        try {
          const headResponse = await fetch(url, { method: 'HEAD' });
          return headResponse.ok;
        } catch {
          return false;
        }
      } else {
        // Cross-origin - try a small GET request with timeout
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(false), 3000); // 3 second timeout
          
          fetch(url, { method: 'GET', signal: AbortSignal.timeout(3000) })
            .then((response) => {
              clearTimeout(timeout);
              resolve(response.ok);
            })
            .catch(() => {
              clearTimeout(timeout);
              resolve(false);
            });
        });
      }
    }
    
    // For relative URLs, assume accessible (they're on our domain)
    return true;
  } catch (error) {
    console.warn(`Error checking image accessibility for ${url}:`, error);
    return false;
  }
}

/**
 * Gets alt text for an image from a recommendation
 * 
 * @param recommendation - Local recommendation with image info
 * @returns Alt text or fallback
 */
export function getImageAltText(recommendation: LocalRecommendation): string {
  if (recommendation.imageAlt) {
    return recommendation.imageAlt;
  }
  
  // Fallback: use recommendation name
  return `${recommendation.name} - ${recommendation.type}`;
}

