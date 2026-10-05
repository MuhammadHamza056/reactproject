import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/theme';

interface OrderItem {
  id: string;
  orderNumber: string;
  sneakerName: string;
  sneakerSku: string;
  buyer: string;
  email: string;
  size: string;
  price: number;
  status: 'Completed' | 'Shipped' | 'Processing' | 'Pending Verification';
  date: string;
  imageUrl: string;
}

const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'ord_1',
    orderNumber: '#KV-94821',
    sneakerName: "Air Jordan 1 Retro Low OG 'Reverse Mocha'",
    sneakerSku: 'DM7866-162',
    buyer: 'Julian Sterling',
    email: 'julian.s@vaultvip.com',
    size: 'US 10.5',
    price: 1150,
    status: 'Shipped',
    date: 'Oct 05, 2026 • 18:42',
    imageUrl:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ord_2',
    orderNumber: '#KV-94820',
    sneakerName: "Air Jordan 4 Retro 'Military Black'",
    sneakerSku: 'DH6927-111',
    buyer: 'David Kim',
    email: 'dkim.sneakers@gmail.com',
    size: 'US 9.5',
    price: 480,
    status: 'Completed',
    date: 'Oct 05, 2026 • 17:15',
    imageUrl:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ord_3',
    orderNumber: '#KV-94819',
    sneakerName: "Nike Kobe 6 Protro 'Grinch'",
    sneakerSku: 'CW2190-300',
    buyer: 'Mateo Rossi',
    email: 'mrossi@solecollector.it',
    size: 'US 11.0',
    price: 850,
    status: 'Processing',
    date: 'Oct 05, 2026 • 15:30',
    imageUrl:
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ord_4',
    orderNumber: '#KV-94818',
    sneakerName: "Air Jordan 1 High 'Chicago Lost & Found'",
    sneakerSku: 'DZ5485-612',
    buyer: 'Chloe Bennett',
    email: 'chloe.b@nyckicks.io',
    size: 'US 8.5',
    price: 420,
    status: 'Completed',
    date: 'Oct 05, 2026 • 14:02',
    imageUrl:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ord_5',
    orderNumber: '#KV-94817',
    sneakerName: "New Balance 990v6 Made in USA 'Castlerock'",
    sneakerSku: 'M990GL6',
    buyer: 'Liam O’Connor',
    email: 'liam.oc@bostonrunner.org',
    size: 'US 10.0',
    price: 220,
    status: 'Shipped',
    date: 'Oct 05, 2026 • 11:20',
    imageUrl:
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=300&q=80',
  },
];

type OrderFilter = 'All' | 'Processing' | 'Shipped' | 'Completed';

export default function OrdersScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];
  const [filter, setFilter] = useState<OrderFilter>('All');

  const filteredOrders = MOCK_ORDERS.filter((o) => {
    if (filter === 'All') return true;
    return o.status === filter;
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Orders & Drops</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Customer fulfillment, authentication verification, and dispatch tracking
          </Text>
        </View>

        {/* Filter Pills */}
        <View
          style={[
            styles.filterRow,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}>
          {(['All', 'Processing', 'Shipped', 'Completed'] as OrderFilter[]).map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterBtn,
                filter === f && { backgroundColor: colors.primary },
              ]}>
              <Text
                style={[
                  styles.filterBtnText,
                  {
                    color: filter === f ? '#FFFFFF' : colors.textSecondary,
                    fontWeight: filter === f ? '700' : '500',
                  },
                ]}>
                {f}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Orders List */}
      <View
        style={[
          styles.tableCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        {filteredOrders.map((order, idx) => (
          <View
            key={order.id}
            style={[
              styles.orderRow,
              idx !== filteredOrders.length - 1 && {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            {/* Sneaker Thumbnail using expo-image */}
            <Image
              source={{ uri: order.imageUrl }}
              style={styles.thumbnail}
              contentFit="cover"
              transition={200}
            />

            {/* Main Info */}
            <View style={styles.infoCol}>
              <View style={styles.orderTopLine}>
                <Text style={[styles.orderNumber, { color: colors.primary }]}>
                  {order.orderNumber}
                </Text>
                <Text style={[styles.dateText, { color: colors.textMuted }]}>
                  {order.date}
                </Text>
              </View>
              <Text numberOfLines={1} style={[styles.sneakerName, { color: colors.text }]}>
                {order.sneakerName}
              </Text>
              <Text style={[styles.buyerText, { color: colors.textSecondary }]}>
                {order.buyer} • Size: <Text style={{ color: colors.text, fontWeight: '700' }}>{order.size}</Text>
              </Text>
            </View>

            {/* Price & Status */}
            <View style={styles.statusCol}>
              <Text style={[styles.priceText, { color: colors.text }]}>
                ${order.price}
              </Text>
              <Badge
                label={order.status}
                variant={
                  order.status === 'Completed'
                    ? 'success'
                    : order.status === 'Shipped'
                    ? 'primary'
                    : 'warning'
                }
                size="sm"
              />
            </View>
          </View>
        ))}
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
  filterRow: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  filterBtnText: {
    fontSize: 12,
  },
  tableCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#1E293B',
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  orderTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderNumber: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 11,
  },
  sneakerName: {
    fontSize: 14,
    fontWeight: '700',
  },
  buyerText: {
    fontSize: 12,
  },
  statusCol: {
    alignItems: 'flex-end',
    gap: 6,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
