import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Client Referrals | Partner Portal',
};

const REFERRALS = [
  {
    id: 'REF-8801',
    client: 'Metro Cinema Studios',
    category: 'Cameras & Audio',
    volume: 95000,
    commission: 4750,
    date: '02 Oct 2026',
    status: 'Completed',
  },
  {
    id: 'REF-8802',
    client: 'GreenTech Infrastructure',
    category: 'Heavy Machinery',
    volume: 180000,
    commission: 9000,
    date: '28 Sep 2026',
    status: 'Active On-Site',
  },
  {
    id: 'REF-8803',
    client: 'Apex Convention Hub',
    category: 'Event Equipment',
    volume: 125000,
    commission: 6250,
    date: '15 Sep 2026',
    status: 'Completed',
  },
  {
    id: 'REF-8804',
    client: 'Swift Courier Logistics',
    category: 'Vehicles & Fleet',
    volume: 60000,
    commission: 3000,
    date: '10 Sep 2026',
    status: 'Completed',
  },
];

export default function PartnerReferralsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Client Referral Pipeline ({REFERRALS.length})</h1>
          <p className="portal-subtitle">
            Track referred enterprise clients and recurring rental revenue shares.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Referral Ref</th>
              <th>Referred Business</th>
              <th>Primary Category</th>
              <th>Rental Volume</th>
              <th>Commission (5%)</th>
              <th>Date Referred</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {REFERRALS.map((ref) => (
              <tr key={ref.id}>
                <td style={{ fontWeight: 600 }}>#{ref.id}</td>
                <td>{ref.client}</td>
                <td>{ref.category}</td>
                <td>₹{ref.volume.toLocaleString()}</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>
                  ₹{ref.commission.toLocaleString()}
                </td>
                <td>{ref.date}</td>
                <td>
                  <span
                    className={`status-badge ${ref.status.includes('Active') ? 'booked' : 'available'}`}
                  >
                    {ref.status}
                  </span>
                </td>
                <td>
                  <Link href={`/partner/referrals/${ref.id}`} className="btn btn-outline btn-sm">
                    View Ledger →
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
