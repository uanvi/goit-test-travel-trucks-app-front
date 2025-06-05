import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/catalog') {
      return location.pathname === '/catalog';
    }
    return false;
  };
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-primary">Travel</span>
          <span className="logo-secondary">Trucks</span>
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}>
            Home
          </Link>
          <Link
            to="/catalog"
            className={`nav-link ${isActive('/catalog') ? 'nav-link--active' : ''}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
