import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Freelancer Dashboard | Field Operations',
};

export default function FreelancerDashboardPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Field Specialist Dashboard</h1>
          <p className="portal-subtitle">
            On-site equipment deployment, quality inspection, and return check-ins.
          </p>
        </div>
        <div>
          <span className="status-badge available">● Active On Shift</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Tasks Assigned Today
          </p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-primary)' }}>3</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            2 Inspections, 1 Setup
          </span>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Tasks Completed (This Month)
          </p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text)' }}>24</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>
            99.2% on-time rating
          </span>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Earned Fee (MTD)
          </p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--status-green)' }}>
            ₹36,800
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Disbursement due Friday
          </span>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Assigned Zone
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text)' }}>
            Delhi NCR
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Okhla & South Hub
          </span>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Active Field Tasks Queue</h2>
          <Link href="/freelancer/tasks" className="btn btn-outline btn-sm">
            View All Assigned Tasks
          </Link>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Type</th>
                <th>Equipment Asset</th>
                <th>Client Site / Location</th>
                <th>Scheduled Time</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#TSK-4091</td>
                <td>Pre-Delivery Inspection</td>
                <td>Silent Diesel Generator (62.5 kVA)</td>
                <td>Noida Sector 62, B-Block</td>
                <td>Today, 14:00 IST</td>
                <td>
                  <span className="status-badge booked">Urgent</span>
                </td>
                <td>
                  <Link href="/freelancer/tasks/TSK-4091" className="btn btn-outline btn-sm">
                    View Task →
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#TSK-4092</td>
                <td>On-Site Rigging / Setup</td>
                <td>Sony FX6 Cinema Camera Rig + Gimbals</td>
                <td>Film City, Noida Gate 3</td>
                <td>Today, 16:30 IST</td>
                <td>
                  <span className="status-badge available">Normal</span>
                </td>
                <td>
                  <Link href="/freelancer/tasks/TSK-4092" className="btn btn-outline btn-sm">
                    View Task →
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#TSK-4093</td>
                <td>Return Health Audit</td>
                <td>Demolition Jackhammer (Hilti TE 3000)</td>
                <td>Okhla Industrial Area Phase 2</td>
                <td>Tomorrow, 10:00 IST</td>
                <td>
                  <span className="status-badge available">Normal</span>
                </td>
                <td>
                  <Link href="/freelancer/tasks/TSK-4093" className="btn btn-outline btn-sm">
                    View Task →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
