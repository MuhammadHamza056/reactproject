import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardMetric } from '../types/dashboard.types';
import { Colors } from '@/constants/theme';

interface StatCardProps {
  metric: DashboardMetric;
}

export function StatCard({ metric }: StatCardProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const getVariantColor = () => {
    switch (metric.variant) {
      case 'primary':
        return { color: colors.primary, bg: colors.primaryLight };
      case 'success':
        return { color: colors.success, bg: colors.successLight };
      case 'warning':
        return { color: colors.warning, bg: colors.warningLight };
      case 'accent':
        return { color: colors.accent, bg: colors.accentLight };
      default:
        return { color: colors.primary, bg: colors.primaryLight };
    }
  };

  const v = getVariantColor();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}>
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: colors.textSecondary }]}>
          {metric.title.toUpperCase()}
        </Text>
        <View style={[styles.iconBox, { backgroundColor: v.bg }]}>
          <Ionicons name={metric.icon} size={18} color={v.color} />
        </View>
      </View>

      <Text style={[styles.value, { color: colors.text }]}>{metric.value}</Text>

      <View style={styles.trendRow}>
        <View
          style={[
            styles.trendPill,
            {
              backgroundColor: metric.isPositive
                ? colors.successLight
                : colors.dangerLight,
            },
          ]}>
          <Ionicons
            name={metric.isPositive ? 'arrow-up' : 'arrow-down'}
            size={12}
            color={metric.isPositive ? colors.success : colors.danger}
          />
          <Text
            style={[
              styles.trendText,
              { color: metric.isPositive ? colors.success : colors.danger },
            ]}>
            {metric.change}
          </Text>
        </View>
        <Text style={[styles.periodText, { color: colors.textMuted }]}>
          vs last month
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 220,
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '700',
  },
  periodText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
