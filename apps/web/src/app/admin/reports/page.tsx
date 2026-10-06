import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Reports & Analytics | Admin Console',
};

export default function AdminReportsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Platform Intelligence & Financial Reports</h1>
          <p className="portal-subtitle">
            Rental GMV, category yield analysis, equipment utilization rates, and regional demand
            matrices.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline btn-sm" type="button">
            📊 Export CSV
          </button>
          <button className="btn btn-primary btn-sm" type="button">
            📥 Generate Executive PDF
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
            Gross Merchandise Value (GMV)
          </p>
          <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text)' }}>
            ₹1,48,20,000
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>
            +24.5% QoQ Expansion
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
            Platform Net Commission
          </p>
          <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            ₹22,23,000
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Average 15% marketplace take
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
            Fleet Utilization Rate
          </p>
          <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text)' }}>78.4%</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>
            Peak in Cameras & Power
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
            Average Rental Duration
          </p>
          <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text)' }}>
            5.8 Days
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Repeat customer index: 42%
          </span>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
          Category Utilization & Yield Breakdown
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rental Category</th>
                <th>Active Inventory Units</th>
                <th>Days Rented (MTD)</th>
                <th>Utilization Rate</th>
                <th>Gross Revenue (INR)</th>
                <th>Demand Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>⚡ Power & Energy</td>
                <td>680 Units</td>
                <td>3,450 Days</td>
                <td>84.2%</td>
                <td>₹18,40,000</td>
                <td>
                  <span style={{ color: 'var(--status-green)', fontWeight: 600 }}>
                    ↑ High Demand
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>📷 Cameras & Production</td>
                <td>420 Units</td>
                <td>2,240 Days</td>
                <td>89.0%</td>
                <td>₹16,50,000</td>
                <td>
                  <span style={{ color: 'var(--status-green)', fontWeight: 600 }}>
                    ↑ High Demand
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>🏗️ Heavy Machinery</td>
                <td>210 Units</td>
                <td>1,820 Days</td>
                <td>76.5%</td>
                <td>₹24,80,000</td>
                <td>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>→ Stable</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>🎉 Event & Staging</td>
                <td>340 Units</td>
                <td>1,120 Days</td>
                <td>71.0%</td>
                <td>₹9,60,000</td>
                <td>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>→ Stable</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>🔨 Tools & Equipment</td>
                <td>580 Units</td>
                <td>1,980 Days</td>
                <td>68.4%</td>
                <td>₹5,20,000</td>
                <td>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>→ Stable</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
