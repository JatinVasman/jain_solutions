'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/auth-context';
import { AccountNav } from '../../../components/AccountNav';
import { authService } from '../../../services/auth.service';
import { UserSession } from '@rental-platform/types';

export default function AccountSessionsPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [fetching, setFetching] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const fetchSessions = async () => {
    setFetching(true);
    try {
      const res = await authService.getSessions();
      setSessions(res.sessions || []);
    } catch {
      setSessions([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated]);

  const handleRevoke = async (id: string) => {
    setRevokingId(id);
    setStatusMessage('');
    try {
      await authService.revokeSession(id);
      setStatusMessage('Session revoked successfully.');
      await fetchSessions();
    } catch (err: any) {
      setStatusMessage(err?.message || 'Failed to revoke session.');
    } finally {
      setRevokingId(null);
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ maxWidth: '820px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading sessions...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="page-container" style={{ maxWidth: '600px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem', background: '#fff' }}>
          <h2>Authentication Required</h2>
          <p>Please log in to manage your active sessions.</p>
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
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem' }}>Active Sessions</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
              Devices and browsers currently authorized to access your marketplace account.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchSessions}
            disabled={fetching}
            className="btn btn-outline btn-sm"
          >
            {fetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {statusMessage && (
          <div
            role="status"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              fontSize: '0.85rem',
              margin: '1rem 0',
            }}
          >
            {statusMessage}
          </div>
        )}

        {fetching ? (
          <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Retrieving authenticated sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div
            style={{
              padding: '2rem 0',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          >
            <p>Your current browser session is active via secure HttpOnly cookie.</p>
            <p style={{ fontSize: '0.8rem' }}>No other active sessions were found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
            {sessions.map((s, index) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>💻</span>
                    <span>{s.userAgent || 'Web Browser Session'}</span>
                    {index === 0 && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          background: 'var(--teal-100)',
                          color: 'var(--teal-800)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                          fontWeight: 700,
                        }}
                      >
                        Recent
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {s.ipAddress && <span>IP: {s.ipAddress} • </span>}
                    <span>Created: {new Date(s.createdAt).toLocaleDateString()}</span>
                    <span> • Expires: {new Date(s.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRevoke(s.id)}
                  disabled={revokingId === s.id}
                  className="btn btn-outline btn-sm"
                  style={{
                    fontSize: '0.8rem',
                    color: '#dc2626',
                    borderColor: '#fca5a5',
                    cursor: revokingId === s.id ? 'not-allowed' : 'pointer',
                  }}
                >
                  {revokingId === s.id ? 'Revoking...' : 'Revoke Session'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
