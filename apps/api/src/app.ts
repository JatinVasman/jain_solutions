// =============================================================================
// EXPRESS APPLICATION
// Central configuration of the Express app: middleware, routes, error handling.
// Import this in tests without spinning up a server.
// =============================================================================

import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';
import { healthRouter } from './modules/health/health.routes.js';

export async function createApp(): Promise<Express> {
  const app = express();

  // ─── Security middleware ───────────────────────────────────────────────────
  app.use(helmet());

  app.use(
    cors({
      origin: process.env['CORS_ALLOWED_ORIGINS']?.split(',') ?? ['http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  // ─── Request parsing ──────────────────────────────────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ─── Performance middleware ───────────────────────────────────────────────
  app.use(compression());

  // ─── Logging ─────────────────────────────────────────────────────────────
  if (process.env['NODE_ENV'] !== 'test') {
    app.use(morgan(process.env['NODE_ENV'] === 'production' ? 'combined' : 'dev'));
  }

  // ─── API Routes ───────────────────────────────────────────────────────────
  // Routes are added here as modules are implemented in future phases.
  // Only the health check is active now.
  app.use('/api/v1/health', healthRouter);

  // TODO (Phase 3): app.use('/api/v1/auth', authRouter);
  // TODO (Phase 4): app.use('/api/v1/catalogue', catalogueRouter);
  // TODO (Phase 7): app.use('/api/v1/rentals', rentalsRouter);
  // TODO (Phase 12): app.use('/api/v1/payments', paymentsRouter);
  // (Additional routes added per phase)

  // ─── 404 Handler ─────────────────────────────────────────────────────────
  app.use(notFoundHandler);

  // ─── Global Error Handler ─────────────────────────────────────────────────
  // Must be last middleware registered
  app.use(errorHandler);

  return app;
}
