'use client';

import React from 'react';
import Link from 'next/link';

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
            <h5>Catalogue</h5>
            <ul>
              <li>
                <a href="#categories-section">Power & Energy</a>
              </li>
              <li>
                <a href="#categories-section">Electronics & IT</a>
              </li>
              <li>
                <a href="#categories-section">Cameras & Audio</a>
              </li>
              <li>
                <a href="#categories-section">Vehicles & Fleet</a>
              </li>
              <li>
                <a href="#categories-section">Tools & Hardware</a>
              </li>
              <li>
                <a href="#categories-section">All Categories</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Portals</h5>
            <ul>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Customer Account</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Product Owner Portal</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Partner Program</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Freelancer Network</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Admin Console</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company & Jobs</h5>
            <ul>
              <li>
                <a href="#how-it-works">About Platform</a>
              </li>
              <li>
                <a href="#categories-section">Locations & Hubs</a>
              </li>
              <li>
                <a href="#how-it-works">Careers & Jobs</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>My Applications</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Contact Support</a>
              </li>
              <li>
                <a href="#how-it-works">Help & FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Legal & Terms</h5>
            <ul>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Rental Terms</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Security Deposits</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jain Solutions. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            <a href="#categories-section">Locations</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
