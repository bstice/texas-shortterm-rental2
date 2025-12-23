import { useState, useEffect } from 'react';

const STORAGE_KEY = 'checkout-checklist';

interface ChecklistState {
  [id: string]: boolean;
}

/**
 * Hook to manage interactive checklist state
 * Persists to localStorage
 */
export function useChecklist(initialItems: Array<{ id: string }>) {
  const [checkedItems, setCheckedItems] = useState<ChecklistState>(() => {
    // Load from localStorage on init
    // Guard against SSR - localStorage is only available in browser
    if (typeof window === 'undefined') {
      return {};
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to load checklist from localStorage:', err);
    }
    return {};
  });

  // Save to localStorage whenever checkedItems changes
  useEffect(() => {
    // Guard against SSR - localStorage is only available in browser
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch (err) {
      console.error('Failed to save checklist to localStorage:', err);
    }
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Failed to clear checklist from localStorage:', err);
      }
    }
  };

  const isChecked = (id: string) => checkedItems[id] || false;

  const allChecked = initialItems.every((item) => isChecked(item.id));

  return {
    checkedItems,
    toggleItem,
    resetChecklist,
    isChecked,
    allChecked,
  };
}

