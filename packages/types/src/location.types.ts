// =============================================================================
// LOCATION TYPES
// =============================================================================

import { OfficeType } from './enums.js';
import { BaseEntity } from './user.types.js';

export interface Country extends BaseEntity {
  name: string;
  code: string; // ISO 3166-1 alpha-2 (IN, US, GB...)
  isActive: boolean;
}

export interface State extends BaseEntity {
  countryId: string;
  name: string;
  code: string;
  isActive: boolean;
}

export interface City extends BaseEntity {
  stateId: string;
  name: string;
  isActive: boolean;
  isServiceable: boolean;
}

export interface Area extends BaseEntity {
  cityId: string;
  name: string;
  pincode: string | null;
  isServiceable: boolean;
}

export interface Office extends BaseEntity {
  cityId: string;
  areaId: string | null;
  name: string;
  type: OfficeType;
  address: string;
  phone: string | null;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  isActive: boolean;
  openingHours: Record<string, string> | null;
}
