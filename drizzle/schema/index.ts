import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { config } from "../../src/config/index.js";
import * as schema from "./schema.js";

let db: NodePgDatabase<typeof schema> | undefined;

export function getDb() {
  if (!db) {
    if (!config.database.url) {
      throw new Error("DATABASE_URL must be configured on the server.");
    }

    const pool = new Pool({ connectionString: config.database.url });
    db = drizzle({ client: pool, schema });
  }

  return db;
}
