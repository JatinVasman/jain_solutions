import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';
import { JOB_LISTINGS } from '../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Careers & Open Positions',
  description: 'Join the team revolutionizing multi-category equipment rental.',
};

export default function CareersPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Careers' }]} />

      <div className="section-header">
        <span className="section-tag">Join Our Team</span>
        <h1 className="section-title">Careers at Jain Solutions</h1>
        <p className="section-desc">
          Help build the supply chain and software driving the circular sharing economy for physical
          infrastructure.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h3 style={{ color: 'var(--text-title)', marginBottom: '0.5rem' }}>
            🚀 High-Growth Logistics
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Scale regional fulfillment hubs across tier-1 and tier-2 metros.
          </p>
        </div>
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h3 style={{ color: 'var(--text-title)', marginBottom: '0.5rem' }}>
            ⚡ Modern Tech Stack
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Work with strict TypeScript, Next.js, NestJS, and event-driven micro-services.
          </p>
        </div>
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h3 style={{ color: 'var(--text-title)', marginBottom: '0.5rem' }}>
            💼 Competitive Compensation
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Industry-standard benefits, insurance, and performance bonuses.
          </p>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-title)', marginBottom: '1.5rem' }}>
          Open Job Opportunities ({JOB_LISTINGS.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {JOB_LISTINGS.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--text-title)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {job.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {job.department} &bull; 📍 {job.location} &bull; 🕒 {job.type}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link href={`/jobs/${job.id}`} className="btn btn-secondary btn-sm">
                  View Role
                </Link>
                <Link href={`/jobs/${job.id}/apply`} className="btn btn-primary btn-sm">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/jobs" className="btn btn-secondary btn-lg">
            Explore All Open Roles & Department Filters →
          </Link>
        </div>
      </div>
    </div>
  );
}
