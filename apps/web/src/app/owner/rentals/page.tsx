import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rental Requests | Owner Portal',
};

const OWNER_RENTALS = [
  {
    id: 'ORD-1092',
    product: '5 kVA Inverter System',
    dates: '10 Oct – 15 Oct 2026',
    customer: 'Horizon Productions',
    netPayout: 5100,
    status: 'Active',
  },
  {
    id: 'ORD-1088',
    product: 'Honda EU70is Silent Generator',
    dates: '14 Oct – 17 Oct 2026',
    customer: 'Apex Events',
    netPayout: 5610,
    status: 'Approved (Pending Dispatch)',
  },
  {
    id: 'ORD-1075',
    product: 'Tata Ace Gold Cargo Pickup',
    dates: '01 Oct – 07 Oct 2026',
    customer: 'FreightDirect Ltd',
    netPayout: 7225,
    status: 'Completed & Returned',
  },
];

export default function OwnerRentalsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Rental Requests & Contracts</h1>
          <p className="portal-subtitle">
            Authorize bookings, track on-site customer contracts, and verify returns.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order Ref</th>
              <th>Equipment</th>
              <th>Rental Period</th>
              <th>Client Entity</th>
              <th>Net Owner Payout</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {OWNER_RENTALS.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>#{r.id}</td>
                <td>{r.product}</td>
                <td>{r.dates}</td>
                <td>{r.customer}</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>
                  ₹{r.netPayout.toLocaleString()}
                </td>
                <td>
                  <span
                    className={`status-badge ${r.status.includes('Active') ? 'available' : r.status.includes('Pending') ? 'booked' : 'neutral'}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="btn btn-outline btn-sm">
                    Contract Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
