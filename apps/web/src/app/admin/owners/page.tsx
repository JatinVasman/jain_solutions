import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Owners | Admin Console',
};

const OWNERS = [
  {
    id: 'OWN-2004',
    business: 'Apex Power Solutions',
    contact: 'Rajesh Verma',
    inventoryUnits: 28,
    activeRentals: 6,
    payoutTier: 'Tier A (12%)',
    kyc: 'Verified',
  },
  {
    id: 'OWN-2015',
    business: 'Kirloskar Green Hub',
    contact: 'Suresh Menon',
    inventoryUnits: 42,
    activeRentals: 11,
    payoutTier: 'Tier A (10%)',
    kyc: 'Verified',
  },
  {
    id: 'OWN-2022',
    business: 'CineGear Rentals Mumbai',
    contact: 'Karan Johar',
    inventoryUnits: 19,
    activeRentals: 4,
    payoutTier: 'Tier B (15%)',
    kyc: 'Verified',
  },
  {
    id: 'OWN-2039',
    business: 'BuildPro Tools & Scaffold',
    contact: 'Harpreet Singh',
    inventoryUnits: 55,
    activeRentals: 14,
    payoutTier: 'Tier A (12%)',
    kyc: 'Under Audit',
  },
];

export default function AdminOwnersPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Product Owners & Equipment Suppliers ({OWNERS.length})</h1>
          <p className="portal-subtitle">
            Manage onboarded fleet operators, equipment rental houses, asset safety certifications,
            and revenue splits.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Owner ID</th>
              <th>Supplier Entity</th>
              <th>Key Contact</th>
              <th>Listed Units</th>
              <th>Active Deployments</th>
              <th>Take Rate</th>
              <th>Compliance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {OWNERS.map((o) => (
              <tr key={o.id}>
                <td style={{ fontWeight: 600 }}>#{o.id}</td>
                <td>{o.business}</td>
                <td>{o.contact}</td>
                <td>{o.inventoryUnits} Units</td>
                <td>{o.activeRentals} Active</td>
                <td>{o.payoutTier}</td>
                <td>
                  <span className={`status-badge ${o.kyc === 'Verified' ? 'available' : 'booked'}`}>
                    {o.kyc}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Manage Supplier
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
