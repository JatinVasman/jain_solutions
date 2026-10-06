# CHANGELOG

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Phase 2: Website Structure & Information Architecture] - 2026-10-06

### Added

- **Information Architecture & Route System**:
  - Implemented 64 structural pages covering all 7 major platform areas.
  - Public Website: Homepage (`/`), Categories (`/categories`, `/categories/[category]`), Catalogue (`/products`, `/products/[product]`), Search (`/search`), Locations (`/locations`), About (`/about`), Contact (`/contact`), FAQ (`/faq`), Careers (`/careers`), Terms (`/terms`), Privacy (`/privacy`).
  - Customer Journey: Step-by-step booking flow (`/rent/[product]/details` → `/rent/[product]/customer` → `/rent/[product]/confirmation`).
  - Customer Portal: Layout with dedicated sidebar navigation (`/account`, `/account/profile`, `/account/addresses`, `/account/saved`, `/account/rentals`, `/account/rentals/[id]`, `/account/documents`, `/account/notifications`).
  - Product Owner Portal: Asset & fleet management views (`/owner`, `/owner/profile`, `/owner/products`, `/owner/products/new`, `/owner/products/[id]`, `/owner/inventory`, `/owner/rentals`, `/owner/earnings`).
  - Commercial Partner Portal: Referral operations and commission ledger (`/partner`, `/partner/profile`, `/partner/referrals`, `/partner/referrals/[id]`, `/partner/earnings`).
  - Field Freelancer Portal: Technician dispatch queue and on-site inspection sheets (`/freelancer`, `/freelancer/profile`, `/freelancer/tasks`, `/freelancer/tasks/[id]`).
  - Careers & Recruitment: Public listings, job details, candidate applications, and application tracker (`/jobs`, `/jobs/[id]`, `/jobs/[id]/apply`, `/applications`).
  - Super Admin Operating Console: Centralized operations console with 19 structural routes (`/admin`, `/admin/users`, `/admin/customers`, `/admin/owners`, `/admin/partners`, `/admin/freelancers`, `/admin/categories`, `/admin/products`, `/admin/inventory`, `/admin/rentals`, `/admin/orders`, `/admin/locations`, `/admin/offices`, `/admin/jobs`, `/admin/applications`, `/admin/referrals`, `/admin/enquiries`, `/admin/reports`, `/admin/settings`).
- **Design System & Components**:
  - Clean neutral design system tokens in `globals.css` emphasizing clarity and trust.
  - Reusable structural components: `Header`, `Footer`, `SearchBar`, `CategoryCard`, `ProductCard`, `FilterPanel`, `LocationSelector`, `Breadcrumb`, `EmptyState`, `Pagination`, `Sidebar`, `PortalBanner`.
  - Multi-category expandable mock definitions in `mock-data.ts` (Power, Electronics, Cameras, Vehicles, Tools, Machinery, Events, Furniture).
- **Quality & Verification**:
  - 100% typechecked with strict TypeScript (`tsc --noEmit`).
  - Verified static generation and production build across all 64 routes (`next build`).
  - Clean linting (`next lint`) and zero formatting discrepancies (`prettier`).

## [Phase 1: Production Project Initialization] - 2026-10-06

### Added

- **Monorepo Foundation**: pnpm workspace with Turborepo task pipeline (`turbo.json`).
- **Backend (`apps/api`)**:
  - NestJS 10 REST API architecture with strict TypeScript.
  - Global `HttpExceptionFilter` for standardized JSON error handling.
  - Global `LoggingInterceptor` for structured HTTP latency logging.
  - Global `TransformInterceptor` for consistent API envelopes.
  - `AppConfigModule` loading typed runtime configuration.
  - `DatabaseModule` & `PrismaService` connection lifecycle with graceful degradation.
  - `HealthModule`, `HealthController`, and `HealthService` exposing `/health` and `/api/v1/health`.
  - Testing foundation: Jest unit tests and Supertest E2E integration tests.
- **Frontend (`apps/web`)**:
  - Next.js 14 App Router application with strict TypeScript.
  - Modular frontend layers: `app`, `components`, `features`, `lib`, `hooks`, `services`, `types`, `styles`, `public`.
  - API Client and `useHealth` hook connecting to backend.
  - Responsive Phase 1 status interface verifying backend connectivity.
- **Shared Packages (`packages/`)**:
  - `packages/config`: Platform constants, default ports, pagination parameters.
  - `packages/types`: Shared API envelopes, health check contracts, common utility types.
  - `packages/validation`: Zod schemas for environment and pagination validation.
  - `packages/ui`: Shared UI primitive components (`Button`, `Badge`, `Card`).
- **Database & Infrastructure (`infrastructure/`)**:
  - `infrastructure/docker-compose.yml` for PostgreSQL 16 Alpine and Redis 7 Alpine development containers.
  - Prisma 5 configuration (`schema.prisma`) with baseline `SystemHealth` entity.
- **Documentation (`docs/`)**:
  - `docs/architecture/overview.md`
  - `docs/api/overview.md`
  - `docs/database/overview.md`
  - `docs/development/overview.md`
  - `docs/deployment/overview.md`
  - `docs/testing/overview.md`
- **CI / Quality**:
  - `.github/workflows/ci.yml` with pnpm setup, typechecking, linting, testing, and building.
  - ESLint and Prettier configured across all workspaces.
