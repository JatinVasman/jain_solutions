import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Owner Overview | Product Owner Portal',
};

export default function OwnerOverviewPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Owner Operations Overview</h1>
          <p className="portal-subtitle">
            Monitor asset utilization, upcoming dispatches, and rental earnings yield.
          </p>
        </div>
        <Link href="/owner/products/new" className="btn btn-primary btn-sm">
          + Add New Equipment
        </Link>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total Listed Assets</div>
          <div className="stat-card-value">12</div>
          <div className="stat-card-trend">● Across 3 Categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active Units on Rent</div>
          <div className="stat-card-value">8 / 14</div>
          <div className="stat-card-trend">57% Fleet Utilization</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Pending Rental Requests</div>
          <div className="stat-card-value">3</div>
          <div className="stat-card-trend">Awaiting Owner Confirmation</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Net Monthly Yield</div>
          <div className="stat-card-value">₹1,42,800</div>
          <div className="stat-card-trend">+14% vs Last Month</div>
        </div>
      </div>

      {/* Pending Requests Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
          Pending Rental Authorizations
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Equipment Unit</th>
                <th>Requested Tenure</th>
                <th>Customer / Site</th>
                <th>Projected Net</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#REQ-9921</td>
                <td>5 kVA Pure Sine Wave Inverter System</td>
                <td>12 Oct – 20 Oct 2026 (8 Days)</td>
                <td>Skyline Media &bull; New Delhi Hub</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹8,640</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="btn btn-primary btn-sm">
                      Approve
                    </button>
                    <button type="button" className="btn btn-outline btn-sm">
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#REQ-9918</td>
                <td>Honda EU70is 7kVA Silent Generator</td>
                <td>14 Oct – 17 Oct 2026 (3 Days)</td>
                <td>Apex Events &bull; Noida Sector 62</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹5,940</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="btn btn-primary btn-sm">
                      Approve
                    </button>
                    <button type="button" className="btn btn-outline btn-sm">
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
