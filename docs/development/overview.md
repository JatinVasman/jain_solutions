# Development Guide

## Prerequisites

- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0
- **Docker & Docker Compose**: For PostgreSQL and Redis containers

## Setup Steps

1. **Clone & Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Environment Configuration**:

   ```bash
   cp .env.example .env
   ```

3. **Start Infrastructure Services**:

   ```bash
   docker compose -f infrastructure/docker-compose.yml up -d
   ```

4. **Generate Prisma Client**:

   ```bash
   pnpm --filter @rental-platform/api prisma:generate
   ```

5. **Start Development Servers**:
   ```bash
   pnpm dev
   ```

The applications will be available at:

- Web Application: `http://localhost:3000`
- API Health Check: `http://localhost:4000/health`
- Versioned API Health Check: `http://localhost:4000/api/v1/health`
