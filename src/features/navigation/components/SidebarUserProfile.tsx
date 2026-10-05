import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

interface SidebarUserProfileProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarUserProfile({
  isCollapsed,
  onToggleCollapse,
}: SidebarUserProfileProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderTopColor: colors.sidebarBorder,
          backgroundColor: colors.sidebarBg,
        },
      ]}>
      {/* Collapse / Expand Toggle Button */}
      <Pressable
        onPress={onToggleCollapse}
        style={({ pressed }) => [
          styles.collapseBtn,
          {
            backgroundColor: colors.backgroundElement,
            borderColor: colors.border,
          },
          pressed && { opacity: 0.7 },
        ]}
        accessibilityRole="button"
        accessibilityLabel={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        <Ionicons
          name={isCollapsed ? 'chevron-forward' : 'chevron-back'}
          size={16}
          color={colors.textSecondary}
        />
        {!isCollapsed && (
          <Text style={[styles.collapseText, { color: colors.textSecondary }]}>
            Collapse Menu
          </Text>
        )}
      </Pressable>

      {/* User Card */}
      <View
        style={[
          styles.profileCard,
          isCollapsed ? styles.profileCardCollapsed : styles.profileCardExpanded,
        ]}>
        {/* Avatar using expo-image */}
        <Pressable
          onPress={() => router.push('/settings')}
          style={styles.avatarWrapper}>
          <Image
            source={{ uri: user?.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={300}
            accessibilityLabel={user?.name ?? 'User Profile'}
          />
          <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
        </Pressable>

        {!isCollapsed && (
          <Pressable
            onPress={() => router.push('/settings')}
            style={styles.userInfo}>
            <Text numberOfLines={1} style={[styles.userName, { color: colors.text }]}>
              {user?.name ?? 'Store Manager'}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.userRole, { color: colors.textSecondary }]}>
              {user?.role ?? 'Owner'} • {user?.storeLocation ?? 'NYC'}
            </Text>
          </Pressable>
        )}

        {/* Logout Button */}
        {!isCollapsed ? (
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              styles.logoutBtn,
              pressed && { opacity: 0.6 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Log out">
            <Ionicons name="log-out-outline" size={18} color={colors.textSecondary} />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              styles.logoutBtnCollapsed,
              pressed && { opacity: 0.6 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Log out">
            <Ionicons name="log-out-outline" size={16} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 10,
    gap: 10,
  },
  collapseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  collapseText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  profileCardExpanded: {
    padding: 8,
  },
  profileCardCollapsed: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000000',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
  },
  userRole: {
    fontSize: 11,
    marginTop: 1,
  },
  logoutBtn: {
    padding: 6,
    borderRadius: 6,
  },
  logoutBtnCollapsed: {
    padding: 4,
    borderRadius: 6,
  },
});
