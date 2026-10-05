// =============================================================================
// SERVER ENTRY POINT
// This file only starts the HTTP server. All Express configuration lives in
// app.ts. Keeping them separate makes integration testing easier (app can be
// imported without starting a server).
// =============================================================================

import 'dotenv/config';
import { createApp } from './app.js';

const PORT = Number(process.env['PORT']) || 4000;

async function bootstrap(): Promise<void> {
  const app = await createApp();

  const server = app.listen(PORT, () => {
    console.log(`[server] Running in ${process.env['NODE_ENV'] ?? 'development'} mode`);
    console.log(`[server] Listening on http://localhost:${PORT}`);
    console.log(`[server] Health check: http://localhost:${PORT}/api/v1/health`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`\n[server] Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('[server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  console.error('[server] Failed to start:', err);
  process.exit(1);
});
