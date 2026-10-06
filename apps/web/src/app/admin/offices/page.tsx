import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate & Regional Offices | Admin Console',
};

const OFFICES = [
  {
    id: 'OFF-01',
    name: 'Corporate Headquarters',
    city: 'New Delhi',
    address: 'Barakhamba Road, Connaught Place, New Delhi - 110001',
    staff: 48,
    phone: '+91 11 4050 9900',
    status: 'Primary HQ',
  },
  {
    id: 'OFF-02',
    name: 'Western Operations Hub',
    city: 'Mumbai',
    address: 'Bandra-Kurla Complex (BKC), Mumbai, MH - 400051',
    staff: 32,
    phone: '+91 22 6120 4400',
    status: 'Regional Office',
  },
  {
    id: 'OFF-03',
    name: 'Southern Operations Hub',
    city: 'Bengaluru',
    address: 'Indiranagar 100ft Road, Bengaluru, KA - 560038',
    staff: 28,
    phone: '+91 80 4410 7700',
    status: 'Regional Office',
  },
  {
    id: 'OFF-04',
    name: 'North Logistics Command',
    city: 'Noida',
    address: 'Sector 62 Institutional Area, Noida, UP - 201309',
    staff: 22,
    phone: '+91 120 491 8800',
    status: 'Logistics Command',
  },
];

export default function AdminOfficesPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Regional Offices & Operations Centers ({OFFICES.length})</h1>
          <p className="portal-subtitle">
            Platform company branch offices, regional legal entities, and command centers.
          </p>
        </div>
        <button className="btn btn-primary" type="button">
          + Register Branch Office
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Office ID</th>
              <th>Branch Facility</th>
              <th>City</th>
              <th>Physical Address</th>
              <th>Headcount</th>
              <th>Direct Line</th>
              <th>Role Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {OFFICES.map((off) => (
              <tr key={off.id}>
                <td style={{ fontWeight: 600 }}>#{off.id}</td>
                <td>{off.name}</td>
                <td>{off.city}</td>
                <td style={{ maxWidth: '280px', fontSize: '0.85rem' }}>{off.address}</td>
                <td>{off.staff} Team</td>
                <td>{off.phone}</td>
                <td>
                  <span className="status-badge available">{off.status}</span>
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
