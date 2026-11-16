import { Info, LockKeyhole, Monitor, type LucideIcon } from "lucide-react";

import type { ServiceTitle } from "@/validation/services";

export type Service = {
  title: ServiceTitle;
  badge: string;
  /** The low-commitment way in: gets the accent badge and a filled button. */
  recommended: boolean;
  /** Length and format, e.g. "1 session · 60 minutes". */
  format: string;
  description: string;
  includes: string[];
  bestFor: string;
  /** "book" opens the booking form for this service; "contact" jumps to the contact details. */
  cta: { label: string; action: "book" | "contact" };
};

export type BookingDetails = {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  description: string;
};

export type HeroTrustItem = {
  icon: LucideIcon;
  text: string;
};

export type Pillar = {
  title: string;
  text: string;
};

export type Step = {
  title: string;
  text: string;
};

export const sectionLinks = {
  about: { id: "about", label: "About" },
  who: { id: "who", label: "Who this is for" },
  services: { id: "services", label: "Services" },
  approach: { id: "approach", label: "Approach" },
  testimonials: { id: "testimonials", label: "Testimonials" },
  faq: { id: "faq", label: "FAQ" },
  book: { id: "book", label: "Book" },
  contact: { id: "contact", label: "Contact" },
} as const;

export const bookCta = "Book a clarity call";

export const contactDetails = {
  email: "kamohelomariti98@yahoo.com",
  phoneHref: "tel:+27724567891",
  phoneLabel: "+27 72 456 7891",
};

export const heroContent = {
  eyebrow: "Wellness coaching",
  titleStart: "You hold it all together.",
  titleEmphasis: "Let’s help you feel at peace inside, too.",
  intro: "Life can be overwhelming. Whether you're feeling stressed, anxious, burned out or facing a big life change, you don't have to figure everything out on your own.",
  secondaryCta: "Compare services",
  trustLabel: "At a glance",
  imageAlt: "Kamohelo, founder of The Becoming, smiling at her desk",
};

export const heroTrustItems: HeroTrustItem[] = [
  { icon: Monitor, text: "Online" },
  { icon: LockKeyhole, text: "Private and confidential" },
  { icon: Info, text: "Coaching, not therapy" },
];

export const whoContent = {
  eyebrow: "Who this is for",
  title: "For the season when carrying everything alone no longer works.",
  intro:
    "You may not be in full collapse. You may simply know that the way you’ve been holding everything isn’t sustainable. Does any of this sound familiar?",
  closingStart: "If you nodded at even one of these,",
  closingLink: "a clarity call is a good place to start",
  statements: [
    "I feel deeply burnt out.",
    "My mind never stops racing.",
    "I’m navigating a major life change.",
    "I need stronger boundaries.",
    "I feel disconnected from myself.",
    "I want to grow, but I feel stuck.",
  ],
};

export const aboutContent = {
  eyebrow: "Meet Kamohelo",
  titleStart: "Emotional safety",
  titleEmphasis: "and",
  titleEnd: "real direction.",
  imageAlt: "Kamohelo, founder of The Becoming",
  paragraphs: [
    "The Becoming exists for people who look functional on the outside but feel overwhelmed, tired, anxious or disconnected on the inside. The work combines coaching, somatic awareness, emotional reflection, practical boundaries and grounded next steps.",
    "It’s meant to help you understand yourself more clearly — not perform progress.",
  ],
};

export const pillars: Pillar[] = [
  {
    title: "Private & confidential",
    text: "Honest processing without performance.",
  },
  {
    title: "Structured support",
    text: "Clear frameworks and thoughtful pacing.",
  },
  {
    title: "Somatic-informed",
    text: "Practical tools for stress and recovery.",
  },
];

export const servicesContent = {
  eyebrow: "Ways to work together",
  title: "Choose the format that fits your season.",
  aside:
    "Not sure which one? Book a clarity call and Kamohelo will recommend the right fit.",
  bestForLabel: "Best for:",
};

// The low-commitment option comes first, so it is the first one people compare.
export const services: Service[] = [
  {
    title: "Wellness Conversation",
    badge: "Start here",
    recommended: true,
    format: "1 session · 60 minutes",
    description:
      "Immediate clarity, grounding and a direction for what’s next.",
    includes: [
      "Immediate grounding plan",
      "Personal clarity map",
      "Post-session practices",
      "Recommended next step",
    ],
    bestFor: "decision anxiety, current stress",
    cta: { label: "Book this session", action: "book" },
  },
  {
    title: "Individual Coaching",
    badge: "Most in-depth",
    recommended: false,
    format: "12 weeks · weekly 60-min sessions",
    description:
      "Private coaching for burnout, anxiety, identity shifts and boundaries.",
    includes: [
      "Personal growth roadmap",
      "Somatic regulation tools",
      "Between-session support",
      "Reflection prompts",
    ],
    bestFor: "burnout, anxiety, major transitions",
    cta: { label: "Enquire about coaching", action: "book" },
  },
  {
    title: "Group Coaching",
    badge: "Small group",
    recommended: false,
    format: "8 weeks · weekly guided circle",
    description: "A facilitated space for healing, reflection and shared growth.",
    includes: [
      "Weekly group sessions",
      "Guided reflections",
      "Small group format",
      "Peer support circle",
    ],
    bestFor: "community, self-trust, relational healing",
    cta: { label: "Join the next circle", action: "book" },
  },
  {
    title: "Corporate Wellness",
    badge: "For teams",
    recommended: false,
    format: "Custom · workshop or retainer",
    description: "For teams navigating stress, burnout and workplace pressure.",
    includes: [
      "Team workshops",
      "Leadership support",
      "Stress regulation tools",
      "Custom engagement plan",
    ],
    bestFor: "teams, executives, burnout prevention",
    cta: { label: "Request a proposal", action: "contact" },
  },
];

export const approachContent = {
  eyebrow: "Kamo’s approach",
  title: "Held with steadiness. Made practical.",
  intro: "Each session should feel safe, useful and easy to carry into daily life.",
  principles: [
    {
      title: "Trauma-informed pacing",
      text: "Sessions move at a speed that protects emotional safety, never forcing disclosure or breakthroughs.",
    },
    {
      title: "Body-based regulation",
      text: "Somatic grounding tools help you notice stress patterns and feel more settled in real time.",
    },
    {
      title: "Practical integration",
      text: "Every conversation ends with clear next steps, reflection prompts or boundary practices.",
    },
    {
      title: "Collaborative clarity",
      text: "Kamo doesn’t perform insight at you. The work helps you hear yourself and act from there.",
    },
  ],
};

export const beginContent = {
  title: "You don’t need the right words to begin.",
  stepLabel: "Step",
  steps: [
    {
      title: "Request a clarity call",
      text: "Tell us briefly where you are. You don’t need it all figured out.",
    },
    {
      title: "Have a low-pressure conversation",
      text: "Share what you’re navigating, online or in Johannesburg.",
    },
    {
      title: "Get your recommended path",
      text: "Kamohelo follows up with the format that best fits your season.",
    },
  ] satisfies Step[],
};

export const faqContent = {
  eyebrow: "FAQ",
  title: "Common questions.",
  asideStart: "Something else on your mind?",
  asideLink: "Get in touch directly.",
  items: [
    {
      question: "What happens during the first consultation?",
      answer:
        "A low-pressure conversation where you explain what you’re navigating and Kamohelo helps identify the best support path.",
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
      question: "What if I don’t know where to start?",
      answer:
        "That’s exactly what the clarity call is for. You don’t need to arrive with everything figured out.",
    },
  ],
};

export const finalCtaContent = {
  title: "Ready when you are.",
  text: "Request a clarity call and Kamohelo will follow up with the best next step for you.",
  contactLabel: "Prefer to ask first?",
};

export const footerContent = {
  notice: "The Becoming by Kamohelo. Coaching and wellness support, not therapy.",
  navLabel: "Footer",
};

/** The general "not sure yet" option. The booking form starts on it. */
export const clarityConsultationService = "Free Clarity Consultation Request";

export const serviceOptions = [
  { label: clarityConsultationService, value: clarityConsultationService },
  ...services.map((service) => ({ label: service.title, value: service.title })),
];
