import { useState, useEffect } from 'react';
import { loadContent } from '@shared/utils/content';
import type { ContentData } from '@shared/types/content';

interface UseContentResult {
  content: ContentData | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to load and access content data
 * 
 * @returns Content data, loading state, and error state
 */
export function useContent(): UseContentResult {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await loadContent();
        if (!cancelled) {
          setContent(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load content'));
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading, error };
}

