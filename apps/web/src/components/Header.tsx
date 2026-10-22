'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FEATURED_PRODUCTS } from '../lib/mock-data';
import { useAuth } from '../context/auth-context';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, getRoleLandingUrl } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu / search on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setIsSearchOpen(false);
        setShowMobileSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Instant live search autocomplete
  const liveResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];
    return FEATURED_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        p.description.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchTerm]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchOpen(false);
    setShowMobileSearch(false);
    setMobileMenuOpen(false);
    if (searchTerm.trim()) {
      router.push(`/categories?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/categories');
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    setShowMobileSearch(false);
    setMobileMenuOpen(false);
    router.push(`/products/${slug}`);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    searchInputRef.current?.focus();
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        {/* ZONE 1: LEFT NAVIGATION */}
        <nav className="nav-left-zone" aria-label="Primary Navigation">
          <ul className="nav-links">
            <li>
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                title="About"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={`nav-link ${pathname === '/categories' || pathname?.startsWith('/categories/') ? 'active' : ''}`}
                title="Categories"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
                title="Contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* ZONE 2: CENTER LOGO */}
        <div className="nav-center-zone">
          <Link href="/" className="nav-center-logo" aria-label="Jain Solutions Home">
            <Image
              src={'/logo.png'}
              alt="Jain Solutions Logo"
              width={38}
              height={38}
              priority
              className="nav-logo-image"
            />
            <span className="nav-brand-text">Jain Solutions</span>
          </Link>
        </div>

        {/* ZONE 3: RIGHT ACTIONS */}
        <div className="nav-right-zone">
          {/* Functional Search Bar */}
          <div className="nav-search-container" ref={searchContainerRef}>
            <form
              className="nav-search-form"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <div className="nav-search-bar">
                <button
                  type="submit"
                  className="nav-search-icon-btn"
                  aria-label="Submit search"
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
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => {
                    if (searchTerm.trim()) setIsSearchOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false);
                    }
                  }}
                  className="nav-search-input"
                  aria-label="Search rental equipment"
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="nav-search-clear-btn"
                    onClick={handleClearSearch}
                    aria-label="Clear search text"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            {/* Live Autocomplete Results Dropdown */}
            {isSearchOpen && searchTerm.trim() && (
              <div className="nav-search-dropdown" role="listbox">
                {liveResults.length > 0 ? (
                  <>
                    <div className="nav-search-dropdown-header">
                      <span>Matching Equipment</span>
                      <span className="nav-search-badge">{liveResults.length} found</span>
                    </div>
                    <ul className="nav-search-results-list">
                      {liveResults.map((product) => (
                        <li key={product.id}>
                          <button
                            type="button"
                            className="nav-search-result-item"
                            onClick={() => handleSelectProduct(product.slug || product.id)}
                          >
                            <img
                              src={product.image || '/hero/cctv-cameras.jpg'}
                              alt=""
                              className="nav-search-result-img"
                            />
                            <div className="nav-search-result-info">
                              <div className="nav-search-result-name">{product.name}</div>
                              <div className="nav-search-result-meta">
                                <span className="nav-search-result-cat">{product.category}</span>
                                <span className="nav-search-result-price">
                                  ₹{product.dailyRate.toLocaleString()}/day
                                </span>
                              </div>
                            </div>
                            <span className="nav-search-result-arrow" aria-hidden="true">→</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="nav-search-dropdown-footer"
                      onClick={() => handleSearchSubmit()}
                    >
                      <span>View all results for &ldquo;{searchTerm}&rdquo;</span>
                      <span>Explore Categories →</span>
                    </button>
                  </>
                ) : (
                  <div className="nav-search-no-results">
                    <p>No equipment matching &ldquo;{searchTerm}&rdquo;</p>
                    <button
                      type="button"
                      className="nav-search-view-all-btn"
                      onClick={() => handleSearchSubmit()}
                    >
                      Search entire catalog →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Authentication State */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                href={getRoleLandingUrl(user)}
                className="nav-signin-link"
                style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                title="View your account portal"
              >
                <span>👤</span>
                <span>{user?.name?.split(' ')[0] || 'Portal'}</span>
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/login" className="nav-signin-link">
                Sign In
              </Link>
              <Link href="/register" className="btn btn-outline btn-sm" style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                Register
              </Link>
            </div>
          )}

          {/* Primary CTA */}
          <Link
            href="/categories"
            className="nav-cta-btn btn btn-primary btn-sm"
          >
            <span>Find Equipment</span>
          </Link>
        </div>

        {/* MOBILE CONTROLS (Rendered for viewports <= 768px) */}
        <div className="nav-mobile-actions">
          <button
            type="button"
            onClick={() => {
              const nextState = !showMobileSearch;
              setShowMobileSearch(nextState);
              if (nextState) {
                setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
              }
            }}
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
          </button>
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

        {/* MOBILE SEARCH BANNER (When mobile search icon is toggled) */}
        {showMobileSearch && (
          <div className="nav-mobile-search-banner">
            <form onSubmit={handleSearchSubmit} className="nav-mobile-search-form">
              <input
                ref={mobileSearchInputRef}
                type="search"
                placeholder="Search equipment, cameras, switches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="nav-mobile-search-input"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Search
              </button>
              <button
                type="button"
                className="nav-mobile-search-close"
                onClick={() => setShowMobileSearch(false)}
                aria-label="Close search"
              >
                ✕
              </button>
            </form>
          </div>
        )}

        {/* MOBILE DROPDOWN DRAWER */}
        {mobileMenuOpen && (
          <div className="nav-mobile-dropdown" role="dialog" aria-modal="true">
            <div className="nav-mobile-links">
              <Link
                href="/"
                className={`nav-mobile-link ${pathname === '/' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Home</span>
                <span className="mobile-link-arrow">→</span>
              </Link>
              <Link
                href="/about"
                className={`nav-mobile-link ${pathname === '/about' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>About</span>
                <span className="mobile-link-arrow">→</span>
              </Link>
              <Link
                href="/categories"
                className={`nav-mobile-link ${pathname === '/categories' || pathname?.startsWith('/categories/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Categories</span>
                <span className="mobile-link-arrow">→</span>
              </Link>
              <Link
                href="/contact"
                className={`nav-mobile-link ${pathname === '/contact' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Contact</span>
                <span className="mobile-link-arrow">→</span>
              </Link>
              <Link
                href="/locations"
                className={`nav-mobile-link ${pathname === '/locations' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Locations</span>
                <span className="mobile-link-arrow">→</span>
              </Link>
              <Link
                href="/careers"
                className={`nav-mobile-link ${pathname === '/careers' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Careers</span>
                <span className="mobile-link-arrow">→</span>
              </Link>
            </div>

            <div className="nav-mobile-divider" />

            <div className="nav-mobile-actions-list">
              <form
                className="nav-mobile-drawer-search-form"
                onSubmit={handleSearchSubmit}
              >
                <div className="nav-mobile-drawer-search-wrap">
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
                  <input
                    type="search"
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="nav-mobile-drawer-input"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Search
                </button>
              </form>

              {isAuthenticated ? (
                <>
                  <Link
                    href={getRoleLandingUrl(user)}
                    className="btn btn-secondary nav-mobile-action-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>My Account ({user?.name?.split(' ')[0]})</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline nav-mobile-action-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                  >
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn btn-secondary nav-mobile-action-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    className="btn btn-outline nav-mobile-action-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Create Account</span>
                  </Link>
                </>
              )}

              <Link
                href="/categories"
                className="btn btn-primary nav-mobile-action-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Find Equipment</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
