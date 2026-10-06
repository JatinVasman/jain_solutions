import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Partners | Admin Console',
};

const PARTNERS = [
  {
    id: 'PTR-3012',
    entity: 'Nexus B2B Agency',
    contact: 'liaison@nexus-b2b.example',
    totalReferred: 18,
    totalVolume: '₹14.8L',
    commissionPaid: '₹74,000',
    status: 'Active',
  },
  {
    id: 'PTR-3019',
    entity: 'Metro Cine Guild Logistics',
    contact: 'ops@metrocine.example',
    totalReferred: 26,
    totalVolume: '₹22.4L',
    commissionPaid: '₹1,12,000',
    status: 'Active',
  },
  {
    id: 'PTR-3031',
    entity: 'Apex Event Planners Association',
    contact: 'partnerships@apexevents.example',
    totalReferred: 14,
    totalVolume: '₹11.2L',
    commissionPaid: '₹56,000',
    status: 'Active',
  },
];

export default function AdminPartnersPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Commercial Partner Network ({PARTNERS.length})</h1>
          <p className="portal-subtitle">
            Commercial affiliate alliances, corporate sourcing partners, and commission agreements.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Partner ID</th>
              <th>Corporate Partner</th>
              <th>Representative Contact</th>
              <th>Total Clients Referred</th>
              <th>Referred Volume</th>
              <th>Commissions Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {PARTNERS.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>#{p.id}</td>
                <td>{p.entity}</td>
                <td>{p.contact}</td>
                <td>{p.totalReferred} Clients</td>
                <td>{p.totalVolume}</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>
                  {p.commissionPaid}
                </td>
                <td>
                  <span className="status-badge available">{p.status}</span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Audit SLA
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
