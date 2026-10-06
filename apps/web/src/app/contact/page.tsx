import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact Support & Enquiries',
  description: 'Reach our operations, equipment dispatch, and partnership teams.',
};

export default function ContactPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="section-header">
        <span className="section-tag">Direct Assistance</span>
        <h1 className="section-title">Contact Operations & Support</h1>
        <p className="section-desc">
          Have questions about equipment specifications, custom tenure contracts, or enterprise
          fleet leasing?
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Contact Form Placeholder */}
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '1.25rem' }}>
            Submit an Enquiry
          </h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="filter-label">Full Name</label>
              <input type="text" className="form-input" placeholder="e.g. Rahul Sharma" />
            </div>

            <div>
              <label className="filter-label">Work Email / Phone</label>
              <input type="text" className="form-input" placeholder="e.g. rahul@company.com" />
            </div>

            <div>
              <label className="filter-label">Inquiry Type</label>
              <select className="filter-select" defaultValue="rental">
                <option value="rental">Custom Equipment Rental Request</option>
                <option value="owner">Asset Owner Onboarding</option>
                <option value="partner">Corporate Partner Program</option>
                <option value="support">Active Booking Support</option>
              </select>
            </div>

            <div>
              <label className="filter-label">Message / Equipment Requirements</label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Describe equipment needed, dates, and project site location..."
              />
            </div>

            <button type="button" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              Send Enquiry (Structural Demo)
            </button>
          </form>
        </div>

        {/* Contact Info & Hub Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: 'var(--bg-surface)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
              📞 Central Dispatch Helpline
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Monday – Saturday, 8:00 AM – 9:00 PM IST
            </p>
            <p style={{ color: '#38bdf8', fontWeight: 600, marginTop: '0.5rem' }}>
              +91 (0) 800 123 4567
            </p>
          </div>

          <div
            style={{
              background: 'var(--bg-surface)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
              ✉️ Email Inquiries
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              General Enquiries:{' '}
              <span style={{ color: 'var(--text-title)' }}>support@rentalmarketplace.com</span>
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Owner Partnerships:{' '}
              <span style={{ color: 'var(--text-title)' }}>partners@rentalmarketplace.com</span>
            </p>
          </div>

          <div
            style={{
              background: 'var(--bg-surface)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
              🏢 Regional Headquarters
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Central Operations Tower, Tech Corridor Phase II, Outer Ring Road, Bengaluru,
              Karnataka 560103
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
