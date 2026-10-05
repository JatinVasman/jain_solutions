// =============================================================================
// RENTAL TYPES
// Type definitions for the rental lifecycle system.
// =============================================================================

import { RentalStatus, DeliveryType, RentalDurationType, OrderStatus, PaymentStatus } from './enums.js';
import { BaseEntity } from './user.types.js';

export interface RentalRequest extends BaseEntity {
  customerId: string;
  variantId: string;
  officeId: string;
  durationType: RentalDurationType;
  duration: number;
  requestedFrom: Date;
  requestedTo: Date;
  deliveryType: DeliveryType;
  deliveryAddressId: string | null;
  notes: string | null;
  status: RentalStatus;
}

export interface Rental extends BaseEntity {
  requestId: string;
  customerId: string;
  ownerId: string | null;
  rentalNumber: string;
  status: RentalStatus;
  startDate: Date;
  endDate: Date;
  actualReturnDate: Date | null;
}

export interface RentalItem extends BaseEntity {
  rentalId: string;
  inventoryItemId: string;
  variantId: string;
}

export interface RentalDelivery extends BaseEntity {
  rentalId: string;
  type: DeliveryType;
  addressId: string | null;
  officeId: string | null;
  scheduledAt: Date | null;
  deliveredAt: Date | null;
  notes: string | null;
}

export interface RentalReturn extends BaseEntity {
  rentalId: string;
  returnedAt: Date;
  condition: 'GOOD' | 'DAMAGED' | 'MISSING_PARTS';
  notes: string | null;
  inspectedBy: string | null;
}

export interface DamageReport extends BaseEntity {
  rentalId: string;
  reportedBy: string;
  description: string;
  estimatedCharge: number | null;
  finalCharge: number | null;
  isResolved: boolean;
}

export interface Order extends BaseEntity {
  rentalId: string;
  customerId: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  deliveryCharge: number;
  securityDeposit: number;
  taxes: number;
  total: number;
  currency: string;
}

export interface Payment extends BaseEntity {
  orderId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  gatewayOrderId: string | null;
  gatewayPaymentId: string | null;
  gatewaySignature: string | null;
  failureReason: string | null;
  paidAt: Date | null;
}
