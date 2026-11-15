import { testimonialsContent } from "@/components/testimonials/content";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { TestimonialInviteCard } from "@/components/testimonials/testimonial-invite-card";
import type { TestimonialsState } from "@/hooks/use-testimonials";
import { cn } from "@/lib/utils";

// With fewer cards than this, the cards sit centred in a row instead of in
// columns, so a single story is not left alone on the left.
const denseFrom = 3;

// Cards fade in one after another, 60ms apart. The count restarts every
// 12 cards, so cards added by "Show more" do not wait a long time.
const staggerMs = 60;
const staggerGroup = 12;

/**
 * The stories, followed by the invite card. Handles the loading, error,
 * empty (the invite card alone), sparse (1–2 stories) and dense (3 or more)
 * states.
 */
export function TestimonialGrid({
  state,
  onShare,
}: {
  state: TestimonialsState;
  onShare: () => void;
}) {
  return (
    // Announces new stories to screen readers when a filter changes.
    <div aria-live="polite" className="mx-auto max-w-[1180px]">
      {state.status === "ready" ? (
        <div
          className={cn(
            state.testimonials.length < denseFrom
              ? "flex flex-wrap justify-center gap-6 [&>*]:w-[min(100%,380px)]"
              : "columns-[3_340px] gap-x-6 [&>*]:mb-6 [&>*]:break-inside-avoid",
          )}
        >
          {state.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              animationDelayMs={(index % staggerGroup) * staggerMs}
            />
          ))}

          <TestimonialInviteCard
            onShare={onShare}
            first={state.testimonials.length === 0}
          />
        </div>
      ) : (
        <p
          role="status"
          className="mx-auto max-w-xl rounded-[1.5rem] border border-dashed border-[#dbc9b7] px-6 py-8 text-center text-sm leading-7 text-ink-soft"
        >
          {state.status === "loading"
            ? testimonialsContent.loading
            : testimonialsContent.loadError}
        </p>
      )}
    </div>
  );
}
