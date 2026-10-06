/**
 * Common Platform Utility Types
 */

export type Environment = 'development' | 'production' | 'test';

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'verbose';

export type Nullable<T> = T | null;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
