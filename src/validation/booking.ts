import { z } from "zod";

import type { ServiceTitle } from "./services.js";

// The browser and the server both import this file, so it uses relative
// imports only (no "@/" alias).

const corporateService: ServiceTitle = "Corporate Wellness";

// The message is passed to z.string() as well, so a field that is missing
// entirely gets the same friendly message as one left empty.
const text = (message: string) => z.string({ error: message }).trim();
const requiredText = (message: string) => text(message).min(1, message);

// Only the fields the corporate rules read. Those rules use it to check that
// these three fields are usable before running.
const corporateFields = z.object({
  service: z.string(),
  companyName: z.string(),
  jobTitle: z.string(),
});

export const bookingSchema = z
  .object({
    service: requiredText("Choose the service you want to discuss."),
    date: requiredText("Select your preferred date."),
    time: requiredText("Choose a one-hour slot."),
    name: text("Enter your full name.").min(2, "Enter your full name."),
    email: text("Enter a valid email address.").pipe(
      z.email("Enter a valid email address."),
    ),
    phone: text("Enter a valid 10-digit South African phone number.").refine(
      (phone) => phone.replace(/\D/g, "").length === 10,
      "Enter a valid 10-digit South African phone number.",
    ),
    companyName: z.string().trim().default(""),
    jobTitle: z.string().trim().default(""),
    description: z.string().trim().default(""),
  })
  // By default Zod skips these checks while any other field is wrong. `when`
  // makes them run anyway, so the company and role errors show at the same
  // time as the rest instead of appearing only after everything else is fixed.
  .refine(
    (booking) =>
      booking.service !== corporateService || booking.companyName.length >= 2,
    {
      path: ["companyName"],
      error: "Enter the company or organisation name.",
      when: (payload) => corporateFields.safeParse(payload.value).success,
    },
  )
  .refine(
    (booking) =>
      booking.service !== corporateService || booking.jobTitle.length >= 2,
    {
      path: ["jobTitle"],
      error: "Enter your role or job title.",
      when: (payload) => corporateFields.safeParse(payload.value).success,
    },
  );

/** A booking after it passes the rules, with spaces trimmed. */
export type ValidBooking = z.output<typeof bookingSchema>;
