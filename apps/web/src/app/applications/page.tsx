import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Submitted Job Applications | Jain Telecome Rentals',
  description: 'View the status and history of your job applications.',
};

const APPLICATIONS = [
  {
    id: 'APP-2026-901',
    role: 'Hub Operations Manager',
    department: 'Logistics & Supply Chain',
    location: 'Bengaluru, Karnataka',
    submittedAt: '03 Oct 2026',
    status: 'In Review',
    statusClass: 'booked',
    lastUpdate: 'Application screened by People Operations team.',
  },
  {
    id: 'APP-2026-842',
    role: 'Senior Electronics / Equipment Technician',
    department: 'Technical Operations',
    location: 'New Delhi & NCR',
    submittedAt: '12 Sep 2026',
    status: 'Shortlisted for Round 1',
    statusClass: 'available',
    lastUpdate: 'Technical video screening call pending confirmation.',
  },
];

export default function ApplicationsTrackerPage() {
  return (
    <div className="main-content" style={{ maxWidth: '880px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '0.5rem',
            color: 'var(--color-text)',
          }}
        >
          My Career Applications ({APPLICATIONS.length})
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Real-time tracking of candidate applications submitted to Jain Telecome Rentals
          marketplace.
        </p>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}
      >
        {APPLICATIONS.map((app) => (
          <div key={app.id} className="card" style={{ padding: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <div>
                <span
                  style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}
                >
                  {app.id}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.2rem 0' }}>
                  {app.role}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  {app.department} · {app.location} · Submitted {app.submittedAt}
                </p>
              </div>
              <span className={`status-badge ${app.statusClass}`}>{app.status}</span>
            </div>

            <div
              style={{
                background: 'var(--color-surface-subtle)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginTop: '0.75rem',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text)' }}>
                <strong>Status Update:</strong> {app.lastUpdate}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link href="/jobs" className="btn btn-outline">
          ← Browse Other Open Positions
        </Link>
      </div>
    </div>
  );
}
