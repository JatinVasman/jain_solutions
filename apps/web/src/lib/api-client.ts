import { envConfig } from './config';

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly error: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${envConfig.apiUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: options?.cache || 'no-store',
  });

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`;
    let errType = 'RequestError';

    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
      errType = errorData.error || errType;
    } catch {
      // Body not JSON
    }

    throw new ApiError(response.status, errType, errorMsg);
  }

  return response.json() as Promise<T>;
}
