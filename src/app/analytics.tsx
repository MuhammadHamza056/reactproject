import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

const BRAND_BREAKDOWN = [
  { brand: 'Jordan Retro', percent: 48, revenue: '$88,760', color: '#FF5500' },
  { brand: 'Nike Dunk & Collabs', percent: 28, revenue: '$51,780', color: '#6366F1' },
  { brand: 'Yeezy Vault', percent: 12, revenue: '$22,190', color: '#10B981' },
  { brand: 'New Balance Made in USA', percent: 8, revenue: '$14,790', color: '#F59E0B' },
  { brand: 'Asics Sportstyle', percent: 4, revenue: '$7,400', color: '#EC4899' },
];

const TOP_MODELS = [
  {
    name: "Air Jordan 1 Retro Low OG 'Reverse Mocha'",
    sales: 142,
    margin: '46%',
    netProfit: '$42,600',
  },
  {
    name: "Nike Dunk Low Retro 'Panda'",
    sales: 680,
    margin: '22%',
    netProfit: '$13,600',
  },
  {
    name: "Air Jordan 4 Retro 'Military Black'",
    sales: 310,
    margin: '38%',
    netProfit: '$28,400',
  },
  {
    name: "Nike Kobe 6 Protro 'Grinch'",
    sales: 88,
    margin: '62%',
    netProfit: '$34,100',
  },
];

export default function AnalyticsScreen() {
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
          Revenue & Brand Analytics
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Deep dive into margins, brand share, and high-velocity sneaker models
        </Text>
      </View>

      {/* Brand Share Breakdown */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        <View style={styles.cardHeader}>
          <Ionicons name="pie-chart-outline" size={20} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            BRAND REVENUE SHARE
          </Text>
        </View>

        <View style={styles.brandList}>
          {BRAND_BREAKDOWN.map((b) => (
            <View key={b.brand} style={styles.brandItem}>
              <View style={styles.brandLabelRow}>
                <View style={styles.brandNameWithDot}>
                  <View style={[styles.dot, { backgroundColor: b.color }]} />
                  <Text style={[styles.brandName, { color: colors.text }]}>
                    {b.brand}
                  </Text>
                </View>
                <Text style={[styles.brandRevenue, { color: colors.text }]}>
                  {b.revenue} ({b.percent}%)
                </Text>
              </View>

              {/* Progress Bar Track */}
              <View
                style={[
                  styles.barTrack,
                  { backgroundColor: colors.backgroundElement },
                ]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${b.percent}%`,
                      backgroundColor: b.color,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Top Models Margin Table */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        <View style={styles.cardHeader}>
          <Ionicons name="trophy-outline" size={20} color={colors.warning} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            TOP EARNING MODELS (NET PROFIT)
          </Text>
        </View>

        <View style={styles.modelsTable}>
          {TOP_MODELS.map((model, idx) => (
            <View
              key={model.name}
              style={[
                styles.modelRow,
                idx !== TOP_MODELS.length - 1 && {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.modelRank}>
                <Text style={[styles.rankText, { color: colors.primary }]}>
                  #{idx + 1}
                </Text>
              </View>

              <View style={styles.modelNameCol}>
                <Text
                  numberOfLines={1}
                  style={[styles.modelName, { color: colors.text }]}>
                  {model.name}
                </Text>
                <Text style={[styles.modelSales, { color: colors.textSecondary }]}>
                  {model.sales} pairs sold
                </Text>
              </View>

              <View style={styles.marginCol}>
                <Text style={[styles.profitText, { color: colors.success }]}>
                  {model.netProfit}
                </Text>
                <Text style={[styles.marginBadge, { color: colors.textMuted }]}>
                  {model.margin} margin
                </Text>
              </View>
            </View>
          ))}
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
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  brandList: {
    gap: 14,
  },
  brandItem: {
    gap: 6,
  },
  brandLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandNameWithDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  brandName: {
    fontSize: 13,
    fontWeight: '600',
  },
  brandRevenue: {
    fontSize: 12,
    fontWeight: '700',
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  modelsTable: {
    gap: 2,
  },
  modelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  modelRank: {
    width: 28,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '800',
  },
  modelNameCol: {
    flex: 1,
  },
  modelName: {
    fontSize: 13,
    fontWeight: '700',
  },
  modelSales: {
    fontSize: 11,
    marginTop: 2,
  },
  marginCol: {
    alignItems: 'flex-end',
  },
  profitText: {
    fontSize: 14,
    fontWeight: '800',
  },
  marginBadge: {
    fontSize: 11,
    marginTop: 1,
  },
});
