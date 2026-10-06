import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technician Profile | Freelancer Portal',
};

export default function FreelancerProfilePage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Field Technician Profile & Certifications</h1>
          <p className="portal-subtitle">
            Skill ratings, registered operating zones, background verification, and payout account.
          </p>
        </div>
        <div>
          <span className="status-badge available">✓ Background Checked & Certified</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Personal & Contact Details
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
                Full Name
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Ramesh Kumar"
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
                Mobile (Registered OTP)
              </label>
              <input
                type="tel"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="+91 98710 44123"
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
                Email Address
              </label>
              <input
                type="email"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="ramesh.tech402@example.com"
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
                Base Hub Location
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Okhla Industrial Area Phase 2, South Delhi"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Technical Badges & Specializations
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  marginBottom: '0.4rem',
                }}
              >
                Certified Competencies
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="status-badge available">Heavy Diesel Genset Commissioning</span>
                <span className="status-badge available">AV & Stage Rigging Certified</span>
                <span className="status-badge available">Industrial Motor Diagnostics</span>
                <span className="status-badge available">LiFePO4 ESS Safety Protocol</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  marginBottom: '0.4rem',
                }}
              >
                Bank Disbursal Account
              </p>
              <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                <strong>Bank:</strong> State Bank of India
              </p>
              <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                <strong>Account:</strong> ••••••••••••8194 (IFSC: SBIN0004052)
              </p>
              <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                <strong>Payout Frequency:</strong> Weekly (Every Friday)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
