'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

type HeroSlideType =
  | {
    type: 'one-stop';
    id: string;
    image: string;
    headline: string;
    ariaLabel: string;
  }
  | {
    type: 'original';
    id: string;
    image: string;
    eyebrow: string;
    headline: string;
    sub: string;
    cta: string;
    ctaHref: string;
    accentBg: string;
    accentColor: string;
    ariaLabel: string;
  }
  | {
    type: 'contact';
    id: string;
    image: string;
    headline: string;
    cta: string;
    ctaHref: string;
    ariaLabel: string;
  };

const HERO_SLIDES: HeroSlideType[] = [
  /* 1. FIRST SLIDE: "One stop for all your needs" */
  {
    type: 'one-stop',
    id: 'slide-one-stop',
    image: '/hero/hero-one-stop.jpg',
    headline: 'One stop for all your needs',
    ariaLabel: 'Slide 1 of 6: One stop for all your needs',
  },
  /* 2. Original Slide 1: CCTV Solutions */
  {
    type: 'original',
    id: 'slide-cctv',
    image: '/hero/cctv-cameras.jpg',
    eyebrow: 'Surveillance Solutions',
    headline: 'High-Definition Security & 4K CCTV Solutions',
    sub: 'Commercial AI-powered cameras, NVR recording units & 24/7 remote monitoring for business protection.',
    cta: 'Explore Surveillance',
    ctaHref: '/categories/cctv-surveillance',
    accentBg: 'rgba(239, 68, 68, 0.18)',
    accentColor: '#fca5a5',
    ariaLabel: 'Slide 2 of 6: High-Definition Security & 4K CCTV Solutions',
  },
  /* 3. Original Slide 2: Enterprise Networking */
  {
    type: 'original',
    id: 'slide-networking',
    image: '/hero/networking-equipment.jpg',
    eyebrow: 'Enterprise Networking',
    headline: 'High-Performance Switches & Core Infrastructure',
    sub: 'Managed PoE+ rackmount switches, fiber optic transceivers & commercial firewalls engineered for zero downtime.',
    cta: 'Explore Networking',
    ctaHref: '/categories/networking-equipment',
    accentBg: 'rgba(14, 165, 233, 0.18)',
    accentColor: '#7dd3fc',
    ariaLabel: 'Slide 3 of 6: High-Performance Switches & Core Infrastructure',
  },
  /* 4. Original Slide 3: Wi-Fi 6 & Routing */
  {
    type: 'original',
    id: 'slide-routers',
    image: '/hero/routers-switches.jpg',
    eyebrow: 'Wi-Fi 6 & Routing',
    headline: 'Next-Gen Wireless Gateways & Mesh Routing',
    sub: 'High-throughput dual-band Wi-Fi 6 routers and enterprise edge gateways delivering seamless facility coverage.',
    cta: 'Explore Routers',
    ctaHref: '/categories/routers-switches',
    accentBg: 'rgba(139, 92, 246, 0.18)',
    accentColor: '#c4b5fd',
    ariaLabel: 'Slide 4 of 6: Next-Gen Wireless Gateways & Mesh Routing',
  },
  /* 5. Original Slide 4: Storage & Backup */
  {
    type: 'original',
    id: 'slide-storage',
    image: '/hero/storage-devices.jpg',
    eyebrow: 'Storage & Backup',
    headline: 'Enterprise NAS Units & Ultra-Fast NVMe Arrays',
    sub: 'Multi-bay redundant network-attached storage and high-speed NVMe solutions for mission-critical business data.',
    cta: 'Explore Storage',
    ctaHref: '/categories/storage-devices',
    accentBg: 'rgba(16, 185, 129, 0.18)',
    accentColor: '#6ee7b7',
    ariaLabel: 'Slide 5 of 6: Enterprise NAS Units & Ultra-Fast NVMe Arrays',
  },
  /* 6. Customer Search & Contact */
  {
    type: 'contact',
    id: 'slide-contact',
    image: '/hero/jain-hero-product-search.webp',
    headline: "Couldn't find what you're looking for?",
    cta: 'Contact Us →',
    ctaHref: '/contact',
    ariaLabel: "Slide 6 of 6: Couldn't find what you're looking for?",
  },
];

export const PromoBanner: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const prev = useCallback(() => {
    setActive((curr) => (curr - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const next = useCallback(() => {
    setActive((curr) => (curr + 1) % totalSlides);
  }, [totalSlides]);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    },
    [prev, next]
  );

  // Autoplay (6.5s) with pause on hover/focus and reduced-motion support
  useEffect(() => {
    if (isPaused) return;

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;
    }

    timerRef.current = setTimeout(() => {
      setActive((curr) => (curr + 1) % totalSlides);
    }, 6500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, isPaused, totalSlides]);

  return (
    <section className="promo-section" aria-label="Hero Showcase Carousel">
      <div className="promo-container">
        <div
          className="promo-banner"
          role="region"
          aria-roledescription="carousel"
          aria-label="Jain Solutions Featured Services & Equipment"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Smooth horizontal track holding all six slides */}
          <div
            className="hero-carousel-track"
            style={{
              transform: `translate3d(-${active * 100}%, 0, 0)`,
            }}
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = active === idx;

              /* ── TYPE 1: One Stop for All Your Needs ── */
              if (slide.type === 'one-stop') {
                return (
                  <div
                    key={slide.id}
                    className={`hero-slide hero-slide-1 ${isCurrent ? 'is-active' : ''}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={slide.ariaLabel}
                    aria-hidden={!isCurrent}
                  >
                    <img
                      src={slide.image}
                      alt="Jain Solutions enterprise telecom, CCTV cameras, switches, and networking equipment"
                      className="hero-slide-bg"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="hero-slide-1-overlay" aria-hidden="true" />
                    <div className="hero-slide-1-content">
                      <h2 className="hero-slide-1-headline">{slide.headline}</h2>
                    </div>
                  </div>
                );
              }

              /* ── TYPE 2: Original Equipment Showcase Slide ── */
              if (slide.type === 'original') {
                return (
                  <div
                    key={slide.id}
                    className={`hero-slide hero-slide-original ${isCurrent ? 'is-active' : ''}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={slide.ariaLabel}
                    aria-hidden={!isCurrent}
                  >
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

                        <h2 className="promo-headline">{slide.headline}</h2>

                        <p className="promo-sub">{slide.sub}</p>

                        <div className="promo-actions">
                          <Link
                            href={slide.ctaHref}
                            className="promo-cta"
                            tabIndex={isCurrent ? 0 : -1}
                          >
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
                          src={slide.image}
                          alt={slide.headline}
                          className="promo-visual-img"
                          loading="lazy"
                        />
                        <div className="promo-visual-fade" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                );
              }

              /* ── TYPE 3: Customer Search & Contact ── */
              return (
                <div
                  key={slide.id}
                  className={`hero-slide hero-slide-2 ${isCurrent ? 'is-active' : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={slide.ariaLabel}
                  aria-hidden={!isCurrent}
                >
                  <img
                    src={slide.image}
                    alt="Professional customer considering telecom and security equipment on laptop"
                    className="hero-slide-bg hero-slide-2-bg"
                    loading="lazy"
                  />
                  <div className="hero-slide-2-overlay" aria-hidden="true" />
                  <div className="hero-slide-2-content">
                    <h2 className="hero-slide-2-headline">{slide.headline}</h2>
                    <div className="hero-slide-2-actions">
                      <Link
                        href={slide.ctaHref}
                        className="hero-contact-cta"
                        tabIndex={isCurrent ? 0 : -1}
                      >
                        {slide.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Previous Slide Arrow */}
          <button
            type="button"
            className="promo-arrow promo-arrow-prev"
            onClick={prev}
            aria-label="Previous slide"
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

          {/* Next Slide Arrow */}
          <button
            type="button"
            className="promo-arrow promo-arrow-next"
            onClick={next}
            aria-label="Next slide"
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

          {/* Pagination Indicators (6 dots) */}
          <div className="promo-dots" role="tablist" aria-label="Slide selectors">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active === idx}
                aria-label={`Go to slide ${idx + 1}`}
                className={`promo-dot ${active === idx ? 'promo-dot-active' : ''}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
