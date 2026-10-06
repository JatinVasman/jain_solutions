# API Conventions & Architecture

## Base URL & Versioning

All business REST API routes are versioned using the prefix convention:

```
/api/v1/...
```

System-level health checks are accessible at:

- `/health` (root infrastructure probe for container orchestration)
- `/api/v1/health` (versioned client probe)

## Response Formats

### Standard Success Response

All endpoints follow a uniform envelope:

```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... },
  "timestamp": "2026-10-06T12:00:00.000Z"
}
```

### Standard Error Response

Handled centrally by `HttpExceptionFilter`:

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed: 'email' must be a valid email",
  "timestamp": "2026-10-06T12:00:00.000Z",
  "path": "/api/v1/resource"
}
```

### Pagination Contract

List queries accept `page` (default 1) and `limit` (default 20, max 100), returning:

```json
{
  "items": [ ... ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 100,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## Security Headers

- Protected via `helmet`.
- CORS configured via environment variable `CORS_ORIGINS`.
- Global `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`.
