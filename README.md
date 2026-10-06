# Multi-Category Rental Marketplace

A modern, high-performance, category-agnostic rental platform designed to support multiple asset categories (power equipment, electronics, audiovisual, vehicles, tools, event machinery, and more).

This repository contains the monorepo foundation established in **Phase 1: Production Project Initialization**.

---

## 1. Architecture Overview

```
                      ┌─────────────────────────┐
                      │    apps/web (Next.js)   │
                      │       App Router        │
                      └────────────┬────────────┘
                                   │ HTTP (REST)
                                   ▼
                      ┌─────────────────────────┐
                      │    apps/api (NestJS)    │
                      │  REST API / Health API  │
                      └────────────┬────────────┘
                                   │ Prisma ORM
                                   ▼
         ┌──────────────────────────────────────────────────┐
         │              PostgreSQL 16 Database              │
         │                  Redis 7 Cache                   │
         │          (Docker Compose Infrastructure)         │
         └──────────────────────────────────────────────────┘
```

Shared packages (`packages/*`) ensure shared TypeScript contracts, unified validation, UI primitives, and configuration tokens across the entire monorepo.

---

## 2. Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript (Strict), App Router
- **Backend**: NestJS 10, TypeScript (Strict), REST architecture
- **Database & ORM**: PostgreSQL 16, Prisma 5
- **Infrastructure**: Docker Compose (PostgreSQL & Redis)
- **Package Manager**: pnpm 9 (Workspaces)
- **Monorepo Engine**: Turborepo
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, Supertest

---

## 3. Repository Structure

```
.
├── apps/
│   ├── api/                    # NestJS REST API
│   │   ├── prisma/             # Prisma schema & migrations
│   │   ├── src/
│   │   │   ├── common/         # Filters, interceptors, pipes
│   │   │   ├── config/         # ConfigModule & environment factory
│   │   │   ├── database/       # PrismaService & DatabaseModule
│   │   │   ├── health/         # HealthController & HealthService
│   │   │   ├── modules/        # Domain modules (reserved for Phase 2+)
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── test/               # E2E test suite (Supertest)
│   └── web/                    # Next.js Web Application
│       └── src/
│           ├── app/            # App Router (layout, page, error, loading, not-found)
│           ├── components/     # UI components
│           ├── features/       # Feature slices (Phase 2+)
│           ├── hooks/          # React hooks (useHealth)
│           ├── lib/            # API client & runtime config
│           ├── services/       # Frontend service layer
│           ├── styles/         # Global styles
│           └── types/          # Frontend types
├── packages/
│   ├── config/                 # Shared configuration tokens & defaults
│   ├── types/                  # Shared TypeScript API response & health types
│   ├── ui/                     # Shared UI components (Button, Badge, Card)
│   └── validation/             # Shared Zod validation schemas
├── infrastructure/
│   ├── docker-compose.yml      # Local PostgreSQL & Redis containers
│   └── README.md
├── docs/                       # Technical architecture & API documentation
├── scripts/                    # Developer setup scripts
├── .github/workflows/          # CI Pipeline (lint, typecheck, test, build)
├── pnpm-workspace.yaml         # pnpm workspace definition
├── turbo.json                  # Turborepo task pipeline
└── README.md
```

---

## 4. Local Development Requirements

- **Node.js**: `20.x` or higher (`node -v`)
- **pnpm**: `9.x` or higher (`pnpm -v`)
- **Docker & Docker Compose**: For local PostgreSQL & Redis containers

---

## 5. Getting Started

### 1. Clone & Setup Environment

```bash
# Clone the repository
git clone <repo-url>
cd rental-platform

# Create local environment file
cp .env.example .env
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Database Infrastructure

Start PostgreSQL and Redis in the background using Docker Compose:

```bash
docker compose -f infrastructure/docker-compose.yml up -d
```

### 4. Generate Prisma Client

```bash
pnpm --filter @rental-platform/api prisma:generate
```

### 5. Start Development Servers

Start both frontend and backend concurrently via Turborepo:

```bash
pnpm dev
```

Or run services individually:

```bash
# Start backend only (NestJS on port 4000)
pnpm --filter @rental-platform/api dev

# Start frontend only (Next.js on port 3000)
pnpm --filter @rental-platform/web dev
```

---

## 6. Access Endpoints

| Service                  | URL                                   | Description                      |
| :----------------------- | :------------------------------------ | :------------------------------- |
| **Frontend Portal**      | `http://localhost:3000`               | Next.js App Router home page     |
| **API Health Probe**     | `http://localhost:4000/health`        | Root infrastructure health check |
| **API Versioned Health** | `http://localhost:4000/api/v1/health` | Client health check              |
| **API Info**             | `http://localhost:4000/`              | Base API information             |

---

## 7. Development Commands

| Command                                       | Action                                           |
| :-------------------------------------------- | :----------------------------------------------- |
| `pnpm install`                                | Install all dependencies across monorepo         |
| `pnpm dev`                                    | Start all applications in watch mode             |
| `pnpm build`                                  | Build all packages and applications              |
| `pnpm lint`                                   | Run ESLint across all workspaces                 |
| `pnpm typecheck`                              | Run TypeScript type checks across all workspaces |
| `pnpm test`                                   | Run unit tests across all workspaces             |
| `pnpm --filter @rental-platform/api test:e2e` | Run API End-to-End integration tests             |
| `pnpm format`                                 | Format all source files with Prettier            |
| `pnpm format:check`                           | Check code formatting with Prettier              |
| `pnpm clean`                                  | Clean build outputs and caches                   |

---

## 8. Environment Variables

Documented in `.env.example`:

| Variable              | Default                                                                          | Purpose                                                   |
| :-------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| `NODE_ENV`            | `development`                                                                    | Runtime environment (`development`, `production`, `test`) |
| `PORT`                | `4000`                                                                           | Port for the NestJS API server                            |
| `API_PREFIX`          | `api/v1`                                                                         | Global prefix for versioned REST API routes               |
| `DATABASE_URL`        | `postgresql://postgres:postgres@localhost:5432/rental_marketplace?schema=public` | PostgreSQL connection string                              |
| `REDIS_URL`           | `redis://localhost:6379`                                                         | Redis connection URL                                      |
| `CORS_ORIGINS`        | `http://localhost:3000`                                                          | Allowed origins for CORS                                  |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api/v1`                                                   | Public API URL accessible from frontend                   |
