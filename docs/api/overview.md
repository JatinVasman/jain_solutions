# API Overview

## Base URL

```
Development:  http://localhost:4000/api/v1
Staging:      https://api-staging.rentalplatform.com/api/v1
Production:   https://api.rentalplatform.com/api/v1
```

## Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Access tokens expire in **15 minutes**. Use the refresh token endpoint to obtain a new one.

## Response Format

All responses follow this envelope:

### Success
```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "MACHINE_READABLE_CODE",
    "message": "Human-readable message",
    "details": [
      { "field": "email", "message": "Invalid email address" }
    ]
  }
}
```

## Pagination

List endpoints accept:

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | integer | 1 | Page number (1-indexed) |
| `limit` | integer | 20 | Items per page (max 100) |
| `sortBy` | string | varies | Field to sort by |
| `sortOrder` | asc \| desc | desc | Sort direction |

## Rate Limiting

- **General:** 100 requests per 15 minutes per IP
- **Auth endpoints:** 10 requests per 15 minutes per IP

## API Modules

| Module | Base Path | Status |
|---|---|---|
| Health | `/api/v1/health` | ✅ Active |
| Auth | `/api/v1/auth` | Phase 3 |
| Users | `/api/v1/users` | Phase 3 |
| Catalogue | `/api/v1/catalogue` | Phase 4 |
| Inventory | `/api/v1/inventory` | Phase 6 |
| Rentals | `/api/v1/rentals` | Phase 7 |
| Orders | `/api/v1/orders` | Phase 7 |
| Payments | `/api/v1/payments` | Phase 12 |
| Locations | `/api/v1/locations` | Phase 2 |
| Jobs | `/api/v1/jobs` | Phase 15 |
| Admin | `/api/v1/admin` | Phase 11 |
