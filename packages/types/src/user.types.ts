// =============================================================================
// USER TYPES
// Core user and profile type definitions shared across frontend and backend.
// =============================================================================

import { UserRole, UserStatus, AuthMethod } from './enums.js';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string | null;
  phone: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: UserStatus;
  roles: UserRole[];
  lastLoginAt: Date | null;
}

export interface CustomerProfile extends BaseEntity {
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  dateOfBirth: Date | null;
}

export interface OwnerProfile extends BaseEntity {
  userId: string;
  businessName: string | null;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  isVerified: boolean;
}

export interface PartnerProfile extends BaseEntity {
  userId: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  referralCode: string;
  isVerified: boolean;
}

export interface FreelancerProfile extends BaseEntity {
  userId: string;
  firstName: string;
  lastName: string;
  skills: string[];
  isAvailable: boolean;
}

export interface Address extends BaseEntity {
  userId: string;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

/** JWT token payload structure */
export interface TokenPayload {
  sub: string;
  roles: UserRole[];
  sessionId: string;
  iat: number;
  exp: number;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  expiresAt: Date;
}
