import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import type { HealthCheckResponse } from '@rental-platform/types';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  async getHealth(): Promise<HealthCheckResponse> {
    return this.healthService.check();
  }

  @Get('api/v1/health')
  async getVersionedHealth(): Promise<HealthCheckResponse> {
    return this.healthService.check();
  }

  @Get()
  getRoot() {
    return {
      name: 'Rental Marketplace REST API',
      status: 'operational',
      version: '1.0.0',
      health: '/health',
    };
  }
}
