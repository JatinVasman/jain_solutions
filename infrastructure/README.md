# Development Infrastructure

This directory contains the containerized development infrastructure for local development.

## Services

- **PostgreSQL 16**: Primary relational database.
- **Redis 7**: In-memory cache and message store (infrastructure-ready for future phases).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v24+)
- [Docker Compose](https://docs.docker.com/compose/) (v2+)

## Usage

### Start Services

Start PostgreSQL and Redis in detached mode:

```bash
docker compose -f infrastructure/docker-compose.yml up -d
```

### Check Service Health

```bash
docker compose -f infrastructure/docker-compose.yml ps
```

### View Logs

```bash
# All services
docker compose -f infrastructure/docker-compose.yml logs -f

# Specific service
docker compose -f infrastructure/docker-compose.yml logs -f postgres
docker compose -f infrastructure/docker-compose.yml logs -f redis
```

### Stop Services

```bash
docker compose -f infrastructure/docker-compose.yml down
```

### Reset Data Volumes (Destructive)

To wipe the local PostgreSQL database and Redis store:

```bash
docker compose -f infrastructure/docker-compose.yml down -v
```

## Environment Variables

The compose setup respects variables set in your root `.env` file or environment:

| Variable            | Default              | Purpose                      |
| :------------------ | :------------------- | :--------------------------- |
| `POSTGRES_USER`     | `postgres`           | Database admin username      |
| `POSTGRES_PASSWORD` | `postgres`           | Database admin password      |
| `POSTGRES_DB`       | `rental_marketplace` | Database name                |
| `POSTGRES_PORT`     | `5432`               | Host port mapped to Postgres |
| `REDIS_PORT`        | `6379`               | Host port mapped to Redis    |
