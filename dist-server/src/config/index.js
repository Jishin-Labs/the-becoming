import dotenv from "dotenv";
dotenv.config();
export const config = {
    mail: {
        host: process.env.MAIL_HOST ?? "127.0.0.1",
        port: Number(process.env.MAIL_PORT ?? 1025),
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        fromEmail: process.env.MAIL_FROM,
        toEmail: process.env.MAIL_TO,
    },
    api: {
        port: Number(process.env.API_PORT ?? 8787),
    },
};
