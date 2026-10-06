import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Listed Products | Owner Portal',
};

const OWNER_PRODUCTS = [
  {
    id: 'OWP-101',
    name: '5 kVA Pure Sine Wave Inverter System',
    category: 'Power & Energy',
    totalUnits: 4,
    onRent: 3,
    dailyRate: 1200,
    status: 'active',
  },
  {
    id: 'OWP-102',
    name: 'Honda EU70is 7kVA Silent Inverter Generator',
    category: 'Power & Energy',
    totalUnits: 2,
    onRent: 2,
    dailyRate: 2200,
    status: 'active',
  },
  {
    id: 'OWP-103',
    name: '10 kVA Industrial Mobile Diesel Generator',
    category: 'Power & Energy',
    totalUnits: 3,
    onRent: 1,
    dailyRate: 3800,
    status: 'active',
  },
  {
    id: 'OWP-104',
    name: 'Tata Ace Gold Utility Cargo Van',
    category: 'Vehicles & Fleet',
    totalUnits: 5,
    onRent: 2,
    dailyRate: 1500,
    status: 'active',
  },
];

export default function OwnerProductsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Listed Rental Equipment ({OWNER_PRODUCTS.length})</h1>
          <p className="portal-subtitle">
            Manage catalog listings, daily rates, and asset specifications.
          </p>
        </div>
        <Link href="/owner/products/new" className="btn btn-primary btn-sm">
          + Add New Equipment
        </Link>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Equipment Model</th>
              <th>Category</th>
              <th>Fleet Inventory</th>
              <th>Daily Rate</th>
              <th>Listing Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {OWNER_PRODUCTS.map((prod) => (
              <tr key={prod.id}>
                <td style={{ fontWeight: 600 }}>#{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>
                  <strong>{prod.onRent}</strong> / {prod.totalUnits} on Rent
                </td>
                <td style={{ fontWeight: 600 }}>₹{prod.dailyRate.toLocaleString()} / day</td>
                <td>
                  <span className="status-badge available">Active Listing</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/owner/products/${prod.id}`} className="btn btn-outline btn-sm">
                      Manage →
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
