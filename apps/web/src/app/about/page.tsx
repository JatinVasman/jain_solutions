import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Jain Solutions',
  description: 'Learn about Jain Solutions, our mission, and high-performance equipment rental platform.',
};

export default function AboutPage() {
  return (
    <main className="page-container" style={{ padding: '4rem 1.5rem', minHeight: '65vh' }}>
      <div className="section-header text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span className="section-tag">About Jain Solutions</span>
        <h1 className="section-title">About Us</h1>
        <p className="section-desc">
          Your trusted partner for high-performance telecom, networking, and surveillance equipment rentals.
        </p>
      </div>
    </main>
  );
}
