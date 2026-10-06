# Frontend Features Directory

This directory is reserved for domain feature slices to be implemented in subsequent phases.

## Structure Convention

Each future feature module will be organized as a self-contained feature slice:

```
features/[feature-name]/
  ├── components/    # Feature-specific UI components
  ├── hooks/         # Feature-specific hooks
  ├── services/      # Feature-specific API calls
  ├── types/         # Feature-specific types
  └── index.ts       # Public API of the feature slice
```

## Phase Roadmap

- Phase 2+: Authentication & User Profile
- Phase 3+: Catalogue & Product Exploration
- Phase 4+: Rental Flow & Cart/Booking
- Phase 5+: Order Management & Invoices
