import React from 'react';

export interface StatusBadgeProps {
  status: 'healthy' | 'degraded' | 'unreachable' | 'connected' | 'disconnected' | 'loading';
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const displayLabel = label || status;

  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" />
      {displayLabel}
    </span>
  );
};
