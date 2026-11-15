import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// A line like `MAIL_USER=` in .env sets the value to an empty string. Treat
// that the same as leaving it out, so the default (or "not set") applies.
const envValue = <Schema extends z.ZodType>(schema: Schema) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema);

const envSchema = z.object({
  DATABASE_URL: envValue(
    z
      .url({
        protocol: /^postgres(ql)?$/,
        error: "must be a postgres:// or postgresql:// connection string",
      })
      .optional(),
  ),
  MAIL_HOST: envValue(z.string().default("127.0.0.1")),
  MAIL_PORT: envValue(
    z.coerce
      .number({ error: "must be a port number" })
      .int()
      .min(1)
      .max(65535)
      .default(1025),
  ),
  MAIL_USER: envValue(z.string().optional()),
  MAIL_PASSWORD: envValue(z.string().optional()),
  MAIL_FROM: envValue(
    z.email("must be a single email address").default("no-reply@thebecoming.local"),
  ),
  // Left as plain text because nodemailer also accepts a comma-separated list.
  MAIL_TO: envValue(z.string().default("bookings@thebecoming.local")),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // Stop at start-up with a clear list, instead of failing later on the first
  // booking or testimonial with a confusing error.
  throw new Error(
    `Some server settings (.env locally, Environment Variables on Vercel) are invalid:\n${z.prettifyError(parsed.error)}`,
  );
}

const env = parsed.data;

export const config = {
  database: {
    url: env.DATABASE_URL,
  },
  mail: {
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    user: env.MAIL_USER,
    password: env.MAIL_PASSWORD,
    fromEmail: env.MAIL_FROM,
    toEmail: env.MAIL_TO,
  },
};
