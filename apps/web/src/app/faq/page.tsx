import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions regarding renting equipment, security deposits, and logistics.',
};

const FAQ_ITEMS = [
  {
    q: 'How does equipment rental work on this platform?',
    a: 'Browse by category or location, pick your required dates, submit your booking verification, and choose either site delivery or hub self-pickup. All equipment is inspected and tested prior to handover.',
  },
  {
    q: 'Is there a security deposit required?',
    a: 'Yes. High-value equipment requires a refundable security deposit that is held in escrow during the rental period. Once the asset is returned and checked at our hub, the deposit is processed back to your original payment method within 24 to 48 hours.',
  },
  {
    q: 'Can I extend my rental duration while the equipment is in use?',
    a: 'Yes. You can request tenure extension directly from your customer account dashboard subject to availability and schedule confirmation.',
  },
  {
    q: 'How do I list my own equipment as an Owner?',
    a: 'Navigate to the Product Owner portal, submit your business or individual verification, and list your items with photos, specifications, and daily/weekly rates. Our hub managers will review and approve listings.',
  },
  {
    q: 'What happens if equipment malfunctions on-site?',
    a: 'We offer rapid technical replacement or dispatch freelance technicians from our regional network to resolve on-site issues immediately.',
  },
];

export default function FAQPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'FAQ' }]} />

      <div className="section-header">
        <span className="section-tag">Help & Documentation</span>
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-desc">
          Answers to common questions about rental workflows, deposits, logistics, and partner
          programs.
        </p>
      </div>

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {FAQ_ITEMS.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
                fontWeight: 600,
              }}
            >
              {item.q}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
