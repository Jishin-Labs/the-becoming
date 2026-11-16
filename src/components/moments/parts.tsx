import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Small uppercase label above headings. */
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
        "text-xs font-semibold uppercase tracking-[0.3em] text-bronze",
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
    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
      {children}
    </span>
  );
}
