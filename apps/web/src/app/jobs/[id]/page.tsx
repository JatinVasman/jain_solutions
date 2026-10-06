import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JOB_LISTINGS } from '../../../lib/mock-data';

interface JobDetailPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: JobDetailPageProps): Metadata {
  const job = JOB_LISTINGS.find((j) => j.id === params.id);
  return {
    title: job ? `${job.title} | Careers` : 'Job Opening',
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = JOB_LISTINGS.find((j) => j.id === params.id) ?? JOB_LISTINGS[0];
  if (!job) {
    notFound();
  }

  return (
    <div className="main-content" style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/jobs" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
          ← Back to All Openings
        </Link>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <span
              className="status-badge available"
              style={{ marginBottom: '0.5rem', display: 'inline-block' }}
            >
              {job.department}
            </span>
            <h1
              style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                color: 'var(--color-text)',
                margin: '0.25rem 0',
              }}
            >
              {job.title}
            </h1>
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
              }}
            >
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>⏱ {job.experience}</span>
            </div>
          </div>
          <Link href={`/jobs/${job.id}/apply`} className="btn btn-primary">
            Apply for this Role
          </Link>
        </div>

        <hr style={{ borderColor: 'var(--color-border)', margin: '1.5rem 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Role Overview
            </h2>
            <p style={{ lineHeight: 1.6, color: 'var(--color-text)' }}>{job.description}</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Key Responsibilities
            </h2>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
              <li>Coordinate equipment lifecycle operations and standard operating procedures.</li>
              <li>
                Collaborate with field technicians, partners, and delivery teams to ensure 99.5%+
                fulfillment accuracy.
              </li>
              <li>
                Maintain stringent safety, calibration, and documentation compliance for all rental
                classes.
              </li>
              <li>
                Streamline internal turnaround times between return check-ins and subsequent
                dispatch.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Requirements & Qualifications
            </h2>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
              <li>
                Proven track record ({job.experience}) in operations, equipment logistics, or
                marketplace tech.
              </li>
              <li>High attention to detail, reliability, and structured communication.</li>
              <li>Comfortable working in high-growth, fast-paced logistics environments.</li>
            </ul>
          </section>
        </div>

        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <p style={{ fontWeight: 600, margin: 0 }}>
              Ready to shape the future of equipment rental?
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Applications are reviewed within 48 business hours.
            </p>
          </div>
          <Link href={`/jobs/${job.id}/apply`} className="btn btn-primary">
            Submit Application
          </Link>
        </div>
      </div>
    </div>
  );
}
