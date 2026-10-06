import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Users Master | Admin Console',
};

const USERS = [
  {
    id: 'USR-1001',
    name: 'Aarav Sharma',
    role: 'Customer',
    email: 'aarav.sharma@example.com',
    joined: '14 May 2026',
    status: 'Active',
  },
  {
    id: 'USR-2004',
    name: 'Apex Power Solutions',
    role: 'Product Owner',
    email: 'contact@apexpower.example',
    joined: '02 Feb 2026',
    status: 'Verified',
  },
  {
    id: 'USR-3012',
    name: 'Nexus B2B Agency',
    role: 'Partner',
    email: 'liaison@nexus-b2b.example',
    joined: '19 Jun 2026',
    status: 'Active',
  },
  {
    id: 'USR-4022',
    name: 'Ramesh Kumar',
    role: 'Field Freelancer',
    email: 'ramesh.tech402@example.com',
    joined: '08 Aug 2026',
    status: 'Verified',
  },
  {
    id: 'USR-1009',
    name: 'Priya Mehra',
    role: 'Customer',
    email: 'priya.m@example.com',
    joined: '11 Jul 2026',
    status: 'Active',
  },
  {
    id: 'USR-2015',
    name: 'Kirloskar Green Hub',
    role: 'Product Owner',
    email: 'rentals@kirloskar-green.example',
    joined: '22 Jan 2026',
    status: 'Verified',
  },
];

export default function AdminUsersPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Platform Users Directory ({USERS.length})</h1>
          <p className="portal-subtitle">
            Master directory of all registered platform actors across customer and business tiers.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/admin/customers" className="btn btn-outline btn-sm">
            Customers
          </Link>
          <Link href="/admin/owners" className="btn btn-outline btn-sm">
            Owners
          </Link>
          <Link href="/admin/partners" className="btn btn-outline btn-sm">
            Partners
          </Link>
          <Link href="/admin/freelancers" className="btn btn-outline btn-sm">
            Freelancers
          </Link>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name / Legal Entity</th>
              <th>Role Class</th>
              <th>Primary Contact</th>
              <th>Onboarded</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id}>
                <td style={{ fontWeight: 600 }}>#{u.id}</td>
                <td>{u.name}</td>
                <td>
                  <span className="status-badge available">{u.role}</span>
                </td>
                <td>{u.email}</td>
                <td>{u.joined}</td>
                <td>
                  <span className="status-badge available">{u.status}</span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Manage
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
