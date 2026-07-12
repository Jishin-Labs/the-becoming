import type { IncomingMessage, ServerResponse } from "node:http";

import { config } from "../config/index.js";
import { createEmailClient } from "../email/emailClient.js";

export type BookingRequestBody = {
  service?: string;
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  jobTitle?: string;
  description?: string;
};

type RequestWithBody = IncomingMessage & {
  body?: unknown;
};

function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: Record<string, unknown>,
) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

function validateBooking(body: BookingRequestBody) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = (body.phone ?? "").replace(/\D/g, "");
  const isCorporateRequest = body.service?.trim() === "Corporate Wellness";

  if (!body.service?.trim()) {
    return "Choose the service the client wants to discuss.";
  }
  if (!body.date) {
    return "Preferred date is required.";
  }
  if (!body.time) {
    return "Preferred time is required.";
  }
  if (!body.name?.trim() || body.name.trim().length < 2) {
    return "A valid name is required.";
  }
  if (!body.email?.trim() || !emailPattern.test(body.email.trim())) {
    return "A valid email address is required.";
  }
  if (phoneDigits.length !== 10) {
    return "A valid 10-digit South African phone number is required.";
  }
  if (isCorporateRequest && (!body.companyName?.trim() || body.companyName.trim().length < 2)) {
    return "Company or organisation name is required for corporate wellness requests.";
  }
  if (isCorporateRequest && (!body.jobTitle?.trim() || body.jobTitle.trim().length < 2)) {
    return "Your role or job title is required for corporate wellness requests.";
  }

  return null;
}

async function readJsonBody(request: RequestWithBody) {
  if (request.body && typeof request.body === "object") {
    return request.body as BookingRequestBody;
  }

  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {} as BookingRequestBody;
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as BookingRequestBody;
}

export async function handleConsultationRequest(
  request: RequestWithBody,
  response: ServerResponse,
) {
  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.end();
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const validationError = validateBooking(body);

    if (validationError) {
      sendJson(response, 400, { error: validationError });
      return;
    }

    const to = config.mail.toEmail ?? config.mail.user;

    if (!to) {
      sendJson(response, 500, {
        error: "MAIL_TO or MAIL_USER must be configured on the server.",
      });
      return;
    }

    const emailClient = createEmailClient({
      host: config.mail.host,
      port: config.mail.port,
      user: config.mail.user,
      password: config.mail.password,
      fromEmail: config.mail.fromEmail,
    });

    await emailClient.sendMail({
      to,
      replyTo: body.email,
      subject: `New consultation request: ${body.service}`,
      data: {
        name: body.name!.trim(),
        email: body.email!.trim(),
        phone: body.phone!.trim(),
        service: body.service!.trim(),
        companyName: body.companyName?.trim() || undefined,
        jobTitle: body.jobTitle?.trim() || undefined,
        preferredDate: body.date!,
        preferredTime: body.time!,
        sentAt: new Date(),
        notes: body.description?.trim() || undefined,
      },
    });

    sendJson(response, 200, { ok: true });
  } catch (error) {
    sendJson(response, 500, {
      error:
        error instanceof Error
          ? error.message
          : "Failed to send consultation request email.",
    });
  }
}
