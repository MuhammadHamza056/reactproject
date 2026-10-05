import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { StorageKey } from '../types/auth.types';

/**
 * Production-ready Secure Storage Service.
 * Implements expo-secure-store on iOS & Android devices,
 * with a safe persistent fallback (localStorage / in-memory) for Web/Desktop environments.
 */
class SecureStorageService {
  private memoryCache: Map<string, string> = new Map();
  private isNativeSecureStoreAvailable: boolean | null = null;

  /**
   * Checks whether expo-secure-store is available in the current runtime.
   */
  private async checkAvailability(): Promise<boolean> {
    if (this.isNativeSecureStoreAvailable !== null) {
      return this.isNativeSecureStoreAvailable;
    }

    try {
      if (Platform.OS === 'web') {
        this.isNativeSecureStoreAvailable = false;
        return false;
      }
      const available = await SecureStore.isAvailableAsync();
      this.isNativeSecureStoreAvailable = available;
      return available;
    } catch {
      this.isNativeSecureStoreAvailable = false;
      return false;
    }
  }

  /**
   * Securely saves a string value for a given key.
   */
  async setItem(key: StorageKey, value: string): Promise<void> {
    try {
      const isAvailable = await this.checkAvailability();
      if (isAvailable) {
        await SecureStore.setItemAsync(key, value);
      } else if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      } else {
        this.memoryCache.set(key, value);
      }
    } catch (error) {
      console.warn(`[SecureStorageService] Error setting item for key "${key}":`, error);
      this.memoryCache.set(key, value);
    }
  }

  /**
   * Securely retrieves a stored string value by key.
   */
  async getItem(key: StorageKey): Promise<string | null> {
    try {
      const isAvailable = await this.checkAvailability();
      if (isAvailable) {
        return await SecureStore.getItemAsync(key);
      } else if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      } else {
        return this.memoryCache.get(key) ?? null;
      }
    } catch (error) {
      console.warn(`[SecureStorageService] Error getting item for key "${key}":`, error);
      return this.memoryCache.get(key) ?? null;
    }
  }

  /**
   * Removes an item securely.
   */
  async removeItem(key: StorageKey): Promise<void> {
    try {
      const isAvailable = await this.checkAvailability();
      if (isAvailable) {
        await SecureStore.deleteItemAsync(key);
      } else if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      } else {
        this.memoryCache.delete(key);
      }
    } catch (error) {
      console.warn(`[SecureStorageService] Error deleting item for key "${key}":`, error);
      this.memoryCache.delete(key);
    }
  }

  /**
   * Helper to store JSON-serializable objects securely.
   */
  async setObject<T>(key: StorageKey, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    await this.setItem(key, serialized);
  }

  /**
   * Helper to retrieve and parse JSON-serializable objects securely.
   */
  async getObject<T>(key: StorageKey): Promise<T | null> {
    const raw = await this.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
}

export const secureStorage = new SecureStorageService();
