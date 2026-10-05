import { create } from 'zustand';
import { StoreManager, AuthSession } from '../types/auth.types';
import { secureStorage } from '../services/secureStorageService';

interface AuthState extends AuthSession {
  isLoading: boolean;
  hasHydrated: boolean;
  login: (manager: StoreManager, token: string, apiKey: string) => Promise<void>;
  loginWithCredentials: (email: string, passcode: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateManager: (updates: Partial<StoreManager>) => Promise<void>;
  hydrateAuth: () => Promise<void>;
}

export const DEFAULT_STORE_MANAGER: StoreManager = {
  id: 'mgr_99420',
  name: 'Marcus Vance',
  email: 'marcus.v@kicksvault.com',
  role: 'Store Owner',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  storeName: 'KICKS VAULT',
  storeLocation: 'SoHo Flagship, NY',
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  hasHydrated: false,
  user: null,
  token: null,
  apiKey: null,

  hydrateAuth: async () => {
    set({ isLoading: true });
    try {
      const storedToken = await secureStorage.getItem('shoes_auth_token');
      const storedApiKey = await secureStorage.getItem('shoes_store_api_key');
      const storedUser = await secureStorage.getObject<StoreManager>('shoes_store_profile');

      if (storedToken && storedUser) {
        set({
          isAuthenticated: true,
          token: storedToken,
          apiKey: storedApiKey ?? 'kv_pk_live_89329482910398',
          user: storedUser,
          isLoading: false,
          hasHydrated: true,
        });
      } else {
        set({
          isAuthenticated: false,
          isLoading: false,
          hasHydrated: true,
        });
      }
    } catch (err) {
      console.error('[useAuthStore] Hydration error:', err);
      set({ isLoading: false, hasHydrated: true });
    }
  },

  loginWithCredentials: async (email: string, _passcode: string) => {
    set({ isLoading: true });
    // Simulate brief authentication check
    await new Promise((resolve) => setTimeout(resolve, 600));

    const token = `kv_sec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const apiKey = 'kv_pk_live_89329482910398';
    const manager: StoreManager = {
      ...DEFAULT_STORE_MANAGER,
      email: email || DEFAULT_STORE_MANAGER.email,
    };

    await secureStorage.setItem('shoes_auth_token', token);
    await secureStorage.setItem('shoes_store_api_key', apiKey);
    await secureStorage.setObject('shoes_store_profile', manager);

    set({
      isAuthenticated: true,
      user: manager,
      token,
      apiKey,
      isLoading: false,
    });

    return true;
  },

  login: async (manager, token, apiKey) => {
    await secureStorage.setItem('shoes_auth_token', token);
    await secureStorage.setItem('shoes_store_api_key', apiKey);
    await secureStorage.setObject('shoes_store_profile', manager);

    set({
      isAuthenticated: true,
      user: manager,
      token,
      apiKey,
    });
  },

  logout: async () => {
    await secureStorage.removeItem('shoes_auth_token');
    await secureStorage.removeItem('shoes_store_api_key');
    await secureStorage.removeItem('shoes_store_profile');

    set({
      isAuthenticated: false,
      user: null,
      token: null,
      apiKey: null,
    });
  },

  updateManager: async (updates) => {
    const current = get().user;
    if (!current) return;
    const updated = { ...current, ...updates };
    await secureStorage.setObject('shoes_store_profile', updated);
    set({ user: updated });
  },
}));
