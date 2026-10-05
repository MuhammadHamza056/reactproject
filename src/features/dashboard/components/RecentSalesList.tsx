import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { RecentSale } from '../types/dashboard.types';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

const MOCK_SALES: RecentSale[] = [
  {
    id: 'ord_101',
    sneakerName: "Air Jordan 1 Retro Low OG 'Reverse Mocha'",
    sneakerSku: 'DM7866-162',
    buyerName: 'Julian Sterling',
    buyerLocation: 'Brooklyn, NY',
    size: 'US 10.5',
    price: 1150,
    status: 'Shipped',
    timestamp: '12m ago',
    imageUrl:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ord_102',
    sneakerName: "Air Jordan 4 Retro 'Military Black'",
    sneakerSku: 'DH6927-111',
    buyerName: 'David K.',
    buyerLocation: 'Miami, FL',
    size: 'US 9.5',
    price: 480,
    status: 'Completed',
    timestamp: '45m ago',
    imageUrl:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ord_103',
    sneakerName: "Nike Kobe 6 Protro 'Grinch'",
    sneakerSku: 'CW2190-300',
    buyerName: 'Mateo Rossi',
    buyerLocation: 'Los Angeles, CA',
    size: 'US 11.0',
    price: 850,
    status: 'Processing',
    timestamp: '2h ago',
    imageUrl:
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ord_104',
    sneakerName: "Air Jordan 1 High 'Chicago Lost & Found'",
    sneakerSku: 'DZ5485-612',
    buyerName: 'Chloe Bennett',
    buyerLocation: 'Chicago, IL',
    size: 'US 8.5',
    price: 420,
    status: 'Shipped',
    timestamp: '3h ago',
    imageUrl:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=300&q=80',
  },
];

export function RecentSalesList() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>RECENT GRAIL SALES</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Live sneaker drops & customer orders
          </Text>
        </View>
        <Pressable onPress={() => router.push('/orders')}>
          <Text style={[styles.viewAllText, { color: colors.primary }]}>View All →</Text>
        </Pressable>
      </View>

      {/* List items */}
      <View style={styles.list}>
        {MOCK_SALES.map((sale, idx) => (
          <View
            key={sale.id}
            style={[
              styles.saleRow,
              idx !== MOCK_SALES.length - 1 && {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            {/* Sneaker thumbnail using expo-image */}
            <Image
              source={{ uri: sale.imageUrl }}
              style={styles.thumbnail}
              contentFit="cover"
              transition={200}
            />

            {/* Sneaker & Buyer info */}
            <View style={styles.detailsCol}>
              <Text numberOfLines={1} style={[styles.sneakerName, { color: colors.text }]}>
                {sale.sneakerName}
              </Text>
              <Text style={[styles.buyerText, { color: colors.textSecondary }]}>
                {sale.buyerName} • {sale.buyerLocation} • <Text style={{ color: colors.primary, fontWeight: '700' }}>{sale.size}</Text>
              </Text>
            </View>

            {/* Price & Status */}
            <View style={styles.statusCol}>
              <Text style={[styles.price, { color: colors.text }]}>${sale.price}</Text>
              <Badge
                label={sale.status}
                variant={sale.status === 'Completed' ? 'success' : sale.status === 'Shipped' ? 'primary' : 'warning'}
                size="sm"
              />
            </View>
          </View>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    gap: 4,
  },
  saleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#1E293B',
  },
  detailsCol: {
    flex: 1,
  },
  sneakerName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  buyerText: {
    fontSize: 11,
  },
  statusCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
  },
});
