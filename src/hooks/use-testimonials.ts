import { useEffect, useState } from "react";

import type {
  Testimonial,
  TestimonialDraft,
  TestimonialSummary,
} from "@/components/testimonials/content";
import { readApiError, readApiResponse } from "@/lib/api";
import { firstFieldErrors } from "@/validation/field-errors";
import type { ServiceTitle } from "@/validation/services";
import {
  createdTestimonialResponseSchema,
  testimonialListResponseSchema,
  testimonialSchema,
} from "@/validation/testimonial";

export type TestimonialFieldErrors = Partial<
  Record<keyof TestimonialDraft, string>
>;

export function validateTestimonial(
  draft: TestimonialDraft,
): TestimonialFieldErrors {
  const result = testimonialSchema.safeParse(draft);
  return result.success ? {} : firstFieldErrors(result.error);
}

type ReadyList = {
  status: "ready";
  testimonials: Testimonial[];
  /** Where the next page starts, or null when everything is loaded. */
  nextCursor: string | null;
  loadingMore: boolean;
  loadMoreError: string | null;
};

export type TestimonialsState =
  | { status: "loading" }
  | { status: "error" }
  | ReadyList;

/** A filter value of null means every service. */
type ServiceFilter = ServiceTitle | null;

const endpoint = "/api/testimonials";

async function fetchTestimonialPage(options: {
  pageSize: number;
  service: ServiceFilter;
  cursor: string | null;
  signal?: AbortSignal;
}) {
  const params = new URLSearchParams({ limit: String(options.pageSize) });
  if (options.service) {
    params.set("service", options.service);
  }
  if (options.cursor) {
    params.set("cursor", options.cursor);
  }

  const response = await fetch(`${endpoint}?${params}`, {
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error(
      await readApiError(response, "Unable to load more stories."),
    );
  }
  return readApiResponse(response, testimonialListResponseSchema);
}

function readyList(testimonials: Testimonial[], nextCursor: string | null): ReadyList {
  return {
    status: "ready",
    testimonials,
    nextCursor,
    loadingMore: false,
    loadMoreError: null,
  };
}

/**
 * Puts a just-shared story where the server would list it: after the
 * featured stories, ahead of the rest.
 */
function withNewTestimonial(list: ReadyList, testimonial: Testimonial): ReadyList {
  const firstNormal = list.testimonials.findIndex((item) => !item.featured);

  if (firstNormal === -1 && list.nextCursor !== null) {
    // Every loaded story is featured and more are still to come, so the new
    // one belongs further down. "Show more" will bring it in.
    return list;
  }

  const at = firstNormal === -1 ? list.testimonials.length : firstNormal;
  return {
    ...list,
    testimonials: [
      ...list.testimonials.slice(0, at),
      testimonial,
      ...list.testimonials.slice(at),
    ],
  };
}

/**
 * Loads saved testimonials `pageSize` at a time, optionally for one service,
 * and lets visitors add their own. Featured stories come first, then newest.
 */
export function useTestimonials(pageSize: number, service: ServiceFilter = null) {
  // The list remembers which filter it was loaded for. When the filter changes,
  // the page shows "loading" straight away instead of the old filter's stories.
  const [loaded, setLoaded] = useState<{
    service: ServiceFilter;
    list: TestimonialsState;
  }>({ service, list: { status: "loading" } });
  // Kept apart from the list so the filter buttons stay put while a new
  // filter loads.
  const [summary, setSummary] = useState<TestimonialSummary | null>(null);

  const state: TestimonialsState =
    loaded.service === service ? loaded.list : { status: "loading" };

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const page = await fetchTestimonialPage({
          pageSize,
          service,
          cursor: null,
          signal: controller.signal,
        });
        setSummary(page.summary);
        setLoaded({ service, list: readyList(page.testimonials, page.nextCursor) });
      } catch (error) {
        // Leaving the page or changing the filter cancels the request. That is
        // not a failure.
        if (controller.signal.aborted) {
          return;
        }
        console.error("Could not load testimonials:", error);
        setLoaded({ service, list: { status: "error" } });
      }
    };

    void load();
    return () => controller.abort();
  }, [pageSize, service]);

  /** Adds the next page to the end of the list. */
  const loadMore = async () => {
    if (state.status !== "ready" || !state.nextCursor || state.loadingMore) {
      return;
    }

    // Only apply the result if the visitor is still on the same filter.
    const requestService = service;
    const updateList = (change: (list: ReadyList) => ReadyList) => {
      setLoaded((current) =>
        current.service === requestService && current.list.status === "ready"
          ? { service: current.service, list: change(current.list) }
          : current,
      );
    };

    updateList((list) => ({ ...list, loadingMore: true, loadMoreError: null }));

    try {
      const page = await fetchTestimonialPage({
        pageSize,
        service: requestService,
        cursor: state.nextCursor,
      });
      setSummary(page.summary);
      updateList((list) => {
        // A story shared on this visit can also turn up on a later page.
        const shown = new Set(list.testimonials.map((item) => item.id));
        return {
          ...list,
          testimonials: [
            ...list.testimonials,
            ...page.testimonials.filter((item) => !shown.has(item.id)),
          ],
          nextCursor: page.nextCursor,
          loadingMore: false,
        };
      });
    } catch (error) {
      updateList((list) => ({
        ...list,
        loadingMore: false,
        loadMoreError:
          error instanceof Error ? error.message : "Unable to load more stories.",
      }));
    }
  };

  /** Saves a testimonial. Throws with a message to show if it fails. */
  const addTestimonial = async (draft: TestimonialDraft) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      throw new Error(
        await readApiError(response, "Unable to share your story."),
      );
    }

    const { testimonial, summary: freshSummary } = await readApiResponse(
      response,
      createdTestimonialResponseSchema,
    );

    setSummary(freshSummary);
    // Show the new story without reloading the list, unless the current
    // filter hides it.
    setLoaded((current) => {
      if (current.service !== null && testimonial.service !== current.service) {
        return current;
      }
      if (current.list.status === "ready") {
        return { ...current, list: withNewTestimonial(current.list, testimonial) };
      }
      if (current.list.status === "error") {
        return { ...current, list: readyList([testimonial], null) };
      }
      return current;
    });
  };

  return { state, summary, loadMore, addTestimonial };
}
