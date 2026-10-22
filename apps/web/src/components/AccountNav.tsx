'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/auth-context';

export const AccountNav: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { href: '/account', label: 'Overview', icon: '🏠' },
    { href: '/account/profile', label: 'Profile', icon: '👤' },
    { href: '/account/security', label: 'Security', icon: '🔒' },
    { href: '/account/sessions', label: 'Active Sessions', icon: '💻' },
  ];

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--teal-700)',
              background: 'var(--teal-50)',
              border: '1px solid var(--teal-200)',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              marginBottom: '0.4rem',
            }}
          >
            Account Center
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            {user ? `Hello, ${user.name}` : 'My Account'}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.85rem' }}
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-medium)',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.15rem',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--teal-700)' : 'var(--text-muted)',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid var(--teal-600)' : '2px solid transparent',
                marginBottom: '-1px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
