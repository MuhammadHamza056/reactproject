import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, useColorScheme } from 'react-native';
import { usePathname, router } from 'expo-router';
import { NAVIGATION_ITEMS } from '../constants/navigationItems';
import { useNavigationStore } from '../store/useNavigationStore';
import { SidebarBrand } from './SidebarBrand';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserProfile } from './SidebarUserProfile';
import { Colors, Layout } from '@/constants/theme';

interface LeftSidebarProps {
  onItemPress?: () => void;
}

export function LeftSidebar({ onItemPress }: LeftSidebarProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const pathname = usePathname();
  const isCollapsed = useNavigationStore((s) => s.isCollapsed);
  const toggleCollapse = useNavigationStore((s) => s.toggleCollapse);

  const handleNavigate = (href: string) => {
    router.push(href as any);
    if (onItemPress) {
      onItemPress();
    }
  };

  const mainItems = NAVIGATION_ITEMS.filter((i) => i.category === 'main');
  const catalogItems = NAVIGATION_ITEMS.filter((i) => i.category === 'catalog');
  const systemItems = NAVIGATION_ITEMS.filter((i) => i.category === 'system');

  const width = isCollapsed ? Layout.sidebarCollapsedWidth : Layout.sidebarExpandedWidth;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          backgroundColor: colors.sidebarBg,
          borderRightColor: colors.sidebarBorder,
        },
      ]}>
      {/* Brand Header */}
      <SidebarBrand
        isCollapsed={isCollapsed}
        onPress={() => handleNavigate('/')}
      />

      <View style={[styles.divider, { backgroundColor: colors.sidebarBorder }]} />

      {/* Navigation Links Scroll Container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Main Section */}
        {!isCollapsed && (
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
            ANALYTICS & METRICS
          </Text>
        )}
        {mainItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
              onPress={() => handleNavigate(item.href)}
            />
          );
        })}

        {/* Catalog Section */}
        <View style={styles.sectionSpacer} />
        {!isCollapsed && (
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
            SNEAKER MANAGEMENT
          </Text>
        )}
        {catalogItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
              onPress={() => handleNavigate(item.href)}
            />
          );
        })}

        {/* System & Security Section */}
        <View style={styles.sectionSpacer} />
        {!isCollapsed && (
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
            SYSTEM & VAULT
          </Text>
        )}
        {systemItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
              onPress={() => handleNavigate(item.href)}
            />
          );
        })}
      </ScrollView>

      {/* User Profile & Collapse Toggle in Footer */}
      <SidebarUserProfile
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderRightWidth: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 50,
    ...(Platform.OS === 'web'
      ? {
          transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      : {}),
  },
  divider: {
    height: 1,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  sectionSpacer: {
    height: 10,
  },
});
