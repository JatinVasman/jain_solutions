import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <button
      data-variant={variant}
      data-size={size}
      className={`ui-btn ui-btn-${variant} ui-btn-${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};
