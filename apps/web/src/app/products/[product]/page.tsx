import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { FEATURED_PRODUCTS } from '../../../lib/mock-data';

interface ProductDetailPageProps {
  params: {
    product: string;
  };
}

export function generateMetadata({ params }: ProductDetailPageProps): Metadata {
  const item = FEATURED_PRODUCTS.find((p) => p.slug === params.product);
  return {
    title: item ? item.name : 'Product Details',
    description: item ? item.description : 'Equipment rental specifications and rates',
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const item = FEATURED_PRODUCTS.find((p) => p.slug === params.product) ?? FEATURED_PRODUCTS[0];
  if (!item) {
    notFound();
  }

  return (
    <div className="page-container">
      <Breadcrumb
        items={[
          { label: 'Catalogue', href: '/products' },
          { label: item.category, href: `/categories/${item.categorySlug}` },
          { label: item.name },
        ]}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Main Column */}
        <div>
          {/* Images Gallery Placeholder */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: 'var(--text-dim)',
              fontSize: '1rem',
            }}
          >
            [ High-Resolution Equipment Image Gallery Placeholder ]
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            {['Front View', 'Panel Controls', 'Accessory Kit', 'Packaging'].map((thumb, i) => (
              <div
                key={i}
                style={{
                  width: '90px',
                  height: '70px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                }}
              >
                {thumb}
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                color: 'var(--text-title)',
                marginBottom: '0.75rem',
              }}
            >
              About This Equipment
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
              {item.description}
            </p>
          </div>

          {/* Specifications */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                color: 'var(--text-title)',
                marginBottom: '1rem',
              }}
            >
              Technical Specifications
            </h2>
            <div className="table-container">
              <table className="data-table">
                <tbody>
                  {Object.entries(item.specs).map(([specKey, specVal]) => (
                    <tr key={specKey}>
                      <td style={{ width: '40%', fontWeight: 600, color: 'var(--text-muted)' }}>
                        {specKey}
                      </td>
                      <td style={{ color: 'var(--text-title)' }}>{specVal}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Location Hub</td>
                    <td style={{ color: 'var(--text-title)' }}>{item.location}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                      Condition Inspection
                    </td>
                    <td>
                      <span className="status-badge available">Certified Tested</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Owner / Provider Info */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
              }}
            >
              Listed by Verified Owner
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{item.owner.name}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  ★ {item.owner.rating} Rating &bull; Verified Business Supplier
                </p>
              </div>
              <span className="status-badge available">Identity Verified</span>
            </div>
          </div>

          {/* Delivery & Terms */}
          <div
            style={{
              background: 'var(--bg-surface)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
              Delivery, Pickup & Security Deposit Terms
            </h4>
            <ul
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                paddingLeft: '1.25rem',
                lineHeight: 1.6,
              }}
            >
              <li>
                Doorstep delivery available across state metro territory or self-pickup from
                regional hub.
              </li>
              <li>Refundable security deposit is required prior to equipment handover.</li>
              <li>
                Operational manual and pre-dispatch inspection certificate included in delivery kit.
              </li>
            </ul>
          </div>
        </div>

        {/* Sticky Rental Action Card */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            position: 'sticky',
            top: 'calc(var(--header-height) + 1.5rem)',
          }}
        >
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="product-category-tag">{item.category}</span>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
              }}
            >
              {item.name}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {item.location}</p>
          </div>

          {/* Pricing Box */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Daily Rate</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-title)' }}>
                ₹{item.dailyRate.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>Weekly Discount Rate:</span>
              <span style={{ fontWeight: 600 }}>₹{item.weeklyRate.toLocaleString()}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginTop: '0.35rem',
              }}
            >
              <span>Security Deposit (Refundable):</span>
              <span style={{ fontWeight: 600 }}>₹{item.securityDeposit.toLocaleString()}</span>
            </div>
          </div>

          {/* Duration Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="filter-label" htmlFor="duration-select">
              Select Rental Tenure
            </label>
            <select id="duration-select" className="filter-select" defaultValue="daily">
              <option value="daily">Daily Rental (1 to 6 Days)</option>
              <option value="weekly">Weekly Plan (7 Days)</option>
              <option value="biweekly">Bi-Weekly Plan (14 Days)</option>
              <option value="monthly">Monthly Contract (30 Days - 25% Off)</option>
            </select>
          </div>

          {/* Dates Placeholder */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <label className="filter-label" style={{ fontSize: '0.75rem' }}>
                Start Date
              </label>
              <input type="date" className="form-input" defaultValue="2026-10-10" />
            </div>
            <div>
              <label className="filter-label" style={{ fontSize: '0.75rem' }}>
                End Date
              </label>
              <input type="date" className="form-input" defaultValue="2026-10-15" />
            </div>
          </div>

          {/* Availability Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Unit Status:</span>
            <span className={`status-badge ${item.availability}`}>
              {item.availability === 'available' ? 'Available for Rent' : 'Reserved'}
            </span>
          </div>

          {/* Rent Now CTA -> Links to Customer Booking Journey Step 1 */}
          <Link
            href={`/rent/${item.slug}/details`}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '1rem' }}
          >
            Proceed to Rent Now
          </Link>

          <p
            style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              marginTop: '0.75rem',
            }}
          >
            Free cancellation up to 24h before dispatch &bull; Insured transit
          </p>
        </div>
      </div>
    </div>
  );
}
