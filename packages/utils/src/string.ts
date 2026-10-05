/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a SCREAMING_SNAKE_CASE enum value to a human-readable label.
 * Example: "PAYMENT_CONFIRMED" → "Payment Confirmed"
 */
export function enumToLabel(value: string): string {
  return value
    .split('_')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Truncates a string to a max length, appending an ellipsis if needed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Generates a random alphanumeric string of the given length.
 * Useful for reference numbers, etc.
 */
export function randomAlphanumeric(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
