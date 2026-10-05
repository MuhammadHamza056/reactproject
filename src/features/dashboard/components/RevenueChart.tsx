import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TimeRange } from '../types/dashboard.types';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

const TIME_RANGES: TimeRange[] = ['24h', '7d', '30d', '90d', 'YTD'];

const CHART_DATA = [
  { label: 'Mon', value: 65, amount: '$18.2K' },
  { label: 'Tue', value: 82, amount: '$24.6K' },
  { label: 'Wed', value: 45, amount: '$12.8K' },
  { label: 'Thu', value: 95, amount: '$31.5K' },
  { label: 'Fri', value: 100, amount: '$38.2K' },
  { label: 'Sat', value: 88, amount: '$29.4K' },
  { label: 'Sun', value: 72, amount: '$22.1K' },
];

export function RevenueChart() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];
  const [selectedRange, setSelectedRange] = useState<TimeRange>('7d');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}>
      {/* Header & Range Selector */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>REVENUE TRAJECTORY</Text>
          <View style={styles.amountRow}>
            <Text style={[styles.mainAmount, { color: colors.text }]}>$176,800.00</Text>
            <View style={[styles.livePill, { backgroundColor: colors.successLight }]}>
              <Text style={[styles.livePillText, { color: colors.success }]}>+18.4%</Text>
            </View>
          </View>
        </View>

        {/* Range Buttons */}
        <View style={[styles.rangeGroup, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          {TIME_RANGES.map((r) => {
            const isSelected = selectedRange === r;
            return (
              <Pressable
                key={r}
                onPress={() => setSelectedRange(r)}
                style={[
                  styles.rangeBtn,
                  isSelected && {
                    backgroundColor: colors.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.rangeText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}>
                  {r}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Bar Chart Visualization */}
      <View style={styles.chartArea}>
        <View style={styles.barsContainer}>
          {CHART_DATA.map((item) => {
            const heightPercent = `${item.value}%` as any;
            return (
              <View key={item.label} style={styles.barColumn}>
                <Text style={[styles.barAmount, { color: colors.textMuted }]}>
                  {item.amount}
                </Text>
                <View style={[styles.barTrack, { backgroundColor: colors.backgroundElement }]}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: heightPercent,
                        backgroundColor: item.value >= 90 ? colors.primary : colors.accent,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barLabel, { color: colors.textSecondary }]}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Summary Footer */}
      <View style={[styles.footerRow, { borderTopColor: colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>AVG BASKET VALUE</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>$485.20</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>CONVERSION RATE</Text>
          <Text style={[styles.statValue, { color: colors.success }]}>4.82%</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>TOP SELLER BRAND</Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>Jordan Retro</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  mainAmount: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  livePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  livePillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  rangeGroup: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 8,
    borderWidth: 1,
    gap: 2,
  },
  rangeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rangeText: {
    fontSize: 11,
  },
  chartArea: {
    height: 180,
    marginVertical: 20,
    justifyContent: 'flex-end',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    gap: 8,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: 6,
  },
  barAmount: {
    fontSize: 10,
    fontWeight: '600',
  },
  barTrack: {
    width: '60%',
    maxWidth: 32,
    height: 120,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    gap: 3,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
  },
});
