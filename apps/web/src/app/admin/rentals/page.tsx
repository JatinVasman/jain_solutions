import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Active Platform Rentals | Admin Console',
};

const ACTIVE_RENTALS = [
  {
    id: 'RNT-9901',
    customer: 'Aarav Sharma',
    equipment: '5 kVA Pure Sine Wave Inverter System',
    returnDue: '12 Oct 2026',
    deposit: '₹5,000 Held',
    dispatchHub: 'South Delhi Hub',
    status: 'Active On-Site',
  },
  {
    id: 'RNT-9902',
    customer: 'Sunil Studio Mumbai',
    equipment: 'Sony FX3 Cinema Camera Kit',
    returnDue: '08 Oct 2026',
    deposit: '₹15,000 Held',
    dispatchHub: 'Bandra Logistics',
    status: 'Active On-Site',
  },
  {
    id: 'RNT-9903',
    customer: 'L&T Infrastructure',
    equipment: 'JCB Mini Excavator (1.5 Tonne)',
    returnDue: '20 Oct 2026',
    deposit: '₹30,000 Held',
    dispatchHub: 'Gurugram Yard',
    status: 'Active On-Site',
  },
  {
    id: 'RNT-9904',
    customer: 'TechSummit India',
    equipment: 'Event Lighting & Line Array Audio Rig',
    returnDue: '05 Oct 2026',
    deposit: '₹20,000 Held',
    dispatchHub: 'Bengaluru Central',
    status: 'Return Overdue',
  },
];

export default function AdminRentalsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Active Field Rentals Fleet ({ACTIVE_RENTALS.length})</h1>
          <p className="portal-subtitle">
            Live equipment custody tracking, security deposit escrows, and return milestone
            schedules.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Rental Ref</th>
              <th>Customer Entity</th>
              <th>Deployed Equipment</th>
              <th>Return Due Date</th>
              <th>Deposit Escrow</th>
              <th>Dispatched Hub</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVE_RENTALS.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>#{r.id}</td>
                <td>{r.customer}</td>
                <td>{r.equipment}</td>
                <td>{r.returnDue}</td>
                <td>{r.deposit}</td>
                <td>{r.dispatchHub}</td>
                <td>
                  <span
                    className={`status-badge ${r.status.includes('Overdue') ? 'booked' : 'available'}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Manage Custody
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
