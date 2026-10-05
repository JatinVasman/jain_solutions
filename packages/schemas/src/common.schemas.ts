import { z } from 'zod';

// ─── Reusable field schemas ───────────────────────────────────────────────────

export const emailSchema = z.string().email('Invalid email address').toLowerCase().trim();

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format')
  .trim();

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only')
  .min(2)
  .max(100);

export const uuidSchema = z.string().uuid('Invalid ID format');

export const pincodeSchema = z.string().regex(/^\d{4,10}$/, 'Invalid pincode');

export const urlSchema = z.string().url('Invalid URL');

export const nonEmptyStringSchema = z.string().min(1, 'This field is required').trim();
