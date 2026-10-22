'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  AuthUser,
  RoleType,
  ApprovalStatus,
  AccountStatus,
} from '@rental-platform/types';
import { authService, LoginPayload, RegisterPayload } from '../services/auth.service';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<{ requiresVerification: boolean; user?: AuthUser; redirectUrl?: string }>;
  register: (payload: RegisterPayload) => Promise<{ requiresVerification: boolean; email: string; message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (role: RoleType) => boolean;
  isRoleApproved: (role: RoleType) => boolean;
  getRoleLandingUrl: (user?: AuthUser | null) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function getRoleLandingUrl(user?: AuthUser | null): string {
  if (!user || !user.roles || user.roles.length === 0) {
    return '/account';
  }

  // Prioritize administrative roles if approved
  const adminRoles = [
    RoleType.SUPER_ADMIN,
    RoleType.ADMIN,
    RoleType.OPERATIONS,
    RoleType.CATALOGUE_MANAGER,
    RoleType.FINANCE,
    RoleType.HR,
    RoleType.CUSTOMER_SUPPORT,
  ];

  const hasAdmin = user.roles.find(
    (r) => adminRoles.includes(r.name) && r.approvalStatus === ApprovalStatus.APPROVED,
  );
  if (hasAdmin) return '/admin';

  // Check specific functional roles
  const ownerRole = user.roles.find((r) => r.name === RoleType.PRODUCT_OWNER);
  if (ownerRole) return '/owner';

  const partnerRole = user.roles.find((r) => r.name === RoleType.PARTNER);
  if (partnerRole) return '/partner';

  const freelancerRole = user.roles.find((r) => r.name === RoleType.FREELANCER);
  if (freelancerRole) return '/freelancer';

  const jobSeekerRole = user.roles.find((r) => r.name === RoleType.JOB_SEEKER);
  if (jobSeekerRole) return '/applications';

  return '/account';
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      const response = await authService.getMe();
      if (response && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    try {
      const result = await authService.login(payload);

      if (result.requiresVerification) {
        setUser(result.user || null);
        return {
          requiresVerification: true,
          user: result.user,
          redirectUrl: `/verification-pending?email=${encodeURIComponent(payload.email)}`,
        };
      }

      setUser(result.user);
      const landingUrl = getRoleLandingUrl(result.user);
      return {
        requiresVerification: false,
        user: result.user,
        redirectUrl: landingUrl,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const result = await authService.register(payload);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  const hasRole = useCallback(
    (role: RoleType): boolean => {
      if (!user || !user.roles) return false;
      return user.roles.some((r) => r.name === role);
    },
    [user],
  );

  const isRoleApproved = useCallback(
    (role: RoleType): boolean => {
      if (!user || !user.roles) return false;
      return user.roles.some((r) => r.name === role && r.approvalStatus === ApprovalStatus.APPROVED);
    },
    [user],
  );

  const isAuthenticated = useMemo(() => {
    return !!user && user.status === AccountStatus.ACTIVE;
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      refreshUser,
      hasRole,
      isRoleApproved,
      getRoleLandingUrl,
    }),
    [user, loading, isAuthenticated, hasRole, isRoleApproved, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
