import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { RoleType, ApprovalStatus, AuthUser } from '@rental-platform/types';

describe('RolesGuard (RBAC Authorization)', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  const createMockContext = (user?: Partial<AuthUser>): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  };

  it('should allow access if no roles are required on the route', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const context = createMockContext();
    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  it('should allow access if user has the matching approved role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([RoleType.PRODUCT_OWNER]);

    const context = createMockContext({
      id: 'user-1',
      email: 'owner@example.com',
      roles: [
        {
          id: 'r-1',
          name: RoleType.PRODUCT_OWNER,
          approvalStatus: ApprovalStatus.APPROVED,
          assignedAt: new Date(),
        },
      ],
    });

    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  it('should block customer attempting to access administrative role endpoint', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([RoleType.ADMIN]);

    const context = createMockContext({
      id: 'customer-1',
      email: 'customer@example.com',
      roles: [
        {
          id: 'r-2',
          name: RoleType.CUSTOMER,
          approvalStatus: ApprovalStatus.APPROVED,
          assignedAt: new Date(),
        },
      ],
    });

    expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should block product owner if role approval is still PENDING_REVIEW', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([RoleType.PRODUCT_OWNER]);

    const context = createMockContext({
      id: 'pending-owner',
      email: 'pending.owner@example.com',
      roles: [
        {
          id: 'r-3',
          name: RoleType.PRODUCT_OWNER,
          approvalStatus: ApprovalStatus.PENDING_REVIEW,
          assignedAt: new Date(),
        },
      ],
    });

    expect(() => rolesGuard.canActivate(context)).toThrow(
      /pending administrative review/,
    );
  });

  it('should allow Super Admin with APPROVED status to bypass specific role requirements', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([RoleType.CATALOGUE_MANAGER]);

    const context = createMockContext({
      id: 'super-admin-1',
      email: 'superadmin@jainsolutions.local',
      roles: [
        {
          id: 'r-super',
          name: RoleType.SUPER_ADMIN,
          approvalStatus: ApprovalStatus.APPROVED,
          assignedAt: new Date(),
        },
      ],
    });

    expect(rolesGuard.canActivate(context)).toBe(true);
  });
});
