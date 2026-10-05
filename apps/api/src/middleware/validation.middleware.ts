// =============================================================================
// VALIDATION MIDDLEWARE
// Wraps Zod schema validation into reusable Express middleware.
// Usage: router.post('/login', validate(loginWithEmailSchema), handler)
// =============================================================================

import type { Request, Response, NextFunction } from 'express';
import { type ZodSchema, ZodError } from 'zod';

export type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Validates the request against a Zod schema.
 * On success: replaces req[target] with the parsed (coerced + defaults applied) value.
 * On failure: returns 422 with structured validation errors.
 */
export function validate(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const details = formatZodErrors(result.error);
      res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'The provided data is invalid.',
          details,
        },
      });
      return;
    }

    // Replace with parsed data (includes Zod defaults and coercions)
    req[target] = result.data;
    next();
  };
}

function formatZodErrors(error: ZodError): Array<{ field: string; message: string }> {
  return error.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }));
}
