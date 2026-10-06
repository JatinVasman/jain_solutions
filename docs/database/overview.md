# Database & Persistence Architecture

## Technology Choice

- **RDBMS**: PostgreSQL 16
- **ORM**: Prisma 5

## Philosophy: Incremental Schema Growth

In Phase 1, only the baseline connection infrastructure (`SystemHealth` model) is defined. Full business domain entities (users, roles, categories, products, inventory, bookings, invoices) will be introduced phase-by-phase.

## Schema Location

- `apps/api/prisma/schema.prisma`

## Prisma CLI Workflow

### Generate Prisma Client

```bash
pnpm --filter @rental-platform/api prisma:generate
```

### Apply Migrations (Development)

```bash
pnpm --filter @rental-platform/api prisma:migrate
```

### View Data in Prisma Studio

```bash
pnpm --filter @rental-platform/api exec prisma studio
```
