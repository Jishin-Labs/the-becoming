import type { IncomingMessage, ServerResponse } from "node:http";

import { handleConsultationRequest } from "../src/server/consultation-request.js";

export default async function handler(
  request: IncomingMessage & { body?: unknown },
  response: ServerResponse,
) {
  await handleConsultationRequest(request, response);
}
