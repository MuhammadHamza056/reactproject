import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Sneaker } from '../types/shoe.types';
import { Badge } from '@/components/ui/Badge';
import { useShoeStore } from '../store/useShoeStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

interface ShoeCardProps {
  sneaker: Sneaker;
  onPress?: () => void;
}

export function ShoeCard({ sneaker, onPress }: ShoeCardProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];
  const updateStock = useShoeStore((s) => s.updateStock);

  const getStatusBadgeVariant = () => {
    switch (sneaker.status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Sold Out':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && { opacity: 0.95 },
      ]}>
      {/* Sneaker Image Container with expo-image */}
      <View style={[styles.imageContainer, { backgroundColor: colors.backgroundElement }]}>
        <Image
          source={{ uri: sneaker.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
          accessibilityLabel={sneaker.name}
        />

        {/* Brand Tag Float */}
        <View style={styles.brandTag}>
          <Text style={styles.brandTagText}>{sneaker.brand.toUpperCase()}</Text>
        </View>

        {/* Stock Status Badge */}
        <View style={styles.statusBadgeFloat}>
          <Badge
            label={sneaker.status}
            variant={getStatusBadgeVariant()}
            size="sm"
          />
        </View>
      </View>

      {/* Details Area */}
      <View style={styles.infoArea}>
        <Text style={[styles.skuText, { color: colors.textMuted }]}>
          SKU: {sneaker.sku}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.nameText, { color: colors.text }]}>
          {sneaker.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.colorwayText, { color: colors.textSecondary }]}>
          {sneaker.colorway}
        </Text>

        {/* Price & Stock Row */}
        <View style={[styles.priceRow, { borderTopColor: colors.border }]}>
          <View>
            <Text style={[styles.priceLabel, { color: colors.textMuted }]}>
              MARKET VALUE
            </Text>
            <View style={styles.priceContainer}>
              <Text style={[styles.marketPrice, { color: colors.primary }]}>
                ${sneaker.marketPrice}
              </Text>
              <Text style={[styles.retailPrice, { color: colors.textMuted }]}>
                ${sneaker.retailPrice}
              </Text>
            </View>
          </View>

          {/* Quick Stock Controls */}
          <View style={styles.stockControl}>
            <Text style={[styles.stockLabel, { color: colors.textMuted }]}>
              STOCK: <Text style={{ color: colors.text, fontWeight: '700' }}>{sneaker.stockCount}</Text>
            </Text>
            <View style={styles.btnRow}>
              <Pressable
                onPress={() => updateStock(sneaker.id, Math.max(0, sneaker.stockCount - 1))}
                style={[styles.counterBtn, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
                <Ionicons name="remove" size={14} color={colors.text} />
              </Pressable>
              <Pressable
                onPress={() => updateStock(sneaker.id, sneaker.stockCount + 1)}
                style={[styles.counterBtn, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
                <Ionicons name="add" size={14} color={colors.text} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    height: 190,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  brandTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  brandTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusBadgeFloat: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  infoArea: {
    padding: 16,
  },
  skuText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    minHeight: 40,
  },
  colorwayText: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  priceRow: {
    borderTopWidth: 1,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 2,
  },
  marketPrice: {
    fontSize: 18,
    fontWeight: '800',
  },
  retailPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  stockControl: {
    alignItems: 'flex-end',
  },
  stockLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 6,
  },
  counterBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
