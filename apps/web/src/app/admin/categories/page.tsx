import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES } from '../../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Category Taxonomy | Admin Console',
};

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Marketplace Categories Taxonomy ({CATEGORIES.length})</h1>
          <p className="portal-subtitle">
            Configure expandable rental categories, icon assignments, and subcategory schemas.
          </p>
        </div>
        <button className="btn btn-primary" type="button">
          + Create New Category
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Category Name</th>
              <th>Slug</th>
              <th>Product Count</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => (
              <tr key={cat.id}>
                <td style={{ fontSize: '1.4rem' }}>{cat.icon}</td>
                <td style={{ fontWeight: 600 }}>{cat.name}</td>
                <td>
                  <code>/{cat.slug}</code>
                </td>
                <td>{cat.itemCount} assets</td>
                <td
                  style={{
                    maxWidth: '300px',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {cat.description}
                </td>
                <td>
                  <span className="status-badge available">Active Taxonomy</span>
                </td>
                <td>
                  <Link href={`/categories/${cat.slug}`} className="btn btn-outline btn-sm">
                    Preview →
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
