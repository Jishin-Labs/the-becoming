import nodemailer, {
  type SentMessageInfo,
  type Transporter,
  type SendMailOptions as BaseSendMailOptions,
} from "nodemailer";
import {
  renderEmail,
  type ConsultationRequestEmailProps,
} from "./EmailTemplate.js";
import { config } from "../config/index.js";

export function createEmailClient(env: MailOptions): EmailClient {
  const { host, port, user, password } = config.mail;

  const auth = user && password ? { user, pass: password } : undefined;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: env.secure ?? port === 465,
    auth,
  });

  const baseSendMail = (mailOptions: Parameters<Transporter["sendMail"]>[0]) =>
    new Promise<SentMessageInfo>((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
        } else {
          resolve(info);
        }
      });
    });

  return {
    sendMail: async (options: SendMailOptions) => {
      await baseSendMail({
        from: `"The Becoming Website" <${env.fromEmail ?? user}>`,
        ...options,
        html: await renderEmail(options.data),
      });
    },
  };
}

export type SendMailOptions = Omit<BaseSendMailOptions, "text"> & {
  to: string;
  data: ConsultationRequestEmailProps;
};

export type EmailClient = {
  sendMail: (options: SendMailOptions) => Promise<void>;
};

type MailOptions = {
  host: string;
  port: number;
  fromEmail?: string;
  secure?: boolean;
  user?: string;
  password?: string;
};
