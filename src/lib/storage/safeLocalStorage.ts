/**
 * Safe localStorage wrapper.
 *
 * WHY THIS EXISTS (decoupling):
 * Feature code used to touch window.localStorage directly in dozens of places,
 * each repeating the same "is window defined? did the write throw quota?" guards.
 * That is duplicated, browser-specific logic scattered through business code.
 * Route all persistence through here so:
 *   - SSR never crashes (window guard is centralised)
 *   - QuotaExceededError can't crash the app (write is swallowed + logged)
 *   - swapping storage (IndexedDB, memory, cookies) is a one-file change later.
 */

const hasWindow = (): boolean =>
  typeof window !== 'undefined' && !!window.localStorage;

export const safeLocalStorage = {
  get(key: string): string | null {
    if (!hasWindow()) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      console.warn(`localStorage read failed for "${key}":`, err);
      return null;
    }
  },

  set(key: string, value: string): void {
    if (!hasWindow()) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      // Most commonly QuotaExceededError — never let it crash the app.
      console.warn(`localStorage write failed for "${key}":`, err);
    }
  },

  remove(key: string): void {
    if (!hasWindow()) return;
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn(`localStorage remove failed for "${key}":`, err);
    }
  },

  /** Read + JSON.parse in one step; returns fallback on any failure. */
  getJSON<T>(key: string, fallback: T): T {
    const raw = this.get(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  /** JSON.stringify + write in one step. */
  setJSON(key: string, value: unknown): void {
    this.set(key, JSON.stringify(value));
  },
};
