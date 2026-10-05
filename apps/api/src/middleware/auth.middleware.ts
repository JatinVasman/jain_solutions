// =============================================================================
// AUTH PLACEHOLDER MIDDLEWARE
// Will be fully implemented in Phase 3 (Authentication Module).
// Defined now so other middleware can reference its types and the structure
// is established.
// =============================================================================

import type { Request, Response, NextFunction } from 'express';
import type { TokenPayload } from '@rental-platform/types';

// Augment Express Request type to include authenticated user info
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Placeholder authentication middleware.
 * Phase 3 will replace this with full JWT verification.
 */
export function requireAuth(_req: Request, _res: Response, next: NextFunction): void {
  // TODO (Phase 3): Verify JWT access token, decode payload, attach to req.user
  next();
}

/**
 * Placeholder RBAC middleware factory.
 * Phase 3 will replace this with full role/permission checking.
 *
 * Usage: router.get('/admin', requirePermission('admin:access'), handler)
 */
export function requirePermission(_permission: string) {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    // TODO (Phase 3): Check req.user.permissions includes the required permission
    next();
  };
}

/**
 * Placeholder role guard middleware factory.
 * Phase 3 will replace this with full role checking.
 *
 * Usage: router.get('/admin', requireRole('ADMIN', 'SUPER_ADMIN'), handler)
 */
export function requireRole(..._roles: string[]) {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    // TODO (Phase 3): Check req.user.roles intersects with required roles
    next();
  };
}
