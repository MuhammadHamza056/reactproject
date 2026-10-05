import { create } from 'zustand';
import { NavigationStoreState } from '../types/navigation.types';
import { secureStorage } from '@/features/auth/services/secureStorageService';

export const useNavigationStore = create<NavigationStoreState>((set, get) => ({
  isCollapsed: false,
  isMobileDrawerOpen: false,
  activeHref: '/',

  toggleCollapse: () => {
    const next = !get().isCollapsed;
    set({ isCollapsed: next });
    secureStorage.setItem('shoes_dashboard_prefs', JSON.stringify({ isCollapsed: next })).catch(() => {});
  },

  setCollapsed: (collapsed: boolean) => {
    set({ isCollapsed: collapsed });
    secureStorage.setItem('shoes_dashboard_prefs', JSON.stringify({ isCollapsed: collapsed })).catch(() => {});
  },

  setMobileDrawerOpen: (open: boolean) => {
    set({ isMobileDrawerOpen: open });
  },

  setActiveHref: (href: string) => {
    set({ activeHref: href });
  },
}));
