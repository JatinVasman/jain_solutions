/**
 * Formats a number as currency.
 * Default: Indian Rupees (INR).
 */
export function formatCurrency(
  amount: number,
  currency: string = 'INR',
  locale: string = 'en-IN',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Converts paise (smallest INR unit) to rupees.
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}

/**
 * Converts rupees to paise.
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}
