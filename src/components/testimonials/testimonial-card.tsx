import { useEffect, useId, useRef, useState } from "react";

import {
  type Testimonial,
  testimonialsContent,
} from "@/components/testimonials/content";
import { cn } from "@/lib/utils";

const copy = testimonialsContent.card;
const dayInMs = 24 * 60 * 60 * 1000;
const monthYear = new Intl.DateTimeFormat("en-ZA", {
  month: "long",
  year: "numeric",
});

/** "Today", "3 days ago", or "October 2026" for anything a week or older. */
function relativeDate(iso: string, now: number) {
  const date = new Date(iso);
  const days = Math.floor((now - date.getTime()) / dayInMs);

  if (days < 1) {
    return copy.today;
  }
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
  return monthYear.format(date);
}

/** First letter of the first two words: "Thandi M." becomes "TM". */
function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => Array.from(word)[0] ?? "")
    .join("")
    .toUpperCase();
}

/**
 * Colours for each background the card can sit on. "light" is the
 * /testimonials page; "dark" is the espresso Stories section on the home page.
 */
const tones = {
  light: {
    card: "border-line bg-white shadow-card hover:border-line-strong hover:shadow-card-hover before:text-sand",
    featured: "bg-linear-160 from-paper to-cream",
    badge: "border-line bg-cream text-bronze",
    quote: "text-ink",
    toggle: "text-bronze hover:text-espresso focus-visible:outline-bronze",
    caption: "border-line",
    name: "text-ink",
    date: "text-meta",
  },
  dark: {
    card: "border-transparent bg-espresso hover:border-espresso-soft before:text-espresso-soft",
    featured: "",
    badge: "border-white/15 bg-white/5 text-on-dark-muted",
    quote: "text-cream",
    toggle: "text-on-dark-muted hover:text-cream focus-visible:outline-on-dark-muted",
    caption: "border-meta",
    name: "text-cream",
    date: "text-on-dark-muted",
  },
};

export type TestimonialCardTone = keyof typeof tones;

/** Line breaks in a story start a new paragraph. */
function paragraphs(message: string) {
  return message
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function TestimonialCard({
  testimonial,
  animationDelayMs,
  tone = "light",
}: {
  testimonial: Testimonial;
  animationDelayMs: number;
  tone?: TestimonialCardTone;
}) {
  const colours = tones[tone];
  const quoteId = useId();
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  // Read once, so the relative date does not change between renders.
  const [now] = useState(Date.now);

  // Long stories are cut to six lines. The "Read full story" button only shows
  // when the cut actually hides text, which depends on the card's width and on
  // the fonts having loaded, so it is measured again whenever either changes.
  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote || expanded) {
      return;
    }

    const measure = () => {
      setOverflows(quote.scrollHeight > quote.clientHeight + 2);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(quote);
    void document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <figure
      style={{ animationDelay: `${animationDelayMs}ms` }}
      className={cn(
        "relative flex flex-col rounded-card border px-[30px] pt-[34px] pb-[26px] transition-[transform,box-shadow,border-color] duration-300 ease-out animate-rise hover:-translate-y-1 motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[600px]:px-[22px] max-[600px]:pt-[28px] max-[600px]:pb-[22px]",
        // The large decorative opening quote mark in the top corner.
        "before:pointer-events-none before:absolute before:top-1.5 before:right-[22px] before:font-heading before:text-[120px] before:leading-none before:content-['“']",
        colours.card,
        testimonial.featured && colours.featured,
      )}
    >
      {testimonial.service ? (
        <span
          className={cn(
            "relative mb-5 self-start rounded-full border px-[11px] py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
            colours.badge,
          )}
        >
          {testimonial.service}
        </span>
      ) : null}

      <blockquote
        id={quoteId}
        ref={quoteRef}
        className={cn(
          "relative font-heading [&>p+p]:mt-3",
          colours.quote,
          testimonial.featured
            ? "text-[23px] leading-[1.55] italic max-[600px]:text-[19px]"
            : "text-[19px] leading-[1.65] max-[600px]:text-[17px]",
          !expanded && "line-clamp-6",
        )}
      >
        {paragraphs(testimonial.message).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </blockquote>

      {overflows || expanded ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={quoteId}
          onClick={() => setExpanded((value) => !value)}
          className={cn(
            "relative mt-3 self-start border-b border-current pb-0.5 text-[13px] font-semibold tracking-[0.04em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-3",
            colours.toggle,
          )}
        >
          {expanded ? copy.showLess : copy.readMore}
        </button>
      ) : null}

      <figcaption
        className={cn(
          "mt-[26px] flex items-center gap-3.5 border-t pt-5",
          colours.caption,
        )}
      >
        <span
          aria-hidden="true"
          className="grid size-11.5 flex-none place-items-center rounded-full bg-linear-135 from-sand to-sand-deep font-heading text-[17px] text-espresso"
        >
          {initials(testimonial.name)}
        </span>
        <span className="min-w-0">
          <span
            className={cn(
              "block break-words text-[15px] font-semibold",
              colours.name,
            )}
          >
            {testimonial.name}
          </span>
          <time
            dateTime={testimonial.createdAt}
            className={cn("mt-[3px] block text-[13px]", colours.date)}
          >
            {relativeDate(testimonial.createdAt, now)}
          </time>
        </span>
      </figcaption>
    </figure>
  );
}
