/**
 * Generates a URL-safe slug from any string.
 * Example: "Honda Generator 3kVA!" → "honda-generator-3kva"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Appends a short unique suffix to a slug to avoid collisions.
 * Example: "honda-generator" → "honda-generator-a3f2"
 */
export function uniqueSlug(base: string, id: string): string {
  const suffix = id.slice(-4).toLowerCase();
  return `${slugify(base)}-${suffix}`;
}
