import React from 'react';
import Link from 'next/link';
import { PromoBanner } from '../components/PromoBanner';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { FEATURED_PRODUCTS } from '../lib/mock-data';

export default function HomePage() {
  return (
    <div>
      {/* Promotional Carousel */}
      <PromoBanner />

      {/* Product & Category Browsing Grid */}
      <ProductGrid />

      {/* Popular / Featured Equipment Rentals */}
      <section id="featured-equipment" className="section-block">
        <div className="page-container">
          <div
            className="section-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="section-tag">Verified Inventory</span>
              <h2 className="section-title">Popular Equipment Rentals</h2>
              <p className="section-desc">
                Professional-grade telecom, networking, and security equipment ready for deployment.
              </p>
            </div>
            <Link href="/categories" className="btn btn-secondary btn-sm">
              Explore All Categories →
            </Link>
          </div>

          <div className="product-grid">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. How Renting Works — Premium Scroll-Driven Image Cards */}
      <HowItWorksSection />

      {/* 6. Built for Modern Businesses & Projects */}
      <section className="section-block">
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-tag">Enterprise Value</span>
            <h2 className="section-title">Built for Modern Businesses &amp; Projects</h2>
            <p className="section-desc">
              High-performance infrastructure rental without the cost and complexity of ownership.
            </p>
          </div>

          <div className="minimal-business-grid">
            <div className="minimal-business-card">
              <div className="minimal-business-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Zero CapEx Burden</h3>
              <p>Preserve working capital. Pay only for active project duration and claim 100% of rental spend as operational tax deductions.</p>
            </div>

            <div className="minimal-business-card">
              <div className="minimal-business-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3>Quality-Inspected Hardware</h3>
              <p>Every router, switch, and camera undergoes 48-point diagnostic testing before dispatch for zero-downtime site reliability.</p>
            </div>

            <div className="minimal-business-card">
              <div className="minimal-business-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3>Fast Regional Fulfillment</h3>
              <p>Same-day dispatch from strategic regional hubs, backed by 24/7 engineering hotline and rapid hardware hot-swap SLA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Become a Product Owner / Partner CTA */}
      <section className="section-block">
        <div className="page-container">
          <div
            style={{
              background: 'linear-gradient(135deg, #f0f7ff 0%, #e0effe 100%)',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 2rem',
              textAlign: 'center',
            }}
          >
            <span className="section-tag">Monetize Your Assets</span>
            <h2
              style={{
                fontSize: '2.25rem',
                color: 'var(--text-title)',
                marginBottom: '1rem',
                fontWeight: 700,
              }}
            >
              Own High-Value Equipment? Turn Idle Inventory into Yield.
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                maxWidth: '640px',
                margin: '0 auto 2rem',
                fontSize: '1.05rem',
              }}
            >
              List your generators, cameras, tools, or machinery on the marketplace. We handle
              client discovery, logistics, and payout settlements.
            </p>
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a href="#featured-equipment" className="btn btn-primary btn-lg">
                Become a Product Owner
              </a>
              <a href="#how-it-works" className="btn btn-secondary btn-lg">
                Join Referral Partner Network
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
