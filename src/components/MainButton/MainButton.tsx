import React from 'react';
import { Link } from 'react-router-dom';
import './MainButton.css';

interface MainButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'wide';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  href,
  className = '',
}) => {
  const baseClasses = `main-button main-button--${variant} main-button--${size}`;
  const classes = `${baseClasses} ${className}`.trim();

  // If href exists, render as Link
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button type={type} className={classes} disabled={disabled || loading} onClick={onClick}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default MainButton;
