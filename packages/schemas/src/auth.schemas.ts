import { z } from 'zod';

// Placeholder auth schemas — will be fully implemented in Phase 3 (Auth Module).
// Defined here so the package structure is established and importable.

export const loginWithEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginWithPhoneSchema = z.object({
  phone: z.string().min(10),
  otp: z.string().length(6),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});
