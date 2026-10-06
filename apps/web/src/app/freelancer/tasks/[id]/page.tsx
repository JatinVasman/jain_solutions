import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

interface TaskDetailPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: TaskDetailPageProps): Metadata {
  return {
    title: `Task #${params.id} | Freelancer Operations`,
  };
}

export default function FreelancerTaskDetailPage({ params }: TaskDetailPageProps) {
  return (
    <div>
      <div className="portal-header">
        <div>
          <div style={{ marginBottom: '0.5rem' }}>
            <Link
              href="/freelancer/tasks"
              style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}
            >
              ← Back to Task Queue
            </Link>
          </div>
          <h1 className="portal-title">Field Task Sheet #{params.id}</h1>
          <p className="portal-subtitle">
            Pre-delivery checklist, site dispatch instructions, and QA inspection workflow.
          </p>
        </div>
        <div>
          <span className="status-badge booked">Action Required</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            Asset Under Inspection
          </h3>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Equipment:</strong> Silent Diesel Generator (62.5 kVA)
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Barcode / Asset Tag:</strong> #AST-PWR-0012
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Provider:</strong> Kirloskar Green Hub (Okhla Depot)
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Service Rating:</strong> Tier A (Heavy Industrial)
          </p>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            Deployment Logistics
          </h3>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Site:</strong> Block B, Sector 62, Noida, UP 201309
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Contact Person:</strong> Amit Sharma (+91 98111 22334)
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Slot:</strong> Today, 14:00 - 15:30 IST
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Payout Fee:</strong>{' '}
            <span style={{ color: 'var(--status-green)', fontWeight: 700 }}>₹1,200</span>
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
          Standard Verification Checklist
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}
          >
            <input type="checkbox" defaultChecked />
            Verify fuel tank capacity and oil levels before loading
          </label>
          <label
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}
          >
            <input type="checkbox" defaultChecked />
            Test 3-phase output voltage (415V ± 1%) under idle load
          </label>
          <label
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}
          >
            <input type="checkbox" />
            Inspect acoustic canopy seals and exhaust silencer mounting
          </label>
          <label
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}
          >
            <input type="checkbox" />
            Capture 4-angle physical condition photographs for asset custody
          </label>
          <label
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}
          >
            <input type="checkbox" />
            Obtain customer OTP signature upon on-site handover
          </label>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" type="button">
            Mark Task as Completed
          </button>
          <button className="btn btn-outline" type="button">
            Report On-Site Issue
          </button>
        </div>
      </div>
    </div>
  );
}
