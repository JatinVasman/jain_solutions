import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Customer Account Overview',
};

export default function AccountOverviewPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Customer Dashboard</h1>
          <p className="portal-subtitle">
            Welcome back, Vikram. Manage your ongoing equipment rentals and deliveries.
          </p>
        </div>
        <Link href="/products" className="btn btn-primary btn-sm">
          + Book New Rental
        </Link>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Active On-Site Rentals</div>
          <div className="stat-card-value">2</div>
          <div className="stat-card-trend">● Due for return in 3 days</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Completed Bookings</div>
          <div className="stat-card-value">7</div>
          <div className="stat-card-trend">✓ All deposits settled</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Security Deposits in Escrow</div>
          <div className="stat-card-value">₹20,000</div>
          <div className="stat-card-trend">Refundable upon hub check</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Saved Equipment</div>
          <div className="stat-card-value">4</div>
          <div className="stat-card-trend">3 available for instant dispatch</div>
        </div>
      </div>

      {/* Active Rentals Table */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
          Active Equipment Rentals
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Equipment Name</th>
                <th>Category</th>
                <th>Tenure Window</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#RNT-2026-8941</td>
                <td>5 kVA Pure Sine Wave Inverter System</td>
                <td>Power & Energy</td>
                <td>10 Oct – 15 Oct 2026</td>
                <td>
                  <span className="status-badge available">On-Site Active</span>
                </td>
                <td>
                  <Link href="/account/rentals/RNT-2026-8941" className="btn btn-outline btn-sm">
                    Details →
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#RNT-2026-8712</td>
                <td>Sony FX3 Full-Frame Cinema Kit</td>
                <td>Cameras & Audio</td>
                <td>08 Oct – 12 Oct 2026</td>
                <td>
                  <span className="status-badge available">On-Site Active</span>
                </td>
                <td>
                  <Link href="/account/rentals/RNT-2026-8712" className="btn btn-outline btn-sm">
                    Details →
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
