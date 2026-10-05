import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationStore } from '../store/useNavigationStore';
import { LeftSidebar } from './LeftSidebar';
import { Colors } from '@/constants/theme';

export function MobileTopNav() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const isMobileDrawerOpen = useNavigationStore((s) => s.isMobileDrawerOpen);
  const setMobileDrawerOpen = useNavigationStore((s) => s.setMobileDrawerOpen);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.sidebarBg,
            borderBottomColor: colors.sidebarBorder,
          },
        ]}>
        {/* Hamburger Menu Trigger */}
        <Pressable
          onPress={() => setMobileDrawerOpen(true)}
          style={({ pressed }) => [
            styles.menuBtn,
            { backgroundColor: colors.backgroundElement },
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu">
          <Ionicons name="menu" size={22} color={colors.text} />
        </Pressable>

        {/* Brand */}
        <View style={styles.brandRow}>
          <View style={[styles.brandIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="flame" size={16} color="#FFF" />
          </View>
          <Text style={[styles.brandText, { color: colors.text }]}>KICKS VAULT</Text>
        </View>

        {/* Live Badge */}
        <View style={styles.livePill}>
          <View style={[styles.liveDot, { backgroundColor: colors.success }]} />
          <Text style={[styles.liveText, { color: colors.success }]}>LIVE</Text>
        </View>
      </View>

      {/* Slide-over Drawer Modal for Mobile */}
      <Modal
        visible={isMobileDrawerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMobileDrawerOpen(false)}>
        <View style={styles.modalOverlay}>
          {/* Backdrop press to close */}
          <Pressable
            style={styles.backdrop}
            onPress={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Sidebar */}
          <View style={[styles.drawerContent, { backgroundColor: colors.sidebarBg }]}>
            <LeftSidebar onItemPress={() => setMobileDrawerOpen(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 40,
  },
  menuBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  drawerContent: {
    width: 280,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 16,
  },
});
