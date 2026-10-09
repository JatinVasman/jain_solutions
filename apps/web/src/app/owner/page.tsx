import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Owner Portal | Jain Solutions',
  description: 'Asset and equipment management workspace for verified product owners.',
};

export default function OwnerPortalPage() {
  return (
    <div className="page-container" style={{ maxWidth: '820px', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          ← Back to Marketplace
        </Link>
      </div>

      <div
        className="card"
        style={{
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)',
          background: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--teal-50)',
            border: '2px solid var(--teal-200)',
            fontSize: '2rem',
            marginBottom: '1.25rem',
          }}
        >
          📦
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--teal-700)',
            background: 'var(--teal-50)',
            border: '1px solid var(--teal-200)',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-pill)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.85rem',
          }}
        >
          Suppliers & Fleet Hosts
        </span>

        <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
          Product Owner Portal
        </h1>

        <p
          className="section-desc"
          style={{
            fontSize: '0.975rem',
            maxWidth: '560px',
            margin: '0 auto 1.75rem',
            lineHeight: 1.6,
          }}
        >
          This portal is currently under active development. Management of rental fleets, assets,
          and earnings will be unlocked once you log in with your verified owner account.
        </p>

        <div
          style={{
            background: '#f8fafc',
            border: '1px dashed var(--border-teal-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            maxWidth: '540px',
            margin: '0 auto 2rem',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              margin: '0 0 0.5rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--teal-800)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            🔒 Upcoming Capabilities
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.2rem',
              fontSize: '0.85rem',
              color: 'var(--text-body)',
              lineHeight: 1.6,
            }}
          >
            <li>Equipment inventory registration & rate configuration</li>
            <li>Real-time booking calendar and dispatch confirmation</li>
            <li>Rental earnings tracking & automated bank payouts</li>
            <li>Asset health, service logs, and maintenance alerts</li>
          </ul>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/login" className="btn btn-primary btn-md">
            Sign In to Owner Account →
          </Link>
          <Link href="/" className="btn btn-secondary btn-md">
            Return to Marketplace Home
          </Link>
        </div>
      </div>
    </div>
  );
}
