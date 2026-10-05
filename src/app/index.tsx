import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { RevenueChart } from '@/features/dashboard/components/RevenueChart';
import { RecentSalesList } from '@/features/dashboard/components/RecentSalesList';
import { DashboardMetric } from '@/features/dashboard/types/dashboard.types';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

const METRICS: DashboardMetric[] = [
  {
    id: 'm1',
    title: 'Gross Revenue',
    value: '$184,920.00',
    change: '+14.2%',
    isPositive: true,
    icon: 'cash-outline',
    variant: 'primary',
  },
  {
    id: 'm2',
    title: 'Pairs Sold',
    value: '1,428',
    change: '+8.5%',
    isPositive: true,
    icon: 'flame-outline',
    variant: 'warning',
  },
  {
    id: 'm3',
    title: 'Active Drops',
    value: '48 Styles',
    change: '+4 new',
    isPositive: true,
    icon: 'cube-outline',
    variant: 'accent',
  },
  {
    id: 'm4',
    title: 'Vault Security',
    value: 'Hardware Lock',
    change: 'Protected',
    isPositive: true,
    icon: 'shield-checkmark-outline',
    variant: 'success',
  },
];

export default function DashboardScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Top Banner / Welcome Row */}
      <View style={styles.headerRow}>
        <View>
          <View style={styles.badgeRow}>
            <View style={[styles.pill, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="sparkles" size={12} color={colors.primary} />
              <Text style={[styles.pillText, { color: colors.primary }]}>
                SNEAKERHEAD OS 2.4
              </Text>
            </View>
          </View>
          <Text style={[styles.mainTitle, { color: colors.text }]}>
            Store Overview & Drops
          </Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Real-time analytics, inventory levels, and authenticated orders
          </Text>
        </View>

        {/* Action Button Row */}
        <View style={styles.actionRow}>
          <Pressable
            onPress={() => router.push('/inventory')}
            style={({ pressed }) => [
              styles.btnSecondary,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
              pressed && { opacity: 0.8 },
            ]}>
            <Ionicons name="layers-outline" size={15} color={colors.text} />
            <Text style={[styles.btnSecondaryText, { color: colors.text }]}>
              All Sneakers
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/orders')}
            style={({ pressed }) => [
              styles.btnPrimary,
              {
                backgroundColor: colors.primary,
                shadowColor: colors.primary,
              },
              pressed && { opacity: 0.85 },
            ]}>
            <Ionicons name="cart-outline" size={15} color="#FFF" />
            <Text style={styles.btnPrimaryText}>Manage Orders</Text>
          </Pressable>
        </View>
      </View>

      {/* 4 Stat Cards */}
      <View style={styles.metricsGrid}>
        {METRICS.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </View>

      {/* Main Grid: Revenue Graph & Recent Sales */}
      <View style={styles.twoColumnGrid}>
        {/* Left Column: Revenue Chart */}
        <View style={styles.chartCol}>
          <RevenueChart />
        </View>

        {/* Right Column: Recent Sales */}
        <View style={styles.salesCol}>
          <RecentSalesList />
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
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  badgeRow: {
    marginBottom: 6,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 13,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  btnSecondaryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    gap: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  chartCol: {
    flex: 1.4,
    minWidth: 320,
  },
  salesCol: {
    flex: 1,
    minWidth: 320,
  },
});
