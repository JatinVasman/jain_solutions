import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supplier Profile | Owner Portal',
};

export default function OwnerProfilePage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Supplier & Fleet Profile</h1>
          <p className="portal-subtitle">
            Manage company details, payout bank accounts, and warehouse contact persons.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: '720px',
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
        }}
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Supplier Business Name</label>
              <input
                type="text"
                className="form-input"
                defaultValue="Apex Power & Fleet Solutions"
              />
            </div>
            <div>
              <label className="filter-label">Business Registration Type</label>
              <input type="text" className="form-input" defaultValue="Private Limited Enterprise" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Operations Contact Name</label>
              <input
                type="text"
                className="form-input"
                defaultValue="Anil Kapoor (Fleet Director)"
              />
            </div>
            <div>
              <label className="filter-label">Direct Phone</label>
              <input type="tel" className="form-input" defaultValue="+91 98111 22334" />
            </div>
          </div>

          <div>
            <label className="filter-label">Registered Hub & Yard Address</label>
            <input
              type="text"
              className="form-input"
              defaultValue="Yard 12B, Industrial Area Phase II, Mayapuri, New Delhi 110064"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Bank Account Number (Payouts)</label>
              <input type="text" className="form-input" defaultValue="•••• •••• •••• 9012" />
            </div>
            <div>
              <label className="filter-label">IFSC Code</label>
              <input type="text" className="form-input" defaultValue="HDFC0001234" />
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-surface)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginTop: '0.5rem',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              🔒 <strong>Verification Status:</strong> Verified Tier-1 Equipment Supplier. Insurance
              policy active until March 2027.
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
          >
            Update Supplier Settings (Demo)
          </button>
        </form>
      </div>
    </div>
  );
}
