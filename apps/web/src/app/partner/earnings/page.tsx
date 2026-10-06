import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Earnings & Payouts | Partner Portal',
};

export default function PartnerEarningsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Partner Commissions & Settlement Ledger</h1>
          <p className="portal-subtitle">
            Monthly accrued commissions, pending clearances, and direct bank settlement records.
          </p>
        </div>
        <button
          className="btn btn-outline"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <span>📥</span> Download Tax Statement
        </button>
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
            Total Lifetime Commission
          </p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text)' }}>
            ₹1,42,850
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>
            ↑ 18% over prior quarter
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
            Pending Settlement
          </p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            ₹23,000
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Cycles every 15th & 30th
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
            Last Payout Date
          </p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text)' }}>
            30 Sep 2026
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>Ref #UTR-991204</span>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            TDS Withheld (10%)
          </p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text)' }}>₹14,285</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Form 16A available
          </span>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
          Payout Disbursals History
        </h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Disbursal ID</th>
                <th>Period</th>
                <th>Gross Referrals</th>
                <th>Commission Rate</th>
                <th>Net Paid (INR)</th>
                <th>Settlement Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#PAY-2026-09B</td>
                <td>16 Sep - 30 Sep 2026</td>
                <td>₹4,60,000</td>
                <td>5.0%</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹20,700</td>
                <td>HDFC Direct Bank Transfer</td>
                <td>
                  <span className="status-badge available">Settled</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#PAY-2026-09A</td>
                <td>01 Sep - 15 Sep 2026</td>
                <td>₹3,80,000</td>
                <td>5.0%</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹17,100</td>
                <td>HDFC Direct Bank Transfer</td>
                <td>
                  <span className="status-badge available">Settled</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#PAY-2026-08B</td>
                <td>16 Aug - 31 Aug 2026</td>
                <td>₹5,10,000</td>
                <td>5.0%</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹22,950</td>
                <td>HDFC Direct Bank Transfer</td>
                <td>
                  <span className="status-badge available">Settled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
