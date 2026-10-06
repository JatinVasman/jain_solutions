import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';

export const metadata: Metadata = {
  title: 'About the Platform',
  description: 'Learn about the one-stop multi-category rental marketplace.',
};

export default function AboutPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'About Us' }]} />

      <div className="section-header">
        <span className="section-tag">Our Vision</span>
        <h1 className="section-title">The One-Stop Equipment Rental Marketplace</h1>
        <p className="section-desc">
          Building the digital infrastructure for physical asset sharing across commercial and
          industrial verticals.
        </p>
      </div>

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h2 style={{ fontSize: '1.35rem', color: 'var(--text-title)', marginBottom: '0.75rem' }}>
            &ldquo;You need it. We can get it.&rdquo;
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Whether an enterprise requires a 100kVA generator for a factory outage, a film crew
            needs 4K cinema gear for a 3-day shoot, or a civil contractor requires a mini-excavator,
            the traditional rental experience has always been fragmented, opaque, and regionally
            siloed.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
            Our marketplace bridges asset owners who have high-value idle machinery with project
            managers and businesses seeking flexible, zero-CapEx access.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div
            style={{
              background: 'var(--bg-surface)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
              Category Independence
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              We do not specialize in a single physical asset. Our architecture is built to support
              power backup, audiovisual, tools, machinery, and vehicles seamlessly.
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
              End-to-End Trust
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Verified asset owners, digitized inspection checklists, escrow-backed security
              deposits, and full transit logistics management.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/products" className="btn btn-primary">
            Explore Equipment Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
