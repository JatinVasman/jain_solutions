import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { FEATURED_PRODUCTS } from '../../../../lib/mock-data';

interface ConfirmationProps {
  params: {
    product: string;
  };
}

export const metadata: Metadata = {
  title: 'Booking Confirmation | Step 3 of 3',
  description: 'Structural booking summary and reservation schedule.',
};

export default function ConfirmationPage({ params }: ConfirmationProps) {
  const item = FEATURED_PRODUCTS.find((p) => p.slug === params.product) ?? FEATURED_PRODUCTS[0];
  if (!item) {
    notFound();
  }

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <Breadcrumb
        items={[
          { label: 'Catalogue', href: '/products' },
          { label: item.name, href: `/products/${item.slug}` },
          { label: 'Booking Confirmation' },
        ]}
      />

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
        <span
          style={{
            background: 'var(--status-green-bg)',
            color: 'var(--status-green)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Structural Booking Confirmed
        </span>
        <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
          Rental Request Reference #RNT-2026-8941
        </h1>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          This structural confirmation demonstrates the final step of the customer booking journey.
        </p>
      </div>

      <div
        style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-title)', marginBottom: '1.25rem' }}>
          Reservation Summary
        </h2>

        <div className="table-container">
          <table className="data-table">
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Equipment Name</td>
                <td style={{ fontWeight: 600, color: 'var(--text-title)' }}>{item.name}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Category</td>
                <td>{item.category}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Rental Window</td>
                <td>10 Oct 2026 – 15 Oct 2026 (5 Days)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Fulfillment Mode</td>
                <td>Scheduled Doorstep Dispatch to Gurugram Site</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Authorized Amount</td>
                <td style={{ color: '#38bdf8', fontWeight: 700 }}>
                  ₹{(item.dailyRate * 5 + item.securityDeposit + 800).toLocaleString()} (Includes
                  Refundable Deposit)
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Status</td>
                <td>
                  <span className="status-badge booked">Awaiting Hub Dispatch</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/account/rentals" className="btn btn-primary">
            View in My Rentals (/account/rentals)
          </Link>
          <Link href="/products" className="btn btn-secondary">
            Browse More Equipment
          </Link>
        </div>
      </div>
    </div>
  );
}
