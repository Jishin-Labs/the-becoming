import { Award, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  duration: string;
  cadence: string;
  description: string;
  bestFor: string[];
  includes: string[];
};

export type Testimonial = {
  name: string;
  role: string;
  cameFor: string;
  outcome: string;
  quote: string;
};

export type BookingDetails = {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
};

export type TrustItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const sectionLinks = {
  about: { id: "about", label: "About" },
  who: { id: "who-this-is-for", label: "Who this is for" },
  services: { id: "services", label: "Services" },
  approach: { id: "approach", label: "Approach" },
  testimonials: { id: "testimonials", label: "Testimonials" },
  faq: { id: "faq", label: "FAQ" },
  contact: { id: "contact", label: "Contact" },
} as const;

export const services: Service[] = [
  {
    title: "Individual Coaching",
    duration: "12 weeks",
    cadence: "Weekly 60-minute private sessions",
    description:
      "Private coaching for burnout, anxiety, identity shifts, boundaries, and emotional clarity.",
    bestFor: ["Burnout", "Anxiety", "Major transitions"],
    includes: [
      "Personal growth roadmap",
      "Somatic regulation tools",
      "Between-session support",
      "Session reflection prompts",
    ],
  },
  {
    title: "Group Coaching",
    duration: "8 weeks",
    cadence: "Weekly guided circle",
    description:
      "A small, facilitated group space for healing, reflection, emotional safety, and shared growth.",
    bestFor: ["Community", "Self-trust", "Relational healing"],
    includes: [
      "Weekly group sessions",
      "Guided reflections",
      "Small group format",
      "Peer support circle",
    ],
  },
  {
    title: "Wellness Conversation",
    duration: "Single session",
    cadence: "One 95-minute consultation",
    description:
      "A focused consultation for immediate emotional clarity, grounding, and next-step direction.",
    bestFor: ["Decision anxiety", "Current stress", "Short-term support"],
    includes: [
      "Immediate grounding plan",
      "Personal clarity map",
      "Post-session practices",
      "Recommended next-step format",
    ],
  },
  {
    title: "Corporate Wellness",
    duration: "Custom",
    cadence: "Workshop or retainer format",
    description:
      "Workshops for teams navigating stress, burnout, communication strain, and workplace pressure.",
    bestFor: ["Teams", "Executives", "Burnout prevention"],
    includes: [
      "Team workshops",
      "Leadership support",
      "Stress regulation tools",
      "Custom engagement plan",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Naledi D.",
    role: "Creative Director, Johannesburg",
    cameFor: "Burnout and boundary collapse",
    outcome: "Calmer routines and stronger personal limits",
    quote:
      "I came in exhausted and overwhelmed. The work helped me rebuild boundaries and feel calm again.",
  },
  {
    name: "Brandon M.",
    role: "Senior Consultant, Sandton",
    cameFor: "Divorce, career change, emotional instability",
    outcome: "Clearer decisions and steadier emotional regulation",
    quote:
      "The sessions helped me navigate divorce, career change, and emotional instability with clarity.",
  },
  {
    name: "Zanele K.",
    role: "Social Entrepreneur",
    cameFor: "Relational healing and self-trust",
    outcome: "More confidence in voice and decision-making",
    quote:
      "The group coaching space helped me feel seen, supported, and much more confident in my voice.",
  },
];

export const faqs = [
  {
    question: "What happens during the first consultation?",
    answer:
      "The first call is a low-pressure conversation where you explain what you are navigating and Kamohelo helps identify the best support path.",
  },
  {
    question: "Do you work online?",
    answer:
      "Yes. Sessions are available virtually, with selected in-person availability in Johannesburg.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. This is coaching and wellness support. If clinical therapy is needed, you should work with a licensed mental health professional.",
  },
  {
    question: "What if I do not know where to start?",
    answer:
      "That is exactly what the clarity consultation is for. You do not need to arrive with everything figured out.",
  },
];

export const trustItems: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: "Private and confidential",
    text: "A space for honest emotional processing without performance.",
  },
  {
    icon: Award,
    title: "Structured support",
    text: "Clear frameworks, thoughtful pacing, and grounded next steps.",
  },
  {
    icon: Sparkles,
    title: "Somatic-informed care",
    text: "Practical regulation tools for stress, overwhelm, and recovery.",
  },
];

export const approachPrinciples = [
  {
    title: "Trauma-informed pacing",
    text: "Sessions move at a speed that protects emotional safety instead of forcing disclosure or breakthrough moments.",
  },
  {
    title: "Body-based regulation",
    text: "Somatic grounding tools help you notice stress patterns, regulate your nervous system, and feel more settled in real time.",
  },
  {
    title: "Practical integration",
    text: "Every conversation ends with clear next steps, reflection prompts, or boundary practices you can use in daily life.",
  },
  {
    title: "Collaborative clarity",
    text: "Kamo does not perform insight at you. The work is designed to help you hear yourself more clearly and act from that place.",
  },
];

export const whoIHelpItems = [
  "I feel deeply burnt out.",
  "My mind never stops racing.",
  "I am navigating a major life change.",
  "I need stronger boundaries.",
  "I feel disconnected from myself.",
  "I want to grow, but I feel stuck.",
];

export const heroStats = [
  { label: "Client stories", value: "120+" },
  { label: "Average rating", value: "4.9/5" },
  { label: "Private sessions", value: "1-on-1" },
];


export const serviceOptions = [
  {
    label: "Free Clarity Consultation Request",
    value: "Free Clarity Consultation Request",
  },
  ...services.map((service) => ({ label: service.title, value: service.title })),
];

function formatHour(hour: number) {
  if (hour === 0) {
    return "12am";
  }
  if (hour < 12) {
    return `${hour}am`;
  }
  if (hour === 12) {
    return "12pm";
  }
  return `${hour - 12}pm`;
}

export const timeSlots = Array.from({ length: 10 }, (_, index) => {
  const startHour = index + 8;
  const endHour = startHour + 1;

  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
});
