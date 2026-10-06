import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform System Settings | Admin Console',
};

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Platform Configuration & System Settings</h1>
          <p className="portal-subtitle">
            Configure global business rules, security deposit thresholds, escrow policies, and
            operational maintenance.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Marketplace Fee & Commission Rules
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Default Owner Commission Take-Rate (%)
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="12.5%"
                readOnly
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Commercial Referral Commission (%)
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="5.0%"
                readOnly
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Security Deposit Hold Mechanism
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Escrow Pre-Authorization (Auto-Release in 48h)"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Operations & Verification Policy
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Mandatory KYC Verification Requirement
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Aadhaar / GSTIN required above ₹5,000 rental"
                readOnly
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Pre-Dispatch Field Inspection
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Enforced for Power, Machinery & Heavy Cameras"
                readOnly
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Customer Support Escalation Window
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Within 15 minutes during operating hours"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
