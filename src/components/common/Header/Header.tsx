import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TEXTS } from '../../../config/textsConfig';
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
        <Link to="/" className="header-logo">
          <span className="logo-primary">{TEXTS.header.logoMain}</span>
          <span className="logo-secondary">{TEXTS.header.logoSecondary}</span>
        </Link>

        <nav className="header-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}>
            {TEXTS.header.home}
          </Link>
          <Link
            to="/catalog"
            className={`nav-link ${isActive('/catalog') ? 'nav-link--active' : ''}`}
          >
            {TEXTS.header.catalog}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
