import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Platform,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';
import { Colors } from '@/constants/theme';

export function LoginForm() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  const [email, setEmail] = useState('marcus.v@kicksvault.com');
  const [passcode, setPasscode] = useState('••••••••');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loginWithCredentials = useAuthStore((s) => s.loginWithCredentials);
  const isLoading = useAuthStore((s) => s.isLoading);

  const handleLogin = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your store manager email.');
      return;
    }
    setErrorMessage('');
    try {
      await loginWithCredentials(email, passcode);
      // Navigate to the home dashboard as requested
      router.replace('/');
    } catch {
      setErrorMessage('Authentication failed. Please verify credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('marcus.v@kicksvault.com');
    setPasscode('vault_passcode_2026');
    setErrorMessage('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.formCard}>
        {/* Brand Icon & Heading */}
        <View style={styles.header}>
          <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="flame" size={24} color="#FFF" />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Manager Login</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Access the sneaker store inventory, drops, and authenticated orders
          </Text>
        </View>

        {/* Error Feedback */}
        {errorMessage ? (
          <View style={[styles.errorBox, { backgroundColor: colors.dangerLight }]}>
            <Ionicons name="alert-circle" size={16} color={colors.danger} />
            <Text style={[styles.errorText, { color: colors.danger }]}>
              {errorMessage}
            </Text>
          </View>
        ) : null}

        {/* Input Fields */}
        <View style={styles.fields}>
          {/* Email / Store ID */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              STORE EMAIL / CURATOR ID
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}>
              <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
              <TextInput
                placeholder="manager@kicksvault.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          {/* Passcode */}
          <View style={styles.fieldGroup}>
            <View style={styles.passHeader}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                VAULT PASSCODE / PIN
              </Text>
              <Pressable onPress={() => setErrorMessage('Demo passcode: vault_passcode_2026')}>
                <Text style={[styles.forgotText, { color: colors.primary }]}>
                  Need Key?
                </Text>
              </Pressable>
            </View>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
              <TextInput
                placeholder="Enter 8+ char passcode"
                placeholderTextColor={colors.textMuted}
                value={passcode}
                onChangeText={setPasscode}
                secureTextEntry={!isPasswordVisible}
                style={[styles.input, { color: colors.text }]}
              />
              <Pressable
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeBtn}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          {/* Remember Me Toggle */}
          <Pressable
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberRow}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: rememberMe ? colors.primary : colors.border,
                  backgroundColor: rememberMe ? colors.primary : 'transparent',
                },
              ]}>
              {rememberMe && <Ionicons name="checkmark" size={12} color="#FFF" />}
            </View>
            <Text style={[styles.rememberText, { color: colors.text }]}>
              Encrypt & remember session (expo-secure-store)
            </Text>
          </Pressable>

          {/* Login Submit Button */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.submitBtn,
              {
                backgroundColor: colors.primary,
                shadowColor: colors.primary,
              },
              pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
            ]}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <>
                <Text style={styles.submitBtnText}>Sign In to Dashboard</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </>
            )}
          </Pressable>

          {/* Quick Demo Fill Button */}
          <Pressable
            onPress={handleFillDemo}
            style={({ pressed }) => [
              styles.demoFillBtn,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
              pressed && { opacity: 0.8 },
            ]}>
            <Ionicons name="flash-outline" size={14} color={colors.primary} />
            <Text style={[styles.demoFillText, { color: colors.text }]}>
              Auto-fill Demo Store Manager
            </Text>
          </Pressable>
        </View>

        {/* Security Footer Notice */}
        <View style={[styles.securityNotice, { borderTopColor: colors.border }]}>
          <Ionicons name="shield-checkmark" size={14} color={colors.success} />
          <Text style={[styles.securityNoticeText, { color: colors.textSecondary }]}>
            Protected by hardware-level <Text style={{ color: colors.text, fontWeight: '700' }}>expo-secure-store</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes the right side (~40% of the screen)
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: '100%',
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    gap: 22,
  },
  header: {
    gap: 8,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  fields: {
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 11,
    fontWeight: '700',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  eyeBtn: {
    padding: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    fontSize: 12,
    fontWeight: '500',
  },
  submitBtn: {
    height: 48,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  demoFillBtn: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    paddingTop: 16,
    gap: 6,
  },
  securityNoticeText: {
    fontSize: 11,
  },
});
