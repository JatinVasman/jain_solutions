# Role & Permission Matrix

## User Roles

| Role | Description |
|---|---|
| `SUPER_ADMIN` | Full platform control, system configuration |
| `ADMIN` | General platform management |
| `OPERATIONS` | Rental ops, logistics, delivery |
| `CATALOGUE_MANAGER` | Category and product management |
| `FINANCE` | Payments, payouts, financial reports |
| `HR` | Jobs, applications, freelancers |
| `SUPPORT` | Customer enquiries, dispute resolution |
| `CUSTOMER` | Browse and rent products |
| `OWNER` | List and manage products |
| `PARTNER` | Referrals and commission tracking |
| `FREELANCER` | Task-based work assignments |
| `JOB_SEEKER` | Browse and apply to job listings |

## Permission Naming Convention

Permissions follow the `resource:action` pattern.

```
product:create
product:read
product:update
product:delete
rental:approve
admin:access
```

## Role → Permission Mapping

_(Full matrix to be seeded in Phase 3 — Authentication)_

| Permission | SUPER_ADMIN | ADMIN | OPERATIONS | CATALOGUE_MGR | FINANCE | SUPPORT | CUSTOMER | OWNER |
|---|---|---|---|---|---|---|---|---|
| `admin:access` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| `user:*` | ✓ | ✓ | — | — | — | read | own | own |
| `category:*` | ✓ | ✓ | — | ✓ | — | — | read | read |
| `product:*` | ✓ | ✓ | — | ✓ | — | — | read | own |
| `inventory:*` | ✓ | ✓ | ✓ | — | — | — | — | own |
| `rental:*` | ✓ | ✓ | ✓ | — | read | read | own | own |
| `rental:approve` | ✓ | ✓ | ✓ | — | — | — | — | — |
| `payment:*` | ✓ | — | — | — | ✓ | — | own | own |
| `payment:refund` | ✓ | — | — | — | ✓ | — | — | — |
| `report:read` | ✓ | ✓ | ✓ | — | ✓ | — | — | — |
| `audit:read` | ✓ | ✓ | — | — | — | — | — | — |
| `settings:*` | ✓ | — | — | — | — | — | — | — |

## RBAC Implementation

- Roles and permissions are stored in the database (`roles`, `permissions`, `role_permissions` tables)
- A user can hold **multiple roles** (e.g., OWNER + PARTNER)
- Permissions are checked via middleware: `requirePermission('rental:approve')`
- Role checks use: `requireRole('ADMIN', 'SUPER_ADMIN')`

Implementation: Phase 3 (Authentication Module)
