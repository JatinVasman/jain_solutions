import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

interface OwnerProductProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: OwnerProductProps): Metadata {
  return {
    title: `Manage Equipment #${params.id} | Owner Portal`,
  };
}

export default function OwnerProductDetailPage({ params }: OwnerProductProps) {
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
            <h1 className="portal-title">Manage Asset #{params.id}</h1>
            <span className="status-badge available">Active Listing</span>
          </div>
          <p className="portal-subtitle">
            5 kVA Pure Sine Wave Inverter System &bull; 4 Registered Physical Units
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn btn-secondary btn-sm">
            Edit Listing Pricing
          </button>
          <button type="button" className="btn btn-primary btn-sm">
            + Register Physical Unit
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
          {/* Registered Units Table */}
          <div
            style={{
              background: 'var(--bg-card)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
              Individual Fleet Units
            </h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Unit Serial</th>
                    <th>Hub Station</th>
                    <th>Condition</th>
                    <th>Current Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600 }}>INV-5000-DL-9821</td>
                    <td>South Delhi Hub</td>
                    <td>Grade A (Tested)</td>
                    <td>
                      <span className="status-badge available">On-Site (Gurugram)</span>
                    </td>
                    <td>
                      <button type="button" className="btn btn-outline btn-sm">
                        Log Service
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>INV-5000-DL-9822</td>
                    <td>South Delhi Hub</td>
                    <td>Grade A</td>
                    <td>
                      <span className="status-badge available">On-Site (Noida)</span>
                    </td>
                    <td>
                      <button type="button" className="btn btn-outline btn-sm">
                        Log Service
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>INV-5000-DL-9823</td>
                    <td>South Delhi Hub</td>
                    <td>Grade A</td>
                    <td>
                      <span className="status-badge available">In Hub (Ready)</span>
                    </td>
                    <td>
                      <button type="button" className="btn btn-outline btn-sm">
                        Log Service
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>INV-5000-DL-9824</td>
                    <td>South Delhi Hub</td>
                    <td>Grade B+</td>
                    <td>
                      <span className="status-badge booked">Maintenance Hold</span>
                    </td>
                    <td>
                      <button type="button" className="btn btn-outline btn-sm">
                        Log Service
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          {/* Commercial Terms Summary */}
          <div
            style={{
              background: 'var(--bg-card)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
            }}
          >
            <h3
              style={{ fontSize: '1.15rem', color: 'var(--text-title)', marginBottom: '1.25rem' }}
            >
              Commercial Terms
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Daily Customer Price:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-title)' }}>₹1,200</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Owner Net Payout / day:</span>
                <span style={{ fontWeight: 600, color: 'var(--status-green)' }}>₹1,020 (85%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Marketplace Fee:</span>
                <span style={{ color: 'var(--text-title)' }}>₹180 (15%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Security Deposit:</span>
                <span style={{ color: 'var(--text-title)' }}>₹5,000</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/owner/products" className="btn btn-outline" style={{ width: '100%' }}>
                ← Back to Listed Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
