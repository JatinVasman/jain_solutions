'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface Slide {
  id: string;
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  ctaHref: string;
  bg: string;
  accentBg: string;
  accentColor: string;
}

const SLIDES: Slide[] = [
  {
    id: 's1',
    eyebrow: 'Surveillance Solutions',
    headline: 'High-Definition Security & 4K CCTV Solutions',
    sub: 'Commercial AI-powered cameras, NVR recording units & 24/7 remote monitoring for business protection.',
    cta: 'Explore Surveillance',
    ctaHref: '/categories/cctv-surveillance',
    bg: '/hero/cctv-cameras.jpg',
    accentBg: 'rgba(239, 68, 68, 0.18)',
    accentColor: '#fca5a5',
  },
  {
    id: 's2',
    eyebrow: 'Enterprise Networking',
    headline: 'High-Performance Switches & Core Infrastructure',
    sub: 'Managed PoE+ rackmount switches, fiber optic transceivers & commercial firewalls engineered for zero downtime.',
    cta: 'Explore Networking',
    ctaHref: '/categories/networking-equipment',
    bg: '/hero/networking-equipment.jpg',
    accentBg: 'rgba(14, 165, 233, 0.18)',
    accentColor: '#7dd3fc',
  },
  {
    id: 's3',
    eyebrow: 'Wi-Fi 6 & Routing',
    headline: 'Next-Gen Wireless Gateways & Mesh Routing',
    sub: 'High-throughput dual-band Wi-Fi 6 routers and enterprise edge gateways delivering seamless facility coverage.',
    cta: 'Explore Routers',
    ctaHref: '/categories/routers-switches',
    bg: '/hero/routers-switches.jpg',
    accentBg: 'rgba(139, 92, 246, 0.18)',
    accentColor: '#c4b5fd',
  },
  {
    id: 's4',
    eyebrow: 'Storage & Backup',
    headline: 'Enterprise NAS Units & Ultra-Fast NVMe Arrays',
    sub: 'Multi-bay redundant network-attached storage and high-speed NVMe solutions for mission-critical business data.',
    cta: 'Explore Storage',
    ctaHref: '/categories/storage-devices',
    bg: '/hero/storage-devices.jpg',
    accentBg: 'rgba(16, 185, 129, 0.18)',
    accentColor: '#6ee7b7',
  },
];

export const PromoBanner: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  const prev = useCallback(() => {
    setActive((curr) => (curr - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setActive((curr) => (curr + 1) % SLIDES.length);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prev();
    } else if (e.key === 'ArrowRight') {
      next();
    }
  }, [prev, next]);

  // Auto-advance with pause on hover
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      setActive((curr) => (curr + 1) % SLIDES.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, isPaused]);

  const slide = SLIDES[active] ?? SLIDES[0]!;

  return (
    <section className="promo-section" aria-label="Promotions and Featured Offers">
      <div className="promo-container">
        <div
          className="promo-banner"
          role="region"
          aria-roledescription="carousel"
          aria-label="Promotional equipment carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Split-content layout */}
          <div className="promo-slide">
            {/* Left Zone: Copy & CTA */}
            <div className="promo-copy">
              <div
                className="promo-eyebrow"
                style={{
                  backgroundColor: slide.accentBg,
                  color: slide.accentColor,
                  border: `1px solid ${slide.accentColor}40`,
                }}
              >
                <span
                  className="promo-eyebrow-dot"
                  style={{ backgroundColor: slide.accentColor }}
                  aria-hidden="true"
                />
                {slide.eyebrow}
              </div>

              <h2 className="promo-headline">
                {slide.headline}
              </h2>

              <p className="promo-sub">
                {slide.sub}
              </p>

              <div className="promo-actions">
                <Link href={slide.ctaHref} className="promo-cta">
                  <span>{slide.cta}</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Zone: Equipment Visual Showcase */}
            <div className="promo-visual">
              <img
                key={slide.id}
                src={slide.bg}
                alt={slide.headline}
                className="promo-visual-img"
                loading="eager"
              />
              <div className="promo-visual-fade" aria-hidden="true" />
            </div>
          </div>

          {/* Discreet Navigation Arrows */}
          <button
            type="button"
            className="promo-arrow promo-arrow-prev"
            onClick={prev}
            aria-label="Previous promotional slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="promo-arrow promo-arrow-next"
            onClick={next}
            aria-label="Next promotional slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Subtle Carousel Indicators */}
          <div className="promo-dots" role="tablist" aria-label="Slide selectors">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={idx === active}
                aria-label={`Go to slide ${idx + 1}: ${s.eyebrow}`}
                className={`promo-dot ${idx === active ? 'promo-dot-active' : ''}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
