import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Console | Jain Solutions',
};

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Platform Operations Overview</h1>
          <p className="portal-subtitle">
            Cross-category metrics, nationwide fulfillment health, and rental velocity.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="status-badge available">● All Systems Operational</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Active Rentals Nationwide
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            1,428
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>
            ↑ 12% vs last month
          </span>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Total Catalog Assets
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>4,892</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Across 8 root categories
          </span>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Registered Users
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>18,420</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Customers, owners, partners
          </span>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Gross Rental Volume (MTD)
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--status-green)' }}>
            ₹48.6L
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>
            On track for target
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.25rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Recent Booking Orders</h2>
            <Link href="/admin/orders" className="btn btn-outline btn-sm">
              View All
            </Link>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Customer</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>#ORD-9012</td>
                  <td>Rohit Verma</td>
                  <td>Power</td>
                  <td>₹7,200</td>
                  <td>
                    <span className="status-badge booked">In Dispatch</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>#ORD-9011</td>
                  <td>Sunil Studio</td>
                  <td>Cameras</td>
                  <td>₹10,500</td>
                  <td>
                    <span className="status-badge available">Active On-Site</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>#ORD-9010</td>
                  <td>L&T Infra</td>
                  <td>Machinery</td>
                  <td>₹34,000</td>
                  <td>
                    <span className="status-badge available">Active On-Site</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Fulfillment Alerts & Actions</h2>
            <Link href="/admin/rentals" className="btn btn-outline btn-sm">
              Audit Queue
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface-subtle)',
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem' }}>
                ⚠️ 4 High-Capacity Genset Handovers due today in Delhi NCR
              </p>
              <p
                style={{
                  margin: '0.2rem 0 0',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Assigned to Hub Okhla Phase 2 logistics bay.
              </p>
            </div>
            <div
              style={{
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface-subtle)',
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem' }}>
                📋 8 Product Owner Verification Requests pending review
              </p>
              <p
                style={{
                  margin: '0.2rem 0 0',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                GST and business asset verification queued.
              </p>
            </div>
            <div
              style={{
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface-subtle)',
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem' }}>
                🔍 14 Return Inspection Reports submitted by field technicians
              </p>
              <p
                style={{
                  margin: '0.2rem 0 0',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Awaiting security deposit release clearance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
