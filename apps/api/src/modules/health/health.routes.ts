// =============================================================================
// HEALTH CHECK MODULE
// A simple endpoint to confirm the API is running.
// Used by load balancers, monitoring, and CI health checks.
// =============================================================================

import { Router, type Request, type Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is operational.',
    data: {
      status: 'ok',
      environment: process.env['NODE_ENV'] ?? 'development',
      timestamp: new Date().toISOString(),
      version: process.env['npm_package_version'] ?? '0.1.0',
    },
  });
});
