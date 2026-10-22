'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/auth-context';
import { AccountNav } from '../../../components/AccountNav';

export default function AccountProfilePage() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="page-container" style={{ maxWidth: '820px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="page-container" style={{ maxWidth: '600px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem', background: '#fff' }}>
          <h2>Authentication Required</h2>
          <p>Please log in to manage your profile.</p>
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '840px', padding: '3rem 1.5rem 5rem' }}>
      <AccountNav />

      <div
        className="card"
        style={{
          padding: '2.25rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          background: '#ffffff',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.5rem' }}>
          Personal Information & Identity
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              FULL NAME
            </label>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {user.name}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              EMAIL ADDRESS
            </label>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {user.email}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              PHONE NUMBER
            </label>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {user.phone || <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Not provided</span>}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              ACCOUNT STATUS
            </label>
            <div style={{ marginTop: '0.25rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: user.status === 'ACTIVE' ? '#dcfce7' : '#fef3c7',
                  color: user.status === 'ACTIVE' ? '#166534' : '#b45309',
                }}
              >
                {user.status}
              </span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              EMAIL VERIFICATION
            </label>
            <div style={{ marginTop: '0.25rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: user.emailVerified ? '#dcfce7' : '#fee2e2',
                  color: user.emailVerified ? '#166534' : '#991b1b',
                }}
              >
                {user.emailVerified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              ACCOUNT CREATED
            </label>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Registered Roles & Approvals</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {user.roles.map((r) => (
              <div
                key={r.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.75rem' }}>
                    Assigned: {new Date(r.assignedAt).toLocaleDateString()}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: r.approvalStatus === 'APPROVED' ? '#dcfce7' : '#fef3c7',
                    color: r.approvalStatus === 'APPROVED' ? '#166534' : '#b45309',
                  }}
                >
                  {r.approvalStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
