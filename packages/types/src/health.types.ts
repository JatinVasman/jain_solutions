/**
 * Health Check Types
 */

export type ServiceHealthStatus =
  'healthy' | 'degraded' | 'unreachable' | 'connected' | 'disconnected';

export interface ServiceHealthMap {
  api: ServiceHealthStatus;
  database: ServiceHealthStatus;
  redis?: ServiceHealthStatus;
  [key: string]: ServiceHealthStatus | undefined;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  services: ServiceHealthMap;
}
