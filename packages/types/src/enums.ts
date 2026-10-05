// =============================================================================
// PLATFORM-WIDE ENUMS
// Shared between frontend and backend. These are the source of truth for all
// status values, role names, and type identifiers used across the platform.
// =============================================================================

// ─── User & Auth ─────────────────────────────────────────────────────────────

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  OPERATIONS = 'OPERATIONS',
  CATALOGUE_MANAGER = 'CATALOGUE_MANAGER',
  FINANCE = 'FINANCE',
  HR = 'HR',
  SUPPORT = 'SUPPORT',
  CUSTOMER = 'CUSTOMER',
  OWNER = 'OWNER',
  PARTNER = 'PARTNER',
  FREELANCER = 'FREELANCER',
  JOB_SEEKER = 'JOB_SEEKER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  DELETED = 'DELETED',
}

export enum AuthMethod {
  EMAIL_PASSWORD = 'EMAIL_PASSWORD',
  PHONE_OTP = 'PHONE_OTP',
  GOOGLE_OAUTH = 'GOOGLE_OAUTH',
}

// ─── Rental Lifecycle ─────────────────────────────────────────────────────────

export enum RentalStatus {
  DRAFT = 'DRAFT',
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  ACTIVE = 'ACTIVE',
  RETURN_INITIATED = 'RETURN_INITIATED',
  RETURNED = 'RETURNED',
  INSPECTED = 'INSPECTED',
  CLOSED = 'CLOSED',
  DISPUTED = 'DISPUTED',
  CANCELLED = 'CANCELLED',
}

export enum DeliveryType {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}

export enum RentalDurationType {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

// ─── Order & Payment ─────────────────────────────────────────────────────────

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  CAPTURED = 'CAPTURED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum PaymentGateway {
  RAZORPAY = 'RAZORPAY',
  STRIPE = 'STRIPE',
}

// ─── Catalogue ────────────────────────────────────────────────────────────────

export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum SpecificationType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
}

export enum InventoryStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  DAMAGED = 'DAMAGED',
  RETIRED = 'RETIRED',
}

// ─── Location ─────────────────────────────────────────────────────────────────

export enum OfficeType {
  OFFICE = 'OFFICE',
  WAREHOUSE = 'WAREHOUSE',
  PICKUP_POINT = 'PICKUP_POINT',
  SERVICE_CENTER = 'SERVICE_CENTER',
}

// ─── Notifications ────────────────────────────────────────────────────────────

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  READ = 'READ',
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  FREELANCE = 'FREELANCE',
  INTERNSHIP = 'INTERNSHIP',
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED',
  WITHDRAWN = 'WITHDRAWN',
}

// ─── Referrals ────────────────────────────────────────────────────────────────

export enum ReferralType {
  CUSTOMER = 'CUSTOMER',
  PRODUCT = 'PRODUCT',
  BUSINESS = 'BUSINESS',
}

export enum ReferralStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REWARDED = 'REWARDED',
  REJECTED = 'REJECTED',
}

// ─── File Storage ─────────────────────────────────────────────────────────────

export enum FileCategory {
  PRODUCT_IMAGE = 'PRODUCT_IMAGE',
  USER_AVATAR = 'USER_AVATAR',
  IDENTITY_DOCUMENT = 'IDENTITY_DOCUMENT',
  RESUME = 'RESUME',
  INVOICE = 'INVOICE',
  CONTRACT = 'CONTRACT',
  DAMAGE_PHOTO = 'DAMAGE_PHOTO',
}
