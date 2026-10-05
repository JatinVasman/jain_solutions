// =============================================================================
// API TYPES
// Standard request/response envelope types shared between FE and BE.
// =============================================================================

/**
 * Standard paginated query parameters accepted by list endpoints.
 */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Pagination metadata returned with list responses.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Standard successful API response envelope.
 */
export interface ApiResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

/**
 * Standard error response envelope.
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiValidationError[];
  };
}

/**
 * Validation error detail (from Zod or manual validation).
 */
export interface ApiValidationError {
  field: string;
  message: string;
}

/**
 * Generic paginated list response.
 */
export type PaginatedResponse<T> = ApiResponse<T[]> & { meta: PaginationMeta };
