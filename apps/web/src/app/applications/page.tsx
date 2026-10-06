import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';

export const metadata: Metadata = {
  title: 'My Submitted Job Applications | Jain Solutions',
  description: 'View the real-time review status and timeline of your candidate dossiers.',
};

const APPLICATIONS = [
  {
    id: 'APP-2026-901',
    role: 'Hub Operations Manager',
    department: 'Logistics & Supply Chain',
    location: 'Bengaluru, Karnataka',
    submittedAt: '03 Oct 2026',
    status: 'In Review',
    statusVariant: 'review',
    lastUpdate:
      'Application screened by Regional People Operations team. Scheduling manager review.',
  },
  {
    id: 'APP-2026-842',
    role: 'Senior Electronics / Equipment Technician',
    department: 'Technical Operations',
    location: 'New Delhi & NCR',
    submittedAt: '12 Sep 2026',
    status: 'Shortlisted for Round 1',
    statusVariant: 'shortlisted',
    lastUpdate: 'Technical video screening call invitation sent. Awaiting slot confirmation.',
  },
];

export default function ApplicationsTrackerPage() {
  return (
    <div className="page-container" style={{ maxWidth: '880px' }}>
      <Breadcrumb
        items={[
          { label: 'Careers & Opportunities', href: '/jobs' },
          { label: 'Application Tracker' },
        ]}
      />

      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <span className="section-tag">Candidate Portal</span>
        <h1 className="section-title">My Submitted Applications ({APPLICATIONS.length})</h1>
        <p className="section-desc">
          Real-time tracking of candidate dossiers submitted to Jain Solutions recruitment team.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {APPLICATIONS.map((app) => (
          <div
            key={app.id}
            className="card"
            style={{
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--teal-700)',
                    background: 'var(--teal-50)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--teal-200)',
                  }}
                >
                  {app.id}
                </span>
                <h2
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-title)',
                    margin: '0.4rem 0 0.2rem',
                  }}
                >
                  {app.role}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  {app.department} · 📍 {app.location} · Submitted {app.submittedAt}
                </p>
              </div>

              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  background: app.statusVariant === 'shortlisted' ? '#dcfce7' : '#fef3c7',
                  color: app.statusVariant === 'shortlisted' ? '#166534' : '#92400e',
                  border: `1px solid ${app.statusVariant === 'shortlisted' ? '#bbf7d0' : '#fde68a'}`,
                }}
              >
                ● {app.status}
              </span>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginTop: '0.75rem',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: 'var(--text-title)' }}>Latest Update:</strong>{' '}
                {app.lastUpdate}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link href="/jobs" className="btn btn-secondary btn-md">
          ← Browse Other Open Positions
        </Link>
      </div>
    </div>
  );
}
