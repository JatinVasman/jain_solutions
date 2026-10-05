export declare enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    OPERATIONS = "OPERATIONS",
    CATALOGUE_MANAGER = "CATALOGUE_MANAGER",
    FINANCE = "FINANCE",
    HR = "HR",
    SUPPORT = "SUPPORT",
    CUSTOMER = "CUSTOMER",
    OWNER = "OWNER",
    PARTNER = "PARTNER",
    FREELANCER = "FREELANCER",
    JOB_SEEKER = "JOB_SEEKER"
}
export declare enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    PENDING_VERIFICATION = "PENDING_VERIFICATION",
    DELETED = "DELETED"
}
export declare enum AuthMethod {
    EMAIL_PASSWORD = "EMAIL_PASSWORD",
    PHONE_OTP = "PHONE_OTP",
    GOOGLE_OAUTH = "GOOGLE_OAUTH"
}
export declare enum RentalStatus {
    DRAFT = "DRAFT",
    REQUESTED = "REQUESTED",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PAYMENT_PENDING = "PAYMENT_PENDING",
    PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
    PREPARING = "PREPARING",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    ACTIVE = "ACTIVE",
    RETURN_INITIATED = "RETURN_INITIATED",
    RETURNED = "RETURNED",
    INSPECTED = "INSPECTED",
    CLOSED = "CLOSED",
    DISPUTED = "DISPUTED",
    CANCELLED = "CANCELLED"
}
export declare enum DeliveryType {
    DELIVERY = "DELIVERY",
    PICKUP = "PICKUP"
}
export declare enum RentalDurationType {
    HOURLY = "HOURLY",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY"
}
export declare enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    COMPLETED = "COMPLETED"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    INITIATED = "INITIATED",
    CAPTURED = "CAPTURED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED"
}
export declare enum PaymentGateway {
    RAZORPAY = "RAZORPAY",
    STRIPE = "STRIPE"
}
export declare enum ProductStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ARCHIVED = "ARCHIVED"
}
export declare enum SpecificationType {
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    SELECT = "SELECT",
    MULTI_SELECT = "MULTI_SELECT"
}
export declare enum InventoryStatus {
    AVAILABLE = "AVAILABLE",
    RENTED = "RENTED",
    UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
    DAMAGED = "DAMAGED",
    RETIRED = "RETIRED"
}
export declare enum OfficeType {
    OFFICE = "OFFICE",
    WAREHOUSE = "WAREHOUSE",
    PICKUP_POINT = "PICKUP_POINT",
    SERVICE_CENTER = "SERVICE_CENTER"
}
export declare enum NotificationChannel {
    EMAIL = "EMAIL",
    SMS = "SMS",
    WHATSAPP = "WHATSAPP",
    PUSH = "PUSH",
    IN_APP = "IN_APP"
}
export declare enum NotificationStatus {
    PENDING = "PENDING",
    SENT = "SENT",
    FAILED = "FAILED",
    READ = "READ"
}
export declare enum JobType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    FREELANCE = "FREELANCE",
    INTERNSHIP = "INTERNSHIP"
}
export declare enum ApplicationStatus {
    SUBMITTED = "SUBMITTED",
    UNDER_REVIEW = "UNDER_REVIEW",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED",
    HIRED = "HIRED",
    WITHDRAWN = "WITHDRAWN"
}
export declare enum ReferralType {
    CUSTOMER = "CUSTOMER",
    PRODUCT = "PRODUCT",
    BUSINESS = "BUSINESS"
}
export declare enum ReferralStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REWARDED = "REWARDED",
    REJECTED = "REJECTED"
}
export declare enum FileCategory {
    PRODUCT_IMAGE = "PRODUCT_IMAGE",
    USER_AVATAR = "USER_AVATAR",
    IDENTITY_DOCUMENT = "IDENTITY_DOCUMENT",
    RESUME = "RESUME",
    INVOICE = "INVOICE",
    CONTRACT = "CONTRACT",
    DAMAGE_PHOTO = "DAMAGE_PHOTO"
}
//# sourceMappingURL=enums.d.ts.map