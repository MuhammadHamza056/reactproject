import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavItem } from '../types/navigation.types';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/theme';

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onPress: () => void;
}

export function SidebarNavItem({
  item,
  isActive,
  isCollapsed,
  onPress,
}: SidebarNavItemProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];
  const [isHovered, setIsHovered] = useState(false);

  const iconName = isActive ? item.activeIcon : item.icon;
  const iconColor = isActive ? colors.primary : isHovered ? colors.text : colors.textSecondary;
  const textColor = isActive ? colors.text : isHovered ? colors.text : colors.textSecondary;

  const bgStyle = isActive
    ? { backgroundColor: colors.sidebarActive }
    : isHovered
    ? { backgroundColor: colors.sidebarHover }
    : { backgroundColor: 'transparent' };

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => Platform.OS === 'web' && setIsHovered(true)}
      onHoverOut={() => Platform.OS === 'web' && setIsHovered(false)}
      style={({ pressed }) => [
        styles.container,
        bgStyle,
        isCollapsed ? styles.containerCollapsed : styles.containerExpanded,
        pressed && { opacity: 0.8 },
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.title}>
      {/* Active Accent Bar on Left */}
      {isActive && (
        <View
          style={[
            styles.activeIndicator,
            { backgroundColor: colors.primary },
            isCollapsed && styles.activeIndicatorCollapsed,
          ]}
        />
      )}

      {/* Navigation Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={20} color={iconColor} />
        {/* Compact badge dot when collapsed */}
        {isCollapsed && item.badge !== undefined && (
          <View
            style={[
              styles.collapsedBadgeDot,
              {
                backgroundColor:
                  item.badgeVariant === 'warning' ? colors.warning : colors.primary,
              },
            ]}
          />
        )}
      </View>

      {/* Title & Badge (when expanded) */}
      {!isCollapsed && (
        <View style={styles.contentRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {
                color: textColor,
                fontWeight: isActive ? '700' : '500',
              },
            ]}>
            {item.title}
          </Text>

          {item.badge !== undefined && (
            <Badge
              label={item.badge}
              variant={item.badgeVariant ?? 'primary'}
              size="sm"
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 10,
    position: 'relative',
  },
  containerExpanded: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  containerCollapsed: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 6,
    bottom: 6,
    width: 3.5,
    borderRadius: 2,
  },
  activeIndicatorCollapsed: {
    left: 2,
  },
  iconContainer: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  collapsedBadgeDot: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.2,
  },
});
