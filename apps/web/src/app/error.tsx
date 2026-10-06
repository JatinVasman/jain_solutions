'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled UI error:', error);
  }, [error]);

  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#f87171' }}>
        An Error Occurred
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        Retry
      </button>
    </div>
  );
}
