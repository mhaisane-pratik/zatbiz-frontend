import { safeLocalStorage } from '@/lib/storage/safeLocalStorage';

/**
 * Single source of truth for the auth token.
 *
 * WHY THIS EXISTS (decoupling):
 * The string 'authToken' and raw localStorage calls were repeated across the
 * transport layer, the login page, and multiple components. If the token key,
 * storage mechanism, or auth scheme ever changes, you'd have to hunt every
 * usage. Now every reader/writer goes through this module.
 */

const TOKEN_KEY = 'authToken';

export const authStore = {
  getToken(): string | null {
    return safeLocalStorage.get(TOKEN_KEY);
  },

  setToken(token: string): void {
    safeLocalStorage.set(TOKEN_KEY, token);
  },

  clearToken(): void {
    safeLocalStorage.remove(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
