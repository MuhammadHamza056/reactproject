import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  elevated?: boolean;
}

export function GlassCard({ children, style, elevated = false }: GlassCardProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated ? colors.surfaceElevated : colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});
