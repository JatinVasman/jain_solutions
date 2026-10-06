import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { JOB_LISTINGS } from '../../../../lib/mock-data';

interface JobApplyPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: JobApplyPageProps): Metadata {
  const job = JOB_LISTINGS.find((j) => j.id === params.id);
  return {
    title: job ? `Apply for ${job.title} | Jain Solutions` : 'Job Application | Jain Solutions',
  };
}

export default function JobApplyPage({ params }: JobApplyPageProps) {
  const job = JOB_LISTINGS.find((j) => j.id === params.id);
  if (!job) {
    notFound();
  }

  return (
    <div className="page-container" style={{ maxWidth: '760px' }}>
      <Breadcrumb
        items={[
          { label: 'Careers', href: '/jobs' },
          { label: job.title, href: `/jobs/${job.id}` },
          { label: 'Submit Application' },
        ]}
      />

      <div style={{ marginBottom: '1.25rem' }}>
        <Link
          href={`/jobs/${job.id}`}
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
          ← Back to Role Details ({job.title})
        </Link>
      </div>

      <div
        className="card"
        style={{
          padding: '2.5rem',
          boxShadow: 'var(--shadow-floating)',
          border: '1px solid var(--border-light)',
        }}
      >
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="job-badge-dept">{job.department}</span>
            {job.salaryRange && (
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--teal-700)',
                  fontWeight: 600,
                  padding: '0.2rem 0',
                }}
              >
                💵 {job.salaryRange}
              </span>
            )}
          </div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-title)',
              marginBottom: '0.35rem',
            }}
          >
            Candidate Dossier for {job.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            📍 {job.location} · {job.type} · Review SLA: 48 business hours
          </p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-title)',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%', height: '44px', background: '#f8fafc' }}
              placeholder="e.g. Vikram Malhotra"
              defaultValue="Vikram Malhotra"
              required
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                className="search-input"
                style={{ width: '100%', height: '44px', background: '#f8fafc' }}
                placeholder="vikram@example.com"
                defaultValue="vikram@example.com"
                required
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Phone Number *
              </label>
              <input
                type="tel"
                className="search-input"
                style={{ width: '100%', height: '44px', background: '#f8fafc' }}
                placeholder="+91 98100 12345"
                defaultValue="+91 98100 12345"
                required
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                className="search-input"
                style={{ width: '100%', height: '44px', background: '#f8fafc' }}
                placeholder="https://linkedin.com/in/username"
                defaultValue="https://linkedin.com/in/vikram-example"
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Portfolio / GitHub / Work Link
              </label>
              <input
                type="url"
                className="search-input"
                style={{ width: '100%', height: '44px', background: '#f8fafc' }}
                placeholder="https://github.com/username"
                defaultValue="https://portfolio.example.com/vikram"
              />
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-title)',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Resume / CV (PDF or DOCX) *
            </label>
            <div
              style={{
                border: '2px dashed var(--teal-300)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                textAlign: 'center',
                background: 'var(--teal-50)',
              }}
            >
              <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.35rem' }}>
                📄
              </span>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--teal-900)' }}>
                resume_vikram_malhotra.pdf
              </p>
              <span style={{ fontSize: '0.78rem', color: 'var(--teal-700)' }}>
                (Attached dossier demonstration — 1.4 MB · Ready to submit)
              </span>
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-title)',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Cover Note & Experience Summary
            </label>
            <textarea
              className="search-input"
              rows={4}
              style={{
                width: '100%',
                height: 'auto',
                padding: '0.75rem 1rem',
                background: '#f8fafc',
                lineHeight: 1.6,
              }}
              defaultValue="With 4 years of hands-on equipment dispatch and hub management, I have direct experience handling multi-category gear with tight turnaround times."
            />
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <Link
              href="/applications"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', textAlign: 'center' }}
            >
              Submit Candidate Application Dossier →
            </Link>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '0.5rem',
              }}
            >
              By submitting, your profile will be indexed into the candidate tracking portal with a
              unique tracking ID.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
