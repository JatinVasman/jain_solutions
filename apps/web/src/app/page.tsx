import React from 'react';
import { PromoBanner } from '../components/PromoBanner';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { LocationSelector } from '../components/LocationSelector';
import { FEATURED_PRODUCTS } from '../lib/mock-data';

export default function HomePage() {
  return (
    <div>
      {/* Promotional Carousel */}
      <PromoBanner />

      {/* Product & Category Browsing Grid */}
      <ProductGrid />

      {/* 3. User Type Entry Point: "I am..." */}
      <section
        className="section-block"
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-tag">Marketplace Ecosystem</span>
            <h2 className="section-title">How Would You Like to Participate?</h2>
            <p className="section-desc">
              Whether you need equipment for a project, have idle assets to monetize, or want to
              partner with us, choose your path.
            </p>
          </div>

          <div className="user-entry-grid">
            <a href="#featured-equipment" className="user-entry-card">
              <div className="user-entry-icon">🛒</div>
              <h3 className="user-entry-title">Customer</h3>
              <p className="user-entry-desc">
                Rent verified equipment with doorstep delivery & flexible tenure.
              </p>
              <span className="btn btn-outline btn-sm">Browse Rentals →</span>
            </a>

            <a href="#how-it-works" className="user-entry-card">
              <div className="user-entry-icon">🏢</div>
              <h3 className="user-entry-title">Product Owner</h3>
              <p className="user-entry-desc">
                List idle tools, fleet, or machinery and earn monthly yields.
              </p>
              <span className="btn btn-outline btn-sm">Owner Info →</span>
            </a>

            <a href="#how-it-works" className="user-entry-card">
              <div className="user-entry-icon">🤝</div>
              <h3 className="user-entry-title">Business Partner</h3>
              <p className="user-entry-desc">
                Refer commercial clients and earn recurring commissions.
              </p>
              <span className="btn btn-outline btn-sm">Partner Info →</span>
            </a>

            <a href="#how-it-works" className="user-entry-card">
              <div className="user-entry-icon">⚡</div>
              <h3 className="user-entry-title">Freelance Tech</h3>
              <p className="user-entry-desc">
                Earn on equipment setup, site inspections, and logistics tasks.
              </p>
              <span className="btn btn-outline btn-sm">Tech Network →</span>
            </a>

            <a href="#how-it-works" className="user-entry-card">
              <div className="user-entry-icon">💼</div>
              <h3 className="user-entry-title">Job Seeker</h3>
              <p className="user-entry-desc">
                Join our fast-growing logistics and operations teams.
              </p>
              <span className="btn btn-outline btn-sm">Learn More →</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Popular / Featured Rentals */}
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
                Sample structural items available across regional fulfillment hubs.
              </p>
            </div>
            <a href="#featured-equipment" className="btn btn-secondary btn-sm">
              View All 1,200+ Products →
            </a>
          </div>

          <div className="product-grid">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section
        id="how-it-works"
        className="section-block"
        style={{ background: 'var(--bg-surface)' }}
      >
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-tag">Seamless Process</span>
            <h2 className="section-title">How Renting Works</h2>
            <p className="section-desc">
              A straightforward 4-step workflow designed for business efficiency.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            <div
              style={{
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
              }}
            >
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                01
              </span>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  marginBottom: '0.5rem',
                }}
              >
                Find Equipment
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Search our multi-category catalogue filtered by region, specification, and booking
                duration.
              </p>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
              }}
            >
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                02
              </span>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  marginBottom: '0.5rem',
                }}
              >
                Choose Tenure
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Select daily, weekly, or custom duration with transparent tiered rates and security
                deposits.
              </p>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
              }}
            >
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                03
              </span>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  marginBottom: '0.5rem',
                }}
              >
                Confirm & Dispatch
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Complete verification. Assets are dispatched to your site or held at regional hub
                for pickup.
              </p>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
              }}
            >
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                04
              </span>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--text-title)',
                  marginBottom: '0.5rem',
                }}
              >
                Use & Return
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Operate with confidence. Scheduled return pickup with rapid deposit release upon
                inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Use The Platform */}
      <section className="section-block">
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-tag">Value Proposition</span>
            <h2 className="section-title">Built for Modern Businesses & Projects</h2>
            <p className="section-desc">
              Why operations teams, production crews, and contractors rely on us.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
              }}
            >
              <h4 style={{ color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                🛡️ Zero CapEx Burden
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Avoid heavy upfront capital expenditure on equipment that depreciates or sits idle
                between projects.
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
              }}
            >
              <h4 style={{ color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                ⚙️ Quality Inspected Units
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Every unit undergoes testing, safety certification, and maintenance before dispatch.
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
              }}
            >
              <h4 style={{ color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                🚚 Regional Hub Logistics
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Strategically located regional fulfillment offices guarantee rapid same-day
                dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Locations Section */}
      <section className="section-block" style={{ background: 'var(--bg-surface)' }}>
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-tag">Logistics Network</span>
            <h2 className="section-title">Hub Network & Availability Locations</h2>
            <p className="section-desc">
              Find equipment available near your project site or corporate branch.
            </p>
          </div>

          <LocationSelector />

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="#featured-equipment" className="btn btn-outline btn-sm">
              Browse All Regional Offices & Pickup Points →
            </a>
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
