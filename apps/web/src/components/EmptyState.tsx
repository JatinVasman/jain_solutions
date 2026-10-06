import React from 'react';
import Link from 'next/link';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📦',
  title,
  description,
  actionText,
  actionHref,
}) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        background: 'var(--bg-card)',
        border: '1px dashed var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '520px',
        margin: '2rem auto',
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 600,
          color: 'var(--text-title)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginBottom: actionText ? '1.5rem' : 0,
        }}
      >
        {description}
      </p>
      {actionText && actionHref && (
        <Link href={actionHref} className="btn btn-primary btn-sm">
          {actionText}
        </Link>
      )}
    </div>
  );
};
