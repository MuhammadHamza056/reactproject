import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { StoreProfileSettings } from '@/features/settings/components/StoreProfileSettings';
import { SecurityCredentials } from '@/features/settings/components/SecurityCredentials';
import { Colors } from '@/constants/theme';

export default function SettingsScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Store Settings & Vault Security
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Manage store manager profiles and hardware-encrypted storage using expo-secure-store
        </Text>
      </View>

      {/* Two Column or Stacked Layout */}
      <View style={styles.grid}>
        <View style={styles.col}>
          <StoreProfileSettings />
        </View>

        <View style={styles.col}>
          <SecurityCredentials />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    gap: 20,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  col: {
    flex: 1,
    minWidth: 320,
  },
});
