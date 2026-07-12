import dotenv from "dotenv";
dotenv.config();

export const config = {
  mail: {
    host: process.env.MAIL_HOST ?? "127.0.0.1",
    port: Number(process.env.MAIL_PORT ?? 1025),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    fromEmail: process.env.MAIL_FROM ?? "no-reply@thebecoming.local",
    toEmail: process.env.MAIL_TO ?? "bookings@thebecoming.local",
  },
};
