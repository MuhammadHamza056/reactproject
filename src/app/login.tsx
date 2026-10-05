import React from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LoginVisualHero } from '@/features/auth/components/LoginVisualHero';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View style={styles.container}>
      {isDesktop ? (
        <View style={styles.desktopLayout}>
          {/* Left Side: Large Sneaker Visual Hero (Takes More Space) */}
          <LoginVisualHero />

          {/* Right Side: Login Form */}
          <LoginForm />
        </View>
      ) : (
        <ScrollView
          style={styles.mobileLayout}
          contentContainerStyle={styles.mobileContent}
          showsVerticalScrollIndicator={false}>
          {/* Mobile Sneaker Banner */}
          <View style={styles.mobileHeroBanner}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
              }}
              style={styles.mobileBannerImage}
              contentFit="cover"
            />
            <View style={styles.mobileBannerOverlay} />
          </View>

          {/* Mobile Login Form */}
          <LoginForm />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#090D16',
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  mobileLayout: {
    flex: 1,
  },
  mobileContent: {
    flexGrow: 1,
  },
  mobileHeroBanner: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  mobileBannerImage: {
    width: '100%',
    height: '100%',
  },
  mobileBannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(9, 13, 22, 0.5)',
  },
});
