# Domain Modules Directory

This directory is reserved for business domain modules that will be incrementally introduced in subsequent phases.

## Architectural Guidelines

1. **Phase Discipline**: In Phase 1 (Production Project Initialization), no business domain modules are loaded.
2. **Planned Phase Modules**:
   - Phase 2+: Authentication & RBAC (`AuthModule`, `UsersModule`)
   - Phase 3+: Catalogue & Category-Agnostic Inventory (`CatalogueModule`, `InventoryModule`)
   - Phase 4+: Rental Lifecycle & Bookings (`RentalModule`, `OrdersModule`)
   - Phase 5+: Payments & Billing (`PaymentsModule`)
   - Phase 6+: Partners & Freelancers (`PartnersModule`, `FreelancersModule`)
3. **Module Structure**:
   Each future module must follow standard NestJS conventions:
   ```
   modules/[module-name]/
     ├── [module-name].module.ts
     ├── [module-name].controller.ts
     ├── [module-name].service.ts
     ├── dto/
     ├── entities/
     └── [module-name].service.spec.ts
   ```
4. **Separation of Concerns**:
   Controllers handle HTTP transport only. Business logic belongs in Services. Data access is handled through Prisma or repository services.
