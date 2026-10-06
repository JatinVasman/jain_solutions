import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES } from '../../../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Add New Equipment | Owner Portal',
};

export default function OwnerNewProductPage() {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">List New Rental Equipment</h1>
          <p className="portal-subtitle">
            Provide equipment classification, technical specs, pricing rates, and hub location.
          </p>
        </div>
        <Link href="/owner/products" className="btn btn-secondary btn-sm">
          ← Cancel
        </Link>
      </div>

      <div
        style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
        }}
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="filter-label">Equipment Commercial Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 5 kVA Pure Sine Wave Inverter System"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Primary Category</label>
              <select className="filter-select" defaultValue="">
                <option value="" disabled>
                  Select Category ▾
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="filter-label">Home Fulfillment Hub</label>
              <select className="filter-select" defaultValue="delhi">
                <option value="delhi">South Delhi Hub, New Delhi</option>
                <option value="mumbai">Bandra West Hub, Mumbai</option>
                <option value="bengaluru">Peenya Industrial Hub, Bengaluru</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="filter-label">Daily Rental Rate (₹)</label>
              <input type="number" className="form-input" placeholder="1200" />
            </div>
            <div>
              <label className="filter-label">Weekly Rental Rate (₹)</label>
              <input type="number" className="form-input" placeholder="6500" />
            </div>
            <div>
              <label className="filter-label">Security Deposit (₹)</label>
              <input type="number" className="form-input" placeholder="5000" />
            </div>
          </div>

          <div>
            <label className="filter-label">Detailed Operational Description</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Describe condition, ideal use cases, included accessories, and operation requirements..."
            />
          </div>

          <div>
            <label className="filter-label">Equipment Photos & Calibration Documents</label>
            <div
              style={{
                border: '2px dashed var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '2.5rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                background: 'var(--bg-surface)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
              <p>
                Drag & drop photos of equipment (Front, Side, Serial Plate, Accessories) or browse
                files
              </p>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  display: 'block',
                  marginTop: '0.25rem',
                }}
              >
                PNG, JPG or WEBP up to 10MB each
              </span>
            </div>
          </div>

          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}
          >
            <Link href="/owner/products" className="btn btn-secondary">
              Discard
            </Link>
            <button type="button" className="btn btn-primary">
              Submit Listing for Hub Inspection (Demo)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
