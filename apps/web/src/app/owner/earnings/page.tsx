import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Earnings & Payouts | Owner Portal',
};

export default function OwnerEarningsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Earnings & Payout Settlements</h1>
          <p className="portal-subtitle">
            Track settled weekly deposits, pending revenue, and ledger breakdowns.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm">
          Download Tax Statement (CSV)
        </button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Lifetime Gross Revenue</div>
          <div className="stat-card-value">₹12,48,500</div>
          <div className="stat-card-trend">● 100% verified settlement</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Next Scheduled Payout</div>
          <div className="stat-card-value">₹42,600</div>
          <div className="stat-card-trend">Due Friday, 16 Oct 2026</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active Yield in Escrow</div>
          <div className="stat-card-value">₹18,450</div>
          <div className="stat-card-trend">Held until rental completion</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Average Asset ROI</div>
          <div className="stat-card-value">32.4% / yr</div>
          <div className="stat-card-trend">Top tier fleet performance</div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Settlement ID</th>
              <th>Payout Period</th>
              <th>Units Serviced</th>
              <th>Gross Amount</th>
              <th>Platform Fee (15%)</th>
              <th>Net Credited</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>#PAY-2026-441</td>
              <td>01 Oct – 07 Oct 2026</td>
              <td>6 Units</td>
              <td>₹48,000</td>
              <td>-₹7,200</td>
              <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹40,800</td>
              <td>
                <span className="status-badge available">Settled</span>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>#PAY-2026-432</td>
              <td>24 Sep – 30 Sep 2026</td>
              <td>8 Units</td>
              <td>₹64,500</td>
              <td>-₹9,675</td>
              <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹54,825</td>
              <td>
                <span className="status-badge available">Settled</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
