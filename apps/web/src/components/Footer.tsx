import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>Rental Marketplace</h4>
            <p>
              The multi-category rental marketplace for high-performance equipment, fleet,
              machinery, and tools.
            </p>
            <span className="footer-tagline">“You need it. We can get it.”</span>
          </div>

          <div className="footer-col">
            <h5>Catalogue</h5>
            <ul>
              <li>
                <Link href="/categories/power">Power & Energy</Link>
              </li>
              <li>
                <Link href="/categories/electronics">Electronics & IT</Link>
              </li>
              <li>
                <Link href="/categories/cameras">Cameras & Audio</Link>
              </li>
              <li>
                <Link href="/categories/vehicles">Vehicles & Fleet</Link>
              </li>
              <li>
                <Link href="/categories/tools">Tools & Hardware</Link>
              </li>
              <li>
                <Link href="/categories">All Categories</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Portals</h5>
            <ul>
              <li>
                <Link href="/account">Customer Account</Link>
              </li>
              <li>
                <Link href="/owner">Product Owner Portal</Link>
              </li>
              <li>
                <Link href="/partner">Partner Program</Link>
              </li>
              <li>
                <Link href="/freelancer">Freelancer Network</Link>
              </li>
              <li>
                <Link href="/admin">Admin Console</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company & Jobs</h5>
            <ul>
              <li>
                <Link href="/about">About Platform</Link>
              </li>
              <li>
                <Link href="/locations">Locations & Hubs</Link>
              </li>
              <li>
                <Link href="/jobs">Careers & Jobs</Link>
              </li>
              <li>
                <Link href="/applications">My Applications</Link>
              </li>
              <li>
                <Link href="/contact">Contact Support</Link>
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
                <Link href="/terms#rental-policy">Rental Terms</Link>
              </li>
              <li>
                <Link href="/terms#security-deposit">Security Deposits</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rental Marketplace Platform. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/locations">Locations</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
