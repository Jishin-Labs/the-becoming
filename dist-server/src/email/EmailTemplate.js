import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Column, Container, Head, Heading, Html, Preview, render, Row, Section, Text, } from "react-email";
function ConsultationRequestEmail({ name, email, phone, service, preferredDate, preferredTime, sentAt, notes, }) {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsxs(Body, { style: main, children: [_jsx(Preview, { children: "New consultation request from The Becoming website" }), _jsxs(Container, { children: [_jsx(Section, { style: content, children: _jsx(Row, { style: { ...boxInfos, paddingBottom: "0" }, children: _jsxs(Column, { children: [_jsx(Heading, { style: {
                                                    fontSize: 32,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                }, children: "The Becoming" }), _jsx(Heading, { as: "h2", style: {
                                                    fontSize: 24,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                }, children: "New consultation request received" }), _jsx(Text, { style: paragraph, children: "A visitor submitted a consultation request through the website." }), _jsxs(Text, { style: detail, children: [_jsx("b", { children: "Name: " }), name] }), _jsxs(Text, { style: detail, children: [_jsx("b", { children: "Email: " }), email] }), _jsxs(Text, { style: detail, children: [_jsx("b", { children: "Phone: " }), phone] }), _jsxs(Text, { style: detail, children: [_jsx("b", { children: "Requested service: " }), service] }), _jsxs(Text, { style: detail, children: [_jsx("b", { children: "Preferred date: " }), preferredDate] }), _jsxs(Text, { style: detail, children: [_jsx("b", { children: "Preferred time: " }), preferredTime] }), _jsxs(Text, { style: detail, children: [_jsx("b", { children: "Submitted on: " }), sentAt.toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })] }), notes ? (_jsxs(Text, { style: detail, children: [_jsx("b", { children: "Notes: " }), notes] })) : null] }) }) }), _jsxs(Text, { style: {
                                    textAlign: "center",
                                    fontSize: 12,
                                    color: "rgb(0,0,0, 0.7)",
                                }, children: ["\u00A9 ", new Date().getFullYear(), " | The Becoming"] })] })] })] }));
}
export function renderEmail(props) {
    return render(_jsx(ConsultationRequestEmail, { ...props }));
}
const main = {
    backgroundColor: "#fff",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const paragraph = {
    fontSize: 16,
    lineHeight: "24px",
};
const detail = {
    ...paragraph,
    marginTop: -5,
};
const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
};
const boxInfos = {
    padding: "20px",
};
