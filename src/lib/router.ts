import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const NAVIGATE_EVENT = "app:navigate";

export type Page = "home" | "moments" | "testimonials";

export const pagePaths: Record<Page, string> = {
  home: "/",
  moments: "/moments",
  testimonials: "/testimonials",
};

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

function normalisePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

/** The page for a path. Unknown paths show the home page. */
export function getPage(pathname: string): Page {
  const path = normalisePath(pathname);
  const pages = Object.keys(pagePaths) as Page[];
  return pages.find((page) => pagePaths[page] === path) ?? "home";
}

export function usePage(): Page {
  return useSyncExternalStore(subscribe, () => getPage(window.location.pathname));
}

function scrollToHash(hash: string) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (target) {
    target.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

/**
 * Client-side navigation between pages. Returns false when the browser should
 * handle the link itself (external links, or a hash jump on the current page).
 */
export function navigate(href: string): boolean {
  const url = new URL(href, window.location.href);

  if (url.origin !== window.location.origin) {
    return false;
  }

  const samePage =
    normalisePath(url.pathname) === normalisePath(window.location.pathname);

  if (samePage && url.hash) {
    return false;
  }

  if (samePage) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }

  window.history.pushState(null, "", url);
  flushSync(() => {
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
  });
  scrollToHash(url.hash);
  return true;
}
