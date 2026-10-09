'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PortalRole {
  id: string;
  name: string;
  badge: string;
  icon: string;
  destination: string;
  description: string;
}

const PORTAL_ROLES: PortalRole[] = [
  {
    id: 'customer',
    name: 'Customer Account',
    badge: 'Renters',
    icon: '🛒',
    destination: '/account',
    description: 'Track ongoing rentals, security deposits, and saved equipment.',
  },
  {
    id: 'owner',
    name: 'Product Owner',
    badge: 'Suppliers',
    icon: '📦',
    destination: '/owner',
    description: 'Manage listed assets, availability calendar, and rental earnings.',
  },
  {
    id: 'partner',
    name: 'Commercial Partner',
    badge: 'Affiliates',
    icon: '🤝',
    destination: '/partner',
    description: 'Fleet partnership metrics, referrals, and commission settlements.',
  },
  {
    id: 'freelancer',
    name: 'Field Technician',
    badge: 'Operators',
    icon: '🔧',
    destination: '/freelancer',
    description: 'Pickup & drop dispatches, return inspections, and task logging.',
  },
  {
    id: 'admin',
    name: 'Admin Console',
    badge: 'Staff Only',
    icon: '⚡',
    destination: '/admin',
    description: 'Platform operations, verification queue, and master controls.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<PortalRole>(PORTAL_ROLES[0] as PortalRole);
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [credential, setCredential] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulated authentication workflow - navigates to the selected portal
    setTimeout(() => {
      router.push(selectedRole.destination);
    }, 400);
  };

  return (
    <div className="page-container" style={{ maxWidth: '620px', padding: '3rem 1.5rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--teal-50)',
            border: '2px solid var(--teal-200)',
            fontSize: '1.75rem',
            marginBottom: '1rem',
          }}
        >
          🔐
        </div>
        <span className="section-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>
          Secure Access
        </span>
        <h1 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '0.5rem' }}>
          Sign In to Jain Solutions
        </h1>
        <p className="section-desc" style={{ fontSize: '0.925rem', margin: '0 auto', maxWidth: '440px' }}>
          Select your portal role below to access your dedicated workspace and management tools.
        </p>
      </div>

      <div
        className="card"
        style={{
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)',
          background: '#ffffff',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-title)',
              marginBottom: '0.75rem',
            }}
          >
            Select Your Portal
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {PORTAL_ROLES.map((role) => {
              const isSelected = selectedRole.id === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.75rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected
                      ? '2px solid var(--teal-600)'
                      : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--teal-50)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>{role.icon}</span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--teal-800)' : 'var(--text-body)',
                      lineHeight: 1.2,
                    }}
                  >
                    {role.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginTop: '0.85rem',
              padding: '0.75rem 1rem',
              background: '#f8fafc',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{selectedRole.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>
                {selectedRole.name}
              </p>
              <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                {selectedRole.description}
              </p>
            </div>
          </div>
        </div>

        {/* Auth mode toggle */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '1.25rem',
          }}
        >
          <button
            type="button"
            onClick={() => setAuthMode('password')}
            style={{
              flex: 1,
              padding: '0.6rem 0',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'password' ? '2px solid var(--teal-600)' : 'none',
              color: authMode === 'password' ? 'var(--teal-700)' : 'var(--text-muted)',
              fontWeight: authMode === 'password' ? 700 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('otp')}
            style={{
              flex: 1,
              padding: '0.6rem 0',
              background: 'none',
              border: 'none',
              borderBottom: authMode === 'otp' ? '2px solid var(--teal-600)' : 'none',
              color: authMode === 'otp' ? 'var(--teal-700)' : 'var(--text-muted)',
              fontWeight: authMode === 'otp' ? 700 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Mobile OTP
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="emailOrPhone"
              style={{
                display: 'block',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--text-title)',
                marginBottom: '0.4rem',
              }}
            >
              {authMode === 'password' ? 'Work / Personal Email' : 'Registered Mobile Number'}
            </label>
            <input
              id="emailOrPhone"
              type={authMode === 'password' ? 'email' : 'tel'}
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder={authMode === 'password' ? 'name@example.com' : '+91 98765 43210'}
              className="portal-selector"
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.4rem',
              }}
            >
              <label
                htmlFor="credential"
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                }}
              >
                {authMode === 'password' ? 'Password' : '6-Digit One Time Password (OTP)'}
              </label>
              {authMode === 'password' && (
                <span style={{ fontSize: '0.78rem', color: 'var(--teal-700)', cursor: 'pointer' }}>
                  Forgot password?
                </span>
              )}
            </div>
            <input
              id="credential"
              type={authMode === 'password' ? 'password' : 'text'}
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder={authMode === 'password' ? '••••••••' : 'Enter 6-digit OTP'}
              className="portal-selector"
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {isSubmitting ? 'Authenticating...' : `Sign In to ${selectedRole.name} →`}
          </button>
        </form>

        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>Need an account? </span>
          <Link href="/contact" style={{ color: 'var(--teal-700)', fontWeight: 600 }}>
            Contact Support & Onboarding
          </Link>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
        <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          ← Back to Marketplace Home
        </Link>
      </div>
    </div>
  );
}
