'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/auth-context';
import { AccountNav } from '../../../components/AccountNav';
import { authService } from '../../../services/auth.service';

export default function AccountSecurityPage() {
  const { user, loading, isAuthenticated } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Password criteria
  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!currentPassword) {
      setErrorMessage('Please enter your current password.');
      return;
    }
    if (!hasMinLength || !hasUpper || !hasLower || !hasNumber) {
      setErrorMessage('New password must meet complexity requirements (8+ chars, upper, lower, number).');
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    setUpdating(true);

    try {
      const result = await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setSuccessMessage(result.message || 'Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to update password. Please check your current password.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ maxWidth: '820px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading security settings...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="page-container" style={{ maxWidth: '600px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem', background: '#fff' }}>
          <h2>Authentication Required</h2>
          <p>Please log in to manage your security settings.</p>
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '840px', padding: '3rem 1.5rem 5rem' }}>
      <AccountNav />

      <div
        className="card"
        style={{
          padding: '2.25rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          background: '#ffffff',
          maxWidth: '560px',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Change Password</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
          Ensure your account is using a strong, unique password to prevent unauthorized access.
        </p>

        {successMessage && (
          <div
            role="status"
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
            }}
          >
            ✓ {successMessage}
          </div>
        )}

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
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="sec-current-password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Current Password
            </label>
            <input
              id="sec-current-password"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
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

          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="sec-new-password"
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
            <input
              id="sec-new-password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />

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

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="sec-confirm-password"
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
              id="sec-confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                style={{ accentColor: 'var(--teal-600)' }}
              />
              <span>Show passwords</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="btn btn-primary"
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: updating ? 'not-allowed' : 'pointer',
            }}
          >
            {updating ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
