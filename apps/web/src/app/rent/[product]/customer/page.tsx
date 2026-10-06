import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { FEATURED_PRODUCTS } from '../../../../lib/mock-data';

interface CustomerInfoProps {
  params: {
    product: string;
  };
}

export const metadata: Metadata = {
  title: 'Customer Information | Step 2 of 3',
  description: 'Provide customer details and site delivery address for booking.',
};

export default function CustomerInfoPage({ params }: CustomerInfoProps) {
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
          { label: 'Step 1: Details', href: `/rent/${item.slug}/details` },
          { label: 'Step 2: Customer Information' },
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
            Step 2 of 3
          </span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Customer & Site Information
          </span>
        </div>
        <h1 className="section-title">Rental Contact & Site Details</h1>
        <p className="section-desc">
          Specify who will receive the equipment and the physical installation address.
        </p>
      </div>

      <div
        style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
        }}
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.15rem', color: 'var(--text-title)', marginBottom: '0.25rem' }}>
            Primary Contact Person
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Vikram Verma"
                defaultValue="Vikram Verma"
              />
            </div>
            <div>
              <label className="filter-label">Contact Phone</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                defaultValue="+91 98765 43210"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Work / Personal Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="vikram@company.com"
                defaultValue="vikram@company.com"
              />
            </div>
            <div>
              <label className="filter-label">Company / Entity Name (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Horizon Productions Pvt Ltd"
              />
            </div>
          </div>

          <h2
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-title)',
              marginTop: '1rem',
              marginBottom: '0.25rem',
            }}
          >
            Site Delivery Address
          </h2>

          <div>
            <label className="filter-label">Street Address / Facility Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Building 4, Sector 18, Commercial Zone"
              defaultValue="Building 4, Sector 18, Commercial Zone"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">City</label>
              <input type="text" className="form-input" defaultValue="Gurugram" />
            </div>
            <div>
              <label className="filter-label">State</label>
              <input type="text" className="form-input" defaultValue="Haryana" />
            </div>
            <div>
              <label className="filter-label">Postal Code</label>
              <input type="text" className="form-input" defaultValue="122002" />
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
              📋 <strong>KYC Verification Protocol:</strong> In production, valid government ID
              (Aadhaar / Voter ID / Passport) or Company GSTIN will be verified before equipment
              release.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <Link href={`/rent/${item.slug}/details`} className="btn btn-secondary">
              ← Back to Schedule
            </Link>
            <Link href={`/rent/${item.slug}/confirmation`} className="btn btn-primary">
              Confirm & View Booking Summary →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
