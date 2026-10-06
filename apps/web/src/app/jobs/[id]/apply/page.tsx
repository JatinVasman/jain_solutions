import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JOB_LISTINGS } from '../../../../lib/mock-data';

interface JobApplyPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: JobApplyPageProps): Metadata {
  const job = JOB_LISTINGS.find((j) => j.id === params.id);
  return {
    title: job ? `Apply: ${job.title}` : 'Job Application',
  };
}

export default function JobApplyPage({ params }: JobApplyPageProps) {
  const job = JOB_LISTINGS.find((j) => j.id === params.id) ?? JOB_LISTINGS[0];
  if (!job) {
    notFound();
  }

  return (
    <div className="main-content" style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          href={`/jobs/${job.id}`}
          style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}
        >
          ← Back to Role Details ({job.title})
        </Link>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="status-badge available" style={{ fontSize: '0.75rem' }}>
            {job.department}
          </span>
          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              marginTop: '0.4rem',
              marginBottom: '0.25rem',
            }}
          >
            Application for {job.title}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            📍 {job.location} · {job.type}
          </p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%' }}
              placeholder="e.g. Vikram Malhotra"
              defaultValue="Vikram Malhotra"
              required
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                className="search-input"
                style={{ width: '100%' }}
                placeholder="vikram@example.com"
                defaultValue="vikram@example.com"
                required
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Phone Number *
              </label>
              <input
                type="tel"
                className="search-input"
                style={{ width: '100%' }}
                placeholder="+91 98100 12345"
                defaultValue="+91 98100 12345"
                required
              />
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              LinkedIn / Portfolio URL
            </label>
            <input
              type="url"
              className="search-input"
              style={{ width: '100%' }}
              placeholder="https://linkedin.com/in/username"
              defaultValue="https://linkedin.com/in/vikram-example"
            />
          </div>

          <div>
            <label
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Resume / CV (PDF or DOCX)
            </label>
            <div
              style={{
                border: '2px dashed var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                textAlign: 'center',
                background: 'var(--color-surface-subtle)',
              }}
            >
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-text)' }}>
                📄 resume_vikram_malhotra.pdf
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                (Structural Mock File Uploaded — 1.4 MB)
              </span>
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Cover Note / Why this role?
            </label>
            <textarea
              className="search-input"
              rows={4}
              style={{ width: '100%', height: 'auto', padding: '0.75rem' }}
              defaultValue="With 4 years of hands-on equipment dispatch and hub management, I have direct experience handling multi-category gear with tight turnaround times."
            />
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <Link
              href="/applications"
              className="btn btn-primary"
              style={{ width: '100%', textAlign: 'center' }}
            >
              Submit Candidate Dossier (Structural Action)
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
