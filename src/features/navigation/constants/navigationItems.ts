import { NavItem } from '../types/navigation.types';

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Overview',
    href: '/',
    icon: 'grid-outline',
    activeIcon: 'grid',
    category: 'main',
  },
  {
    id: 'inventory',
    title: 'Shoes Inventory',
    href: '/inventory',
    icon: 'layers-outline',
    activeIcon: 'layers',
    badge: '48 Drops',
    badgeVariant: 'primary',
    category: 'catalog',
  },
  {
    id: 'orders',
    title: 'Orders & Drops',
    href: '/orders',
    icon: 'cart-outline',
    activeIcon: 'cart',
    badge: 6,
    badgeVariant: 'warning',
    category: 'catalog',
  },
  {
    id: 'analytics',
    title: 'Sales & Revenue',
    href: '/analytics',
    icon: 'bar-chart-outline',
    activeIcon: 'bar-chart',
    category: 'main',
  },
  {
    id: 'settings',
    title: 'Settings & Security',
    href: '/settings',
    icon: 'shield-checkmark-outline',
    activeIcon: 'shield-checkmark',
    category: 'system',
  },
];
