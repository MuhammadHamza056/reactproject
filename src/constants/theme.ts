import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    background: '#F8FAFC',
    backgroundElement: '#F1F5F9',
    backgroundSelected: '#E2E8F0',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',

    // Sneaker Dashboard Brand Accents
    primary: '#FF5500', // Iconic Sneaker Orange
    primaryLight: '#FFF1EB',
    primaryDark: '#E04A00',
    accent: '#6366F1', // Indigo Accent
    accentLight: '#EEF2FF',

    // Status colors
    success: '#10B981',
    successLight: '#ECFDF5',
    warning: '#F59E0B',
    warningLight: '#FFFBEB',
    danger: '#EF4444',
    dangerLight: '#FEF2F2',
    info: '#3B82F6',
    infoLight: '#EFF6FF',

    // Sidebar Specific Tokens
    sidebarBg: '#FFFFFF',
    sidebarBorder: '#E2E8F0',
    sidebarHover: '#F8FAFC',
    sidebarActive: '#FFF1EB',
    sidebarActiveText: '#FF5500',
    badgeBg: '#F1F5F9',
    badgeText: '#475569',
  },
  dark: {
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    background: '#090D16',
    backgroundElement: '#121824',
    backgroundSelected: '#1E293B',
    surface: '#0F172A',
    surfaceElevated: '#172236',
    border: '#1E293B',
    borderLight: '#162030',

    // Sneaker Dashboard Brand Accents
    primary: '#FF6B2B', // Vibrant Sneaker Flame
    primaryLight: '#2C160B',
    primaryDark: '#FF4800',
    accent: '#818CF8', // Indigo Neon
    accentLight: '#1E1B4B',

    // Status colors
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#78350F',
    danger: '#F87171',
    dangerLight: '#7F1D1D',
    info: '#60A5FA',
    infoLight: '#1E3A8A',

    // Sidebar Specific Tokens
    sidebarBg: '#0D131F',
    sidebarBorder: '#1A2333',
    sidebarHover: '#162032',
    sidebarActive: '#2C170C',
    sidebarActiveText: '#FF7A3D',
    badgeBg: '#1E293B',
    badgeText: '#CBD5E1',
  },
} as const;

export type ThemeType = 'light' | 'dark';
export type ThemeColor = keyof typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, serif',
    rounded: '"SF Pro Rounded", system-ui, sans-serif',
    mono: '"JetBrains Mono", Menlo, Consolas, monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  seven: 64,
} as const;

export const Layout = {
  sidebarExpandedWidth: 260,
  sidebarCollapsedWidth: 78,
  topNavHeight: 64,
  maxContentWidth: 1400,
  borderRadiusSm: 8,
  borderRadiusMd: 12,
  borderRadiusLg: 16,
  borderRadiusFull: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = Layout.maxContentWidth;
