# Architecture Overview

> Status: Phase 0 complete. Full architecture is defined in the Phase 0 document.

This document provides a summary of the architecture decisions made in Phase 0.

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand
- **Backend:** Express.js, TypeScript, Zod
- **Database:** PostgreSQL via Prisma ORM
- **Cache / Queue:** Redis, BullMQ
- **Build system:** Turborepo (monorepo)

## Key Architectural Decisions

1. **Monorepo with shared packages** — Types and schemas are shared between FE and API to prevent drift.
2. **Polymorphic spec system** — Categories define their own spec keys; adding a new product category does not require a schema change.
3. **RBAC via database** — Roles and permissions are stored in DB, not hard-coded, making them manageable from admin.
4. **Profile extension pattern** — Each user role has its own profile table. No god-table with nullable columns.
5. **Service abstractions** — Storage, search, email, and payment gateway all have interface abstractions allowing backend swaps.
6. **Rental lifecycle state machine** — 15 discrete states, explicit transitions, audit-ready.

## Development Roadmap

| Phase | Name | Status |
|---|---|---|
| 0 | Architecture | ✅ Done |
| 1 | Project Scaffold | ✅ Done |
| 2 | Core Database Schema | Pending |
| 3 | Authentication | Pending |
| 4 | Catalogue — Backend | Pending |
| 5 | Catalogue — UI | Pending |
| 6 | Inventory System | Pending |
| 7 | Rental — Backend | Pending |
| 8 | Rental — Customer UI | Pending |
| 9 | Owner Portal — Backend | Pending |
| 10 | Owner Portal — UI | Pending |
| 11 | Admin Foundation | Pending |
| 12 | Payments | Pending |
| 13 | Admin Rentals & Orders | Pending |
| 14 | Partner System | Pending |
| 15 | Freelancer & Jobs | Pending |
| 16 | Notifications | Pending |
| 17 | Search | Pending |
| 18 | Reporting | Pending |
| 19 | Security Hardening | Pending |
| 20 | Deployment & DevOps | Pending |
