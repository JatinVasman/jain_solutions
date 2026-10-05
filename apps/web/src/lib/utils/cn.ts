// =============================================================================
// CN UTILITY
// Combines clsx (conditional classes) with tailwind-merge (deduplication).
// Used in every component: cn('base-class', condition && 'conditional-class')
// =============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
