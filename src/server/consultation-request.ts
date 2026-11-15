import type { ServerResponse } from "node:http";

import { config } from "../config/index.js";
import { createEmailClient } from "../email/emailClient.js";
import { bookingSchema } from "../validation/booking.js";
import { readJsonBody, sendJson, type RequestWithBody } from "./http.js";

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
    const result = bookingSchema.safeParse(await readJsonBody(request));

    if (!result.success) {
      sendJson(response, 400, { error: result.error.issues[0].message });
      return;
    }

    const booking = result.data;

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
      replyTo: booking.email,
      subject: `New consultation request: ${booking.service}`,
      data: {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        service: booking.service,
        companyName: booking.companyName || undefined,
        jobTitle: booking.jobTitle || undefined,
        preferredDate: booking.date,
        preferredTime: booking.time,
        sentAt: new Date(),
        notes: booking.description || undefined,
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
