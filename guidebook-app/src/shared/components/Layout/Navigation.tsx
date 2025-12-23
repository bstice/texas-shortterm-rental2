import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { NavItem } from '@shared/types/navigation';
import styles from './Navigation.module.css';

interface NavigationProps {
  onNavigate?: () => void;
}

// Navigation structure matching the spec
const navigationItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Before You Arrive',
    path: '/before-you-arrive',
    children: [
      { label: 'Address & Parking', path: '/before-you-arrive/address-parking' },
      { label: 'Check-in Instructions', path: '/before-you-arrive/check-in' },
      { label: 'Smart Lock Code', path: '/before-you-arrive/smart-lock' },
    ],
  },
  {
    label: 'During Your Stay',
    path: '/during-your-stay',
    children: [
      { label: 'Wi-Fi & Tech', path: '/during-your-stay/wifi-tech' },
      { label: 'House Rules', path: '/during-your-stay/house-rules' },
      {
        label: 'Property Features',
        path: '/during-your-stay/property-features',
        children: [
          { label: 'Indoor Spaces', path: '/during-your-stay/property-features/indoor-spaces' },
          { label: 'Outdoor Spaces', path: '/during-your-stay/property-features/outdoor-spaces' },
          { label: "What's Included", path: '/during-your-stay/property-features/whats-included' },
          { label: 'Hill Country Sunsets', path: '/during-your-stay/property-features/sunsets' },
        ],
      },
      {
        label: 'How-to Guides',
        path: '/during-your-stay/how-to-guides',
        children: [
          { label: 'A/C & Heating', path: '/during-your-stay/how-to-guides/ac-heating' },
          { label: 'Pool', path: '/during-your-stay/how-to-guides/pool' },
          { label: 'Hot Tub', path: '/during-your-stay/how-to-guides/hot-tub' },
          { label: 'TV & Streaming', path: '/during-your-stay/how-to-guides/tv-streaming' },
          { label: 'Appliances', path: '/during-your-stay/how-to-guides/appliances' },
          { label: 'Limo', path: '/during-your-stay/how-to-guides/limo' },
        ],
      },
    ],
  },
  {
    label: 'Local Guide',
    path: '/local-guide',
    children: [
      { label: 'Restaurants & Coffee', path: '/local-guide/restaurants-coffee' },
      { label: 'Groceries', path: '/local-guide/groceries' },
      {
        label: 'Outdoor Activities',
        path: '/local-guide/outdoor-activities',
        children: [
          { label: 'Hiking & Trails', path: '/local-guide/outdoor-activities/hiking-trails' },
          { label: 'Hill Country Attractions', path: '/local-guide/outdoor-activities/hill-country' },
          { label: 'Parks & Nature', path: '/local-guide/outdoor-activities/parks-nature' },
        ],
      },
      {
        label: 'Austin Attractions',
        path: '/local-guide/austin-attractions',
        children: [
          { label: 'Downtown Austin', path: '/local-guide/austin-attractions/downtown' },
          { label: 'Local Spots', path: '/local-guide/austin-attractions/local-spots' },
        ],
      },
      { label: 'Transportation', path: '/local-guide/transportation' },
    ],
  },
  {
    label: 'Checkout',
    path: '/checkout',
    children: [
      { label: 'Checklist', path: '/checkout/checklist' },
      { label: 'Departure Notes', path: '/checkout/departure-notes' },
    ],
  },
];

interface NavItemComponentProps {
  item: NavItem;
  level?: number;
  onNavigate?: () => void;
  expandedPath: Set<string>;
  onToggleExpand: (path: string) => void;
}

function NavItemComponent({
  item,
  level = 0,
  onNavigate,
  expandedPath,
  onToggleExpand,
}: NavItemComponentProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedPath.has(item.path);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(item.path);
    }
  };

  const handleLinkClick = () => {
    // When clicking any nav link, collapse all expanded dropdowns
    if (expandedPath.size > 0) {
      onToggleExpand('');
    }
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <li className={styles.navItem} style={{ paddingLeft: `${level * 1}rem` }}>
      <div className={styles.navItemHeader}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
          onClick={handleLinkClick}
        >
          {item.label}
        </NavLink>
        {hasChildren && (
          <button
            className={styles.expandButton}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
          >
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <ul className={styles.subNav} data-level={level + 1}>
          {item.children?.map((child) => (
            <NavItemComponent
              key={child.path}
              item={child}
              level={level + 1}
              onNavigate={onNavigate}
              expandedPath={expandedPath}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Navigation({ onNavigate }: NavigationProps) {
  // Track which navigation items are expanded
  // Only one top-level item can be expanded at a time
  // Nested items can be expanded within the open top-level item
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLUListElement>(null);

  // Close navigation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        if (expandedPaths.size > 0) {
          setExpandedPaths(new Set());
        }
      }
    };

    // Only add listener if there are expanded items
    if (expandedPaths.size > 0) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [expandedPaths]);

  // Helper to check if a path is a top-level navigation item
  const isTopLevelPath = (path: string): boolean => {
    return navigationItems.some((item) => item.path === path);
  };

  // Helper to get the immediate parent path for a nested item
  const getImmediateParent = (path: string): string | null => {
    for (const topItem of navigationItems) {
      if (topItem.children) {
        // Check direct children
        if (topItem.children.some((child) => child.path === path)) {
          return topItem.path;
        }
        // Check nested children
        for (const child of topItem.children) {
          if (child.children?.some((nested) => nested.path === path)) {
            return child.path;
          }
        }
      }
    }
    return null;
  };

  // Helper to get the top-level parent path for a nested item
  const getTopLevelParent = (path: string): string | null => {
    for (const topItem of navigationItems) {
      if (topItem.children) {
        // Check direct children
        if (topItem.children.some((child) => child.path === path)) {
          return topItem.path;
        }
        // Check nested children
        for (const child of topItem.children) {
          if (child.children?.some((nested) => nested.path === path)) {
            return topItem.path;
          }
        }
      }
    }
    return null;
  };

  const handleToggleExpand = (path: string) => {
    if (path === '') {
      setExpandedPaths(new Set());
      return;
    }

    setExpandedPaths((prev) => {
      const newSet = new Set(prev);

      if (isTopLevelPath(path)) {
        // If clicking a top-level item, collapse all other top-level items
        // but keep nested items if they're within this top-level item
        const topLevelPaths = navigationItems
          .filter((item) => item.path !== path)
          .map((item) => item.path);

        // Remove all other top-level paths
        topLevelPaths.forEach((p) => newSet.delete(p));

        // Toggle the clicked top-level item
        if (newSet.has(path)) {
          // If it's already expanded, collapse it and all its nested items
          newSet.delete(path);
          // Remove all nested items under this top-level
          navigationItems.forEach((item) => {
            if (item.path === path && item.children) {
              item.children.forEach((child) => {
                newSet.delete(child.path);
                if (child.children) {
                  child.children.forEach((nested) => {
                    newSet.delete(nested.path);
                  });
                }
              });
            }
          });
        } else {
          // Expand the clicked top-level item
          newSet.add(path);
        }
      } else {
        // If clicking a nested item, check if its parents are expanded
        const immediateParent = getImmediateParent(path);
        const topLevelParent = getTopLevelParent(path);
        
        // For a nested item to be expandable:
        // 1. Its top-level parent must be expanded
        // 2. If it has an immediate parent (not direct child of top-level), that must also be expanded
        const canExpand =
          topLevelParent &&
          prev.has(topLevelParent) &&
          (!immediateParent || immediateParent === topLevelParent || prev.has(immediateParent));

        if (canExpand) {
          // Parents are expanded, so we can toggle this nested item
          if (newSet.has(path)) {
            newSet.delete(path);
            // Also collapse any nested children of this item
            const item = findItemByPath(path);
            if (item?.children) {
              item.children.forEach((child) => {
                newSet.delete(child.path);
              });
            }
          } else {
            newSet.add(path);
          }
        } else {
          // Parents are not expanded, so we can't expand this nested item
          // This shouldn't happen in normal usage, but handle gracefully
          return prev;
        }
      }

      return newSet;
    });
  };

  // Helper to find an item by path
  const findItemByPath = (path: string): NavItem | null => {
    for (const item of navigationItems) {
      if (item.path === path) return item;
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path) return child;
          if (child.children) {
            for (const nested of child.children) {
              if (nested.path === path) return nested;
            }
          }
        }
      }
    }
    return null;
  };

  return (
    <ul className={styles.navList} ref={navRef}>
      {navigationItems.map((item) => (
        <NavItemComponent
          key={item.path}
          item={item}
          onNavigate={onNavigate}
          expandedPath={expandedPaths}
          onToggleExpand={handleToggleExpand}
        />
      ))}
    </ul>
  );
}

