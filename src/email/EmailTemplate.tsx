import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  render,
  Row,
  Section,
  Text,
} from "react-email";

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
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>New consultation request from The Becoming website</Preview>
        <Container style={container}>
          <Section style={heroPanel}>
            <Text style={eyebrow}>THE BECOMING</Text>
            <Heading style={heroTitle}>New consultation request</Heading>
            <Text style={heroCopy}>
              A visitor submitted a request through the website and is waiting
              for follow-up.
            </Text>
          </Section>

          <Section style={content}>
            <Row style={boxInfos}>
              <Column>
                <Section style={summaryCard}>
                  <Text style={sectionLabel}>Request summary</Text>
                  <Heading as="h2" style={sectionTitle}>
                    {service}
                  </Heading>
                  <Text style={sectionCopy}>
                    Preferred slot: {preferredDate} at {preferredTime}
                  </Text>
                </Section>

                <Section style={detailsCard}>
                  <Text style={sectionLabel}>Contact details</Text>

                  <Row style={detailRow}>
                    <Column style={detailLabelColumn}>
                      <Text style={detailLabel}>Name</Text>
                    </Column>
                    <Column>
                      <Text style={detailValue}>{name}</Text>
                    </Column>
                  </Row>

                  <Row style={detailRow}>
                    <Column style={detailLabelColumn}>
                      <Text style={detailLabel}>Email</Text>
                    </Column>
                    <Column>
                      <Text style={detailValue}>{email}</Text>
                    </Column>
                  </Row>

                  <Row style={detailRow}>
                    <Column style={detailLabelColumn}>
                      <Text style={detailLabel}>Phone</Text>
                    </Column>
                    <Column>
                      <Text style={detailValue}>{phone}</Text>
                    </Column>
                  </Row>

                  {companyName ? (
                    <Row style={detailRow}>
                      <Column style={detailLabelColumn}>
                        <Text style={detailLabel}>Company</Text>
                      </Column>
                      <Column>
                        <Text style={detailValue}>{companyName}</Text>
                      </Column>
                    </Row>
                  ) : null}

                  {jobTitle ? (
                    <Row style={detailRow}>
                      <Column style={detailLabelColumn}>
                        <Text style={detailLabel}>Role</Text>
                      </Column>
                      <Column>
                        <Text style={detailValue}>{jobTitle}</Text>
                      </Column>
                    </Row>
                  ) : null}

                  <Row style={detailRow}>
                    <Column style={detailLabelColumn}>
                      <Text style={detailLabel}>Submitted</Text>
                    </Column>
                    <Column>
                      <Text style={detailValue}>
                        {sentAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {notes ? (
                  <Section style={notesCard}>
                    <Text style={sectionLabel}>Description</Text>
                    <Text style={notesText}>{notes}</Text>
                  </Section>
                ) : null}
              </Column>
            </Row>
          </Section>

          <Text style={footer}>
            © {new Date().getFullYear()} The Becoming
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function renderEmail(props: ConsultationRequestEmailProps) {
  return render(<ConsultationRequestEmail {...props} />);
}

const main = {
  backgroundColor: "#f6efe6",
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
  backgroundColor: "#4a3e39",
  borderRadius: "28px",
  padding: "32px 32px 28px",
  textAlign: "center" as const,
  boxShadow: "0 18px 40px rgba(74, 62, 57, 0.14)",
};

const eyebrow = {
  color: "#eadfd3",
  fontSize: "11px",
  letterSpacing: "0.28em",
  margin: "0 0 14px",
};

const heroTitle = {
  color: "#fffdf9",
  fontSize: "32px",
  lineHeight: "38px",
  fontWeight: "600",
  margin: "0",
};

const heroCopy = {
  color: "#eadfd3",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "16px 0 0",
};

const content = {
  backgroundColor: "#fffdf9",
  border: "1px solid #eadfd3",
  borderRadius: "28px",
  overflow: "hidden",
  marginTop: "18px",
  boxShadow: "0 12px 32px rgba(74, 62, 57, 0.08)",
};

const boxInfos = {
  padding: "28px",
};

const summaryCard = {
  backgroundColor: "#fcf6ee",
  border: "1px solid #eadfd3",
  borderRadius: "22px",
  padding: "22px 22px 18px",
};

const detailsCard = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0e6da",
  borderRadius: "22px",
  padding: "22px",
  marginTop: "18px",
};

const notesCard = {
  backgroundColor: "#faf6ef",
  border: "1px solid #eadfd3",
  borderRadius: "22px",
  padding: "22px",
  marginTop: "18px",
};

const sectionLabel = {
  color: "#a98961",
  fontSize: "11px",
  letterSpacing: "0.24em",
  textTransform: "uppercase" as const,
  margin: "0 0 10px",
};

const sectionTitle = {
  color: "#2a2421",
  fontSize: "26px",
  lineHeight: "32px",
  fontWeight: "600",
  margin: "0",
};

const sectionCopy = {
  color: "#6e5d53",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "12px 0 0",
};

const detailRow = {
  borderBottom: "1px solid #f1e7dc",
};

const detailLabelColumn = {
  width: "145px",
  verticalAlign: "top" as const,
};

const detailLabel = {
  color: "#8c7a6b",
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: "600",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  margin: "0",
  padding: "12px 0",
};

const detailValue = {
  color: "#4a3e39",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "0",
  padding: "12px 0",
};

const notesText = {
  color: "#4a3e39",
  fontSize: "15px",
  lineHeight: "25px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  textAlign: "center" as const,
  fontSize: "12px",
  color: "#8c7a6b",
  margin: "18px 0 0",
};
