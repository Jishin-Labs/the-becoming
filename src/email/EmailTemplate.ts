import { createElement } from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";
import { render } from "@react-email/render";

import { emailColors, espressoShadow } from "./palette.js";

const h = createElement as (...args: unknown[]) => ReturnType<typeof createElement>;

export type ConsultationRequestEmailProps = {
  name: string;
  email: string;
  phone: string;
  service: string;
  companyName?: string;
  jobTitle?: string;
  preferredDate: string;
  preferredTime: string;
  sentAt: Date;
  notes?: string;
};

function ConsultationRequestEmail({
  name,
  email,
  phone,
  service,
  companyName,
  jobTitle,
  preferredDate,
  preferredTime,
  sentAt,
  notes,
}: ConsultationRequestEmailProps) {
  return createElement(
    Html,
    null,
    h(Head),
    h(
      Body,
      { style: main },
      h(Preview, null, "New consultation request from The Becoming website"),
      h(
        Container,
        { style: container },
        h(
          Section,
          { style: heroPanel },
          h(Text, { style: eyebrow }, "THE BECOMING"),
          h(Heading, { style: heroTitle }, "New consultation request"),
          h(
            Text,
            { style: heroCopy },
            "A visitor submitted a request through the website and is waiting for follow-up.",
          ),
        ),
        h(
          Section,
          { style: content },
          h(
            Row,
            { style: boxInfos },
            h(
              Column,
              null,
              h(
                Section,
                { style: summaryCard },
                h(Text, { style: sectionLabel }, "Request summary"),
                h(Heading, { as: "h2", style: sectionTitle }, service),
                h(
                  Text,
                  { style: sectionCopy },
                  `Preferred slot: ${preferredDate} at ${preferredTime}`,
                ),
              ),
              h(
                Section,
                { style: detailsCard },
                h(Text, { style: sectionLabel }, "Contact details"),
                detailEntry("Name", name),
                detailEntry("Email", email),
                detailEntry("Phone", phone),
                companyName ? detailEntry("Company", companyName) : null,
                jobTitle ? detailEntry("Role", jobTitle) : null,
                detailEntry(
                  "Submitted",
                  sentAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                ),
              ),
              notes
                ? h(
                    Section,
                    { style: notesCard },
                    h(Text, { style: sectionLabel }, "Description"),
                    h(Text, { style: notesText }, notes),
                  )
                : null,
            ),
          ),
        ),
        h(
          Text,
          { style: footer },
          `© ${new Date().getFullYear()} The Becoming`,
        ),
      ),
    ),
  );
}

function detailEntry(label: string, value: string) {
  return h(
    Row,
    { style: detailRow },
    h(
      Column,
      { style: detailLabelColumn },
      h(Text, { style: detailLabel }, label),
    ),
    h(
      Column,
      null,
      h(Text, { style: detailValue }, value),
    ),
  );
}

export function renderEmail(props: ConsultationRequestEmailProps) {
  return render(h(ConsultationRequestEmail, props));
}

const main = {
  backgroundColor: emailColors.sand,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  margin: "0",
  padding: "28px 12px",
};

const container = {
  margin: "0 auto",
  maxWidth: "640px",
};

const heroPanel = {
  backgroundColor: emailColors.espresso,
  borderRadius: "28px",
  padding: "32px 32px 28px",
  textAlign: "center" as const,
  boxShadow: `0 18px 40px ${espressoShadow(0.14)}`,
};

const eyebrow = {
  color: emailColors.onDark,
  fontSize: "11px",
  letterSpacing: "0.28em",
  margin: "0 0 14px",
};

const heroTitle = {
  color: emailColors.paper,
  fontSize: "32px",
  lineHeight: "38px",
  fontWeight: "600",
  margin: "0",
};

const heroCopy = {
  color: emailColors.onDark,
  fontSize: "15px",
  lineHeight: "24px",
  margin: "16px 0 0",
};

const content = {
  backgroundColor: emailColors.paper,
  border: `1px solid ${emailColors.line}`,
  borderRadius: "28px",
  overflow: "hidden",
  marginTop: "18px",
  boxShadow: `0 12px 32px ${espressoShadow(0.08)}`,
};

const boxInfos = {
  padding: "28px",
};

const summaryCard = {
  backgroundColor: emailColors.linen,
  border: `1px solid ${emailColors.line}`,
  borderRadius: "22px",
  padding: "22px 22px 18px",
};

const detailsCard = {
  backgroundColor: emailColors.white,
  border: `1px solid ${emailColors.line}`,
  borderRadius: "22px",
  padding: "22px",
  marginTop: "18px",
};

const notesCard = {
  backgroundColor: emailColors.cream,
  border: `1px solid ${emailColors.line}`,
  borderRadius: "22px",
  padding: "22px",
  marginTop: "18px",
};

const sectionLabel = {
  color: emailColors.bronze,
  fontSize: "11px",
  letterSpacing: "0.24em",
  textTransform: "uppercase" as const,
  margin: "0 0 10px",
};

const sectionTitle = {
  color: emailColors.ink,
  fontSize: "26px",
  lineHeight: "32px",
  fontWeight: "600",
  margin: "0",
};

const sectionCopy = {
  color: emailColors.inkSoft,
  fontSize: "15px",
  lineHeight: "24px",
  margin: "12px 0 0",
};

const detailRow = {
  borderBottom: `1px solid ${emailColors.line}`,
};

const detailLabelColumn = {
  width: "145px",
  verticalAlign: "top" as const,
};

const detailLabel = {
  color: emailColors.subtle,
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: "600",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  margin: "0",
  padding: "12px 0",
};

const detailValue = {
  color: emailColors.espresso,
  fontSize: "15px",
  lineHeight: "22px",
  margin: "0",
  padding: "12px 0",
};

const notesText = {
  color: emailColors.espresso,
  fontSize: "15px",
  lineHeight: "25px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  textAlign: "center" as const,
  fontSize: "12px",
  color: emailColors.subtle,
  margin: "18px 0 0",
};
