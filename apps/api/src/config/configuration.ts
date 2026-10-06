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
});
