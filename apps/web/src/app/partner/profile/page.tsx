import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Organization Profile | Partner Portal',
};

export default function PartnerProfilePage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Partner Entity Profile & Bank Mandate</h1>
          <p className="portal-subtitle">
            Commercial registration details, verified point-of-contact, and commission disbursement
            mandate.
          </p>
        </div>
        <div>
          <span className="status-badge available">✓ KYC Verified</span>
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
            Entity Information
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
                Agency / Partner Legal Name
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Nexus B2B Equipment Liaisons Pvt Ltd"
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
                GSTIN / Corporate Identification Number
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="07AAACN9021R1Z8"
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
                Primary Representative Email
              </label>
              <input
                type="email"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="liaison@nexus-b2b.example"
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
                Phone Number
              </label>
              <input
                type="tel"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="+91 98110 54321"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Banking & Payout Mandate
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
                Beneficiary Name
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="Nexus B2B Equipment Liaisons Pvt Ltd"
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
                Bank & Branch
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="HDFC Bank, Connaught Place Branch"
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
                Account Number (Masked)
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="••••••••••••5912"
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
                IFSC Code
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                defaultValue="HDFC0000289"
                readOnly
              />
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <button className="btn btn-primary" type="button">
                Request Bank Mandate Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
