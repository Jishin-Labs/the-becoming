import { Heart } from "lucide-react";

import { testimonialsContent } from "@/components/testimonials/content";
import { ShareStoryButton } from "@/components/testimonials/testimonial-dialog";

const copy = testimonialsContent.invite;

export function TestimonialInviteCard({
  onShare,
  first = false,
}: {
  onShare: () => void;
  first?: boolean;
}) {
  return (
    <aside className="flex flex-col items-center gap-3.5 rounded-card border-[1.5px] border-dashed border-line-strong bg-cream px-[30px] py-[38px] text-center">
      <span
        aria-hidden="true"
        className="grid size-[52px] place-items-center rounded-full border border-line bg-white text-bronze"
      >
        <Heart size={22} strokeWidth={1.6} />
      </span>
      <h3 className="font-heading text-2xl font-normal text-balance text-ink">
        {first ? copy.firstHeading : copy.heading}
      </h3>
      <p className="max-w-[260px] text-[15px] leading-[1.6] text-ink-soft">
        {copy.text}
      </p>
      <div className="mt-1.5">
        <ShareStoryButton onClick={onShare} size="small" />
      </div>
    </aside>
  );
}
