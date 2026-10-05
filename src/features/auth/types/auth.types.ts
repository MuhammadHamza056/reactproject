export interface StoreManager {
  id: string;
  name: string;
  email: string;
  role: 'Store Owner' | 'Inventory Lead' | 'Store Manager';
  avatarUrl: string;
  storeName: string;
  storeLocation: string;
}

export interface AuthSession {
  token: string | null;
  apiKey: string | null;
  isAuthenticated: boolean;
  user: StoreManager | null;
}

export type StorageKey =
  | 'shoes_auth_token'
  | 'shoes_store_api_key'
  | 'shoes_manager_pin'
  | 'shoes_store_profile'
  | 'shoes_dashboard_prefs';
