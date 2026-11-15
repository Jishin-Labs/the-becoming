import {
  type TestimonialSummary,
  testimonialsContent,
} from "@/components/testimonials/content";
import { isServiceTitle, type ServiceTitle } from "@/validation/services";

const copy = testimonialsContent.filters;

/**
 * Service filter buttons. Shown only when stories cover two or more services.
 * `active` is null for "All".
 */
export function TestimonialFilters({
  summary,
  active,
  onChange,
}: {
  summary: TestimonialSummary | null;
  active: ServiceTitle | null;
  onChange: (service: ServiceTitle | null) => void;
}) {
  // A story saved under a service name the site no longer offers stays under
  // "All" but does not get a button of its own.
  const services = (summary?.services ?? []).flatMap(({ service, count }) =>
    isServiceTitle(service) ? [{ service, count }] : [],
  );

  if (!summary || services.length < 2) {
    return null;
  }

  const chips = [
    { key: "all", label: copy.all, value: null, count: summary.total },
    ...services.map(({ service, count }) => ({
      key: service,
      label: service,
      value: service,
      count,
    })),
  ];

  return (
    <nav
      aria-label={copy.label}
      className="mx-auto mb-11 flex max-w-[900px] flex-wrap justify-center gap-2.5"
    >
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          aria-pressed={chip.value === active}
          onClick={() => onChange(chip.value)}
          className="rounded-full border border-line bg-white px-[18px] py-[9px] text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-bronze-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze aria-pressed:border-espresso aria-pressed:bg-espresso aria-pressed:text-white"
        >
          {chip.label}
          <span className="ml-1.5 text-xs opacity-60">{chip.count}</span>
        </button>
      ))}
    </nav>
  );
}
