import { Heart } from "lucide-react";

import { testimonialsContent } from "@/components/testimonials/content";
import { ShareStoryButton } from "@/components/testimonials/testimonial-dialog";

const copy = testimonialsContent.invite;

/** The "Your story could be next" card. Always the last item in the grid. */
export function TestimonialInviteCard({ onShare }: { onShare: () => void }) {
  return (
    <aside className="flex flex-col items-center gap-3.5 rounded-card border-[1.5px] border-dashed border-[#dbc9b7] bg-cream/60 px-[30px] py-[38px] text-center">
      <span
        aria-hidden="true"
        className="grid size-[52px] place-items-center rounded-full border border-line bg-white text-bronze"
      >
        <Heart size={22} strokeWidth={1.6} />
      </span>
      <h3 className="font-heading text-2xl font-normal text-ink">{copy.heading}</h3>
      <p className="max-w-[260px] text-[15px] leading-[1.6] text-ink-soft">
        {copy.text}
      </p>
      <div className="mt-1.5">
        <ShareStoryButton onClick={onShare} size="small" />
      </div>
    </aside>
  );
}
