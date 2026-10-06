# Testing Strategy

## Test Pyramid

- **Unit Tests**: Test isolated services, controllers, utilities (Jest).
- **Integration Tests**: Test module interaction and database querying.
- **End-to-End (E2E) Tests**: Test complete HTTP lifecycle via Supertest (`apps/api/test/health.e2e-spec.ts`).

## Running Tests

```bash
# Run all unit tests across the monorepo
pnpm test

# Run API E2E tests
pnpm --filter @rental-platform/api test:e2e
```
