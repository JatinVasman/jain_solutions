import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delivery Addresses | Customer Account',
};

export default function AccountAddressesPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Project Sites & Delivery Addresses</h1>
          <p className="portal-subtitle">
            Saved project locations for equipment dispatch and logistical returns.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm">
          + Add New Address
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
              Primary Studio & Office
            </span>
            <span className="status-badge available">Default</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Building 4, Sector 18, Commercial Zone
            <br />
            Gurugram, Haryana – 122002
            <br />
            Phone: +91 98765 43210
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-outline btn-sm">
              Edit
            </button>
            <button type="button" className="btn btn-outline btn-sm">
              Delete
            </button>
          </div>
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
              Project Site #2 (Film Warehouse)
            </span>
            <span className="status-badge neutral">Secondary</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Plot 45, Okhla Industrial Area Phase III
            <br />
            New Delhi – 110020
            <br />
            Phone: +91 98765 43210
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-outline btn-sm">
              Edit
            </button>
            <button type="button" className="btn btn-outline btn-sm">
              Set as Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
