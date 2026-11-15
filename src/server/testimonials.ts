import type { ServerResponse } from "node:http";

import { and, desc, eq, isNotNull, sql, type SQL } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "../../drizzle/schema/index.js";
import { testimonials } from "../../drizzle/schema/schema.js";
import { serviceTitles } from "../validation/services.js";
import { testimonialSchema } from "../validation/testimonial.js";
import { readJsonBody, sendJson, type RequestWithBody } from "./http.js";

const pageSize = { default: 12, max: 50 };

// The list order: featured stories first, then newest first. The id breaks
// ties between stories saved in the same millisecond.
const listOrder = [
  desc(testimonials.featured),
  desc(testimonials.createdAt),
  desc(testimonials.id),
];

// A cursor marks the last testimonial on the page the visitor already has,
// as "<featured 1|0>~<createdAt>~<id>". The next page starts just after it.
// This is used instead of page numbers because a new testimonial would push
// everything down one place, so page 2 would repeat the last story of page 1.
const cursorSchema = z
  .string()
  .transform((value) => {
    const [featured, createdAt, id] = value.split("~");
    return { featured, createdAt, id };
  })
  .pipe(
    z.object({
      featured: z.enum(["0", "1"]).transform((value) => value === "1"),
      createdAt: z.iso.datetime(),
      id: z.uuid(),
    }),
  );

const listQuerySchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(pageSize.max)
    .default(pageSize.default),
  cursor: cursorSchema.optional(),
  service: z.enum(serviceTitles).optional(),
});

type Cursor = z.output<typeof cursorSchema>;

function encodeCursor(row: { featured: boolean; createdAt: Date; id: string }) {
  return `${row.featured ? 1 : 0}~${row.createdAt.toISOString()}~${row.id}`;
}

/** Rows that come after the cursor in `listOrder`. */
function after(cursor: Cursor) {
  // A row comparison checks the three columns in order, the same way
  // `listOrder` sorts them. Every column sorts descending, so "after" is "<".
  return sql`(${testimonials.featured}, ${testimonials.createdAt}, ${testimonials.id}) < (${cursor.featured}::boolean, ${cursor.createdAt}::timestamptz, ${cursor.id}::uuid)`;
}

const publicColumns = {
  id: testimonials.id,
  name: testimonials.name,
  message: testimonials.message,
  service: testimonials.service,
  featured: testimonials.featured,
  createdAt: testimonials.createdAt,
};

/** Counts for the filter buttons, with services in the order they first appear. */
async function getSummary() {
  const db = getDb();

  const ranked = db
    .select({
      service: testimonials.service,
      position: sql<number>`row_number() over (order by ${sql.join(listOrder, sql`, `)})`.as("position"),
    })
    .from(testimonials)
    .as("ranked");

  const [totals, services] = await Promise.all([
    db.select({ total: sql<number>`count(*)::int` }).from(testimonials),
    db
      .select({ service: ranked.service, count: sql<number>`count(*)::int` })
      .from(ranked)
      .where(isNotNull(ranked.service))
      .groupBy(ranked.service)
      .orderBy(sql`min(${ranked.position})`),
  ]);

  return {
    total: totals[0]?.total ?? 0,
    services: services.flatMap(({ service, count }) =>
      service === null ? [] : [{ service, count }],
    ),
  };
}

async function listTestimonials(request: RequestWithBody, response: ServerResponse) {
  const { searchParams } = new URL(request.url ?? "/", "http://localhost");
  const query = listQuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!query.success) {
    sendJson(response, 400, { error: "The page of testimonials asked for is not valid." });
    return;
  }

  const { limit, cursor, service } = query.data;
  const filters: SQL[] = [];
  if (service) {
    filters.push(eq(testimonials.service, service));
  }
  if (cursor) {
    filters.push(after(cursor));
  }

  // One extra row shows whether there is another page after this one.
  const [rows, summary] = await Promise.all([
    getDb()
      .select(publicColumns)
      .from(testimonials)
      .where(and(...filters))
      .orderBy(...listOrder)
      .limit(limit + 1),
    getSummary(),
  ]);

  const page = rows.slice(0, limit);
  const last = page.at(-1);
  const nextCursor = rows.length > limit && last ? encodeCursor(last) : null;

  sendJson(response, 200, { testimonials: page, nextCursor, summary });
}

async function createTestimonial(request: RequestWithBody, response: ServerResponse) {
  let body: unknown;

  try {
    body = await readJsonBody(request);
  } catch {
    sendJson(response, 400, { error: "The request body is not valid JSON." });
    return;
  }

  const result = testimonialSchema.safeParse(body);

  if (!result.success) {
    sendJson(response, 400, { error: result.error.issues[0].message });
    return;
  }

  const [created] = await getDb()
    .insert(testimonials)
    .values(result.data)
    .returning(publicColumns);

  // Fresh counts, so the filter buttons include the new story straight away.
  sendJson(response, 201, { testimonial: created, summary: await getSummary() });
}

/**
 * GET lists saved testimonials, featured first and then newest first, a page
 * at a time (`?limit=12&service=<name>&cursor=<nextCursor from the previous
 * page>`). POST saves a new one.
 */
export async function handleTestimonials(
  request: RequestWithBody,
  response: ServerResponse,
) {
  try {
    if (request.method === "GET") {
      await listTestimonials(request, response);
      return;
    }
    if (request.method === "POST") {
      await createTestimonial(request, response);
      return;
    }

    response.setHeader("Allow", "GET, POST");
    sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    // Database errors can include internal details, so they are logged for
    // us but visitors only see a general message.
    console.error("Testimonials request failed:", error);
    sendJson(response, 500, {
      error: "Something went wrong with testimonials. Please try again later.",
    });
  }
}
