import React from 'react';
import { HealthStatusCard } from '../components/HealthStatusCard';

export default function HomePage() {
  return (
    <main className="container">
      <header className="header">
        <span className="phase-tag">Phase 1 Complete</span>
        <h1 className="title">Multi-Category Rental Marketplace</h1>
        <p className="subtitle">Production Architecture & Monorepo Foundation Initialized</p>
      </header>

      <section>
        <HealthStatusCard />
      </section>

      <section className="foundation-grid">
        <div className="foundation-card">
          <h3>Frontend Foundation</h3>
          <p>
            Next.js App Router, strict TypeScript, modular layers (app, components, features, lib,
            hooks, services, types, styles).
          </p>
        </div>

        <div className="foundation-card">
          <h3>Backend Foundation</h3>
          <p>
            NestJS REST architecture, global exception filter, request logging interceptor,
            configuration service, health module.
          </p>
        </div>

        <div className="foundation-card">
          <h3>Database & Infrastructure</h3>
          <p>
            PostgreSQL with Prisma ORM connection lifecycle, Redis service configuration, and Docker
            Compose development setup.
          </p>
        </div>

        <div className="foundation-card">
          <h3>Monorepo Packages</h3>
          <p>
            pnpm workspace with shared packages: <code>@rental-platform/config</code>,{' '}
            <code>types</code>, <code>validation</code>, and <code>ui</code>.
          </p>
        </div>
      </section>

      <footer className="footer">
        Rental Marketplace Platform &bull; Phase 1 Production Foundation &bull; Awaiting Phase 2
        Approval
      </footer>
    </main>
  );
}
