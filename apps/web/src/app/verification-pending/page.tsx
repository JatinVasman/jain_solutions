'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { authService } from '../../services/auth.service';

export default function VerificationPendingPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const roleParam = searchParams.get('role') || '';

  const [email, setEmail] = useState(emailParam);
  const [resending, setResending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || countdown > 0) return;

    setResending(true);
    setStatusMessage('');

    try {
      const res = await authService.resendVerification(email.trim());
      setStatusMessage(res.message || 'Verification email dispatched. Please check your inbox.');
      setCountdown(60); // 60s cooldown
    } catch (err: any) {
      setStatusMessage(err?.message || 'Failed to dispatch verification email. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const isSpecializedRole = ['PRODUCT_OWNER', 'PARTNER', 'FREELANCER', 'JOB_SEEKER'].includes(roleParam);

  return (
    <div
      className="page-container"
      style={{
        maxWidth: '560px',
        padding: '3.5rem 1.25rem 6rem',
        margin: '0 auto',
      }}
    >
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
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'var(--teal-50)',
            border: '2px solid var(--teal-200)',
            fontSize: '2rem',
            marginBottom: '1.25rem',
          }}
        >
          ✉️
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--teal-700)',
            background: 'var(--teal-50)',
            border: '1px solid var(--teal-200)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            marginBottom: '0.85rem',
          }}
        >
          Verification Required
        </span>

        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: '0 0 0.75rem',
          }}
        >
          Check Your Inbox
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
          We have dispatched an activation link to{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{email || 'your email address'}</strong>. Click the link in
          the email to activate your account. Links expire after 24 hours.
        </p>

        {isSpecializedRole && (
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#fffbeb',
              border: '1px solid #fef3c7',
              color: '#92400e',
              fontSize: '0.825rem',
              textAlign: 'left',
              marginBottom: '1.5rem',
              lineHeight: 1.45,
            }}
          >
            <strong>Note for {roleParam.replace('_', ' ')} accounts:</strong> Email verification activates your platform
            identity. Additional business or administrative approval is reviewed independently before publishing
            listings or receiving task dispatches.
          </div>
        )}

        {statusMessage && (
          <div
            role="status"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}
          >
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleResend} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto 0.75rem' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to resend"
              required
              style={{
                flex: 1,
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={resending || countdown > 0}
              className="btn btn-outline"
              style={{
                fontSize: '0.85rem',
                padding: '0.65rem 1rem',
                whiteSpace: 'nowrap',
                cursor: resending || countdown > 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {resending ? 'Sending...' : countdown > 0 ? `Wait (${countdown}s)` : 'Resend Link'}
            </button>
          </div>
        </form>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
          <Link
            href={`/login?email=${encodeURIComponent(email)}`}
            className="btn btn-primary"
            style={{
              display: 'inline-block',
              padding: '0.65rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
