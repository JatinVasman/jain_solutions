# CHANGELOG

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
- Phase 0: Complete architecture and system design document
- Phase 1: Monorepo scaffold (Turborepo, workspaces)
- `packages/types` — Shared TypeScript type definitions
- `packages/schemas` — Shared Zod validation schemas
- `packages/utils` — Shared utility functions (slug, date, currency, string)
- `packages/config` — Shared platform constants
- `apps/api` — Express.js API skeleton with health check endpoint
- `apps/web` — Next.js 14 App Router skeleton
- Global error handler and 404 middleware
- Standard API response utilities
- Prisma schema stub
- Documentation structure (README, architecture, API, guides)
- `.env.example` with all planned environment variables
- `.gitignore` for monorepo

---

_Future entries will be added per phase as features are implemented._
