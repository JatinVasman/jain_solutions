'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import { AuthUser, RoleType } from '@rental-platform/types';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, user, getRoleLandingUrl } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [oauthNotice, setOauthNotice] = useState<string | null>(null);

  // Multi-role workspace selection state
  const [multiRoleUser, setMultiRoleUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // If user is already authenticated, redirect to appropriate role portal
    if (isAuthenticated && user) {
      router.push(getRoleLandingUrl(user));
    }
  }, [isAuthenticated, user, router, getRoleLandingUrl]);

  useEffect(() => {
    // Handle query params like verification status or errors
    const error = searchParams.get('error');
    const status = searchParams.get('status');
    const verified = searchParams.get('verified');
    const registeredEmail = searchParams.get('email');

    if (error === 'oauth_unconfigured') {
      setOauthNotice('Google OAuth is not configured on this server. Please use email and password.');
    } else if (error === 'oauth_denied') {
      setErrorMessage('Google authorization was cancelled or denied.');
    } else if (verified === 'true') {
      setInfoMessage('Your email address has been verified! You can now log in.');
    } else if (registeredEmail) {
      setEmail(registeredEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setInfoMessage('');
    setOauthNotice(null);

    try {
      const result = await login({
        email: email.trim(),
        password,
        rememberMe,
      });

      if (result.requiresVerification) {
        router.push(result.redirectUrl || `/verification-pending?email=${encodeURIComponent(email)}`);
        return;
      }

      if (result.user && result.user.roles && result.user.roles.length > 1) {
        // Multiple roles: present workspace selector
        setMultiRoleUser(result.user);
        return;
      }

      // Single role: redirect directly
      router.push(result.redirectUrl || '/account');
    } catch (err: any) {
      const msg = err?.message || 'Login failed. Please check your credentials.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch('/api/v1/auth/google', { method: 'GET' });
      if (res.status === 503) {
        const data = await res.json().catch(() => ({}));
        setOauthNotice(
          data?.message ||
            'Google OAuth is currently unconfigured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to activate. Please use standard email & password.',
        );
        return;
      }
      window.location.href = '/api/v1/auth/google';
    } catch {
      setOauthNotice(
        'Google OAuth endpoint is currently unavailable. Please log in using your registered email and password.',
      );
    }
  };

  return (
    <div
      className="page-container"
      style={{
        maxWidth: '520px',
        padding: '3.5rem 1.25rem 6rem',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
          Secure Access
        </span>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem',
          }}
        >
          Welcome Back
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Sign in to your unified Jain Solutions marketplace account.
        </p>
      </div>

      {/* Multiple Roles Workspace Selection Modal/Card */}
      {multiRoleUser && (
        <div
          className="card"
          style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '2px solid var(--teal-500)',
            background: '#ffffff',
            marginBottom: '2rem',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            Select Workspace
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            Your account is associated with multiple roles. Select the portal you wish to enter:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {multiRoleUser.roles.map((r) => {
              let path = '/account';
              let label = 'Customer Portal';
              let badge = 'Active';

              if (r.name === RoleType.PRODUCT_OWNER) {
                path = '/owner';
                label = 'Product Owner Portal';
              } else if (r.name === RoleType.PARTNER) {
                path = '/partner';
                label = 'Partner Portal';
              } else if (r.name === RoleType.FREELANCER) {
                path = '/freelancer';
                label = 'Technician / Freelancer Portal';
              } else if (r.name === RoleType.JOB_SEEKER) {
                path = '/applications';
                label = 'Job Applications Portal';
              } else if (
                [
                  RoleType.ADMIN,
                  RoleType.SUPER_ADMIN,
                  RoleType.OPERATIONS,
                  RoleType.CATALOGUE_MANAGER,
                ].includes(r.name)
              ) {
                path = '/admin';
                label = `Admin Console (${r.name})`;
              }

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => router.push(path)}
                  className="btn btn-secondary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{label}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: r.approvalStatus === 'APPROVED' ? 'var(--teal-50)' : '#fef3c7',
                      color: r.approvalStatus === 'APPROVED' ? 'var(--teal-800)' : '#b45309',
                    }}
                  >
                    {r.approvalStatus}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Login Form Card */}
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
        {/* Error Notification */}
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
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Info Notification */}
        {infoMessage && (
          <div
            role="status"
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>✓</span>
            <span>{infoMessage}</span>
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
              marginBottom: '1.25rem',
              lineHeight: 1.45,
            }}
          >
            <strong>OAuth Configuration:</strong> {oauthNotice}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="login-email"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              autoComplete="email"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.35rem',
              }}
            >
              <label
                htmlFor="login-password"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--teal-600)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
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
          </div>

          {/* Remember Me */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '1rem',
                height: '1rem',
                borderRadius: '4px',
                accentColor: 'var(--teal-600)',
                cursor: 'pointer',
              }}
            />
            <label
              htmlFor="remember-me"
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              Remember this device for 30 days
            </label>
          </div>

          {/* Sign In Button */}
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
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '1.75rem 0',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          <span style={{ padding: '0 0.75rem' }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            fontSize: '0.9rem',
            fontWeight: 500,
            background: '#ffffff',
            border: '1px solid var(--border-medium)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
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
          <span>Continue with Google</span>
        </button>

        {/* Verification guidance link */}
        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ margin: '0 0 0.5rem' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              style={{
                color: 'var(--teal-600)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Create Account
            </Link>
          </p>
          <p style={{ margin: 0 }}>
            Need to activate your email?{' '}
            <Link
              href="/verification-pending"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'underline',
              }}
            >
              Resend verification email
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
