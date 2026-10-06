import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications | Customer Account',
};

const MOCK_NOTIFS = [
  {
    id: '1',
    title: 'Dispatch Dispatched: 5kVA Inverter System',
    time: 'Today, 09:30 AM',
    body: 'Your equipment has departed South Delhi Hub with logistics driver Rajesh K.',
    read: false,
  },
  {
    id: '2',
    title: 'Inspection Certificate Issued for #RNT-2026-8941',
    time: 'Yesterday, 04:15 PM',
    body: 'Pre-dispatch calibration passed with zero remarks.',
    read: true,
  },
  {
    id: '3',
    title: 'Deposit Release Processed for #RNT-2026-8302',
    time: '26 Sep 2026',
    body: 'Refundable deposit of ₹10,000 returned to your primary account.',
    read: true,
  },
];

export default function AccountNotificationsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Account Notifications</h1>
          <p className="portal-subtitle">
            Live dispatch updates, deposit releases, and booking alerts.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '720px' }}>
        {MOCK_NOTIFS.map((n) => (
          <div
            key={n.id}
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${n.read ? 'var(--border-subtle)' : 'var(--border-focus)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-title)' }}>
                {!n.read && (
                  <span style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}>●</span>
                )}
                {n.title}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{n.time}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
