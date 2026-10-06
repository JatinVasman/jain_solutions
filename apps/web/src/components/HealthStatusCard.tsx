'use client';

import React from 'react';
import { useHealth } from '../hooks/useHealth';
import { StatusBadge } from './StatusBadge';
import { envConfig } from '../lib/config';

export const HealthStatusCard: React.FC = () => {
  const { data, loading, error, refresh } = useHealth();

  return (
    <div className="status-card">
      <div className="status-header">
        <div>
          <h2 className="card-title">Backend Connectivity</h2>
          <p className="card-subtitle">
            Endpoint: <code className="endpoint-code">{envConfig.apiUrl}</code>
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="refresh-btn"
        >
          {loading ? 'Checking...' : 'Refresh Status'}
        </button>
      </div>

      <div className="service-grid">
        <div className="service-row">
          <span className="service-name">API Server</span>
          {loading ? (
            <StatusBadge status="loading" label="Checking" />
          ) : error ? (
            <StatusBadge status="unreachable" label="Unreachable" />
          ) : (
            <StatusBadge status="healthy" label="Online" />
          )}
        </div>

        <div className="service-row">
          <span className="service-name">Database (PostgreSQL)</span>
          {loading ? (
            <StatusBadge status="loading" label="Checking" />
          ) : error ? (
            <StatusBadge status="unreachable" label="Unknown" />
          ) : (
            <StatusBadge
              status={data?.services.database === 'connected' ? 'connected' : 'disconnected'}
              label={data?.services.database === 'connected' ? 'Connected' : 'Disconnected'}
            />
          )}
        </div>

        <div className="service-row">
          <span className="service-name">Environment</span>
          <span className="env-tag">{envConfig.isProduction ? 'Production' : 'Development'}</span>
        </div>
      </div>

      {data && (
        <div className="details-box">
          <div className="details-item">
            <span>Uptime:</span> <strong>{data.uptime}s</strong>
          </div>
          <div className="details-item">
            <span>Last Ping:</span> <strong>{new Date(data.timestamp).toLocaleTimeString()}</strong>
          </div>
        </div>
      )}

      {error && (
        <div className="error-box">
          <p className="error-title">Unable to reach API server:</p>
          <code className="error-message">{error.message}</code>
          <p className="error-hint">
            Ensure backend is running on{' '}
            <code>PORT {process.env.NEXT_PUBLIC_API_PORT || 4000}</code> (
            <code>pnpm --filter @rental-platform/api dev</code>).
          </p>
        </div>
      )}
    </div>
  );
};
