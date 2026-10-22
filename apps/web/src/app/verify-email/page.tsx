'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { authService } from '../../services/auth.service';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setSuccess(false);
      setMessage('No verification token provided in URL. Please use the complete link sent to your email.');
      return;
    }

    let isMounted = true;

    async function executeVerification() {
      try {
        const result = await authService.verifyEmail(token as string);
        if (isMounted) {
          setSuccess(true);
          setMessage(result.message || 'Email verified successfully!');
          if (result.email) setUserEmail(result.email);
        }
      } catch (err: any) {
        if (isMounted) {
          setSuccess(false);
          setMessage(err?.message || 'Verification failed. The token may be invalid or expired.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    executeVerification();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div
      className="page-container"
      style={{
        maxWidth: '520px',
        padding: '4rem 1.25rem 6rem',
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
        {loading ? (
          <div>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '3px solid var(--border-medium)',
                borderTopColor: 'var(--teal-600)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 1.5rem',
              }}
            />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
              Verifying Email Address
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Validating your security token against the platform identity registry...
            </p>
          </div>
        ) : success ? (
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#dcfce7',
                border: '2px solid #86efac',
                fontSize: '2rem',
                color: '#16a34a',
                marginBottom: '1.25rem',
              }}
            >
              ✓
            </div>
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: '0 0 0.75rem',
              }}
            >
              Email Verified!
            </h1>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                marginBottom: '1.75rem',
              }}
            >
              {message}
            </p>
            <Link
              href={`/login?verified=true${userEmail ? `&email=${encodeURIComponent(userEmail)}` : ''}`}
              className="btn btn-primary"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Proceed to Sign In
            </Link>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#fee2e2',
                border: '2px solid #fca5a5',
                fontSize: '1.75rem',
                color: '#dc2626',
                marginBottom: '1.25rem',
              }}
            >
              ✕
            </div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 0.75rem',
              }}
            >
              Verification Failed
            </h1>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                marginBottom: '1.75rem',
              }}
            >
              {message}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Link
                href="/verification-pending"
                className="btn btn-primary"
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Request New Link
              </Link>
              <Link
                href="/login"
                className="btn btn-outline"
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
