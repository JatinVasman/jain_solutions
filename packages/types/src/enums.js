"use strict";
// =============================================================================
// PLATFORM-WIDE ENUMS
// Shared between frontend and backend. These are the source of truth for all
// status values, role names, and type identifiers used across the platform.
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCategory = exports.ReferralStatus = exports.ReferralType = exports.ApplicationStatus = exports.JobType = exports.NotificationStatus = exports.NotificationChannel = exports.OfficeType = exports.InventoryStatus = exports.SpecificationType = exports.ProductStatus = exports.PaymentGateway = exports.PaymentStatus = exports.OrderStatus = exports.RentalDurationType = exports.DeliveryType = exports.RentalStatus = exports.AuthMethod = exports.UserStatus = exports.UserRole = void 0;
// ─── User & Auth ─────────────────────────────────────────────────────────────
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["OPERATIONS"] = "OPERATIONS";
    UserRole["CATALOGUE_MANAGER"] = "CATALOGUE_MANAGER";
    UserRole["FINANCE"] = "FINANCE";
    UserRole["HR"] = "HR";
    UserRole["SUPPORT"] = "SUPPORT";
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["OWNER"] = "OWNER";
    UserRole["PARTNER"] = "PARTNER";
    UserRole["FREELANCER"] = "FREELANCER";
    UserRole["JOB_SEEKER"] = "JOB_SEEKER";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["INACTIVE"] = "INACTIVE";
    UserStatus["SUSPENDED"] = "SUSPENDED";
    UserStatus["PENDING_VERIFICATION"] = "PENDING_VERIFICATION";
    UserStatus["DELETED"] = "DELETED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var AuthMethod;
(function (AuthMethod) {
    AuthMethod["EMAIL_PASSWORD"] = "EMAIL_PASSWORD";
    AuthMethod["PHONE_OTP"] = "PHONE_OTP";
    AuthMethod["GOOGLE_OAUTH"] = "GOOGLE_OAUTH";
})(AuthMethod || (exports.AuthMethod = AuthMethod = {}));
// ─── Rental Lifecycle ─────────────────────────────────────────────────────────
var RentalStatus;
(function (RentalStatus) {
    RentalStatus["DRAFT"] = "DRAFT";
    RentalStatus["REQUESTED"] = "REQUESTED";
    RentalStatus["APPROVED"] = "APPROVED";
    RentalStatus["REJECTED"] = "REJECTED";
    RentalStatus["PAYMENT_PENDING"] = "PAYMENT_PENDING";
    RentalStatus["PAYMENT_CONFIRMED"] = "PAYMENT_CONFIRMED";
    RentalStatus["PREPARING"] = "PREPARING";
    RentalStatus["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    RentalStatus["READY_FOR_PICKUP"] = "READY_FOR_PICKUP";
    RentalStatus["ACTIVE"] = "ACTIVE";
    RentalStatus["RETURN_INITIATED"] = "RETURN_INITIATED";
    RentalStatus["RETURNED"] = "RETURNED";
    RentalStatus["INSPECTED"] = "INSPECTED";
    RentalStatus["CLOSED"] = "CLOSED";
    RentalStatus["DISPUTED"] = "DISPUTED";
    RentalStatus["CANCELLED"] = "CANCELLED";
})(RentalStatus || (exports.RentalStatus = RentalStatus = {}));
var DeliveryType;
(function (DeliveryType) {
    DeliveryType["DELIVERY"] = "DELIVERY";
    DeliveryType["PICKUP"] = "PICKUP";
})(DeliveryType || (exports.DeliveryType = DeliveryType = {}));
var RentalDurationType;
(function (RentalDurationType) {
    RentalDurationType["HOURLY"] = "HOURLY";
    RentalDurationType["DAILY"] = "DAILY";
    RentalDurationType["WEEKLY"] = "WEEKLY";
    RentalDurationType["MONTHLY"] = "MONTHLY";
})(RentalDurationType || (exports.RentalDurationType = RentalDurationType = {}));
// ─── Order & Payment ─────────────────────────────────────────────────────────
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["REFUNDED"] = "REFUNDED";
    OrderStatus["COMPLETED"] = "COMPLETED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["INITIATED"] = "INITIATED";
    PaymentStatus["CAPTURED"] = "CAPTURED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    PaymentStatus["PARTIALLY_REFUNDED"] = "PARTIALLY_REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentGateway;
(function (PaymentGateway) {
    PaymentGateway["RAZORPAY"] = "RAZORPAY";
    PaymentGateway["STRIPE"] = "STRIPE";
})(PaymentGateway || (exports.PaymentGateway = PaymentGateway = {}));
// ─── Catalogue ────────────────────────────────────────────────────────────────
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["DRAFT"] = "DRAFT";
    ProductStatus["ACTIVE"] = "ACTIVE";
    ProductStatus["INACTIVE"] = "INACTIVE";
    ProductStatus["ARCHIVED"] = "ARCHIVED";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var SpecificationType;
(function (SpecificationType) {
    SpecificationType["TEXT"] = "TEXT";
    SpecificationType["NUMBER"] = "NUMBER";
    SpecificationType["BOOLEAN"] = "BOOLEAN";
    SpecificationType["SELECT"] = "SELECT";
    SpecificationType["MULTI_SELECT"] = "MULTI_SELECT";
})(SpecificationType || (exports.SpecificationType = SpecificationType = {}));
var InventoryStatus;
(function (InventoryStatus) {
    InventoryStatus["AVAILABLE"] = "AVAILABLE";
    InventoryStatus["RENTED"] = "RENTED";
    InventoryStatus["UNDER_MAINTENANCE"] = "UNDER_MAINTENANCE";
    InventoryStatus["DAMAGED"] = "DAMAGED";
    InventoryStatus["RETIRED"] = "RETIRED";
})(InventoryStatus || (exports.InventoryStatus = InventoryStatus = {}));
// ─── Location ─────────────────────────────────────────────────────────────────
var OfficeType;
(function (OfficeType) {
    OfficeType["OFFICE"] = "OFFICE";
    OfficeType["WAREHOUSE"] = "WAREHOUSE";
    OfficeType["PICKUP_POINT"] = "PICKUP_POINT";
    OfficeType["SERVICE_CENTER"] = "SERVICE_CENTER";
})(OfficeType || (exports.OfficeType = OfficeType = {}));
// ─── Notifications ────────────────────────────────────────────────────────────
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["EMAIL"] = "EMAIL";
    NotificationChannel["SMS"] = "SMS";
    NotificationChannel["WHATSAPP"] = "WHATSAPP";
    NotificationChannel["PUSH"] = "PUSH";
    NotificationChannel["IN_APP"] = "IN_APP";
})(NotificationChannel || (exports.NotificationChannel = NotificationChannel = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "PENDING";
    NotificationStatus["SENT"] = "SENT";
    NotificationStatus["FAILED"] = "FAILED";
    NotificationStatus["READ"] = "READ";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
// ─── Jobs ─────────────────────────────────────────────────────────────────────
var JobType;
(function (JobType) {
    JobType["FULL_TIME"] = "FULL_TIME";
    JobType["PART_TIME"] = "PART_TIME";
    JobType["FREELANCE"] = "FREELANCE";
    JobType["INTERNSHIP"] = "INTERNSHIP";
})(JobType || (exports.JobType = JobType = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["SUBMITTED"] = "SUBMITTED";
    ApplicationStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    ApplicationStatus["SHORTLISTED"] = "SHORTLISTED";
    ApplicationStatus["REJECTED"] = "REJECTED";
    ApplicationStatus["HIRED"] = "HIRED";
    ApplicationStatus["WITHDRAWN"] = "WITHDRAWN";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
// ─── Referrals ────────────────────────────────────────────────────────────────
var ReferralType;
(function (ReferralType) {
    ReferralType["CUSTOMER"] = "CUSTOMER";
    ReferralType["PRODUCT"] = "PRODUCT";
    ReferralType["BUSINESS"] = "BUSINESS";
})(ReferralType || (exports.ReferralType = ReferralType = {}));
var ReferralStatus;
(function (ReferralStatus) {
    ReferralStatus["PENDING"] = "PENDING";
    ReferralStatus["VERIFIED"] = "VERIFIED";
    ReferralStatus["REWARDED"] = "REWARDED";
    ReferralStatus["REJECTED"] = "REJECTED";
})(ReferralStatus || (exports.ReferralStatus = ReferralStatus = {}));
// ─── File Storage ─────────────────────────────────────────────────────────────
var FileCategory;
(function (FileCategory) {
    FileCategory["PRODUCT_IMAGE"] = "PRODUCT_IMAGE";
    FileCategory["USER_AVATAR"] = "USER_AVATAR";
    FileCategory["IDENTITY_DOCUMENT"] = "IDENTITY_DOCUMENT";
    FileCategory["RESUME"] = "RESUME";
    FileCategory["INVOICE"] = "INVOICE";
    FileCategory["CONTRACT"] = "CONTRACT";
    FileCategory["DAMAGE_PHOTO"] = "DAMAGE_PHOTO";
})(FileCategory || (exports.FileCategory = FileCategory = {}));
//# sourceMappingURL=enums.js.map