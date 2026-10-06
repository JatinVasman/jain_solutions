import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KYC & Verification Documents | Customer Account',
};

export default function AccountDocumentsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Identity & Business Documents</h1>
          <p className="portal-subtitle">
            Uploaded credentials for high-value equipment rental authorization.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm">
          + Upload Document
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-title)' }}>
              Business Registration (COI)
            </span>
            <span className="status-badge available">Verified</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Certificate of Incorporation &bull; PDF (2.4 MB)
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Approved on 15 Aug 2026 by Risk Team
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-title)' }}>
              GSTIN Registration Certificate
            </span>
            <span className="status-badge available">Verified</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            GSTIN: 07AAAAA0000A1Z5 &bull; PDF (1.1 MB)
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Approved on 15 Aug 2026
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-title)' }}>
              Authorized Signatory ID
            </span>
            <span className="status-badge available">Verified</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            National Identification Card &bull; JPEG (3.8 MB)
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Approved on 15 Aug 2026
          </p>
        </div>
      </div>
    </div>
  );
}
