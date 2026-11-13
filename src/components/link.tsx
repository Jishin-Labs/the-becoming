import type { ComponentProps, MouseEvent } from "react";

import { navigate } from "@/lib/router";

/** An anchor that switches pages without a full reload. */
export function Link({ href, onClick, ...props }: ComponentProps<"a"> & { href: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    if (navigate(href)) {
      event.preventDefault();
    }
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
