/**
 * Frontend Runtime Configuration
 */

export const envConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Rental Marketplace',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  apiRootUrl: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1').replace(
    /\/api\/v1\/?$/,
    '',
  ),
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;
