import { z } from "zod";

import { serviceTitles } from "./services.js";

// The browser and the server both import this file, so it uses relative
// imports only (no "@/" alias).

export const testimonialLimits = {
  name: { min: 2, max: 80 },
  message: { min: 10, max: 1000 },
} as const;

const { name, message } = testimonialLimits;

const serviceSchema = z.enum(serviceTitles);

export const testimonialSchema = z.object({
  // The message is passed to z.string() as well, so a field that is missing
  // entirely gets the same friendly message as one left empty.
  name: z
    .string({ error: "Enter your name." })
    .trim()
    .min(name.min, "Enter your name.")
    .max(name.max, `Keep your name to ${name.max} characters or fewer.`),
  message: z
    .string({ error: `Write at least ${message.min} characters.` })
    .trim()
    .min(message.min, `Write at least ${message.min} characters.`)
    .max(message.max, `Keep your story to ${message.max} characters or fewer.`),
  // Optional. The form sends "" when no service is picked; it is saved as null.
  service: z
    .union([serviceSchema, z.literal("")], {
      error: "Choose one of the services listed.",
    })
    .optional()
    .transform((value) => value || null),
});

/** A testimonial after it passes the rules, with spaces trimmed. */
export type ValidTestimonial = z.output<typeof testimonialSchema>;

/** A saved testimonial, as the API sends it to the browser. */
export const savedTestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  message: z.string(),
  service: z.string().nullable(),
  featured: z.boolean(),
  createdAt: z.iso.datetime(),
});

/**
 * Counts for the filter buttons. `total` includes stories with no service.
 * `services` is in the order each service first appears in the list.
 */
export const testimonialSummarySchema = z.object({
  total: z.number().int(),
  services: z.array(z.object({ service: z.string(), count: z.number().int() })),
});

/** One page of testimonials. `nextCursor` is null on the last page. */
export const testimonialListResponseSchema = z.object({
  testimonials: z.array(savedTestimonialSchema),
  nextCursor: z.string().nullable(),
  summary: testimonialSummarySchema,
});

export const createdTestimonialResponseSchema = z.object({
  testimonial: savedTestimonialSchema,
  summary: testimonialSummarySchema,
});
