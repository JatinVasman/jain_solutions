// =============================================================================
// API CLIENT
// Central fetch wrapper for all backend API calls.
// Will be expanded with auth token injection in Phase 3.
// =============================================================================

const API_BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000/api/v1';

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined> | undefined;
}

/**
 * Core fetch wrapper — attaches base URL, handles JSON, throws on non-2xx.
 * All API functions should use this instead of calling fetch directly.
 */
export async function apiClient<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE}${path}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization header will be injected here in Phase 3 (Auth)
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  });

  const json = await response.json();

  if (!response.ok) {
    throw json; // Throw the full error envelope so callers can inspect it
  }

  return json as T;
}

export const api = {
  get: <T>(path: string, params?: FetchOptions['params']) =>
    apiClient<T>(path, { method: 'GET', params }),
  post: <T>(path: string, body?: unknown) =>
    apiClient<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    apiClient<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    apiClient<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => apiClient<T>(path, { method: 'DELETE' }),
};
