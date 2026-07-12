import nodemailer, {} from "nodemailer";
import { renderEmail, } from "./EmailTemplate.js";
import { config } from "../config/index.js";
export function createEmailClient(env) {
    const { host, port, user, password } = config.mail;
    const auth = user && password ? { user, pass: password } : undefined;
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: env.secure ?? port === 465,
        auth,
    });
    const baseSendMail = (mailOptions) => new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err instanceof Error ? err : new Error(String(err)));
            }
            else {
                resolve(info);
            }
        });
    });
    return {
        sendMail: async (options) => {
            await baseSendMail({
                from: `"The Becoming Website" <${env.fromEmail ?? user}>`,
                ...options,
                html: await renderEmail(options.data),
            });
        },
    };
}
