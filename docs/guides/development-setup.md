# Development Setup Guide

## Prerequisites

| Tool | Minimum Version |
|---|---|
| Node.js | 20.x |
| npm | 10.x |
| PostgreSQL | 15.x |
| Redis | 7.x |

## 1. Clone and Install

```bash
git clone <repository-url>
cd rental-platform
npm install
```

## 2. Environment Configuration

```bash
cp .env.example .env.development
```

Edit `.env.development` and fill in:
- `DATABASE_URL` — your local PostgreSQL connection string
- `REDIS_URL` — your local Redis connection string
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` — generate with `openssl rand -hex 64`

## 3. Database Setup

_(Available from Phase 2 — Core Database Schema)_

```bash
# Run migrations
cd apps/api
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

## 4. Start Development Servers

```bash
# From repository root — starts all apps in parallel
npm run dev
```

| App | URL |
|---|---|
| Web (Next.js) | http://localhost:3000 |
| API (Express) | http://localhost:4000 |
| API Health | http://localhost:4000/api/v1/health |

## 5. Running Tests

```bash
# All tests
npm run test

# API tests only
cd apps/api && npm run test

# Web tests only
cd apps/web && npm run test
```

## 6. Type Checking

```bash
npm run type-check
```

## 7. Linting & Formatting

```bash
npm run lint
npm run format
```
