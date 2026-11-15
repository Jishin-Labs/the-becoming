import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { testimonialLimits } from "../../src/validation/testimonial.js";

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: testimonialLimits.name.max }).notNull(),
  message: text("message").notNull(),
  service: varchar("service", { length: 80 }),
  // Featured stories are shown first.
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
});
