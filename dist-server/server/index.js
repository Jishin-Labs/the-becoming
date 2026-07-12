import { createServer } from "node:http";
import { config } from "../src/config/index.js";
import { createEmailClient } from "../src/email/emailClient.js";
const port = config.api.port;
function sendJson(response, statusCode, body) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json",
    });
    response.end(JSON.stringify(body));
}
function validateBooking(body) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = (body.phone ?? "").replace(/\D/g, "");
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
    if (phoneDigits.length < 8) {
        return "A valid phone number is required.";
    }
    return null;
}
const emailClient = createEmailClient({
    host: config.mail.host,
    port: config.mail.port,
    user: config.mail.user,
    password: config.mail.password,
    fromEmail: config.mail.fromEmail,
});
const server = createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
        response.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        });
        response.end();
        return;
    }
    if (request.url === "/api/consultation-request" && request.method === "POST") {
        let rawBody = "";
        request.on("data", (chunk) => {
            rawBody += chunk;
        });
        request.on("end", async () => {
            try {
                const body = JSON.parse(rawBody);
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
                await emailClient.sendMail({
                    to,
                    replyTo: body.email,
                    subject: `New consultation request: ${body.service}`,
                    data: {
                        name: body.name.trim(),
                        email: body.email.trim(),
                        phone: body.phone.trim(),
                        service: body.service.trim(),
                        preferredDate: body.date,
                        preferredTime: body.time,
                        sentAt: new Date(),
                    },
                });
                sendJson(response, 200, { ok: true });
            }
            catch (error) {
                sendJson(response, 500, {
                    error: error instanceof Error
                        ? error.message
                        : "Failed to send consultation request email.",
                });
            }
        });
        return;
    }
    sendJson(response, 404, { error: "Not found." });
});
server.listen(port, () => {
    console.log(`Consultation API listening on http://localhost:${port}`);
});
