// =============================================================================
// ROLE & PERMISSION CONSTANTS
// These mirror the UserRole enum but are usable as plain strings in middleware
// without importing the full types package in every middleware file.
// =============================================================================

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  OPERATIONS: 'OPERATIONS',
  CATALOGUE_MANAGER: 'CATALOGUE_MANAGER',
  FINANCE: 'FINANCE',
  HR: 'HR',
  SUPPORT: 'SUPPORT',
  CUSTOMER: 'CUSTOMER',
  OWNER: 'OWNER',
  PARTNER: 'PARTNER',
  FREELANCER: 'FREELANCER',
  JOB_SEEKER: 'JOB_SEEKER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Admin-level roles (all have /admin route access)
export const ADMIN_ROLES: Role[] = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.OPERATIONS,
  ROLES.CATALOGUE_MANAGER,
  ROLES.FINANCE,
  ROLES.HR,
  ROLES.SUPPORT,
];

// =============================================================================
// PERMISSIONS
// Naming convention: resource:action
// =============================================================================

export const PERMISSIONS = {
  // User management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_SUSPEND: 'user:suspend',

  // Catalogue
  CATEGORY_CREATE: 'category:create',
  CATEGORY_READ: 'category:read',
  CATEGORY_UPDATE: 'category:update',
  CATEGORY_DELETE: 'category:delete',

  PRODUCT_CREATE: 'product:create',
  PRODUCT_READ: 'product:read',
  PRODUCT_UPDATE: 'product:update',
  PRODUCT_DELETE: 'product:delete',
  PRODUCT_PUBLISH: 'product:publish',

  // Inventory
  INVENTORY_READ: 'inventory:read',
  INVENTORY_UPDATE: 'inventory:update',

  // Rentals
  RENTAL_CREATE: 'rental:create',
  RENTAL_READ: 'rental:read',
  RENTAL_UPDATE: 'rental:update',
  RENTAL_APPROVE: 'rental:approve',
  RENTAL_REJECT: 'rental:reject',
  RENTAL_CANCEL: 'rental:cancel',

  // Payments
  PAYMENT_READ: 'payment:read',
  PAYMENT_REFUND: 'payment:refund',

  // Admin
  ADMIN_ACCESS: 'admin:access',
  SETTINGS_READ: 'settings:read',
  SETTINGS_UPDATE: 'settings:update',
  AUDIT_READ: 'audit:read',
  REPORT_READ: 'report:read',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
