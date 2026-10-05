# Database Entities

> Status: Entity planning complete (Phase 0). Full Prisma schema defined in Phase 2.

## Core Identity Entities

| Entity | Description | Phase |
|---|---|---|
| `User` | Core identity record (email, phone, password) | 2 |
| `Role` | Named role (CUSTOMER, ADMIN, OWNER...) | 2 |
| `Permission` | Named permission (product:create...) | 2 |
| `RolePermission` | Role → Permission join | 2 |
| `UserRole` | User → Role join (users can have multiple roles) | 2 |

## User Profile Entities

| Entity | Description | Phase |
|---|---|---|
| `CustomerProfile` | Customer-specific profile data | 2 |
| `OwnerProfile` | Owner/supplier profile data | 2 |
| `PartnerProfile` | Partner profile + referral code | 2 |
| `FreelancerProfile` | Freelancer profile + skills | 2 |
| `Address` | User delivery/billing addresses | 2 |

## Location Entities

| Entity | Description | Phase |
|---|---|---|
| `Country` | Country (ISO code) | 2 |
| `State` | State/province | 2 |
| `City` | City | 2 |
| `Area` | Area/zone within a city | 2 |
| `Office` | Physical office, warehouse, or pickup point | 2 |

## Catalogue Entities

| Entity | Description | Phase |
|---|---|---|
| `Category` | Top-level product category | 4 |
| `SpecificationKey` | Category-specific spec definition | 4 |
| `Product` | Product listing | 4 |
| `ProductVariant` | Variant of a product (model, size, etc.) | 4 |
| `ProductImage` | Product or variant images | 4 |
| `SpecificationValue` | Actual spec values per product | 4 |
| `Tag` | Many-to-many product labels | 4 |

## Inventory & Pricing Entities

| Entity | Description | Phase |
|---|---|---|
| `InventoryItem` | One physical unit (serial/asset tagged) | 6 |
| `PricingRule` | Rate per duration type per variant | 6 |

## Rental Entities

| Entity | Description | Phase |
|---|---|---|
| `RentalRequest` | Initial rental request from customer | 7 |
| `Rental` | Confirmed rental (after approval) | 7 |
| `RentalItem` | Specific inventory item within a rental | 7 |
| `RentalDelivery` | Delivery or pickup details | 7 |
| `RentalReturn` | Return record with condition | 7 |
| `DamageReport` | Damage or issue report | 7 |

## Order & Payment Entities

| Entity | Description | Phase |
|---|---|---|
| `Order` | Financial order linked to a rental | 7 |
| `Payment` | Payment record | 12 |
| `Invoice` | Generated invoice | 12 |
| `Refund` | Refund record | 12 |
| `Commission` | Partner commission | 14 |
| `Payout` | Owner or partner payout | 12 |

## Job Entities

| Entity | Description | Phase |
|---|---|---|
| `JobListing` | Posted job | 15 |
| `JobApplication` | Applicant's application | 15 |
| `Resume` | Uploaded resume | 15 |

## Communication Entities

| Entity | Description | Phase |
|---|---|---|
| `Notification` | In-app notification | 16 |
| `Enquiry` | Contact/general query | 11 |
| `Referral` | Partner referral tracking | 14 |
| `AuditLog` | Audit trail (who did what, when) | 19 |

## Entity Dependency Order

Building must follow this order (each level depends on the previous):

```
Level 1 (Core):   User, Role, Permission
Level 2 (Profiles): CustomerProfile, OwnerProfile, PartnerProfile
Level 3 (Location): Country → State → City → Area → Office
Level 4 (Catalogue): Category → Product → ProductVariant → InventoryItem
Level 5 (Rental): RentalRequest → Rental → Order → Payment
Level 6 (Support): JobListing, Notification, Enquiry, AuditLog
```
