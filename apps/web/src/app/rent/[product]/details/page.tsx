import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { FEATURED_PRODUCTS } from '../../../../lib/mock-data';

interface RentalDetailsProps {
  params: {
    product: string;
  };
}

export const metadata: Metadata = {
  title: 'Rental Details | Step 1 of 3',
  description: 'Configure dates, tenure, and delivery options for equipment rental.',
};

export default function RentalDetailsPage({ params }: RentalDetailsProps) {
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
          { label: 'Step 1: Rental Details' },
        ]}
      />

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              background: 'var(--accent-primary)',
              color: '#fff',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            Step 1 of 3
          </span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Configuration</span>
        </div>
        <h1 className="section-title">Configure Rental Schedule</h1>
        <p className="section-desc">
          Review pricing terms, select operational dates, and choose delivery preferences for{' '}
          {item.name}.
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
          Selected Equipment
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-title)' }}>
              {item.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {item.location}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-title)' }}>
              ₹{item.dailyRate.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block' }}>
              / day
            </span>
          </div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Rental Start Date</label>
              <input type="date" className="form-input" defaultValue="2026-10-10" />
            </div>
            <div>
              <label className="filter-label">Rental Return Date</label>
              <input type="date" className="form-input" defaultValue="2026-10-15" />
            </div>
          </div>

          <div>
            <label className="filter-label">Fulfillment Logistics Option</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                }}
              >
                <input type="radio" name="delivery_method" defaultChecked />
                <div>
                  <strong style={{ color: 'var(--text-title)' }}>
                    Doorstep Delivery to Site (+₹800)
                  </strong>
                  <p
                    style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                    }}
                  >
                    Scheduled transit directly to your workplace or project site via hub logistics.
                  </p>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                }}
              >
                <input type="radio" name="delivery_method" />
                <div>
                  <strong style={{ color: 'var(--text-title)' }}>
                    Self-Pickup from Regional Hub (Free)
                  </strong>
                  <p
                    style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                    }}
                  >
                    Collect directly from {item.location}. Instant condition inspection
                    verification.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>
                Estimated Rental (5 Days @ ₹{item.dailyRate}/day):
              </span>
              <span style={{ color: 'var(--text-title)' }}>
                ₹{(item.dailyRate * 5).toLocaleString()}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Refundable Security Deposit:</span>
              <span style={{ color: 'var(--text-title)' }}>
                ₹{item.securityDeposit.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.75rem',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              <span style={{ color: 'var(--text-title)' }}>Total Authorization:</span>
              <span style={{ color: 'var(--accent-primary)' }}>
                ₹{(item.dailyRate * 5 + item.securityDeposit + 800).toLocaleString()}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Link href={`/products/${item.slug}`} className="btn btn-secondary">
              ← Back to Product
            </Link>
            <Link href={`/rent/${item.slug}/customer`} className="btn btn-primary">
              Continue to Customer Information →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
