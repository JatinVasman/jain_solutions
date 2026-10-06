import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  ...props
}) => {
  return (
    <span
      data-variant={variant}
      className={`ui-badge ui-badge-${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};
