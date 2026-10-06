import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partner Dashboard | Partner Portal',
};

export default function PartnerOverviewPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Partner Program Dashboard</h1>
          <p className="portal-subtitle">
            Track referred client rental volumes, pipeline status, and affiliate commissions.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm">
          + Generate New Referral Link
        </button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total Referred Clients</div>
          <div className="stat-card-value">18</div>
          <div className="stat-card-trend">● 14 Active Accounts</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active Rental GMV</div>
          <div className="stat-card-value">₹8,45,000</div>
          <div className="stat-card-trend">Across 22 Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Accrued Commission</div>
          <div className="stat-card-value">₹42,250</div>
          <div className="stat-card-trend">5% Flat Partner Share</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Conversion Rate</div>
          <div className="stat-card-value">68.2%</div>
          <div className="stat-card-trend">Top tier referral tier</div>
        </div>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
          Recent Referred Bookings
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Referral ID</th>
                <th>Client Organization</th>
                <th>Equipment Category</th>
                <th>Rental Volume</th>
                <th>Your Commission</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#REF-8801</td>
                <td>Metro Cinema Studios</td>
                <td>Cameras & Audio</td>
                <td>₹95,000</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹4,750</td>
                <td>
                  <span className="status-badge available">Settled</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#REF-8802</td>
                <td>GreenTech Infrastructure</td>
                <td>Heavy Machinery</td>
                <td>₹1,80,000</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹9,000</td>
                <td>
                  <span className="status-badge booked">Active On-Site</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
