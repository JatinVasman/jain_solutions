'use client';

import { useState, useEffect } from 'react';
import { healthService } from '../services/health.service';
import type { HealthCheckResponse } from '@rental-platform/types';

export interface UseHealthResult {
  data: HealthCheckResponse | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useHealth(): UseHealthResult {
  const [data, setData] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await healthService.getHealth();
      setData(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchHealth();
  }, []);

  return { data, loading, error, refresh: fetchHealth };
}
