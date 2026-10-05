import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { DashboardShell } from '@/features/navigation/components/DashboardShell';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'dark';
  const scheme = colorScheme === 'unspecified' ? 'dark' : colorScheme;
  const colors = Colors[scheme];

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <DashboardShell>
        <Slot />
      </DashboardShell>
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
