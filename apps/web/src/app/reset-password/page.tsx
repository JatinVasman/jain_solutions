'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { authService } from '../../services/auth.service';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || '';

  const [token, setToken] = useState(tokenParam);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Password criteria
  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token.trim()) {
      setErrorMessage('A valid password reset token is required.');
      return;
    }
    if (!hasMinLength || !hasUpper || !hasLower || !hasNumber) {
      setErrorMessage('Password must be at least 8 characters with uppercase, lowercase, and numbers.');
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword({
        token: token.trim(),
        newPassword,
        confirmPassword,
      });
      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Password reset failed. The link may have expired or already been used.');
    } finally {
      setLoading(false);
    }
  };

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
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
              fontSize: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            🔒
          </div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: '0 0 0.5rem',
            }}
          >
            Set New Password
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Choose a strong password to protect your marketplace account.
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#166534',
                fontSize: '0.95rem',
                marginBottom: '1.75rem',
                lineHeight: 1.5,
              }}
            >
              ✓ Your password has been successfully reset! All prior sessions have been revoked for your security.
            </div>
            <Link
              href="/login"
              className="btn btn-primary"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Sign In with New Password
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {errorMessage && (
              <div
                role="alert"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#991b1b',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                }}
              >
                {errorMessage}
              </div>
            )}

            {!tokenParam && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="reset-token"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Reset Token
                </label>
                <input
                  id="reset-token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste token from email"
                  required
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
            )}

            {/* New Password */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                htmlFor="new-password"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

              {/* Password Hints */}
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
                htmlFor="confirm-password"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>

            <div
              style={{
                marginTop: '1.5rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
              }}
            >
              <Link href="/login" style={{ color: 'var(--teal-600)', textDecoration: 'none' }}>
                Cancel and return to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
