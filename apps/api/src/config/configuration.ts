export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  apiUrl: string;
  webUrl: string;
  database: {
    url: string;
  };
  redis: {
    url: string;
  };
  cors: {
    origins: string[];
  };
  logging: {
    level: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresInDays: number;
  };
  auth: {
    cookieDomain?: string;
    secureCookie: boolean;
    googleClientId?: string;
    googleClientSecret?: string;
    googleCallbackUrl?: string;
  };
  email: {
    provider: string;
    fromEmail: string;
    fromName: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPass?: string;
  };
}

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || process.env.API_PORT || '4000', 10),
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  apiUrl: process.env.API_URL || 'http://localhost:4000',
  webUrl: process.env.WEB_URL || 'http://localhost:3000',
  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/rental_marketplace?schema=public',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map((o) => o.trim()),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-super-secure-rental-jwt-secret-phase3-key-2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresInDays: parseInt(process.env.JWT_REFRESH_DAYS || '7', 10),
  },
  auth: {
    cookieDomain: process.env.COOKIE_DOMAIN || undefined,
    secureCookie: process.env.NODE_ENV === 'production',
    googleClientId: process.env.GOOGLE_CLIENT_ID || undefined,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || undefined,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/api/v1/auth/google/callback',
  },
  email: {
    provider: process.env.EMAIL_PROVIDER || 'console',
    fromEmail: process.env.EMAIL_FROM || 'noreply@jainsolutions.local',
    fromName: process.env.EMAIL_FROM_NAME || 'Jain Solutions Marketplace',
    smtpHost: process.env.SMTP_HOST || undefined,
    smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
    smtpUser: process.env.SMTP_USER || undefined,
    smtpPass: process.env.SMTP_PASS || undefined,
  },
});
