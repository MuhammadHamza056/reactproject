import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export function LoginVisualHero() {
  const colors = Colors.dark;

  return (
    <View style={styles.container}>
      {/* High-res sneaker imagery with expo-image */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=85',
        }}
        style={styles.image}
        contentFit="cover"
        transition={400}
        accessibilityLabel="Grail Sneaker Hero Visual"
      />

      {/* Dark gradient overlay for luxury mood */}
      <View style={styles.gradientOverlay} />

      {/* Top Branding Pill */}
      <View style={styles.topBadgeRow}>
        <View style={[styles.brandPill, { borderColor: 'rgba(255, 255, 255, 0.15)' }]}>
          <View style={[styles.flameIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="flame" size={14} color="#FFF" />
          </View>
          <Text style={styles.brandPillText}>KICKS VAULT</Text>
          <View style={styles.badgeDivider} />
          <Text style={styles.editionText}>ARCHIVE & RETAIL OS</Text>
        </View>
      </View>

      {/* Bottom Sneaker Quote & Metadata */}
      <View style={styles.bottomContent}>
        <View style={styles.verifiedTag}>
          <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
          <Text style={[styles.verifiedTagText, { color: colors.primary }]}>
            VAULT VERIFIED & AUTHENTICATED
          </Text>
        </View>

        <Text style={styles.heroHeadline}>
          Where Rare Grails Meet Next-Gen Retail.
        </Text>

        <Text style={styles.heroDescription}>
          The centralized inventory management, drop analytics, and secure order fulfillment portal for certified sneaker dealers.
        </Text>

        {/* Feature Highlights Pills */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Text style={styles.featureNumber}>14,200+</Text>
            <Text style={styles.featureLabel}>PAIRS TRACKED</Text>
          </View>
          <View style={styles.featureSeparator} />
          <View style={styles.featureItem}>
            <Text style={styles.featureNumber}>$4.8M+</Text>
            <Text style={styles.featureLabel}>VOLUME SECURED</Text>
          </View>
          <View style={styles.featureSeparator} />
          <View style={styles.featureItem}>
            <Text style={styles.featureNumber}>100%</Text>
            <Text style={styles.featureLabel}>VERIFIED DROPS</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.4, // Takes more space on the left side as requested
    minHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#090D16',
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(9, 13, 22, 0.65)',
  },
  topBadgeRow: {
    position: 'absolute',
    top: 36,
    left: 36,
    zIndex: 10,
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    gap: 8,
  },
  flameIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandPillText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  badgeDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  editionText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    zIndex: 10,
    gap: 12,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 85, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 0, 0.3)',
  },
  verifiedTagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heroHeadline: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  heroDescription: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 520,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'flex-start',
    gap: 20,
  },
  featureItem: {
    gap: 2,
  },
  featureNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  featureLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  featureSeparator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});
