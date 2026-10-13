'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface StepData {
  num: string;
  shortLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const STEPS: StepData[] = [
  {
    num: '01',
    shortLabel: 'Select',
    title: 'Select Equipment',
    description: 'Browse verified networking, telecom, and surveillance gear with transparent specs.',
    imageSrc: '/how-it-works/step-01-select-equipment.jpg',
    imageAlt: 'Enterprise Ethernet switches, rack-mounted hardware, and precision blue and yellow cabling',
  },
  {
    num: '02',
    shortLabel: 'Duration',
    title: 'Choose Duration',
    description: 'Flexible daily, weekly, or monthly tenure with zero lock-in contracts.',
    imageSrc: '/how-it-works/step-02-choose-duration.jpg',
    imageAlt: 'Flexible equipment rental tenure planning on modern executive desk with schedule and calendar',
  },
  {
    num: '03',
    shortLabel: 'Dispatch',
    title: 'Fast Dispatch',
    description: 'Bench-tested hardware delivered directly to your site, ready for immediate deployment.',
    imageSrc: '/how-it-works/step-03-fast-dispatch.jpg',
    imageAlt: 'Tested networking hardware packed securely in rugged protective flight case ready for dispatch',
  },
  {
    num: '04',
    shortLabel: 'Return',
    title: 'Return & Refund',
    description: 'Hassle-free reverse pickup with prompt security deposit release.',
    imageSrc: '/how-it-works/step-04-return-refund.jpg',
    imageAlt: 'Hardware inspection, testing, and return verification by certified technician',
  },
];

/**
 * Standard cubic Hermite interpolation for butter-smooth easing without sudden jerks
 */
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const HowItWorksSection: React.FC = () => {
  const trackRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Set card ref helper
  const setCardRef = useCallback((el: HTMLElement | null, idx: number) => {
    cardRefs.current[idx] = el;
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Scroll listener for sticky scroll-driven transitions
  useEffect(() => {
    if (isReducedMotion) return;

    let rafId: number | null = null;

    const applyTransforms = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      // Scroll progress through pinned track [0, 1]
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / totalScrollable));

      // Natural entrance of Card 01 before section is pinned
      const entranceRatio = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH * 0.55)));
      const entranceEasing = smoothstep(0, 1, entranceRatio);

      // Determine active indicator step
      let currentActive = 0;
      if (p >= 0.76) currentActive = 3;
      else if (p >= 0.50) currentActive = 2;
      else if (p >= 0.24) currentActive = 1;
      else currentActive = 0;

      setActiveStep((prev) => (prev !== currentActive ? currentActive : prev));

      // Calculate styles for each card
      // Card 0:
      const card0 = cardRefs.current[0];
      if (card0) {
        if (p <= 0) {
          // Pre-pin entrance
          const y = (1 - entranceEasing) * 48;
          const op = 0.3 + 0.7 * entranceEasing;
          card0.style.transform = `translate3d(0, ${y}px, 0) scale(${0.98 + 0.02 * entranceEasing})`;
          card0.style.opacity = `${op}`;
          card0.style.visibility = 'visible';
          card0.style.pointerEvents = 'auto';
        } else if (p <= 0.20) {
          // Centered at rest
          card0.style.transform = 'translate3d(0, 0, 0) scale(1)';
          card0.style.opacity = '1';
          card0.style.visibility = 'visible';
          card0.style.pointerEvents = 'auto';
        } else if (p < 0.32) {
          // Receding away
          const t = smoothstep(0.20, 0.32, p);
          const y = -18 * t;
          const scale = 1 - 0.04 * t;
          const op = 1 - t;
          card0.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          card0.style.opacity = `${op}`;
          card0.style.visibility = op > 0.01 ? 'visible' : 'hidden';
          card0.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        } else {
          card0.style.opacity = '0';
          card0.style.visibility = 'hidden';
          card0.style.pointerEvents = 'none';
        }
      }

      // Card 1:
      const card1 = cardRefs.current[1];
      if (card1) {
        if (p < 0.18) {
          card1.style.transform = 'translate3d(0, 80px, 0) scale(0.97)';
          card1.style.opacity = '0';
          card1.style.visibility = 'hidden';
          card1.style.pointerEvents = 'none';
        } else if (p < 0.30) {
          // Rising up from below
          const t = smoothstep(0.18, 0.30, p);
          const y = 80 * (1 - t);
          const scale = 0.97 + 0.03 * t;
          card1.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          card1.style.opacity = `${t}`;
          card1.style.visibility = 'visible';
          card1.style.pointerEvents = t > 0.5 ? 'auto' : 'none';
        } else if (p <= 0.46) {
          // Centered at rest
          card1.style.transform = 'translate3d(0, 0, 0) scale(1)';
          card1.style.opacity = '1';
          card1.style.visibility = 'visible';
          card1.style.pointerEvents = 'auto';
        } else if (p < 0.58) {
          // Receding away
          const t = smoothstep(0.46, 0.58, p);
          const y = -18 * t;
          const scale = 1 - 0.04 * t;
          const op = 1 - t;
          card1.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          card1.style.opacity = `${op}`;
          card1.style.visibility = op > 0.01 ? 'visible' : 'hidden';
          card1.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        } else {
          card1.style.opacity = '0';
          card1.style.visibility = 'hidden';
          card1.style.pointerEvents = 'none';
        }
      }

      // Card 2:
      const card2 = cardRefs.current[2];
      if (card2) {
        if (p < 0.44) {
          card2.style.transform = 'translate3d(0, 80px, 0) scale(0.97)';
          card2.style.opacity = '0';
          card2.style.visibility = 'hidden';
          card2.style.pointerEvents = 'none';
        } else if (p < 0.56) {
          // Rising up from below
          const t = smoothstep(0.44, 0.56, p);
          const y = 80 * (1 - t);
          const scale = 0.97 + 0.03 * t;
          card2.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          card2.style.opacity = `${t}`;
          card2.style.visibility = 'visible';
          card2.style.pointerEvents = t > 0.5 ? 'auto' : 'none';
        } else if (p <= 0.72) {
          // Centered at rest
          card2.style.transform = 'translate3d(0, 0, 0) scale(1)';
          card2.style.opacity = '1';
          card2.style.visibility = 'visible';
          card2.style.pointerEvents = 'auto';
        } else if (p < 0.84) {
          // Receding away
          const t = smoothstep(0.72, 0.84, p);
          const y = -18 * t;
          const scale = 1 - 0.04 * t;
          const op = 1 - t;
          card2.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          card2.style.opacity = `${op}`;
          card2.style.visibility = op > 0.01 ? 'visible' : 'hidden';
          card2.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        } else {
          card2.style.opacity = '0';
          card2.style.visibility = 'hidden';
          card2.style.pointerEvents = 'none';
        }
      }

      // Card 3:
      const card3 = cardRefs.current[3];
      if (card3) {
        if (p < 0.70) {
          card3.style.transform = 'translate3d(0, 80px, 0) scale(0.97)';
          card3.style.opacity = '0';
          card3.style.visibility = 'hidden';
          card3.style.pointerEvents = 'none';
        } else if (p < 0.82) {
          // Rising up from below
          const t = smoothstep(0.70, 0.82, p);
          const y = 80 * (1 - t);
          const scale = 0.97 + 0.03 * t;
          card3.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          card3.style.opacity = `${t}`;
          card3.style.visibility = 'visible';
          card3.style.pointerEvents = t > 0.5 ? 'auto' : 'none';
        } else {
          // Settled at rest until track completes and scrolls away
          card3.style.transform = 'translate3d(0, 0, 0) scale(1)';
          card3.style.opacity = '1';
          card3.style.visibility = 'visible';
          card3.style.pointerEvents = 'auto';
        }
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        applyTransforms();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation on mount
    applyTransforms();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  // Clickable progress pill handler
  const scrollToStep = (stepIndex: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;
    if (totalScrollable <= 0) return;

    // Target progress points where each step is fully centered and resting
    const targetPoints = [0.08, 0.38, 0.64, 0.90];
    const targetP = targetPoints[stepIndex] ?? 0;
    const targetScrollY = window.scrollY + rect.top + targetP * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="how-it-works"
      ref={trackRef}
      className={`how-renting-works-section ${isReducedMotion ? 'reduced-motion' : ''}`}
      aria-label="How Renting Works"
    >
      <div className="how-renting-works-sticky">
        {/* Section Header & Subtitle */}
        <div className="how-renting-works-header">
          <h2 className="section-title">How Renting Works</h2>
          <p className="section-desc">
            Four straightforward steps from selection to on-site delivery and return.
          </p>

          {/* Understated Progress Indicator: 01 — 02 — 03 — 04 */}
          <nav
            className="how-renting-works-nav"
            aria-label="Rental process navigation"
          >
            {STEPS.map((step, idx) => (
              <React.Fragment key={step.num}>
                <button
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`progress-step-btn ${activeStep === idx ? 'active' : ''}`}
                  aria-label={`Step ${step.num}: ${step.title}`}
                  aria-current={activeStep === idx ? 'step' : undefined}
                >
                  <span className="progress-step-num">{step.num}</span>
                  <span className="progress-step-label">{step.shortLabel}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <span className="progress-step-divider" aria-hidden="true">
                    —
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Scroll Cards Stage */}
        <div className="how-renting-works-stage" role="region" aria-live="polite">
          {STEPS.map((step, idx) => (
            <article
              key={step.num}
              ref={(el) => setCardRef(el, idx)}
              className={`scroll-card step-${idx} ${activeStep === idx ? 'is-active-card' : ''}`}
              style={{
                zIndex: idx + 1,
              }}
              aria-label={`Step ${step.num}: ${step.title}`}
            >
              {/* Main photographic image (70-80% height hero) */}
              <div className="scroll-card-image-box">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px"
                  priority={idx === 0}
                  className="scroll-card-image"
                />
              </div>

              {/* Lightweight Information Strip */}
              <div className="scroll-card-info-strip">
                <div className="scroll-card-info-header">
                  <span className="scroll-card-num">{step.num}</span>
                  <h3 className="scroll-card-title">{step.title}</h3>
                </div>
                <p className="scroll-card-desc">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
