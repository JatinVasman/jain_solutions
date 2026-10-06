import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import type { HealthCheckResponse, ServiceHealthStatus } from '@rental-platform/types';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async check(): Promise<HealthCheckResponse> {
    const isDbConnected = await this.prisma.isHealthy();
    const dbStatus: ServiceHealthStatus = isDbConnected ? 'connected' : 'disconnected';

    const env = this.configService.get<string>('nodeEnv', 'development');

    return {
      status: isDbConnected ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime() * 100) / 100,
      environment: env,
      services: {
        api: 'healthy',
        database: dbStatus,
      },
    };
  }
}
