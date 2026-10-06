import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JOB_LISTINGS } from '../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Open Careers & Job Opportunities | Jain Solutions',
  description:
    'Explore career openings in operations, technology, logistics, and partner management.',
};

export default function JobsPage() {
  return (
    <div className="main-content">
      <div
        style={{
          marginBottom: '2.5rem',
          textAlign: 'center',
          maxWidth: '720px',
          margin: '0 auto 2.5rem',
        }}
      >
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'var(--color-text)',
            marginBottom: '0.75rem',
          }}
        >
          Join Our Growing Marketplace Team
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          We are transforming how businesses and individuals access equipment on demand. Explore
          open full-time and field roles across our nationwide logistics network.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {JOB_LISTINGS.map((job) => (
          <div
            key={job.id}
            className="card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              <span className="status-badge available" style={{ fontSize: '0.75rem' }}>
                {job.department}
              </span>
            </div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '0.5rem',
              }}
            >
              {job.title}
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}
            >
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>⏱ {job.experience}</span>
            </div>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
                flex: 1,
                marginBottom: '1.25rem',
              }}
            >
              {job.description}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href={`/jobs/${job.id}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                View Role
              </Link>
              <Link
                href={`/jobs/${job.id}/apply`}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        className="card"
        style={{
          padding: '1.75rem',
          textAlign: 'center',
          background: 'var(--color-surface-subtle)',
        }}
      >
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Already applied for a role?
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Check the review progress and scheduling updates for your submitted candidate dossiers.
        </p>
        <Link href="/applications" className="btn btn-outline btn-sm">
          Track Your Submitted Applications →
        </Link>
      </div>
    </div>
  );
}
