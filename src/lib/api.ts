import { z } from "zod";

// Replies from our own API still arrive over the network, and they are not
// always what the code expects. A host error page, a timeout, or a deploy
// halfway through can send back HTML or a different shape. These helpers check
// the reply before the page uses it.

const apiErrorSchema = z.object({ error: z.string() });

/** The message from a failed API reply, or `fallback` if there is none. */
export async function readApiError(response: Response, fallback: string) {
  const body: unknown = await response.json().catch(() => undefined);
  const result = apiErrorSchema.safeParse(body);
  return result.success ? result.data.error : fallback;
}

/** Reads a successful API reply. Throws if it is not the expected shape. */
export async function readApiResponse<Schema extends z.ZodType>(
  response: Response,
  schema: Schema,
): Promise<z.output<Schema>> {
  const body: unknown = await response.json().catch(() => undefined);
  const result = schema.safeParse(body);

  if (!result.success) {
    console.error("Unexpected API reply:", response.url, result.error);
    throw new Error(
      "The server sent a reply we could not read. Please refresh the page and try again.",
    );
  }

  return result.data;
}
