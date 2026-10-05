// =============================================================================
// SHARED PLATFORM CONSTANTS
// These are business-level constants that do NOT change per environment.
// Environment-specific values belong in .env files, not here.
// =============================================================================

export const PLATFORM_NAME = 'Rental Platform';
export const PLATFORM_SUPPORT_EMAIL = 'support@rentalplatform.com';
export const PLATFORM_CURRENCY = 'INR';
export const PLATFORM_LOCALE = 'en-IN';
export const PLATFORM_TIMEZONE = 'Asia/Kolkata';

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ─── Token Expiry ─────────────────────────────────────────────────────────────

export const ACCESS_TOKEN_EXPIRY_MINUTES = 15;
export const REFRESH_TOKEN_EXPIRY_DAYS = 7;
export const OTP_EXPIRY_MINUTES = 10;
export const PASSWORD_RESET_EXPIRY_MINUTES = 30;

// ─── File Uploads ─────────────────────────────────────────────────────────────

export const MAX_PRODUCT_IMAGE_SIZE_MB = 10;
export const MAX_DOCUMENT_SIZE_MB = 20;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf'] as const;

// ─── Rental ───────────────────────────────────────────────────────────────────

export const MIN_RENTAL_DURATION_HOURS = 1;
export const DEFAULT_SECURITY_DEPOSIT_PERCENT = 20;

// ─── Referral ─────────────────────────────────────────────────────────────────

export const REFERRAL_CODE_LENGTH = 8;
export const DEFAULT_PARTNER_COMMISSION_PERCENT = 5;

// ─── Search ───────────────────────────────────────────────────────────────────

export const SEARCH_MIN_QUERY_LENGTH = 2;
export const SEARCH_MAX_RESULTS = 50;

// ─── Rate Limiting ────────────────────────────────────────────────────────────

export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX = 100;
export const AUTH_RATE_LIMIT_MAX = 10; // stricter for login/OTP endpoints
