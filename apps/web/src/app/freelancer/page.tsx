'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/auth-context';
import { RoleType, ApprovalStatus } from '@rental-platform/types';

export default function FreelancerPortalPage() {
  const { user, isAuthenticated } = useAuth();

  const freelancerRole = user?.roles.find((r) => r.name === RoleType.FREELANCER);
  const isApproved = freelancerRole?.approvalStatus === ApprovalStatus.APPROVED;
  const isPending = freelancerRole?.approvalStatus === ApprovalStatus.PENDING_REVIEW;

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
          🔧
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
          Operators & Technicians
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
          Field Technician Portal
        </h1>

        {/* Dynamic RBAC Status Feedback */}
        {isAuthenticated && user ? (
          freelancerRole ? (
            isApproved ? (
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
                <strong>Welcome, {user.name}!</strong> Your Field Technician credentials are approved and active. Task
                dispatching and inspection workflows will activate in upcoming phases.
              </div>
            ) : isPending ? (
              <div
                style={{
                  background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  color: '#92400e',
                  fontSize: '0.9rem',
                  maxWidth: '560px',
                  margin: '0 auto 1.5rem',
                  textAlign: 'left',
                }}
              >
                <strong>Application Status: Pending Review</strong>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                  Your technician application and certifications are currently being reviewed by field operations. You
                  will receive notifications once tasks are assigned.
                </p>
              </div>
            ) : (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  color: '#991b1b',
                  fontSize: '0.9rem',
                  maxWidth: '560px',
                  margin: '0 auto 1.5rem',
                }}
              >
                Status: {freelancerRole.approvalStatus}.
              </div>
            )
          ) : (
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                maxWidth: '560px',
                margin: '0 auto 1.5rem',
              }}
            >
              You are signed in as <strong>{user.name}</strong>, but do not yet hold a Field Technician role.
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
            Accessing field dispatches, handover check-in logs, and inspection workflows requires an authenticated
            Technician account.
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
            🔒 Upcoming Field Operations
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
            <li>GPS-assisted equipment pickup & dropoff dispatches</li>
            <li>Digital condition checklists & serial number barcode scanning</li>
            <li>Damage reporting with instant photo documentation</li>
            <li>Technician service hour logging & payout summaries</li>
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
            <Link href="/account" className="btn btn-primary btn-md">
              View Your Account Center →
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary btn-md">
                Sign In to Technician Portal →
              </Link>
              <Link href="/register" className="btn btn-outline btn-md">
                Register as Field Technician
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
