import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';
import { JobCatalogClient } from '../../components/JobCatalogClient';
import { JOB_LISTINGS } from '../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Open Careers & Job Opportunities | Jain Solutions',
  description:
    'Explore high-impact career openings in operations, technology, logistics, and partner management at Jain Solutions.',
};

export default function JobsPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Careers & Opportunities' }]} />

      {/* Hero Header */}
      <div
        className="section-header text-center"
        style={{ maxWidth: '820px', margin: '0 auto 2.5rem' }}
      >
        <span className="section-tag">Careers at Jain Solutions</span>
        <h1 className="section-title">Build the Future of On-Demand Equipment</h1>
        <p className="section-desc" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          We are transforming how businesses and individuals access high-value physical equipment.
          Join our fast-growing engineering, field logistics, and marketplace operations teams.
        </p>

        {/* Value Highlights Pill Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '1.5rem',
          }}
        >
          <span
            style={{
              background: 'var(--teal-50)',
              color: 'var(--teal-800)',
              border: '1px solid var(--teal-200)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.825rem',
              fontWeight: 600,
            }}
          >
            ⚡ Fast-Scaling National Hubs
          </span>
          <span
            style={{
              background: 'var(--teal-50)',
              color: 'var(--teal-800)',
              border: '1px solid var(--teal-200)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.825rem',
              fontWeight: 600,
            }}
          >
            🏥 Full Family Medical Coverage
          </span>
          <span
            style={{
              background: 'var(--teal-50)',
              color: 'var(--teal-800)',
              border: '1px solid var(--teal-200)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.825rem',
              fontWeight: 600,
            }}
          >
            ⏱ 48-Hour Review SLA
          </span>
          <span
            style={{
              background: 'var(--teal-50)',
              color: 'var(--teal-800)',
              border: '1px solid var(--teal-200)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.825rem',
              fontWeight: 600,
            }}
          >
            📈 Performance Bonuses & ESOPs
          </span>
        </div>
      </div>

      {/* Interactive Job Catalog with Search & Filter Pills */}
      <JobCatalogClient initialJobs={JOB_LISTINGS} />

      {/* Why Work at Jain Solutions */}
      <section style={{ marginTop: '2rem', marginBottom: '3.5rem' }}>
        <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Culture & Values</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-title)' }}>
            Why Build Your Career at Jain Solutions?
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            We combine high-trust physical logistics with modern digital execution.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div className="career-perk-card">
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🚀</div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
              }}
            >
              Massive Market Impact
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Help unlock billions of dollars in idle commercial equipment while lowering capital
              expenditure for creators and enterprises.
            </p>
          </div>

          <div className="career-perk-card">
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🛠️</div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
              }}
            >
              High Ownership & Craft
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              We favor small, high-autonomy teams. Whether designing logistics dispatch loops or
              writing frontend code, you own outcomes directly.
            </p>
          </div>

          <div className="career-perk-card">
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🌿</div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
              }}
            >
              Sustainable Circular Economy
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Every rental extends product lifecycle utility, reducing e-waste and manufacturing
              footprints across power, tools, and electronics.
            </p>
          </div>

          <div className="career-perk-card">
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>📈</div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-title)',
                marginBottom: '0.5rem',
              }}
            >
              Structured Career Progression
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Rapid advancement paths as new regional fulfilment hubs launch each quarter. Regular
              skill enhancement and mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section
        style={{
          background: '#ffffff',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          marginBottom: '3.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">Candidate Experience</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-title)' }}>
            Our Straightforward Hiring Process
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            We respect your time. Every stage is transparent, practical, and communicated within
            days.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className="hiring-step-number">01</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.25rem' }}>
              Apply Online
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Submit your candidate dossier and resume. Our recruitment team reviews each
              application within 48 business hours.
            </p>
          </div>

          <div>
            <div className="hiring-step-number">02</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.25rem' }}>
              Initial Discussion
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              A 30-minute informal conversation to understand your career aspirations, background,
              and cultural fit.
            </p>
          </div>

          <div>
            <div className="hiring-step-number">03</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.25rem' }}>
              Practical Deep-Dive
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              A real-world role exercise or technical discussion focused on practical challenges,
              not abstract riddles.
            </p>
          </div>

          <div>
            <div className="hiring-step-number">04</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.25rem' }}>
              Offer & Onboarding
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Transparent compensation breakdown, formal offer issuance, and a comprehensive 90-day
              onboarding journey.
            </p>
          </div>
        </div>
      </section>

      {/* Candidate Application Tracking CTA Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
          border: '1px solid #ccfbf1',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-floating)',
        }}
      >
        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>📋</span>
        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: 'var(--text-title)',
            marginBottom: '0.5rem',
          }}
        >
          Already Submitted an Application?
        </h3>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            maxWidth: '560px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.5,
          }}
        >
          Check your screening status, interview dates, and recruitment dossier feedback anytime
          using your candidate reference ID.
        </p>
        <Link href="/applications" className="btn btn-primary btn-md">
          Track Your Submitted Applications →
        </Link>
      </div>
    </div>
  );
}
