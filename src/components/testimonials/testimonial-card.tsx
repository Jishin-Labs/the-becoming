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
}: {
  testimonial: Testimonial;
  animationDelayMs: number;
}) {
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
        "relative flex flex-col rounded-card border border-line bg-white px-[30px] pt-[34px] pb-[26px] shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out animate-rise hover:-translate-y-1 hover:border-[#e1d4c8] hover:shadow-card-hover motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[600px]:px-[22px] max-[600px]:pt-[28px] max-[600px]:pb-[22px]",
        // The large decorative opening quote mark in the top corner.
        "before:pointer-events-none before:absolute before:top-1.5 before:right-[22px] before:font-heading before:text-[120px] before:leading-none before:text-sand before:content-['“']",
        testimonial.featured &&
          "bg-[linear-gradient(160deg,#fffdfb_0%,var(--color-cream)_100%)]",
      )}
    >
      {testimonial.service ? (
        <span className="relative mb-5 self-start rounded-full border border-line bg-cream px-[11px] py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">
          {testimonial.service}
        </span>
      ) : null}

      <blockquote
        id={quoteId}
        ref={quoteRef}
        className={cn(
          "relative font-heading text-ink [&>p+p]:mt-3",
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
          className="relative mt-3 self-start border-b border-current pb-0.5 text-[13px] font-semibold tracking-[0.04em] text-bronze transition-colors hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze"
        >
          {expanded ? copy.showLess : copy.readMore}
        </button>
      ) : null}

      <figcaption className="mt-[26px] flex items-center gap-3.5 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="grid size-[46px] flex-none place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-sand),#e6d3c3)] font-heading text-[17px] text-espresso"
        >
          {initials(testimonial.name)}
        </span>
        <span className="min-w-0">
          <span className="block break-words text-[15px] font-semibold text-ink">
            {testimonial.name}
          </span>
          <time
            dateTime={testimonial.createdAt}
            className="mt-[3px] block text-[13px] text-meta"
          >
            {relativeDate(testimonial.createdAt, now)}
          </time>
        </span>
      </figcaption>
    </figure>
  );
}
