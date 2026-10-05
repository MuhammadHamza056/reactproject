import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

interface SidebarBrandProps {
  isCollapsed: boolean;
  onPress?: () => void;
}

export function SidebarBrand({ isCollapsed, onPress }: SidebarBrandProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Brand Icon / Logo Emblem */}
      <View
        style={[
          styles.logoBox,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
          },
        ]}>
        <Ionicons name="flame" size={22} color="#FFFFFF" />
      </View>

      {/* Brand Name & Tagline (visible when not collapsed) */}
      {!isCollapsed && (
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.brandName, { color: colors.text }]}>KICKS VAULT</Text>
            <View style={styles.liveIndicator}>
              <View style={[styles.liveDot, { backgroundColor: colors.success }]} />
              <Text style={[styles.liveText, { color: colors.success }]}>LIVE</Text>
            </View>
          </View>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Sneakerhead Dashboard
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 12,
  },
  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  subTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 99,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
