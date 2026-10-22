'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import { AccountNav } from '../../components/AccountNav';
import { RoleType } from '@rental-platform/types';

export default function AccountOverviewPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="page-container" style={{ maxWidth: '820px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-medium)',
            borderTopColor: 'var(--teal-600)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem',
          }}
        />
        <p style={{ color: 'var(--text-muted)' }}>Loading account...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="page-container" style={{ maxWidth: '600px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div
          className="card"
          style={{
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-light)',
            background: '#ffffff',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
            Authentication Required
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            Please sign in to access your customer account, rental records, and security settings.
          </p>
          <Link href="/login" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontWeight: 600 }}>
            Sign In to Continue
          </Link>
        </div>
      </div>
    );
  }

  const roleNameDisplay: Record<RoleType, string> = {
    [RoleType.CUSTOMER]: 'Customer Account',
    [RoleType.PRODUCT_OWNER]: 'Product Owner',
    [RoleType.PARTNER]: 'Commercial Partner',
    [RoleType.FREELANCER]: 'Field Technician',
    [RoleType.JOB_SEEKER]: 'Job Seeker',
    [RoleType.SUPER_ADMIN]: 'Super Administrator',
    [RoleType.ADMIN]: 'Administrator',
    [RoleType.OPERATIONS]: 'Operations Staff',
    [RoleType.CATALOGUE_MANAGER]: 'Catalogue Manager',
    [RoleType.FINANCE]: 'Finance Manager',
    [RoleType.HR]: 'HR Specialist',
    [RoleType.CUSTOMER_SUPPORT]: 'Customer Support',
  };

  return (
    <div className="page-container" style={{ maxWidth: '840px', padding: '3rem 1.5rem 5rem' }}>
      <AccountNav />

      {/* Account Identity Summary Banner */}
      <div
        className="card"
        style={{
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          background: '#ffffff',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--teal-100)',
                color: 'var(--teal-800)',
                fontSize: '1.5rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem' }}>{user.name}</h2>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                background: user.emailVerified ? '#dcfce7' : '#fee2e2',
                color: user.emailVerified ? '#166534' : '#991b1b',
              }}
            >
              {user.emailVerified ? '✓ Email Verified' : 'Email Unverified'}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                background: user.status === 'ACTIVE' ? 'var(--teal-50)' : '#fef3c7',
                color: user.status === 'ACTIVE' ? 'var(--teal-800)' : '#92400e',
              }}
            >
              Status: {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* Role Memberships & Portal Navigation */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Your Assigned Roles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {user.roles.map((r) => {
            let path = '/account';
            if (r.name === RoleType.PRODUCT_OWNER) path = '/owner';
            else if (r.name === RoleType.PARTNER) path = '/partner';
            else if (r.name === RoleType.FREELANCER) path = '/freelancer';
            else if (r.name === RoleType.JOB_SEEKER) path = '/applications';
            else if (
              [
                RoleType.ADMIN,
                RoleType.SUPER_ADMIN,
                RoleType.OPERATIONS,
                RoleType.CATALOGUE_MANAGER,
              ].includes(r.name)
            ) {
              path = '/admin';
            }

            return (
              <div
                key={r.id}
                className="card"
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  background: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {roleNameDisplay[r.name] || r.name}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      background: r.approvalStatus === 'APPROVED' ? '#dcfce7' : '#fef3c7',
                      color: r.approvalStatus === 'APPROVED' ? '#166534' : '#b45309',
                    }}
                  >
                    {r.approvalStatus}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem' }}>
                  {r.approvalStatus === 'APPROVED'
                    ? 'Active and approved for portal operations.'
                    : 'Pending platform administrative review.'}
                </p>
                <Link
                  href={path}
                  className="btn btn-outline btn-sm"
                  style={{ display: 'block', textAlign: 'center', fontSize: '0.8rem', width: '100%' }}
                >
                  Enter Portal →
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <Link
          href="/account/profile"
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            background: '#ffffff',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'box-shadow 0.2s',
          }}
        >
          <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>👤</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem' }}>Profile & Identity</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Review personal details, phone verification, and identity metadata.
          </p>
        </Link>

        <Link
          href="/account/security"
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            background: '#ffffff',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'box-shadow 0.2s',
          }}
        >
          <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🔒</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem' }}>Security & Password</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Update your password, manage credentials, and review security events.
          </p>
        </Link>

        <Link
          href="/account/sessions"
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            background: '#ffffff',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'box-shadow 0.2s',
          }}
        >
          <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>💻</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem' }}>Active Sessions</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Inspect active browser logins and revoke remote sessions.
          </p>
        </Link>
      </div>
    </div>
  );
}
