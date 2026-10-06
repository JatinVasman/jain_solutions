import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

interface ReferralDetailPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: ReferralDetailPageProps): Metadata {
  return {
    title: `Referral #${params.id} | Partner Portal`,
  };
}

export default function PartnerReferralDetailPage({ params }: ReferralDetailPageProps) {
  return (
    <div>
      <div className="portal-header">
        <div>
          <div style={{ marginBottom: '0.5rem' }}>
            <Link
              href="/partner/referrals"
              style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}
            >
              ← Back to Referrals Pipeline
            </Link>
          </div>
          <h1 className="portal-title">Referral Ledger #{params.id}</h1>
          <p className="portal-subtitle">
            Commercial referral breakdown, commission split, and associated orders.
          </p>
        </div>
        <div>
          <span className="status-badge available">Settled in Escrow</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            Referred Entity Details
          </h3>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Business:</strong> Metro Cinema Studios Pvt Ltd
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Contact Person:</strong> Rajesh Verma (Procurement Lead)
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>GSTIN:</strong> 07AAACM1234F1Z5
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Account Type:</strong> Enterprise Tier B
          </p>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            Contract & Commission
          </h3>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Referral Agreement:</strong> B2B Standard SLA (5%)
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Gross Billed Volume:</strong> ₹95,000
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Accrued Commission:</strong>{' '}
            <span style={{ color: 'var(--status-green)', fontWeight: 700 }}>₹4,750</span>
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Payout Status:</strong> Disbursed via NEFT
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
          Associated Rental Orders
        </h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Equipment Booked</th>
                <th>Duration</th>
                <th>Rental Value</th>
                <th>Commission</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#ORD-7741</td>
                <td>Sony FX6 Cinema Camera Package (x2)</td>
                <td>7 Days</td>
                <td>₹65,000</td>
                <td style={{ color: 'var(--status-green)', fontWeight: 600 }}>₹3,250</td>
                <td>
                  <span className="status-badge available">Completed</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#ORD-7789</td>
                <td>Wireless Lavalier Mic Sets & Monitor Kit</td>
                <td>7 Days</td>
                <td>₹30,000</td>
                <td style={{ color: 'var(--status-green)', fontWeight: 600 }}>₹1,500</td>
                <td>
                  <span className="status-badge available">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
