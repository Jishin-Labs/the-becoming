import type { IncomingMessage, ServerResponse } from "node:http";

// On Vercel the request body arrives already parsed. In the Vite dev server
// it does not, so readJsonBody reads it from the raw request instead.
export type RequestWithBody = IncomingMessage & {
  body?: unknown;
};

export function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: Record<string, unknown>,
) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

/** Throws a SyntaxError when the body is not valid JSON. */
export async function readJsonBody(request: RequestWithBody): Promise<unknown> {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }

  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
