import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ShoeStatsHeader } from '@/features/shoes/components/ShoeStatsHeader';
import { ShoeCard } from '@/features/shoes/components/ShoeCard';
import { useShoeStore } from '@/features/shoes/store/useShoeStore';
import { Colors } from '@/constants/theme';

export default function InventoryScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const filteredSneakers = useShoeStore((s) => s.getFilteredSneakers());
  const searchQuery = useShoeStore((s) => s.filters.searchQuery);
  const setSearchQuery = useShoeStore((s) => s.setSearchQuery);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Page Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Sneakers Inventory & Vault
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track real-time stock levels, market value appraisals, and SKU drops
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            placeholder="Search by sneaker name, brand, SKU or colorway..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
          />
          {searchQuery ? (
            <Ionicons
              name="close-circle"
              size={16}
              color={colors.textMuted}
              onPress={() => setSearchQuery('')}
            />
          ) : null}
        </View>
      </View>

      {/* Stats Summary & Brand Filter Chips */}
      <ShoeStatsHeader />

      {/* Sneakers Grid */}
      <View style={styles.grid}>
        {filteredSneakers.map((sneaker) => (
          <View key={sneaker.id} style={styles.cardWrapper}>
            <ShoeCard sneaker={sneaker} />
          </View>
        ))}
      </View>

      {filteredSneakers.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={48} color={colors.textMuted} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No Sneakers Found
          </Text>
          <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
            Try adjusting your search query or brand filter.
          </Text>
        </View>
      )}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 280,
    flex: 1,
    maxWidth: 420,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    padding: 0,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  cardWrapper: {
    width: '100%',
    padding: 8,
    maxWidth: '100%',
    ...(Platform.OS === 'web'
      ? {
          minWidth: 280,
          flexGrow: 1,
          flexBasis: '30%',
        }
      : {}),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  emptyDesc: {
    fontSize: 13,
  },
});
