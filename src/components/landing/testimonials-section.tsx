import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { sectionLinks } from "@/components/landing/content";
import { SectionLabel } from "@/components/landing/sections";
import { Link } from "@/components/link";
import { testimonialsContent } from "@/components/testimonials/content";
import {
  ShareStoryButton,
  TestimonialDialog,
} from "@/components/testimonials/testimonial-dialog";
import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { useTestimonials } from "@/hooks/use-testimonials";
import { pagePaths } from "@/lib/router";

// The home page shows only the first few. The rest are on /testimonials.
const previewSize = 6;

export function TestimonialsSection() {
  const [shareOpen, setShareOpen] = useState(false);
  const { state, addTestimonial } = useTestimonials(previewSize);
  const copy = testimonialsContent.section;
  const openShare = () => setShareOpen(true);

  return (
    <section
      id={sectionLinks.testimonials.id}
      className="px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-380">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>{testimonialsContent.label}</SectionLabel>
          <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight sm:text-4xl md:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#6e5d53] sm:text-base">
            {copy.intro}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ShareStoryButton onClick={openShare} />
            <Link
              href={pagePaths.testimonials}
              className="motion-button inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-[#4a3e39] px-7 text-sm font-medium text-[#4a3e39] transition-silk hover:-translate-y-0.5 hover:bg-[#f7efe6]"
            >
              {copy.readAll}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <TestimonialGrid state={state} onShare={openShare} />
        </div>
      </div>

      <TestimonialDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        onSubmit={addTestimonial}
      />
    </section>
  );
}
