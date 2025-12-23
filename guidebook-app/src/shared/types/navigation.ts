// Navigation type definitions

export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  icon?: string; // Lucide icon name
}

export interface NavigationConfig {
  items: NavItem[];
}

