import { z } from "zod";

/** Turns a Zod error into one message per form field, for showing under each input. */
export function firstFieldErrors<Fields>(
  error: z.ZodError<Fields>,
): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  const { fieldErrors } = z.flattenError(error);

  for (const field of Object.keys(fieldErrors) as Array<keyof Fields>) {
    const [message] = fieldErrors[field] ?? [];
    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}
