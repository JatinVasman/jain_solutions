'use client';

import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="site-logo">
          <span className="logo-icon">J</span>
          <span>Jain Solutions</span>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <Link href="/categories" className="nav-link">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/products" className="nav-link">
                Catalogue
              </Link>
            </li>
            <li>
              <Link href="/locations" className="nav-link">
                Locations
              </Link>
            </li>
            <li>
              <Link href="/search" className="nav-link">
                Search
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="nav-link">
                Careers
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="portal-dropdown-wrapper">
            <label htmlFor="portal-select" className="visually-hidden" style={{ display: 'none' }}>
              Portal
            </label>
            <select
              id="portal-select"
              className="portal-selector"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = e.target.value;
                }
              }}
            >
              <option value="" disabled>
                Switch Portal ▾
              </option>
              <option value="/account">Customer Account</option>
              <option value="/owner">Product Owner Portal</option>
              <option value="/partner">Partner Portal</option>
              <option value="/freelancer">Freelancer Portal</option>
              <option value="/jobs">Job Seeker Portal</option>
              <option value="/admin">Admin Console</option>
            </select>
          </div>

          <Link href="/search" className="btn btn-primary btn-sm">
            Find Equipment
          </Link>
        </div>
      </div>
    </header>
  );
};
