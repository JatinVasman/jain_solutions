import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FEATURED_PRODUCTS } from '../../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Products Master Catalog | Admin Console',
};

export default function AdminProductsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            Platform Master Products Catalog ({FEATURED_PRODUCTS.length})
          </h1>
          <p className="portal-subtitle">
            Global product definitions, pricing benchmarks, owner listings, and category bindings.
          </p>
        </div>
        <Link href="/owner/products/new" className="btn btn-primary">
          + Add Product Template
        </Link>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Owner / Supplier</th>
              <th>Daily Rate</th>
              <th>Deposit</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {FEATURED_PRODUCTS.map((prod) => (
              <tr key={prod.id}>
                <td style={{ fontWeight: 600 }}>#{prod.id}</td>
                <td>
                  <Link
                    href={`/products/${prod.slug}`}
                    style={{ fontWeight: 600, color: 'var(--color-text)' }}
                  >
                    {prod.name}
                  </Link>
                </td>
                <td>{prod.category}</td>
                <td>{prod.owner.name}</td>
                <td>₹{prod.dailyRate.toLocaleString()}/day</td>
                <td>₹{prod.securityDeposit.toLocaleString()}</td>
                <td>{prod.rating} ★</td>
                <td>
                  <span className="status-badge available">{prod.availability}</span>
                </td>
                <td>
                  <Link href={`/products/${prod.slug}`} className="btn btn-outline btn-sm">
                    Inspect
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
