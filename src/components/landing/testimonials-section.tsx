import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { sectionLinks } from "@/components/landing/content";
import { SectionLabel } from "@/components/landing/sections";
import {
  container,
  pillOutlineOnDark,
  sectionSpacing,
  sectionTitle,
} from "@/components/landing/styles";
import { Link } from "@/components/link";
import { testimonialsContent } from "@/components/testimonials/content";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { TestimonialDialog } from "@/components/testimonials/testimonial-dialog";
import { TestimonialInviteCard } from "@/components/testimonials/testimonial-invite-card";
import { useTestimonials } from "@/hooks/use-testimonials";
import { pagePaths } from "@/lib/router";
import { cn } from "@/lib/utils";

// Two stories and the share card fill one row. The rest are on /testimonials.
const previewSize = 2;

/**
 * The home page Stories section. With no stories yet it shows only the share
 * card, so the page never shows an empty or placeholder story.
 */
export function TestimonialsSection() {
  const [shareOpen, setShareOpen] = useState(false);
  const { state, addTestimonial } = useTestimonials(previewSize);
  const copy = testimonialsContent.section;
  const id = sectionLinks.testimonials.id;
  const titleId = `${id}-title`;
  const openShare = () => setShareOpen(true);

  const noStoriesYet =
    state.status === "ready" && state.testimonials.length === 0;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="bg-espresso-deep text-cream"
    >
      <div className={cn(container, sectionSpacing, "flex flex-col gap-11")}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[40rem] flex-col gap-3.5">
            <SectionLabel onDark>{copy.label}</SectionLabel>
            <h2 id={titleId} className={sectionTitle}>
              {copy.heading}
            </h2>
          </div>
          {noStoriesYet ? null : (
            <Link
              href={pagePaths.testimonials}
              className={cn(pillOutlineOnDark, "h-12 px-5.5 text-[15px]")}
            >
              {copy.readAll}
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>

        {state.status === "ready" ? (
          <div
            className={cn(
              noStoriesYet
                ? "mx-auto w-full max-w-md"
                : "grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4.5",
            )}
          >
            {state.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                animationDelayMs={index * 60}
                tone="dark"
              />
            ))}
            <TestimonialInviteCard onShare={openShare} first={noStoriesYet} />
          </div>
        ) : (
          <p
            role="status"
            className="mx-auto max-w-xl rounded-[1.5rem] border border-dashed border-white/20 px-6 py-8 text-center text-sm leading-7 text-on-dark"
          >
            {state.status === "loading"
              ? testimonialsContent.loading
              : testimonialsContent.loadError}
          </p>
        )}
      </div>

      <TestimonialDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        onSubmit={addTestimonial}
      />
    </section>
  );
}
