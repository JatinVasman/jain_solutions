'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import { RoleType } from '@rental-platform/types';

interface AccountTypeOption {
  type: RoleType;
  title: string;
  badge: string;
  icon: string;
  description: string;
  approvalNote: string;
}

const ACCOUNT_TYPES: AccountTypeOption[] = [
  {
    type: RoleType.CUSTOMER,
    title: 'Customer',
    badge: 'Renters',
    icon: '🛒',
    description: 'Browse, discover, and rent power, electronics, camera, vehicle, and tool equipment.',
    approvalNote: 'Instant activation upon email verification.',
  },
  {
    type: RoleType.PRODUCT_OWNER,
    title: 'Product Owner',
    badge: 'Suppliers',
    icon: '📦',
    description: 'List your commercial or industrial equipment, manage rental bookings, and earn revenue.',
    approvalNote: 'Requires operational review before equipment can be published.',
  },
  {
    type: RoleType.PARTNER,
    title: 'Commercial Partner',
    badge: 'Affiliates',
    icon: '🤝',
    description: 'Refer corporate customers, introduce inventory owners, and track referral commissions.',
    approvalNote: 'Subject to partnership agreement and platform compliance review.',
  },
  {
    type: RoleType.FREELANCER,
    title: 'Field Technician',
    badge: 'Operators',
    icon: '🔧',
    description: 'Provide equipment installation, pickup & drop dispatches, and return inspection services.',
    approvalNote: 'Requires credential and skill review before task assignments.',
  },
  {
    type: RoleType.JOB_SEEKER,
    title: 'Job Seeker',
    badge: 'Careers',
    icon: '💼',
    description: 'Apply for platform positions, submit your resume, and track job applications.',
    approvalNote: 'Requires profile review by platform HR specialists.',
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [selectedRole, setSelectedRole] = useState<RoleType>(RoleType.CUSTOMER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [oauthNotice, setOauthNotice] = useState<string | null>(null);

  // Password criteria
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const currentOption = ACCOUNT_TYPES.find((opt) => opt.type === selectedRole) || ACCOUNT_TYPES[0];

  const handleGoogleRegister = async () => {
    setOauthNotice(null);
    setErrorMessage('');
    try {
      const res = await fetch(`/api/v1/auth/google?role=${encodeURIComponent(selectedRole)}`, {
        method: 'GET',
      });
      if (res.status === 503) {
        const data = await res.json().catch(() => ({}));
        setOauthNotice(
          data?.message ||
            'Google OAuth registration is currently unconfigured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to activate. Please complete your registration using the form below.',
        );
        return;
      }
      window.location.href = `/api/v1/auth/google?role=${encodeURIComponent(selectedRole)}`;
    } catch {
      setOauthNotice(
        'Google OAuth service is currently unavailable. Please complete your registration with email and password below.',
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setOauthNotice(null);

    if (!name.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Email address is required.');
      return;
    }
    if (!hasMinLength || !hasUpper || !hasLower || !hasNumber) {
      setErrorMessage(
        'Password must be at least 8 characters and include uppercase, lowercase, and numeric characters.',
      );
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('You must accept the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        password,
        confirmPassword,
        role: selectedRole,
        termsAccepted,
      });

      router.push(`/verification-pending?email=${encodeURIComponent(email.trim())}&role=${selectedRole}`);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-container"
      style={{
        maxWidth: '720px',
        padding: '3rem 1.25rem 6rem',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--teal-700)',
            background: 'var(--teal-50)',
            border: '1px solid var(--teal-200)',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            marginBottom: '0.85rem',
          }}
        >
          Unified Registration
        </span>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem',
          }}
        >
          Create Your Account
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
          Select the account type that matches your rental marketplace goals.
        </p>
      </div>

      {/* Account Type Selector Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            marginBottom: '0.75rem',
          }}
        >
          Select Your Primary Account Type:
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {ACCOUNT_TYPES.map((opt) => {
            const isSelected = selectedRole === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => setSelectedRole(opt.type)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected
                    ? '2px solid var(--teal-600)'
                    : '1px solid var(--border-medium)',
                  background: isSelected ? 'var(--teal-50)' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{opt.icon}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '9999px',
                      background: isSelected ? 'var(--teal-600)' : 'var(--bg-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {opt.badge}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: isSelected ? 'var(--teal-900)' : 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {opt.title}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.35,
                  }}
                >
                  {opt.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Approval Note Banner */}
      <div
        style={{
          padding: '0.85rem 1.15rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--teal-50)',
          border: '1px solid var(--teal-200)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.85rem',
          color: 'var(--teal-900)',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>ℹ️</span>
        <div>
          <strong>Account Activation Policy: </strong>
          <span>{currentOption?.approvalNote || 'Instant activation upon email verification.'}</span>
        </div>
      </div>

      {/* Registration Form Card */}
      <div
        className="card"
        style={{
          padding: '2.25rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)',
          background: '#ffffff',
        }}
      >
        {errorMessage && (
          <div
            role="alert"
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* OAuth Configuration Notification */}
        {oauthNotice && (
          <div
            role="status"
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#334155',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              lineHeight: 1.45,
            }}
          >
            <strong>OAuth Registration Status:</strong> {oauthNotice}
          </div>
        )}

        {/* Google Direct Sign-up Button */}
        <div style={{ marginBottom: '1.75rem' }}>
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="btn btn-outline"
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              background: '#ffffff',
              border: '1px solid var(--border-medium)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.57-5.17 3.57-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.15C3.25 21.32 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.39l3.99-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.68 1.28 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span>Sign up directly with Google as {currentOption?.title || 'Customer'}</span>
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.75rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          <span style={{ padding: '0 0.85rem' }}>Or register with email credentials</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="reg-name"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Full Name *
            </label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              required
              autoComplete="name"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="reg-email"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Email Address *
            </label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              autoComplete="email"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Phone (Optional or role-specific) */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="reg-phone"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Phone Number{' '}
              <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>
                {selectedRole === RoleType.CUSTOMER ? '(Optional)' : '(Recommended for verification)'}
              </span>
            </label>
            <input
              id="reg-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="reg-password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.75rem 0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '0.25rem',
                }}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>

            {/* Password Validation Hints */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.35rem',
                marginTop: '0.5rem',
                fontSize: '0.75rem',
              }}
            >
              <span style={{ color: hasMinLength ? '#16a34a' : 'var(--text-muted)' }}>
                {hasMinLength ? '✓' : '○'} 8+ characters
              </span>
              <span style={{ color: hasUpper ? '#16a34a' : 'var(--text-muted)' }}>
                {hasUpper ? '✓' : '○'} Uppercase letter
              </span>
              <span style={{ color: hasLower ? '#16a34a' : 'var(--text-muted)' }}>
                {hasLower ? '✓' : '○'} Lowercase letter
              </span>
              <span style={{ color: hasNumber ? '#16a34a' : 'var(--text-muted)' }}>
                {hasNumber ? '✓' : '○'} Number
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="reg-confirm-password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Confirm Password *
            </label>
            <input
              id="reg-confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border:
                  confirmPassword && !passwordsMatch
                    ? '1px solid #ef4444'
                    : '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            {confirmPassword && !passwordsMatch && (
              <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                Passwords do not match
              </span>
            )}
          </div>

          {/* Terms Acceptance */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem',
              marginBottom: '1.75rem',
            }}
          >
            <input
              id="reg-terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              style={{
                marginTop: '0.2rem',
                width: '1rem',
                height: '1rem',
                accentColor: 'var(--teal-600)',
                cursor: 'pointer',
              }}
            />
            <label
              htmlFor="reg-terms"
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.45,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              I agree to the{' '}
              <Link href="/terms" target="_blank" style={{ color: 'var(--teal-600)', fontWeight: 600 }}>
                Terms of Service
              </Link>{' '}
              and acknowledge the{' '}
              <Link href="/privacy" target="_blank" style={{ color: 'var(--teal-600)', fontWeight: 600 }}>
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.75 : 1,
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Complete Registration</span>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
          }}
        >
          Already have an account?{' '}
          <Link
            href="/login"
            style={{
              color: 'var(--teal-600)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
