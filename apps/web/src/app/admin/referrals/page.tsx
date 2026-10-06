import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referrals & B2B Affiliates | Admin Console',
};

const REFERRAL_PROGRAMS = [
  {
    partner: 'Nexus B2B Agency',
    code: 'REF-NEXUS-01',
    accountsReferred: 18,
    totalVolume: '₹14,80,000',
    commissionPaid: '₹74,000',
    commissionDue: '₹12,400',
    status: 'Active',
  },
  {
    partner: 'Metro Cine Guild Logistics',
    code: 'REF-METROCINE',
    accountsReferred: 26,
    totalVolume: '₹22,40,000',
    commissionPaid: '₹1,12,000',
    commissionDue: '₹18,500',
    status: 'Active',
  },
  {
    partner: 'Apex Event Planners Association',
    code: 'REF-APEXEVENTS',
    accountsReferred: 14,
    totalVolume: '₹11,20,000',
    commissionPaid: '₹56,000',
    commissionDue: '₹8,900',
    status: 'Active',
  },
  {
    partner: 'InfraFleet Equipment Sourcing',
    code: 'REF-INFRAFLEET',
    accountsReferred: 8,
    totalVolume: '₹9,60,000',
    commissionPaid: '₹48,000',
    commissionDue: '₹4,800',
    status: 'Active',
  },
];

export default function AdminReferralsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            Referral Programs & Corporate Affiliates ({REFERRAL_PROGRAMS.length})
          </h1>
          <p className="portal-subtitle">
            Configure commission rules, approve B2B liaisons, and audit escrow commission payouts.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Partner Entity</th>
              <th>Referral Token</th>
              <th>Accounts Referred</th>
              <th>Total Rental Volume</th>
              <th>Commission Settled</th>
              <th>Accrued Pending</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {REFERRAL_PROGRAMS.map((ref) => (
              <tr key={ref.code}>
                <td style={{ fontWeight: 600 }}>{ref.partner}</td>
                <td>
                  <code>{ref.code}</code>
                </td>
                <td>{ref.accountsReferred}</td>
                <td>{ref.totalVolume}</td>
                <td style={{ color: 'var(--status-green)', fontWeight: 600 }}>
                  {ref.commissionPaid}
                </td>
                <td>{ref.commissionDue}</td>
                <td>
                  <span className="status-badge available">{ref.status}</span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Audit Accruals
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
