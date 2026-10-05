import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShoeStore } from '../store/useShoeStore';
import { ShoeBrand } from '../types/shoe.types';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

const BRANDS: (ShoeBrand | 'All')[] = [
  'All',
  'Jordan',
  'Nike',
  'Adidas',
  'New Balance',
  'Yeezy',
  'Asics',
];

export function ShoeStatsHeader() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const totalValue = useShoeStore((s) => s.getTotalInventoryValue());
  const totalPairs = useShoeStore((s) => s.getTotalStockPairs());
  const lowStock = useShoeStore((s) => s.getLowStockCount());
  const selectedBrand = useShoeStore((s) => s.filters.selectedBrand);
  const setSelectedBrand = useShoeStore((s) => s.setSelectedBrand);

  return (
    <View style={styles.container}>
      {/* 3 Metric Summary Pills */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="cash-outline" size={18} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>INVENTORY VALUE</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>
              ${totalValue.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.iconBox, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="cube-outline" size={18} color={colors.accent} />
          </View>
          <View>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>TOTAL PAIRS</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {totalPairs.toLocaleString()} pairs
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.iconBox, { backgroundColor: colors.warningLight }]}>
            <Ionicons name="warning-outline" size={18} color={colors.warning} />
          </View>
          <View>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>LOW STOCK ALERTS</Text>
            <Text style={[styles.metricValue, { color: colors.warning }]}>
              {lowStock} styles
            </Text>
          </View>
        </View>
      </View>

      {/* Brand Horizontal Filter Chips */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brandChipsContainer}>
          {BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand;
            return (
              <Pressable
                key={brand}
                onPress={() => setSelectedBrand(brand)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}>
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.text,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}>
                  {brand}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    gap: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '800',
    marginTop: 2,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandChipsContainer: {
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
  },
});
