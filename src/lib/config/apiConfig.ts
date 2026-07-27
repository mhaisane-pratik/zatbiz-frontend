/**
 * Central API/runtime configuration.
 *
 * WHY THIS EXISTS (decoupling):
 * The base URL used to be hard-coded inside the transport function in
 * services/api/fallbackHandler.ts. That coupled "where the backend lives"
 * to "how we send a request". Config now lives in ONE place so environments
 * (local / staging / prod) and the offline behaviour can change without
 * touching networking or feature code.
 *
 * Precedence:
 *   1. NEXT_PUBLIC_API_URL env var (set per deployment)   -> canonical
 *   2. localStorage "zatbizApiEndpoint" (manual override)  -> debugging
 *   3. non-localhost host -> hosted backend                -> prod default
 *   4. http://localhost:8080                               -> dev default
 */

const HOSTED_BACKEND = 'https://zatbiz-backend.onrender.com';
const LOCAL_BACKEND = 'http://localhost:8080';
const API_ENDPOINT_OVERRIDE_KEY = 'zatbizApiEndpoint';

function normalize(url: string): string {
  return url.replace(/\/$/, '');
}

/** Returns the fully-qualified API base, e.g. "http://localhost:8080/api". */
export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return `${normalize(process.env.NEXT_PUBLIC_API_URL)}/api`;
  }

  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(API_ENDPOINT_OVERRIDE_KEY);
    if (saved) {
      return `${normalize(saved)}/api`;
    }
    if (window.location.hostname !== 'localhost') {
      return `${HOSTED_BACKEND}/api`;
    }
  }

  return `${LOCAL_BACKEND}/api`;
}

export const apiConfig = {
  getApiBaseUrl,
  API_ENDPOINT_OVERRIDE_KEY,
};
