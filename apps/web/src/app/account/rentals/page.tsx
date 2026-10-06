import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Rentals | Customer Account',
};

const MOCK_RENTALS = [
  {
    id: 'RNT-2026-8941',
    name: '5 kVA Pure Sine Wave Inverter System',
    category: 'Power & Energy',
    dates: '10 Oct – 15 Oct 2026',
    total: 11000,
    deposit: 5000,
    status: 'active',
    statusLabel: 'On-Site Active',
  },
  {
    id: 'RNT-2026-8712',
    name: 'Sony FX3 Full-Frame Cinema Kit',
    category: 'Cameras & Audio',
    dates: '08 Oct – 12 Oct 2026',
    total: 19000,
    deposit: 15000,
    status: 'active',
    statusLabel: 'On-Site Active',
  },
  {
    id: 'RNT-2026-8302',
    name: 'Honda EU70is 7kVA Silent Generator',
    category: 'Power & Energy',
    dates: '20 Sep – 25 Sep 2026',
    total: 11000,
    deposit: 10000,
    status: 'completed',
    statusLabel: 'Returned & Closed',
  },
  {
    id: 'RNT-2026-7910',
    name: '10-Meter Electric Scissor Lift',
    category: 'Heavy Machinery',
    dates: '10 Sep – 17 Sep 2026',
    total: 26000,
    deposit: 20000,
    status: 'completed',
    statusLabel: 'Returned & Closed',
  },
];

export default function AccountRentalsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">My Equipment Rentals</h1>
          <p className="portal-subtitle">
            Track active rentals, view return schedules, and download rental invoices.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Booking Ref</th>
              <th>Equipment Name</th>
              <th>Category</th>
              <th>Rental Dates</th>
              <th>Total (Inc. Deposit)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RENTALS.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>#{r.id}</td>
                <td>{r.name}</td>
                <td>{r.category}</td>
                <td>{r.dates}</td>
                <td style={{ fontWeight: 600 }}>₹{r.total.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${r.status}`}>{r.statusLabel}</span>
                </td>
                <td>
                  <Link href={`/account/rentals/${r.id}`} className="btn btn-outline btn-sm">
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
