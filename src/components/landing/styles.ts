// Layout and button styles shared by the home page sections. Sizes come from
// the redesign handoff (HANDOFF.md, section 4).

/** Page width: 1240px at most, with 16px side padding on phones and 32px from sm up. */
export const container = "mx-auto w-full max-w-380 px-4 sm:px-8";

/** Vertical padding for a full-width section. */
export const sectionSpacing = "py-16 md:py-24";

export const sectionTitle =
  "font-heading text-[clamp(2rem,3.2vw,2.9rem)] font-normal leading-[1.15] tracking-[-0.01em] text-balance";

/** Pills are 52px tall, so they are comfortable to tap. */
const pill =
  "motion-button inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-7 text-base font-medium normal-case tracking-normal transition-silk hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze [&_svg:not([class*='size-'])]:size-4";

export const pillSolid = `${pill} bg-espresso text-cream hover:bg-espresso-soft`;

export const pillOutline = `${pill} border border-line-bold bg-transparent text-ink hover:border-espresso hover:bg-sand`;

/** For dark sections. */
export const pillLight = `${pill} bg-cream text-ink hover:bg-sand`;

export const pillOutlineOnDark = `${pill} border border-on-dark-line bg-transparent text-cream hover:border-cream hover:bg-white/5`;
