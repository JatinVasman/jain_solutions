# Architecture Overview

## Platform Purpose

A multi-category rental marketplace designed to support diverse rental equipment verticals (power equipment, inverters, batteries, generators, cameras, laptops, projectors, vehicles, tools, machinery, event equipment, furniture, and future categories).

The system is category-agnostic by design. Business logic never assumes a specific physical asset type.

## Architectural Layers & Separation of Concerns

```
[ Frontend Client ]
  └── apps/web (Next.js App Router)
        ↓ HTTP / REST
[ API Gateway & REST Controllers ]
  └── apps/api (NestJS Controllers, Validation Pipes, Exception Filters)
        ↓
[ Domain Application Services ]
  └── apps/api (NestJS Services, Dependency Injection)
        ↓
[ Data Access Layer ]
  └── apps/api (Prisma ORM Client)
        ↓
[ Storage & Cache Infrastructure ]
  └── PostgreSQL 16 (Primary RDBMS) & Redis 7 (Cache/Broker)
```

## Strict Layer Boundaries

- **UI Components & Pages**: Pure presentation and user interaction; zero direct database queries or business policy logic.
- **Frontend Services**: Encapsulate API transport, serialization, and error mapping.
- **API Controllers**: HTTP routing, request validation, response serialization. No direct business decisions.
- **Application Services**: Core business rules, validation workflows, transactions.
- **Database Layer**: Strongly-typed schema access via Prisma.

## Monorepo Layout

- `apps/web`: Next.js web portal.
- `apps/api`: NestJS REST API.
- `packages/config`: Shared configuration constants and environment defaults.
- `packages/types`: Shared TypeScript definitions and API contract types.
- `packages/validation`: Shared validation schemas (Zod).
- `packages/ui`: Shared UI primitive components.
- `infrastructure/`: Docker Compose definitions for development dependencies.
- `docs/`: Technical specifications and developer guides.
