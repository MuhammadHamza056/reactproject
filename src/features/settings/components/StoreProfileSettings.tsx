import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Platform, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Colors } from '@/constants/theme';

export function StoreProfileSettings() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const user = useAuthStore((s) => s.user);
  const updateManager = useAuthStore((s) => s.updateManager);

  const [name, setName] = useState(user?.name ?? '');
  const [storeName, setStoreName] = useState(user?.storeName ?? '');
  const [location, setLocation] = useState(user?.storeLocation ?? '');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = async () => {
    await updateManager({
      name,
      storeName,
      storeLocation: location,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <View style={[styles.avatarBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="camera-outline" size={12} color="#FFF" />
          </View>
        </View>

        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: colors.text }]}>
            {user?.name ?? 'Store Manager'}
          </Text>
          <Text style={[styles.role, { color: colors.primary }]}>
            {user?.role ?? 'Owner'} • {user?.storeName ?? 'KICKS VAULT'}
          </Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            {user?.email}
          </Text>
        </View>
      </View>

      {/* Editable Fields */}
      <View style={styles.form}>
        <View style={styles.fieldCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            MANAGER NAME
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.fieldCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            STORE NAME
          </Text>
          <TextInput
            value={storeName}
            onChangeText={setStoreName}
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.fieldCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            STORE LOCATION / BRANCH
          </Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <Pressable
          onPress={handleSave}
          style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
          <Ionicons name="checkmark-done" size={16} color="#FFF" />
          <Text style={styles.saveBtnText}>
            {savedMessage ? 'Profile Updated Securely!' : 'Save Store Profile'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1E293B',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  role: {
    fontSize: 12,
    fontWeight: '700',
  },
  email: {
    fontSize: 12,
  },
  form: {
    gap: 12,
  },
  fieldCol: {
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  input: {
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 13,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
