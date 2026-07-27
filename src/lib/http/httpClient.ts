import { getApiBaseUrl } from '@/lib/config/apiConfig';
import { authStore } from '@/lib/auth/authStore';

/**
 * Pure HTTP transport. Knows how to send an authenticated request and surface
 * errors — and NOTHING about products, reservations, real-estate leads, or any
 * offline seed data.
 *
 * WHY THIS EXISTS (decoupling):
 * The old request() in services/api/fallbackHandler.ts was ~2,600 lines because
 * transport + auth + config + the offline mock for every entity lived in one
 * function. Here transport is isolated. Offline behaviour is provided from the
 * OUTSIDE via an OfflineResolver (dependency inversion), so each feature owns
 * its own fallback instead of all of them piling into one file.
 *
 * See ARCHITECTURE.md → "Migrating the data layer" for how to move the existing
 * offline handlers behind registerOfflineResolver() feature by feature.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: string,
  ) {
    super(`API Error: ${status} ${statusText} - ${body}`);
    this.name = 'ApiError';
  }
}

/** A feature-supplied handler that answers a request while the backend is unreachable. */
export type OfflineResolver = (
  path: string,
  options: RequestInit | undefined,
  error: unknown,
) => Promise<unknown> | undefined;

let offlineResolver: OfflineResolver | null = null;

/** Register the offline fallback (called once at app startup). */
export function registerOfflineResolver(resolver: OfflineResolver): void {
  offlineResolver = resolver;
}

const FALLBACK_STATUSES = new Set([401, 403, 404, 500, 502, 503, 504]);

function shouldFallBack(err: unknown): boolean {
  if (err instanceof ApiError) return FALLBACK_STATUSES.has(err.status);
  return true; // network-level error (backend offline)
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${getApiBaseUrl()}${path}`;

  try {
    const headers: Record<string, string> = {};
    if (!(options?.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    const token = authStore.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {
      cache: 'no-store',
      ...options,
      headers: { ...headers, ...options?.headers },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new ApiError(response.status, response.statusText, body);
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : {}) as T;
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      authStore.clearToken();
    }

    if (shouldFallBack(err) && offlineResolver) {
      const resolved = await offlineResolver(path, options, err);
      if (resolved !== undefined) return resolved as T;
    }
    throw err;
  }
}
