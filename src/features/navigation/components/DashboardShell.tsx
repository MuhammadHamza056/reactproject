import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LeftSidebar } from './LeftSidebar';
import { MobileTopNav } from './MobileTopNav';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];
  const hydrateAuth = useAuthStore((s) => s.hydrateAuth);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {isDesktop ? (
        <View style={styles.desktopContainer}>
          {/* Left Side Menu Bar */}
          <LeftSidebar />

          {/* Right Main Content & Top Header Area */}
          <View style={styles.mainContentWrapper}>
            {/* Desktop Top Header Bar */}
            <View
              style={[
                styles.topHeader,
                {
                  backgroundColor: colors.surface,
                  borderBottomColor: colors.border,
                },
              ]}>
              {/* Quick Search Bar */}
              <View
                style={[
                  styles.searchContainer,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.border,
                  },
                ]}>
                <Ionicons name="search" size={16} color={colors.textMuted} />
                <TextInput
                  placeholder="Search sneakers, SKU, brand, orders..."
                  placeholderTextColor={colors.textMuted}
                  style={[styles.searchInput, { color: colors.text }]}
                />
              </View>

              {/* Right Action Icons */}
              <View style={styles.topRightActions}>
                {/* Store Selector Pill */}
                <View
                  style={[
                    styles.storeSelector,
                    {
                      backgroundColor: colors.backgroundElement,
                      borderColor: colors.border,
                    },
                  ]}>
                  <Ionicons name="storefront-outline" size={14} color={colors.primary} />
                  <Text style={[styles.storeSelectorText, { color: colors.text }]}>
                    {user?.storeLocation ?? 'Flagship Store'}
                  </Text>
                </View>

                {/* Notification Bell */}
                <Pressable
                  style={({ pressed }) => [
                    styles.headerIconBtn,
                    {
                      backgroundColor: colors.backgroundElement,
                      borderColor: colors.border,
                    },
                    pressed && { opacity: 0.7 },
                  ]}>
                  <Ionicons name="notifications-outline" size={18} color={colors.text} />
                  <View
                    style={[styles.notifBadge, { backgroundColor: colors.primary }]}
                  />
                </Pressable>

                {/* Add Sneaker Drop Quick Button */}
                <Pressable
                  onPress={() => router.push('/inventory')}
                  style={({ pressed }) => [
                    styles.primaryActionBtn,
                    {
                      backgroundColor: colors.primary,
                      shadowColor: colors.primary,
                    },
                    pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                  ]}>
                  <Ionicons name="add" size={18} color="#FFFFFF" />
                  <Text style={styles.primaryActionText}>New Drop</Text>
                </Pressable>
              </View>
            </View>

            {/* Screen Content Container */}
            <View style={styles.contentBody}>{children}</View>
          </View>
        </View>
      ) : (
        <View style={styles.mobileContainer}>
          {/* Mobile Top Nav with Hamburger Drawer */}
          <MobileTopNav />

          {/* Screen Content Container */}
          <View style={styles.contentBody}>{children}</View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  mobileContainer: {
    flex: 1,
    height: '100%',
  },
  mainContentWrapper: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
  },
  topHeader: {
    height: 64,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    width: 340,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    padding: 0,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  storeSelectorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  contentBody: {
    flex: 1,
    height: '100%',
  },
});
