import type { z } from "zod";

import type {
  savedTestimonialSchema,
  testimonialSummarySchema,
} from "@/validation/testimonial";

/** A saved testimonial, as the server sends it. `createdAt` is an ISO date string. */
export type Testimonial = z.output<typeof savedTestimonialSchema>;

/** Story counts for the filter buttons. */
export type TestimonialSummary = z.output<typeof testimonialSummarySchema>;

/** What a visitor fills in on the "Share your story" form. */
export type TestimonialDraft = {
  name: string;
  message: string;
  /** One of the service names, or "" when none is picked. */
  service: string;
};

export const testimonialsContent = {
  label: "Testimonials",
  shareButton: "Share your story",
  loading: "Loading stories...",
  loadError:
    "We could not load the stories right now. Please refresh the page or try again later.",
  // The preview on the home page.
  section: {
    heading: "Client stories of clarity, steadiness, and growth.",
    intro:
      "Words from people who have walked part of their becoming with Kamo. If you have worked with us, we would love to hear your story too.",
    readAll: "Read all stories",
  },
  // The /testimonials page.
  page: {
    documentTitle: "Testimonials | The Becoming",
    titleStart: "Stories of",
    titleEmphasis: "becoming",
    intro:
      "Every story here was shared by someone who has worked with Kamo. Read what changed for them, and add your own when you are ready.",
    showMore: "Show more stories",
    loadingMore: "Loading more stories...",
  },
  card: {
    readMore: "Read full story",
    showLess: "Show less",
    today: "Today",
  },
  invite: {
    heading: "Your story could be next",
    // Used when there are no stories yet, so the card is the whole list.
    firstHeading: "Be the first to share your story",
    text: "Worked with Kamo? Share what shifted for you. It may be exactly what someone needs to read.",
  },
  filters: {
    label: "Filter testimonials",
    all: "All",
  },
  form: {
    title: "Share your story",
    description:
      "Tell others what your time with The Becoming has meant to you. Your name and message will appear on the site straight away.",
    nameLabel: "Your name",
    namePlaceholder: "For example, Naledi D.",
    serviceLabel: "Which service was it? (optional)",
    servicePlaceholder: "Choose a service",
    messageLabel: "Your story",
    messagePlaceholder:
      "What were you navigating, and what has changed for you since?",
    submit: "Share my story",
    submitting: "Sharing...",
    successTitle: "Thank you for sharing",
    close: "Close",
  },
};
