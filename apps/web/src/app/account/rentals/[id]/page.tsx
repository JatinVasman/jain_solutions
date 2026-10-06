import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

interface RentalDetailProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: RentalDetailProps): Metadata {
  return {
    title: `Rental #${params.id} | Customer Account`,
  };
}

export default function AccountRentalDetailPage({ params }: RentalDetailProps) {
  return (
    <div>
      <div className="portal-header">
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.25rem',
            }}
          >
            <h1 className="portal-title">Rental #{params.id}</h1>
            <span className="status-badge available">On-Site Active</span>
          </div>
          <p className="portal-subtitle">
            5 kVA Pure Sine Wave Inverter System &bull; 10 Oct – 15 Oct 2026
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn btn-secondary btn-sm">
            Request Tenure Extension
          </button>
          <button type="button" className="btn btn-primary btn-sm">
            Download Rental Agreement (PDF)
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <div>
          {/* Timeline & Status */}
          <div
            style={{
              background: 'var(--bg-card)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              marginBottom: '1.75rem',
            }}
          >
            <h3
              style={{ fontSize: '1.15rem', color: 'var(--text-title)', marginBottom: '1.25rem' }}
            >
              Dispatch & Return Timeline
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--status-green)' }}>✓</span>
                <div>
                  <strong style={{ color: 'var(--text-title)', fontSize: '0.95rem' }}>
                    Fulfillment Dispatched from South Delhi Hub
                  </strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    10 Oct 2026, 09:30 AM &bull; Logistics Driver: Rajesh K.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--status-green)' }}>✓</span>
                <div>
                  <strong style={{ color: 'var(--text-title)', fontSize: '0.95rem' }}>
                    Site Inspection Handover Completed
                  </strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    10 Oct 2026, 11:15 AM &bull; Received by Vikram Verma (OTP verified)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--accent-primary)' }}>●</span>
                <div>
                  <strong style={{ color: 'var(--text-title)', fontSize: '0.95rem' }}>
                    Scheduled Return Pickup
                  </strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    15 Oct 2026, 04:00 PM &bull; Gurugram Project Site
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment & Inspection */}
          <div
            style={{
              background: 'var(--bg-card)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
              Equipment & Condition Checklist
            </h3>

            <div className="table-container">
              <table className="data-table">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Serial Number</td>
                    <td>INV-5000-DL-9821</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                      Included Accessories
                    </td>
                    <td>
                      2x 220Ah Tubular Batteries, Heavy Gauge Copper Connecting Cables, Heavy
                      Trolley
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                      Pre-dispatch Photos
                    </td>
                    <td>4 Verified Photos Logged in Inspection Manifest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '1.75rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', marginBottom: '1.25rem' }}>
            Financial Breakdown
          </h3>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Rental (5 Days @ ₹1,200/day):</span>
              <span style={{ color: 'var(--text-title)' }}>₹6,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Round-trip Freight Logistics:</span>
              <span style={{ color: 'var(--text-title)' }}>₹800</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Security Deposit (Escrow):</span>
              <span style={{ color: 'var(--text-title)' }}>₹5,000</span>
            </div>
            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              <span>Total Settled:</span>
              <span style={{ color: '#38bdf8' }}>₹11,800</span>
            </div>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              background: 'var(--bg-surface)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            🔒 Deposit Escrow: ₹5,000 will be auto-released within 24h of return inspection
            clearance.
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/account/rentals" className="btn btn-outline" style={{ width: '100%' }}>
              ← Return to All Rentals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
