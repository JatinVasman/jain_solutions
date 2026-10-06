/**
 * Shared Platform Configuration Constants
 * Foundational values shared across web and API applications.
 */

export const PLATFORM_NAME = 'Rental Marketplace';
export const DEFAULT_API_PORT = 4000;
export const DEFAULT_API_PREFIX = 'api/v1';
export const DEFAULT_WEB_PORT = 3000;

// Pagination standard defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;

// Standard HTTP Header constants
export const HEADER_REQUEST_ID = 'x-request-id';
export const HEADER_API_VERSION = 'x-api-version';

// Environments
export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_TEST = 'test';
