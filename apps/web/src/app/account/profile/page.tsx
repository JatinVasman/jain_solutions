import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings | Customer Account',
};

export default function AccountProfilePage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Profile Settings</h1>
          <p className="portal-subtitle">
            Manage your personal identification, billing entity, and communication preferences.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: '680px',
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
        }}
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Full Name</label>
              <input type="text" className="form-input" defaultValue="Vikram Verma" />
            </div>
            <div>
              <label className="filter-label">Phone Number</label>
              <input type="tel" className="form-input" defaultValue="+91 98765 43210" />
            </div>
          </div>

          <div>
            <label className="filter-label">Email Address</label>
            <input type="email" className="form-input" defaultValue="vikram@company.com" />
          </div>

          <div>
            <label className="filter-label">Company / Registered Legal Entity</label>
            <input type="text" className="form-input" defaultValue="Horizon Productions Pvt Ltd" />
          </div>

          <div>
            <label className="filter-label">GSTIN / Tax ID</label>
            <input type="text" className="form-input" defaultValue="07AAAAA0000A1Z5" />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
          >
            Save Changes (Structural Demo)
          </button>
        </form>
      </div>
    </div>
  );
}
