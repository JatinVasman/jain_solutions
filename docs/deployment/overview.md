# Deployment Strategy

## Production Readiness Principles

1. **Immutable Builds**: Applications build strictly using `pnpm build` with zero runtime dependency compilation.
2. **Environment Isolation**: Configuration injected purely via environment variables; zero hard-coded secrets.
3. **Stateless Backend**: The NestJS API is stateless, permitting horizontal autoscaling.
4. **Resilient Health Probes**: `/health` endpoint exposes real-time status of service dependencies for Kubernetes / Cloud Run / ECS probes.
5. **Database Migrations**: Applied sequentially in CI/CD before starting new service containers (`prisma migrate deploy`).
