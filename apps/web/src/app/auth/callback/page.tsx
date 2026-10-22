'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/auth-context';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    refreshUser().then(() => {
      router.push('/account');
    }).catch(() => {
      router.push('/login');
    });
  }, [router, searchParams, refreshUser]);

  return (
    <div className="page-container" style={{ maxWidth: '480px', padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--border-medium)',
          borderTopColor: 'var(--teal-600)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 1.5rem',
        }}
      />
      <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Completing Authentication...</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Validating your provider credentials.</p>
    </div>
  );
}
