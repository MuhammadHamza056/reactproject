import React from 'react';
import { View, Text, StyleSheet, ViewStyle, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

interface BadgeProps {
  label: string | number;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'primary', size = 'sm', style }: BadgeProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: colors.primaryLight,
          text: colors.primary,
          border: 'rgba(255, 85, 0, 0.2)',
        };
      case 'success':
        return {
          bg: colors.successLight,
          text: colors.success,
          border: 'rgba(16, 185, 129, 0.2)',
        };
      case 'warning':
        return {
          bg: colors.warningLight,
          text: colors.warning,
          border: 'rgba(245, 158, 11, 0.2)',
        };
      case 'danger':
        return {
          bg: colors.dangerLight,
          text: colors.danger,
          border: 'rgba(239, 68, 68, 0.2)',
        };
      case 'accent':
        return {
          bg: colors.accentLight,
          text: colors.accent,
          border: 'rgba(99, 102, 241, 0.2)',
        };
      case 'neutral':
      default:
        return {
          bg: colors.badgeBg,
          text: colors.badgeText,
          border: colors.border,
        };
    }
  };

  const v = getVariantStyles();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          paddingVertical: isSm ? 2 : 4,
          paddingHorizontal: isSm ? 6 : 10,
        },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: v.text,
            fontSize: isSm ? 11 : 12,
            fontWeight: '600',
          },
        ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    letterSpacing: 0.3,
  },
});
