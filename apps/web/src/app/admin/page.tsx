'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/auth-context';
import { RoleType, ApprovalStatus } from '@rental-platform/types';

export default function AdminPortalPage() {
  const { user, isAuthenticated, loading } = useAuth();

  const adminRoles = [
    RoleType.SUPER_ADMIN,
    RoleType.ADMIN,
    RoleType.OPERATIONS,
    RoleType.CATALOGUE_MANAGER,
    RoleType.FINANCE,
    RoleType.HR,
    RoleType.CUSTOMER_SUPPORT,
  ];

  const userAdminRole = user?.roles.find(
    (r) => adminRoles.includes(r.name) && r.approvalStatus === ApprovalStatus.APPROVED,
  );

  return (
    <div className="page-container" style={{ maxWidth: '820px', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          ← Back to Marketplace
        </Link>
      </div>

      <div
        className="card"
        style={{
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)',
          background: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--teal-50)',
            border: '2px solid var(--teal-200)',
            fontSize: '2rem',
            marginBottom: '1.25rem',
          }}
        >
          ⚡
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--teal-700)',
            background: 'var(--teal-50)',
            border: '1px solid var(--teal-200)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.85rem',
          }}
        >
          Authorized Staff Only
        </span>

        <h1
          style={{
            fontSize: '1.875rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: '0 0 0.75rem',
          }}
        >
          Administrative Console
        </h1>

        {/* Dynamic RBAC Protection Banner */}
        {isAuthenticated && user ? (
          userAdminRole ? (
            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                color: '#166534',
                fontSize: '0.9rem',
                maxWidth: '560px',
                margin: '0 auto 1.5rem',
              }}
            >
              <strong>Welcome, {user.name}!</strong> Authenticated with <strong>{userAdminRole.name}</strong> privileges.
              Administrative business dashboards and operations management modules will be introduced in subsequent
              phases.
            </div>
          ) : (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                color: '#991b1b',
                fontSize: '0.875rem',
                maxWidth: '560px',
                margin: '0 auto 1.5rem',
                textAlign: 'left',
                lineHeight: 1.5,
              }}
            >
              <strong>Access Denied (403 Forbidden):</strong> Your account ({user.email}) does not have administrative
              authorization. Public registration cannot grant staff access. Administrative accounts are strictly
              provisioned through internal corporate controls.
            </div>
          )
        ) : (
          <p
            style={{
              fontSize: '0.975rem',
              maxWidth: '560px',
              margin: '0 auto 1.75rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            Access to this console requires an authenticated administrative session. Public accounts are prohibited.
          </p>
        )}

        <div
          style={{
            background: '#f8fafc',
            border: '1px dashed var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            maxWidth: '540px',
            margin: '0 auto 2rem',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              margin: '0 0 0.5rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--teal-800)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            🔒 Administrative Architecture
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.2rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <li>Super Admin, Admin, Operations, Catalogue Manager, and Finance roles</li>
            <li>Role-based access control (RBAC) enforced at backend controller and guard levels</li>
            <li>Cryptographic session invalidation and audit logging</li>
            <li>Zero public registration paths for elevated permissions</li>
          </ul>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {isAuthenticated ? (
            <Link href="/account" className="btn btn-secondary btn-md">
              Return to Account Overview
            </Link>
          ) : (
            <Link href="/login" className="btn btn-primary btn-md">
              Sign In with Authorized Account →
            </Link>
          )}
          <Link href="/" className="btn btn-secondary btn-md">
            Marketplace Home
          </Link>
        </div>
      </div>
    </div>
  );
}
