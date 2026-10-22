import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleType, ApprovalStatus, AuthUser, AuthRoleItem } from '@rental-platform/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser | undefined;

    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied: User authentication and role context missing');
    }

    // Super Admin role with APPROVED status bypasses role restrictions
    const superAdminRole = user.roles.find(
      (r: AuthRoleItem) => r.name === RoleType.SUPER_ADMIN && r.approvalStatus === ApprovalStatus.APPROVED,
    );
    if (superAdminRole) {
      return true;
    }

    // Check if the user has any of the required roles
    let hasPendingRole = false;
    let pendingRoleName = '';

    for (const requiredRole of requiredRoles) {
      const userRole = user.roles.find((r: AuthRoleItem) => r.name === requiredRole);
      if (userRole) {
        if (userRole.approvalStatus === ApprovalStatus.APPROVED) {
          return true;
        }
        if (userRole.approvalStatus === ApprovalStatus.PENDING_REVIEW) {
          hasPendingRole = true;
          pendingRoleName = userRole.name;
        }
      }
    }

    if (hasPendingRole) {
      throw new ForbiddenException(
        `Access denied: Your ${pendingRoleName} account is pending administrative review. You will receive access once approved.`,
      );
    }

    throw new ForbiddenException(
      `Access denied: You do not have the required permissions (${requiredRoles.join(', ')})`,
    );
  }
}
