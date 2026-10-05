import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type NavItemCategory = 'main' | 'catalog' | 'system';

export interface NavItem {
  id: string;
  title: string;
  href: '/' | '/inventory' | '/orders' | '/analytics' | '/settings';
  icon: IconName;
  activeIcon: IconName;
  badge?: string | number;
  badgeVariant?: 'primary' | 'success' | 'warning' | 'neutral';
  category: NavItemCategory;
}

export interface NavigationStoreState {
  isCollapsed: boolean;
  isMobileDrawerOpen: boolean;
  activeHref: string;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setMobileDrawerOpen: (open: boolean) => void;
  setActiveHref: (href: string) => void;
}
