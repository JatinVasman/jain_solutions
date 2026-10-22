/**
 * Authentication and RBAC Type Definitions
 */

export enum RoleType {
  CUSTOMER = 'CUSTOMER',
  PRODUCT_OWNER = 'PRODUCT_OWNER',
  PARTNER = 'PARTNER',
  FREELANCER = 'FREELANCER',
  JOB_SEEKER = 'JOB_SEEKER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  OPERATIONS = 'OPERATIONS',
  CATALOGUE_MANAGER = 'CATALOGUE_MANAGER',
  FINANCE = 'FINANCE',
  HR = 'HR',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
}

export enum AccountStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED',
}

export enum ApprovalStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export interface UserRoleDto {
  role: RoleType;
  approvalStatus: ApprovalStatus;
  assignedAt: string;
  approvedAt?: string | null;
}

export interface UserProfileDto {
  id: string;
  email: string;
  phone?: string | null;
  name: string;
  status: AccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  roles: UserRoleDto[];
  primaryRole: RoleType;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRoleItem {
  id: string;
  name: RoleType;
  approvalStatus: ApprovalStatus;
  assignedAt: Date | string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  status: AccountStatus;
  emailVerified: boolean;
  roles: AuthRoleItem[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  requiresVerification: boolean;
  message: string;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  status: AccountStatus;
  roles: RoleType[];
}

export interface UserSession {
  id: string;
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt: Date | string;
  expiresAt: Date | string;
  isCurrent?: boolean;
}

export interface AuthSessionDto {
  id: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  expiresAt: string;
  isCurrent?: boolean;
}

export interface AuthResponseDto {
  user: UserProfileDto;
  accessToken: string;
  refreshToken?: string;
  redirectUrl: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  accountType: RoleType.CUSTOMER | RoleType.PRODUCT_OWNER | RoleType.PARTNER | RoleType.FREELANCER | RoleType.JOB_SEEKER;
  acceptTerms: boolean;
}

export interface LoginRequestDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface ResetPasswordRequestDto {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequestDto {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyEmailRequestDto {
  token: string;
}

export interface ResendVerificationRequestDto {
  email: string;
}
