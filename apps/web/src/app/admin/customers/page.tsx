import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Accounts | Admin Console',
};

const CUSTOMERS = [
  {
    id: 'CST-1001',
    name: 'Aarav Sharma',
    location: 'New Delhi, DL',
    totalRentals: 6,
    totalSpend: '₹48,500',
    kyc: 'Verified',
    status: 'Active',
  },
  {
    id: 'CST-1009',
    name: 'Priya Mehra',
    location: 'Bengaluru, KA',
    totalRentals: 3,
    totalSpend: '₹14,200',
    kyc: 'Verified',
    status: 'Active',
  },
  {
    id: 'CST-1044',
    name: 'Vikram Sethi',
    location: 'Mumbai, MH',
    totalRentals: 9,
    totalSpend: '₹92,000',
    kyc: 'Verified',
    status: 'Active',
  },
  {
    id: 'CST-1082',
    name: 'Ananya Rao',
    location: 'Hyderabad, TS',
    totalRentals: 1,
    totalSpend: '₹3,500',
    kyc: 'Pending Aadhaar',
    status: 'Review',
  },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Customer Accounts Management ({CUSTOMERS.length})</h1>
          <p className="portal-subtitle">
            Customer verification status, booking history, lifetime rental value, and account
            limits.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Primary Hub</th>
              <th>Total Rentals</th>
              <th>Lifetime Spend</th>
              <th>KYC Status</th>
              <th>Account State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>#{c.id}</td>
                <td>{c.name}</td>
                <td>{c.location}</td>
                <td>{c.totalRentals}</td>
                <td style={{ fontWeight: 600 }}>{c.totalSpend}</td>
                <td>
                  <span className={`status-badge ${c.kyc === 'Verified' ? 'available' : 'booked'}`}>
                    {c.kyc}
                  </span>
                </td>
                <td>
                  <span className="status-badge available">{c.status}</span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Audit Dossier
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
