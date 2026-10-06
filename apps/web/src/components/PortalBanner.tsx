import React from 'react';

export interface PortalBannerProps {
  moduleName: string;
}

export const PortalBanner: React.FC<PortalBannerProps> = ({ moduleName }) => {
  return (
    <div className="structural-notice">
      <div>
        <strong>Phase 2 Structural Layout:</strong> Displaying information architecture for{' '}
        <code>{moduleName}</code>. Business logic, authentication, and database services are
        intentionally decoupled until subsequent phases.
      </div>
      <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Read-Only Overview</span>
    </div>
  );
};
