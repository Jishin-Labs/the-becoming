import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/moments/parts";
import { testimonialsContent } from "@/components/testimonials/content";
import {
  ShareStoryButton,
  TestimonialDialog,
} from "@/components/testimonials/testimonial-dialog";
import { TestimonialFilters } from "@/components/testimonials/testimonial-filters";
import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/use-testimonials";
import type { ServiceTitle } from "@/validation/services";

const pageSize = 12;

/** Every testimonial, featured first and then newest, a page at a time. */
export function TestimonialsPage() {
  const [service, setService] = useState<ServiceTitle | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const { state, summary, loadMore, addTestimonial } = useTestimonials(
    pageSize,
    service,
  );
  const copy = testimonialsContent.page;
  const ready = state.status === "ready" ? state : null;

  const noStoriesYet = ready?.testimonials.length === 0;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = copy.documentTitle;
    return () => {
      document.title = previousTitle;
    };
  }, [copy.documentTitle]);

  const openShare = () => setShareOpen(true);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="animate-glow-pulse absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-sand-deep blur-3xl sm:h-[460px] sm:w-[460px]" />
        <div className="relative mx-auto flex max-w-3xl animate-fade-up-soft flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-24">
          <Eyebrow>{testimonialsContent.label}</Eyebrow>
          <h1 className="mt-5 font-heading text-[2.5rem] font-light leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            {copy.titleStart}{" "}
            <em className="text-bronze">{copy.titleEmphasis}</em>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-ink-soft sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            {copy.intro}
          </p>
          <div className="mt-8">
            {noStoriesYet ? null : <ShareStoryButton onClick={openShare} />}
          </div>
        </div>
      </section>

      {/* No glow of its own here: the header's glow already reaches this far. */}
      <section className="px-4 pb-[120px] sm:px-6">
        <TestimonialFilters
          summary={summary}
          active={service}
          onChange={setService}
        />

        <TestimonialGrid state={state} onShare={openShare} />

        {ready && (ready.nextCursor !== null || ready.loadMoreError) ? (
          <div className="mt-10 flex flex-col items-center gap-3">
            {ready.nextCursor !== null ? (
              <Button
                variant="outline"
                onClick={() => void loadMore()}
                disabled={ready.loadingMore}
                className="motion-button h-12 rounded-full border-espresso px-7 text-espresso transition-silk hover:-translate-y-0.5 hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze"
              >
                {ready.loadingMore ? copy.loadingMore : copy.showMore}
              </Button>
            ) : null}
            {ready.loadMoreError ? (
              <p role="alert" className="text-sm text-error">
                {ready.loadMoreError}
              </p>
            ) : null}
          </div>
        ) : null}
      </section>

      <TestimonialDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        onSubmit={addTestimonial}
      />
    </>
  );
}
