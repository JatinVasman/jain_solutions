import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service & Rental Agreement',
  description: 'Terms and conditions governing equipment rental, security deposits, and usage.',
};

export default function TermsPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Terms of Service' }]} />

      <div className="section-header">
        <span className="section-tag">Legal Agreement</span>
        <h1 className="section-title">Terms of Service & Rental Conditions</h1>
        <p className="section-desc">
          Last revised: October 2026. Please review the binding terms governing marketplace rentals.
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
            1. Platform Nature
          </h2>
          <p>
            Jain Solutions operates as an intermediary technology platform connecting verified
            equipment owners with commercial and retail rental customers. The platform coordinates
            verification, inspection logging, dispatch scheduling, and deposit escrow.
          </p>
        </section>

        <section
          id="rental-policy"
          style={{
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h2 style={{ color: 'var(--text-title)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            2. Rental Tenure & Equipment Usage
          </h2>
          <p>
            Equipment must be operated exclusively in accordance with manufacturer technical manuals
            and designated power/load specifications. Rented items may not be sublet, transferred,
            or relocated outside the designated operational site without written hub manager
            approval.
          </p>
        </section>

        <section
          id="security-deposit"
          style={{
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h2 style={{ color: 'var(--text-title)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            3. Security Deposits & Inspection Protocol
          </h2>
          <p>
            A security deposit is authorized prior to dispatch. Upon return to the logistics hub, an
            inspection check is logged. If equipment is returned in verified standard working
            condition without structural damage beyond normal operational wear, the deposit is
            promptly returned.
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
            4. Cancellation & Tenure Extensions
          </h2>
          <p>
            Bookings may be cancelled free of charge up to 24 hours prior to scheduled hub dispatch.
            Tenure extensions can be initiated from the customer dashboard and depend on scheduling
            availability.
          </p>
        </section>
      </div>
    </div>
  );
}
