import { defineConfig } from "drizzle-kit";

import { config } from "./src/config/index.js";

const url = config.database.url;

if (!url) {
  throw new Error("DATABASE_URL must be set (see .env.example).");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
});
