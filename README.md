# Rental Platform

> **One-Stop Rental Marketplace** — Rent anything, anytime.

## Overview

This is a production-grade, multi-sided rental marketplace platform. It connects customers who need to rent products with owners who have inventory to list.

## Monorepo Structure

```
rental-platform/
├── apps/
│   ├── web/          # Next.js 14 — Public website & customer/owner/partner portals
│   └── api/          # Express.js — REST API backend
├── packages/
│   ├── types/        # Shared TypeScript types and interfaces
│   ├── schemas/      # Shared Zod validation schemas
│   ├── utils/        # Shared utility functions
│   └── config/       # Shared constants
└── docs/             # All project documentation
```

## Quick Start (Development)

```bash
# 1. Copy environment template
cp .env.example .env.development

# 2. Fill in your local DATABASE_URL and REDIS_URL in .env.development

# 3. Install all dependencies
npm install

# 4. Run all apps in parallel (requires Turborepo)
npm run dev
```

The API will start on `http://localhost:4000`  
The web app will start on `http://localhost:3000`

## Documentation

| Document | Location |
|---|---|
| Architecture overview | [docs/architecture/overview.md](docs/architecture/overview.md) |
| Development setup | [docs/guides/development-setup.md](docs/guides/development-setup.md) |
| API reference | [docs/api/overview.md](docs/api/overview.md) |
| Database schema | [docs/database/entities.md](docs/database/entities.md) |
| Role/permission matrix | [docs/roles/rbac.md](docs/roles/rbac.md) |
| Git workflow | [docs/guides/git-workflow.md](docs/guides/git-workflow.md) |
| Deployment | [docs/guides/deployment.md](docs/guides/deployment.md) |
| Changelog | [docs/CHANGELOG.md](docs/CHANGELOG.md) |

## Development Phases

See [docs/architecture/overview.md](docs/architecture/overview.md) for the full roadmap.

| Phase | Status |
|---|---|
| 0 — Architecture | ✅ Complete |
| 1 — Project Scaffold | ✅ Complete |
| 2 — Core Database Schema | 🔜 Pending approval |

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL + Prisma |
| Cache & Queue | Redis + BullMQ |
| Shared types | npm workspaces (Turborepo) |

## License

Private. All rights reserved.
