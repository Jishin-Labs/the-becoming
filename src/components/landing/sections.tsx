import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";

import {
  aboutContent,
  approachContent,
  beginContent,
  bookCta,
  contactDetails,
  faqContent,
  finalCtaContent,
  footerContent,
  heroContent,
  heroTrustItems,
  pillars,
  sectionLinks,
  services,
  servicesContent,
  type Service,
  whoContent,
} from "@/components/landing/content";
import {
  container,
  pillLight,
  pillOutline,
  pillSolid,
  sectionSpacing,
  sectionTitle,
} from "@/components/landing/styles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/link";
import { type Page, pagePaths } from "@/lib/router";
import { cn } from "@/lib/utils";

type NavItem = { key: string; href: string; label: string; page?: Page };

function sectionNavItem(link: { id: string; label: string }): NavItem {
  return { key: link.id, href: `/#${link.id}`, label: link.label };
}

const primaryLinks: NavItem[] = [
  sectionNavItem(sectionLinks.about),
  sectionNavItem(sectionLinks.services),
  sectionNavItem(sectionLinks.approach),
  {
    key: "testimonials",
    href: pagePaths.testimonials,
    label: sectionLinks.testimonials.label,
    page: "testimonials",
  },
  { key: "moments", href: pagePaths.moments, label: "Moments", page: "moments" },
  sectionNavItem(sectionLinks.faq),
  sectionNavItem(sectionLinks.contact),
];

const footerLinks: NavItem[] = [
  sectionNavItem(sectionLinks.about),
  sectionNavItem(sectionLinks.services),
  sectionNavItem(sectionLinks.faq),
  sectionNavItem(sectionLinks.contact),
];

function titleId(sectionId: string) {
  return `${sectionId}-title`;
}

function BrandMark() {
  return (
    <span className="group/brand flex items-center gap-3">
      <img
        src="/logo.jpeg"
        alt=""
        className="size-11 rounded-full border border-line object-cover transition-silk group-hover/brand:scale-[1.03]"
      />
      <span className="flex flex-col leading-[1.1]">
        <span className="font-heading text-lg tracking-[0.02em] text-ink sm:text-xl">
          The Becoming
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-subtle">
          by Kamohelo
        </span>
      </span>
    </span>
  );
}

export function SectionLabel({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-[13px] font-semibold uppercase tracking-[0.2em]",
        onDark ? "text-on-dark-muted" : "text-subtle",
      )}
    >
      {children}
    </p>
  );
}

export function Navbar({
  page,
  menuOpen,
  onNavigate,
  onMenuToggle,
  onBook,
}: {
  page: Page;
  menuOpen: boolean;
  onNavigate: () => void;
  onMenuToggle: () => void;
  onBook: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-xl">
      <div
        className={cn(
          container,
          "flex h-18 items-center justify-between gap-5 sm:h-20",
        )}
      >
        <Link
          href={pagePaths.home}
          onClick={onNavigate}
          aria-label="The Becoming by Kamohelo, home"
          className="shrink-0"
        >
          <BrandMark />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={onNavigate}
              aria-current={link.page === page ? "page" : undefined}
              className="motion-link whitespace-nowrap py-2.5 text-[15px] text-ink transition-gentle hover:text-espresso-soft aria-[current=page]:text-bronze"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          onClick={onBook}
          className={cn(pillSolid, "hidden h-11 px-5.5 text-[15px] lg:inline-flex")}
        >
          {bookCta}
        </Button>

        <button
          type="button"
          onClick={onMenuToggle}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-espresso transition-silk hover:bg-sand lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "grid overflow-hidden border-t border-line bg-cream transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav
            aria-label="Mobile"
            className={cn(
              container,
              "flex flex-col gap-1 py-4 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
            )}
          >
            {primaryLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={onNavigate}
                aria-current={link.page === page ? "page" : undefined}
                className="flex min-h-11 items-center text-base text-ink transition-gentle hover:text-espresso-soft aria-[current=page]:text-bronze"
              >
                {link.label}
              </Link>
            ))}

            <Button onClick={onBook} className={cn(pillSolid, "mt-3 w-full")}>
              {bookCta}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section
      className={cn(
        container,
        "grid items-center gap-x-16 gap-y-8 pt-10 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pt-18 lg:pb-20",
      )}
    >
      <div className="flex animate-fade-up-soft flex-col gap-6 lg:self-end">
        <SectionLabel>{heroContent.eyebrow}</SectionLabel>
        <h1 className="font-heading text-[clamp(2.6rem,4.6vw,4.25rem)] font-normal leading-[1.06] tracking-[-0.015em] text-ink">
          {heroContent.titleStart}{" "}
          <em className="text-bronze">{heroContent.titleEmphasis}</em>
        </h1>
        <p className="max-w-2xl text-lg leading-[1.6] text-ink-soft sm:text-[19px]">
          {heroContent.intro}
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-135 animate-fade-up-soft-delay-1 pr-4 pb-4 sm:pr-7 sm:pb-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div
          aria-hidden="true"
          className="absolute inset-0 top-4 left-4 rounded-[28px] bg-sand-deep sm:top-7 sm:left-7"
        />
        <img
          src="/hero-image.jpeg"
          alt={heroContent.imageAlt}
          fetchPriority="high"
          className="relative aspect-4/5 w-full rounded-[28px] object-cover"
        />
      </div>

      <div className="flex animate-fade-up-soft-delay-1 flex-col gap-6 lg:self-start">
        <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
          <Button onClick={onBook} className={cn(pillSolid, "w-full sm:w-auto")}>
            {bookCta}
            <ArrowRight
              aria-hidden="true"
              className="transition-silk group-hover/button:translate-x-1"
            />
          </Button>
          <a
            href={`#${sectionLinks.services.id}`}
            className={cn(pillOutline, "w-full px-6 sm:w-auto")}
          >
            {heroContent.secondaryCta}
          </a>
        </div>

        <ul
          aria-label={heroContent.trustLabel}
          className="flex max-w-[36rem] flex-wrap gap-x-6.5 gap-y-2.5 border-t border-line pt-5 text-sm text-ink-soft"
        >
          {heroTrustItems.map((item) => (
            <li key={item.text} className="flex items-center gap-2">
              <item.icon
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
                className="shrink-0 text-subtle"
              />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhoSection({ onBook }: { onBook: () => void }) {
  const id = sectionLinks.who.id;

  return (
    <section id={id} aria-labelledby={titleId(id)} className="bg-sand">
      <div className={cn(container, sectionSpacing, "flex flex-col gap-11 md:py-22")}>
        <div className="flex max-w-[44rem] flex-col gap-3.5">
          <SectionLabel>{whoContent.eyebrow}</SectionLabel>
          <h2 id={titleId(id)} className={cn(sectionTitle, "text-ink")}>
            {whoContent.title}
          </h2>
          <p className="text-[17px] leading-[1.65] text-ink-soft">
            {whoContent.intro}
          </p>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {whoContent.statements.map((statement) => (
            <li
              key={statement}
              className="rounded-[18px] bg-cream px-7 py-6.5 font-heading text-[22px] leading-[1.35] text-ink italic"
            >
              “{statement}”
            </li>
          ))}
        </ul>

        <p className="text-base text-ink-soft">
          {whoContent.closingStart}{" "}
          <button
            type="button"
            onClick={onBook}
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-gentle hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
          >
            {whoContent.closingLink}
          </button>
          .
        </p>
      </div>
    </section>
  );
}

export function AboutSection() {
  const id = sectionLinks.about.id;

  return (
    <section
      id={id}
      aria-labelledby={titleId(id)}
      className={cn(container, sectionSpacing, "flex flex-wrap items-center gap-12 lg:gap-16")}
    >
      <img
        src="/about-image.jpeg"
        alt={aboutContent.imageAlt}
        loading="lazy"
        className="mx-auto aspect-[695/1000] w-full min-w-0 max-w-[440px] flex-[1_1_340px] rounded-[28px] bg-sand-deep object-cover"
      />

      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5.5">
        <SectionLabel>{aboutContent.eyebrow}</SectionLabel>
        <h2 id={titleId(id)} className={cn(sectionTitle, "text-ink")}>
          {aboutContent.titleStart}{" "}
          <em className="text-bronze">{aboutContent.titleEmphasis}</em>{" "}
          {aboutContent.titleEnd}
        </h2>
        {aboutContent.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[17px] leading-[1.7] text-ink-soft">
            {paragraph}
          </p>
        ))}

        <ul className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-5">
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="flex flex-col gap-1.5 border-t border-line-strong pt-4"
            >
              <span className="text-[15px] font-semibold text-ink">
                {pillar.title}
              </span>
              <span className="text-sm leading-[1.55] text-meta">
                {pillar.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServicesSection({
  onBook,
}: {
  onBook: (service: string) => void;
}) {
  const id = sectionLinks.services.id;

  return (
    <section
      id={id}
      aria-labelledby={titleId(id)}
      className="bg-espresso-deep text-cream"
    >
      <div className={cn(container, sectionSpacing, "flex flex-col gap-11")}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[40rem] flex-col gap-3.5">
            <SectionLabel onDark>{servicesContent.eyebrow}</SectionLabel>
            <h2 id={titleId(id)} className={sectionTitle}>
              {servicesContent.title}
            </h2>
          </div>
          <p className="max-w-[24rem] text-[15px] leading-[1.6] text-on-dark-muted">
            {servicesContent.aside}
          </p>
        </div>

        {/* Fixed column counts (1, 2, then 4) so four cards never split 3 + 1. */}
        <div className="grid gap-4.5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  onBook,
}: {
  service: Service;
  onBook: (service: string) => void;
}) {
  const ctaClassName = cn(
    service.recommended ? pillSolid : pillOutline,
    "mt-auto h-12 w-full px-5 text-[15px]",
    !service.recommended && "border-espresso",
  );

  return (
    <article className="flex flex-col gap-4.5 rounded-[22px] bg-cream px-7 py-7.5 text-ink">
      <span
        className={cn(
          "self-start rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em]",
          service.recommended ? "bg-bronze text-cream" : "bg-sand-deep text-espresso",
        )}
      >
        {service.badge}
      </span>
      <h3 className="font-heading text-[26px] font-normal leading-tight">
        {service.title}
      </h3>
      <p className="text-sm font-semibold text-meta">{service.format}</p>
      <p className="text-[15px] leading-[1.6] text-ink-soft">
        {service.description}
      </p>
      <ul className="grow list-disc pl-4.5 text-sm leading-[1.8] text-ink-soft marker:text-bronze-soft">
        {service.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="text-[13px] text-meta">
        <span className="font-semibold">{servicesContent.bestForLabel}</span>{" "}
        {service.bestFor}
      </p>

      {/* "contact" is a plain link to the contact card further down the page. */}
      {service.cta.action === "book" ? (
        <Button onClick={() => onBook(service.title)} className={ctaClassName}>
          {service.cta.label}
        </Button>
      ) : (
        <a href={`#${sectionLinks.contact.id}`} className={ctaClassName}>
          {service.cta.label}
        </a>
      )}
    </article>
  );
}

export function ApproachSection() {
  const id = sectionLinks.approach.id;

  return (
    <section
      id={id}
      aria-labelledby={titleId(id)}
      className={cn(container, sectionSpacing, "flex flex-wrap gap-14")}
    >
      <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-4">
        <SectionLabel>{approachContent.eyebrow}</SectionLabel>
        <h2 id={titleId(id)} className={cn(sectionTitle, "text-ink")}>
          {approachContent.title}
        </h2>
        <p className="text-[17px] leading-[1.65] text-ink-soft">
          {approachContent.intro}
        </p>
      </div>

      <ol className="grid min-w-0 flex-[2_1_560px] grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-x-10 gap-y-9">
        {approachContent.principles.map((principle, index) => (
          <li
            key={principle.title}
            className="flex flex-col gap-2.5 border-t border-line-strong pt-5"
          >
            <span
              aria-hidden="true"
              className="font-heading text-[28px] text-bronze italic"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold text-ink">{principle.title}</h3>
            <p className="text-[15px] leading-[1.65] text-ink-soft">
              {principle.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function BeginSection() {
  const id = "begin";

  return (
    <section aria-labelledby={titleId(id)} className="bg-sand">
      <div className={cn(container, sectionSpacing, "flex flex-col gap-10 md:py-22")}>
        <h2 id={titleId(id)} className={cn(sectionTitle, "text-ink")}>
          {beginContent.title}
        </h2>

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4.5">
          {beginContent.steps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-[20px] bg-cream p-7.5"
            >
              <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-bronze">
                {beginContent.stepLabel} {index + 1}
              </span>
              <h3 className="text-[19px] font-semibold text-ink">{step.title}</h3>
              <p className="text-[15px] leading-[1.65] text-ink-soft">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function faqValue(index: number) {
  return `faq-${index}`;
}

export function FaqSection() {
  const id = sectionLinks.faq.id;

  return (
    <section
      id={id}
      aria-labelledby={titleId(id)}
      className={cn(container, sectionSpacing, "flex flex-wrap gap-14")}
    >
      <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
        <SectionLabel>{faqContent.eyebrow}</SectionLabel>
        <h2 id={titleId(id)} className={cn(sectionTitle, "text-ink")}>
          {faqContent.title}
        </h2>
        <p className="text-base leading-[1.6] text-ink-soft">
          {faqContent.asideStart}{" "}
          <a
            href={`#${sectionLinks.contact.id}`}
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-gentle hover:decoration-ink"
          >
            {faqContent.asideLink}
          </a>
        </p>
      </div>

      {/* Only the first answer starts open. */}
      <Accordion
        defaultValue={[faqValue(0)]}
        className="min-w-0 flex-[2_1_560px] border-b border-line-strong"
      >
        {faqContent.items.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={faqValue(index)}
            className="border-t border-line-strong py-1"
          >
            {/* The handoff uses a "+" that turns into "×", so the trigger's
                built-in chevron is hidden. */}
            <AccordionTrigger className="min-h-16 items-center gap-4 py-3 text-lg font-medium text-ink hover:no-underline focus-visible:border-transparent focus-visible:ring-bronze/40 **:data-[slot=accordion-trigger-icon]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="text-[26px] font-light leading-none transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45"
              >
                +
              </span>
            </AccordionTrigger>
            <AccordionContent className="max-w-[40rem] pb-5.5 text-base leading-[1.7] text-ink-soft">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCta({ onBook }: { onBook: () => void }) {
  const id = sectionLinks.book.id;

  return (
    <section id={id} aria-labelledby={titleId(id)} className="px-4 pb-16 sm:px-8 md:pb-24">
      <div className="mx-auto flex max-w-[1176px] flex-wrap items-center justify-between gap-12 rounded-[28px] bg-espresso-deep px-6 py-12 text-cream sm:rounded-[32px] sm:px-14 sm:py-16">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <h2
            id={titleId(id)}
            className="font-heading text-[clamp(2rem,3.4vw,3rem)] font-normal leading-[1.12]"
          >
            {finalCtaContent.title}
          </h2>
          <p className="max-w-[32rem] text-[17px] leading-[1.6] text-on-dark">
            {finalCtaContent.text}
          </p>
          <div className="pt-2">
            <Button onClick={onBook} className={cn(pillLight, "w-full sm:w-auto")}>
              {bookCta}
              <ArrowRight
                aria-hidden="true"
                className="transition-silk group-hover/button:translate-x-1"
              />
            </Button>
          </div>
        </div>

        <div
          id={sectionLinks.contact.id}
          className="flex min-w-0 flex-[0_1_340px] flex-col gap-3.5 rounded-[22px] bg-espresso p-7"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-on-dark-muted">
            {finalCtaContent.contactLabel}
          </p>
          <a
            href={`mailto:${contactDetails.email}`}
            className="flex min-h-11 items-center gap-2.5 break-all text-base text-cream underline-offset-4 hover:underline"
          >
            <Mail size={18} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
            {contactDetails.email}
          </a>
          <a
            href={contactDetails.phoneHref}
            className="flex min-h-11 items-center gap-2.5 text-base text-cream underline-offset-4 hover:underline"
          >
            <Phone size={18} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
            {contactDetails.phoneLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div
        className={cn(
          container,
          "flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-meta",
        )}
      >
        <p>
          © {new Date().getFullYear()} {footerContent.notice}
        </p>
        <nav aria-label={footerContent.navLabel} className="flex flex-wrap gap-x-6">
          {footerLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="py-2.5 text-ink underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
