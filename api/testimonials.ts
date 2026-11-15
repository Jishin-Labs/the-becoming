import type { IncomingMessage, ServerResponse } from "node:http";

import { handleTestimonials } from "../src/server/testimonials.js";

export default async function handler(
  request: IncomingMessage & { body?: unknown },
  response: ServerResponse,
) {
  await handleTestimonials(request, response);
}
