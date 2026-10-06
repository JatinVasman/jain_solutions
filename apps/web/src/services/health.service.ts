import { apiClient } from '../lib/api-client';
import { envConfig } from '../lib/config';
import type { HealthCheckResponse } from '@rental-platform/types';

export const healthService = {
  async getHealth(): Promise<HealthCheckResponse> {
    // Check root health endpoint
    const url = `${envConfig.apiRootUrl}/health`;
    return apiClient<HealthCheckResponse>(url);
  },
};
