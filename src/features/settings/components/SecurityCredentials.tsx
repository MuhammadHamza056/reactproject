import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Platform, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { secureStorage } from '@/features/auth/services/secureStorageService';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Colors } from '@/constants/theme';

export function SecurityCredentials() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const apiKey = useAuthStore((s) => s.apiKey);
  const [managerPin, setManagerPin] = useState('');
  const [customSecretKey, setCustomSecretKey] = useState('');
  const [customSecretValue, setCustomSecretValue] = useState('');
  const [readSecretResult, setReadSecretResult] = useState<string | null>(null);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [isPinVisible, setIsPinVisible] = useState(false);

  useEffect(() => {
    // Hydrate existing PIN from secure storage
    secureStorage.getItem('shoes_manager_pin').then((pin) => {
      if (pin) setManagerPin(pin);
    });
  }, []);

  const handleSavePin = async () => {
    if (!managerPin) return;
    await secureStorage.setItem('shoes_manager_pin', managerPin);
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2500);
  };

  const handleSaveCustomSecret = async () => {
    if (!customSecretKey || !customSecretValue) return;
    await secureStorage.setItem(customSecretKey as any, customSecretValue);
    setReadSecretResult(`Successfully encrypted & saved to SecureStore: [${customSecretKey}]`);
    setCustomSecretValue('');
  };

  const handleReadCustomSecret = async () => {
    if (!customSecretKey) return;
    const val = await secureStorage.getItem(customSecretKey as any);
    if (val) {
      setReadSecretResult(`Decrypted Value: "${val}"`);
    } else {
      setReadSecretResult(`Key "${customSecretKey}" not found in SecureStore.`);
    }
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
        <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
          <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={[styles.title, { color: colors.text }]}>
            EXPO SECURE STORAGE ENGINE
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Hardware-backed encryption for store manager keys & credentials
          </Text>
        </View>
      </View>

      {/* Storage Runtime Info Pill */}
      <View
        style={[
          styles.runtimeInfo,
          {
            backgroundColor: colors.backgroundElement,
            borderColor: colors.border,
          },
        ]}>
        <Ionicons name="hardware-chip-outline" size={16} color={colors.accent} />
        <Text style={[styles.runtimeText, { color: colors.text }]}>
          Active Engine:{' '}
          <Text style={{ fontWeight: '700', color: colors.accent }}>
            {Platform.OS === 'web'
              ? 'Web Secure Storage (Safe Encrypted Fallback)'
              : 'expo-secure-store (Apple Keychain / Android Keystore)'}
          </Text>
        </Text>
      </View>

      {/* API Key Display */}
      <View style={styles.fieldGroup}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          STORE API KEY (SECURE STORE PERSISTED)
        </Text>
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}>
          <TextInput
            editable={false}
            value={apiKey ?? 'kv_pk_live_default_key'}
            style={[styles.input, { color: colors.text }]}
          />
          <View style={[styles.secureBadge, { backgroundColor: colors.successLight }]}>
            <Ionicons name="lock-closed" size={12} color={colors.success} />
            <Text style={[styles.secureBadgeText, { color: colors.success }]}>ENCRYPTED</Text>
          </View>
        </View>
      </View>

      {/* Store Manager PIN */}
      <View style={styles.fieldGroup}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          MANAGER ACCESS PIN (SAVED TO KEYCHAIN)
        </Text>
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}>
          <TextInput
            placeholder="Set 4-6 digit store PIN (e.g. 9842)"
            placeholderTextColor={colors.textMuted}
            value={managerPin}
            onChangeText={setManagerPin}
            secureTextEntry={!isPinVisible}
            keyboardType="numeric"
            style={[styles.input, { color: colors.text }]}
          />
          <Pressable
            onPress={() => setIsPinVisible(!isPinVisible)}
            style={styles.eyeBtn}>
            <Ionicons
              name={isPinVisible ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={colors.textSecondary}
            />
          </Pressable>
          <Pressable
            onPress={handleSavePin}
            style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.saveBtnText}>
              {isSavedFeedback ? 'Saved!' : 'Save PIN'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Interactive Key-Value Tester */}
      <View style={[styles.testerSection, { borderTopColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          LIVE SECURE STORE KEY-VALUE TESTER
        </Text>
        <View style={styles.testerInputs}>
          <TextInput
            placeholder="Key (e.g. stripe_vault_secret)"
            placeholderTextColor={colors.textMuted}
            value={customSecretKey}
            onChangeText={setCustomSecretKey}
            style={[
              styles.testerInput,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
          <TextInput
            placeholder="Value to encrypt..."
            placeholderTextColor={colors.textMuted}
            value={customSecretValue}
            onChangeText={setCustomSecretValue}
            style={[
              styles.testerInput,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.testerActions}>
          <Pressable
            onPress={handleSaveCustomSecret}
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
            <Ionicons name="save-outline" size={14} color="#FFF" />
            <Text style={styles.actionBtnText}>Write to SecureStore</Text>
          </Pressable>
          <Pressable
            onPress={handleReadCustomSecret}
            style={[
              styles.actionBtn,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                borderWidth: 1,
              },
            ]}>
            <Ionicons name="key-outline" size={14} color={colors.text} />
            <Text style={[styles.actionBtnText, { color: colors.text }]}>
              Read Key
            </Text>
          </Pressable>
        </View>

        {readSecretResult && (
          <View
            style={[
              styles.resultBox,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={[styles.resultText, { color: colors.text }]}>
              {readSecretResult}
            </Text>
          </View>
        )}
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
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  runtimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  runtimeText: {
    fontSize: 12,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 13,
    padding: 0,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  secureBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  eyeBtn: {
    padding: 6,
    marginRight: 6,
  },
  saveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  testerSection: {
    borderTopWidth: 1,
    paddingTop: 16,
    gap: 10,
  },
  testerInputs: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  testerInput: {
    flex: 1,
    minWidth: 180,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 13,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  testerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  resultText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
