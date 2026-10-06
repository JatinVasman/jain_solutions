# CHANGELOG

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

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
