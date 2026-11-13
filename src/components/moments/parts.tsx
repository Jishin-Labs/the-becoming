import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Small uppercase label above headings. Uses a deeper bronze than the home
 * page's #a98961 so it stays readable (4.5:1) at this size on light grounds.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a52]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Uppercase chip laid over media tiles. */
export function MediaChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#2a2421] backdrop-blur-sm">
      {children}
    </span>
  );
}
