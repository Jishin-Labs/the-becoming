/**
 * Moments & Experiences content.
 *
 * To add real media, put files under `public/moments/<experience-id>/` and set
 * `src` (photos), or `src` + `poster` (reels) to their paths, e.g.
 * `/moments/sip-paint-connect/photo-01.jpg`. Anything without a `src` renders
 * as a labelled placeholder tile.
 *
 * Bracketed text like "[Event date]" is placeholder copy to replace.
 */

import { contactDetails } from "@/components/landing/content";

/** How many grid cells a photo covers: wide = 2 columns, tall = 2 rows, large = both. */
export type PhotoLayout = "standard" | "wide" | "tall" | "large";

export type MomentPhoto = {
  src?: string;
  alt: string;
  layout?: PhotoLayout;
};

export type MomentReel = {
  /** A portrait (9:16) video file. */
  src?: string;
  /** Still image shown before the reel plays. */
  poster?: string;
  caption?: string;
  /** Display length, e.g. "0:42". */
  duration?: string;
};

export type PastExperience = {
  id: string;
  title: string;
  date: string;
  venue: string;
  photos: MomentPhoto[];
  reels: MomentReel[];
};

export type UpcomingExperience = {
  id: string;
  title: string;
  /** Large date badge, e.g. "14". */
  day: string;
  /** Small date badge line, e.g. "Dec". */
  month: string;
  time: string;
  venue: string;
  price: string;
  description: string;
  image?: string;
};

const sipPaintPhoto = (
  file: string,
  alt: string,
  layout?: PhotoLayout,
): MomentPhoto => ({ src: `/sip-and-paint/${file}.jpeg`, alt, layout });

/** Most recent experience first: it becomes the page's default gallery. */
export const pastExperiences: PastExperience[] = [
  {
    id: "sip-paint-connect",
    title: "Sip, Paint & Connect",
    date: "31st October 2026",
    venue: "Germiston Lake",
    // Listed in display order; the first photo is also the highlights cover.
    photos: [
      sipPaintPhoto("photo-15", "Guests gathered in a circle on the lawn around their finished paintings", "large"),
      sipPaintPhoto("photo-01", "A woman in a pink dress speaks into a microphone"),
      sipPaintPhoto("photo-02", "A guest concentrates on her painting at the table"),
      sipPaintPhoto("photo-06", "Guests painting together at a long table under the trees"),
      sipPaintPhoto("photo-12", "Colourful finished paintings laid out on the grass", "large"),
      sipPaintPhoto("photo-13", "Guests at work on their canvases, paints and gift bags on the table"),
      sipPaintPhoto("photo-14", "A guest adds detail to her painting"),
      sipPaintPhoto("photo-08", "A guest in white stands beside The Becoming banner", "tall"),
      sipPaintPhoto("photo-22", "Two guests hold up their finished paintings"),
      sipPaintPhoto("photo-05", "Three women pose together in front of The Becoming banner"),
      sipPaintPhoto("photo-10", "Three friends smile together by the lake"),
      sipPaintPhoto("photo-03", "A woman in a pink dress addresses the group with a microphone"),
      sipPaintPhoto("photo-09", "Four women pose together, smiling in sunglasses"),
      sipPaintPhoto("photo-16", "Two women laugh together in front of the banner"),
      sipPaintPhoto("photo-23", "A group of guests in pink and white pose together"),
      sipPaintPhoto("photo-24", "Two women pose side by side in front of the banner"),
      sipPaintPhoto("photo-25", "Two guests in pink pose together"),
      sipPaintPhoto("photo-26", "Two women smile together beside The Becoming banner"),
      sipPaintPhoto("photo-07", "Two women pose together in front of the banner"),
      sipPaintPhoto("photo-19", "A guest shares her painting while speaking into a microphone"),
      sipPaintPhoto("photo-04", "Guests seated at the painting table on the lawn"),
      sipPaintPhoto("photo-11", "Two guests look through their gift bags"),
      sipPaintPhoto("photo-17", "Guests chatting around the table between paintings"),
      sipPaintPhoto("photo-18", "Guests laughing together at the table"),
      sipPaintPhoto("photo-21", "Two guests share a moment at the table"),
      sipPaintPhoto("photo-20", "The Becoming flag on the lawn by the lake"),
    ],
    reels: [],
  },
];

/** Leave empty when nothing is announced; the page shows a "coming soon" note. */
export const upcomingExperiences: UpcomingExperience[] = [
  {
    id: "next-experience",
    title: "[Experience name]",
    day: "[DD]",
    month: "[Month]",
    time: "[Time]",
    venue: "[Venue, City]",
    price: "[Price]",
    description:
      "[Two or three lines on what guests can expect: the activity, the atmosphere, what's included.]",
  },
];

export const contactEmail = contactDetails.email;

const placeholderTones = [
  "var(--color-line-strong)",
  "var(--color-line-bold)",
  "var(--color-bronze-soft)",
  "var(--color-sand-deep)",
  "var(--color-on-dark-muted)",
  "var(--color-line)",
];

export function placeholderTone(index: number) {
  return placeholderTones[index % placeholderTones.length];
}

export function mediaCount(experience: PastExperience) {
  const photos = experience.photos.length;
  const reels = experience.reels.length;
  return [
    photos > 0 && `${photos} ${photos === 1 ? "photo" : "photos"}`,
    reels > 0 && `${reels} ${reels === 1 ? "reel" : "reels"}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function padNumber(value: number) {
  return String(value).padStart(2, "0");
}
