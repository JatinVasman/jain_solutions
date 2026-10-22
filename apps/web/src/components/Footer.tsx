'use client';

import React from 'react';
import Link from 'next/link';
import { HERO_CATEGORIES } from '../lib/mock-data';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>Jain Solutions</h4>
            <p>
              The multi-category rental marketplace for high-performance equipment, fleet,
              machinery, and tools.
            </p>
            <span className="footer-tagline">“One stop for all your needs”</span>
          </div>

          <div className="footer-col">
            <h5>Categories</h5>
            <ul>
              {HERO_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories?category=${cat.slug}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories">All Categories</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Support</Link>
              </li>
              <li>
                <Link href="/locations">Locations & Hubs</Link>
              </li>
              <li>
                <Link href="/careers">Careers & Jobs</Link>
              </li>
              <li>
                <Link href="/faq">Help & FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Legal & Terms</h5>
            <ul>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Rental Terms</Link>
              </li>
              <li>
                <Link href="/faq">Security Deposits</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jain Solutions. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
