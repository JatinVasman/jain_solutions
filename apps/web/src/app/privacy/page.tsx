import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, protect, and manage user and business verification data.',
};

export default function PrivacyPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <div className="section-header">
        <span className="section-tag">Data Governance</span>
        <h1 className="section-title">Privacy & Data Protection Policy</h1>
        <p className="section-desc">
          Effective Date: October 2026. How we process and safeguard customer, owner, and partner
          information.
        </p>
      </div>

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          lineHeight: 1.8,
          color: 'var(--text-muted)',
        }}
      >
        <section
          style={{
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h2 style={{ color: 'var(--text-title)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            1. Information We Collect
          </h2>
          <p>
            To facilitate secure equipment rentals, we collect identification details (name,
            business registration, GSTIN, phone, delivery address) and equipment verification data
            (asset serial numbers, purchase proofs, inspection photos).
          </p>
        </section>

        <section
          style={{
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h2 style={{ color: 'var(--text-title)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            2. Use of Information
          </h2>
          <p>
            Your information is used strictly to fulfill rental agreements, arrange site logistics,
            process escrowed security deposits, verify identity against theft/loss, and provide
            customer support.
          </p>
        </section>

        <section
          style={{
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h2 style={{ color: 'var(--text-title)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            3. Data Security & Storage
          </h2>
          <p>
            All data in transit is encrypted using modern TLS 1.3 encryption. Government identity
            and business documentation uploaded for owner or customer verification are stored
            securely with strict role-based access controls.
          </p>
        </section>
      </div>
    </div>
  );
}
