import React, { useEffect } from 'react';
import { Slot, usePathname, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { DashboardShell } from '@/features/navigation/components/DashboardShell';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'dark';
  const scheme = colorScheme === 'unspecified' ? 'dark' : colorScheme;
  const colors = Colors[scheme];

  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const hydrateAuth = useAuthStore((s) => s.hydrateAuth);

  useEffect(() => {
    hydrateAuth().finally(() => {
      SplashScreen.hideAsync().catch(() => {});
    });
  }, [hydrateAuth]);

  // Auth Guard: Initial page is /login if unauthenticated
  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated && pathname !== '/login') {
      router.replace('/login');
    } else if (isAuthenticated && pathname === '/login') {
      router.replace('/');
    }
  }, [hasHydrated, isAuthenticated, pathname]);

  const isLoginPage = pathname === '/login';

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      {isLoginPage ? (
        // Full screen login page (no dashboard sidebar)
        <Slot />
      ) : (
        // Protected dashboard screens with left side menu bar
        <DashboardShell>
          <Slot />
        </DashboardShell>
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
});
