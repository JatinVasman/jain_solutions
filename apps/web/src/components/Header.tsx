'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileMenuOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        {/* ZONE 1: LEFT NAVIGATION (Name links kept, unlinked for now, only Home active) */}
        <nav className="nav-left-zone" aria-label="Primary Navigation">
          <ul className="nav-links">
            <li>
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => e.preventDefault()}
                className="nav-link nav-link-unlinked"
                title="About"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#catalogue"
                onClick={(e) => e.preventDefault()}
                className="nav-link nav-link-unlinked"
                title="Catalogue"
              >
                Catalogue
              </a>
            </li>
            <li className="nav-desktop-secondary">
              <a
                href="#categories"
                onClick={(e) => e.preventDefault()}
                className="nav-link nav-link-unlinked"
                title="Categories"
              >
                Categories
              </a>
            </li>
          </ul>
        </nav>

        {/* ZONE 2: CENTER LOGO (Mathematically centered via 1fr auto 1fr grid) */}
        <div className="nav-center-zone">
          <Link href="/" className="nav-center-logo" aria-label="Jain Solutions Home">
            <Image
              src="/logo.png"
              alt="Jain Solutions Logo"
              width={38}
              height={38}
              priority
              className="nav-logo-image"
            />
            <span className="nav-brand-text">Jain Solutions</span>
          </Link>
        </div>

        {/* ZONE 3: RIGHT ACTIONS (Name links kept, unlinked for now) */}
        <div className="nav-right-zone">
          {/* Compact search trigger */}
          <a
            href="#search"
            onClick={(e) => e.preventDefault()}
            className="nav-search-trigger nav-link-unlinked"
            aria-label="Search rental equipment"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
          </a>

          {/* Sign In link */}
          <a
            href="#signin"
            onClick={(e) => e.preventDefault()}
            className="nav-signin-link nav-link-unlinked"
          >
            Sign In
          </a>

          {/* Primary CTA */}
          <a
            href="#find-equipment"
            onClick={(e) => e.preventDefault()}
            className="nav-cta-btn btn btn-primary btn-sm nav-link-unlinked"
          >
            <span>Find Equipment</span>
          </a>
        </div>

        {/* MOBILE CONTROLS (Rendered for viewports <= 768px) */}
        <div className="nav-mobile-actions">
          <a
            href="#search"
            onClick={(e) => e.preventDefault()}
            className="nav-mobile-search-btn"
            aria-label="Search equipment"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </a>
          <button
            type="button"
            className="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN DRAWER (Names kept, unlinked except Home) */}
        {mobileMenuOpen && (
          <div className="nav-mobile-dropdown" role="dialog" aria-modal="true">
            <div className="nav-mobile-links">
              <Link
                href="/"
                className="nav-mobile-link active"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Home</span>
                <span className="mobile-link-arrow">→</span>
              </Link>
              <a
                href="#about"
                className="nav-mobile-link nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <span>About</span>
              </a>
              <a
                href="#categories"
                className="nav-mobile-link nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <span>Categories</span>
              </a>
              <a
                href="#catalogue"
                className="nav-mobile-link nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <span>Catalogue</span>
              </a>
              <a
                href="#locations"
                className="nav-mobile-link nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <span>Locations</span>
              </a>
              <a
                href="#jobs"
                className="nav-mobile-link nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <span>Careers</span>
              </a>
            </div>

            <div className="nav-mobile-divider" />

            <div className="nav-mobile-actions-list">
              <a
                href="#search"
                className="btn btn-secondary nav-mobile-action-btn nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search Equipment</span>
              </a>

              <a
                href="#signin"
                className="btn btn-secondary nav-mobile-action-btn nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <span>Sign In</span>
              </a>

              <a
                href="#find-equipment"
                className="btn btn-primary nav-mobile-action-btn nav-link-unlinked"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                <span>Find Equipment</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
