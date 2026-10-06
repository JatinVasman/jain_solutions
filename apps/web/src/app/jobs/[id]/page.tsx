import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { JOB_LISTINGS } from '../../../lib/mock-data';

interface JobDetailPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: JobDetailPageProps): Metadata {
  const job = JOB_LISTINGS.find((j) => j.id === params.id);
  return {
    title: job ? `${job.title} | Careers | Jain Solutions` : 'Job Opening | Jain Solutions',
    description: job ? job.description : 'Explore career opportunities at Jain Solutions.',
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = JOB_LISTINGS.find((j) => j.id === params.id);
  if (!job) {
    notFound();
  }

  return (
    <div className="page-container" style={{ maxWidth: '920px' }}>
      <Breadcrumb
        items={[{ label: 'Careers & Opportunities', href: '/jobs' }, { label: job.title }]}
      />

      <div style={{ marginBottom: '1.25rem' }}>
        <Link
          href="/jobs"
          style={{
            fontSize: '0.875rem',
            color: 'var(--accent-primary)',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          ← Back to All Careers & Openings
        </Link>
      </div>

      <div
        className="card"
        style={{
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-floating)',
          border: '1px solid var(--border-light)',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '1.75rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="job-badge-dept">{job.department}</span>
              {job.featured && <span className="job-badge-featured">⭐ Priority Role</span>}
            </div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              {job.title}
            </h1>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
              }}
            >
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>⏱ {job.experience}</span>
              {job.salaryRange && (
                <span style={{ color: 'var(--teal-700)', fontWeight: 600 }}>
                  💵 {job.salaryRange}
                </span>
              )}
            </div>
          </div>

          <Link href={`/jobs/${job.id}/apply`} className="btn btn-primary btn-lg">
            Apply for this Role →
          </Link>
        </div>

        <hr style={{ borderColor: 'var(--border-light)', margin: '1.5rem 0 2rem' }} />

        {/* Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7 }}>
          <section>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.75rem',
              }}
            >
              Role Overview & Mission
            </h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1rem' }}>{job.description}</p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.75rem',
              }}
            >
              Core Responsibilities
            </h2>
            <ul
              style={{
                paddingLeft: '1.25rem',
                color: 'var(--text-body)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <li>
                Coordinate equipment lifecycle workflows across regional hubs, fulfillment depots,
                and client delivery partners.
              </li>
              <li>
                Uphold rigorous 99.5%+ fulfillment accuracy, ensuring pre-dispatch calibration,
                diagnostic checks, and digital paperwork are complete.
              </li>
              <li>
                Collaborate with technical operations, partner success reps, and fleet managers to
                resolve time-sensitive field queries.
              </li>
              <li>
                Continuously iterate on turnaround protocols between customer check-ins, routine
                maintenance cycles, and re-stocking.
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.75rem',
              }}
            >
              Candidate Qualifications & Skills
            </h2>
            <ul
              style={{
                paddingLeft: '1.25rem',
                color: 'var(--text-body)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <li>
                Demonstrated professional experience ({job.experience}) in operations, hardware
                logistics, fleet management, or marketplace platforms.
              </li>
              <li>
                Structured organizational communication, comfort with digital inventory dashboards,
                and high attention to detail.
              </li>
              <li>
                Ability to thrive in an agile, rapidly growing logistics environment with daily
                operational milestones.
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.75rem',
              }}
            >
              Benefits & Perks at Jain Solutions
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginTop: '0.75rem',
              }}
            >
              <div
                style={{
                  background: 'var(--teal-50)',
                  border: '1px solid var(--teal-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--teal-900)', fontSize: '0.9rem' }}>
                  🏥 Medical & Health
                </div>
                <div
                  style={{ fontSize: '0.825rem', color: 'var(--teal-800)', marginTop: '0.25rem' }}
                >
                  100% comprehensive coverage for employee, spouse, and dependents.
                </div>
              </div>

              <div
                style={{
                  background: 'var(--teal-50)',
                  border: '1px solid var(--teal-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--teal-900)', fontSize: '0.9rem' }}>
                  📈 Equity & Incentives
                </div>
                <div
                  style={{ fontSize: '0.825rem', color: 'var(--teal-800)', marginTop: '0.25rem' }}
                >
                  Competitive baseline compensation with annual retention equity rewards.
                </div>
              </div>

              <div
                style={{
                  background: 'var(--teal-50)',
                  border: '1px solid var(--teal-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--teal-900)', fontSize: '0.9rem' }}>
                  ⚡ Gear & Equipment Access
                </div>
                <div
                  style={{ fontSize: '0.825rem', color: 'var(--teal-800)', marginTop: '0.25rem' }}
                >
                  Complimentary personal rental credits across all marketplace product tiers.
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Callout */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.75rem',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 700,
                color: 'var(--text-title)',
                margin: 0,
                fontSize: '1.05rem',
              }}
            >
              Ready to submit your application?
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Dossiers are reviewed by our operations leads within 48 business hours.
            </p>
          </div>
          <Link href={`/jobs/${job.id}/apply`} className="btn btn-primary btn-md">
            Submit Application Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
