import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>404 - Page Not Found</h2>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
        The requested resource is not available in Phase 1.
      </p>
      <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
        Return to Foundation Overview
      </Link>
    </div>
  );
}
