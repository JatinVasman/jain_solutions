// =============================================================================
// CATALOGUE TYPES
// Type definitions for the product catalogue system.
// =============================================================================

import { ProductStatus, SpecificationType, InventoryStatus, RentalDurationType } from './enums.js';
import { BaseEntity } from './user.types.js';

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  parentId: string | null; // supports subcategories at the same level
}

export interface SpecificationKey extends BaseEntity {
  categoryId: string;
  name: string;
  slug: string;
  type: SpecificationType;
  unit: string | null;
  isRequired: boolean;
  isFilterable: boolean;
  sortOrder: number;
  options: string[] | null; // for SELECT and MULTI_SELECT types
}

export interface Product extends BaseEntity {
  categoryId: string;
  ownerId: string | null; // null = platform-managed product
  name: string;
  slug: string;
  description: string | null;
  status: ProductStatus;
  thumbnailUrl: string | null;
  tags: string[];
}

export interface ProductVariant extends BaseEntity {
  productId: string;
  name: string;
  sku: string | null;
  isDefault: boolean;
  isActive: boolean;
}

export interface ProductImage extends BaseEntity {
  productId: string;
  variantId: string | null;
  url: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface SpecificationValue extends BaseEntity {
  productId: string;
  specificationKeyId: string;
  value: string; // stored as string, typed by SpecificationKey.type
}

export interface PricingRule extends BaseEntity {
  variantId: string;
  durationType: RentalDurationType;
  ratePerUnit: number;
  minDuration: number;
  maxDuration: number | null;
  securityDeposit: number;
  isActive: boolean;
  effectiveFrom: Date;
  effectiveTo: Date | null;
}

export interface InventoryItem extends BaseEntity {
  variantId: string;
  officeId: string;
  serialNumber: string | null;
  assetTag: string | null;
  status: InventoryStatus;
  notes: string | null;
  purchasedAt: Date | null;
}
