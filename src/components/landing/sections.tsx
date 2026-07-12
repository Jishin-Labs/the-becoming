import { ArrowRight, Mail, Menu, Phone, Star, X } from "lucide-react";

import {
  approachPrinciples,
  faqs,
  sectionLinks,
  services,
  testimonials,
  trustItems,
  whoIHelpItems,
} from "@/components/landing/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionLinkMap = typeof sectionLinks;

const primaryLinks = [
  sectionLinks.about,
  sectionLinks.who,
  sectionLinks.services,
  sectionLinks.approach,
  sectionLinks.testimonials,
  sectionLinks.faq,
  sectionLinks.contact,
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="group/brand flex items-center gap-3">
      <img
        src="/logo.jpeg"
        alt="The Becoming logo"
        className="size-11 rounded-full border border-[#e7d9cb] object-cover shadow-sm transition-silk group-hover/brand:scale-[1.03] group-hover/brand:shadow-md sm:size-12"
      />
      <span className={cn("leading-none", compact && "hidden sm:block")}>
        <span className="block font-heading text-sm tracking-[0.22em] text-[#4a3e39] transition-gentle group-hover/brand:text-[#7a6457] sm:text-lg sm:tracking-[0.28em]">
          THE BECOMING
        </span>
        <span className="block text-[9px] uppercase tracking-[0.3em] text-[#8c7a6b] transition-gentle group-hover/brand:text-[#9a866f] sm:text-[10px] sm:tracking-[0.35em]">
          by Kamohelo
        </span>
      </span>
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a98961]">
      {children}
    </p>
  );
}

export function Navbar({
  links,
  menuOpen,
  onNavigate,
  onMenuToggle,
  onBook,
}: {
  links: SectionLinkMap;
  menuOpen: boolean;
  onNavigate: () => void;
  onMenuToggle: () => void;
  onBook: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-380 items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
        <a href="#" className="shrink-0">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {Object.values(links).map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={onNavigate}
              className="motion-link text-xs font-semibold uppercase tracking-[0.18em] text-[#6e5d53] transition-gentle hover:text-[#a98961]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={onBook}
            className="motion-button rounded-full bg-[#4a3e39] px-6 text-primary-foreground transition-silk hover:-translate-y-0.5 hover:bg-[#7a6457]"
          >
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          onClick={onMenuToggle}
          className="shrink-0 rounded-full border border-border p-2 text-[#4a3e39] transition-silk hover:rotate-90 hover:bg-[#f7efe6] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={cn(
          "grid overflow-hidden border-t border-border bg-background transition-[grid-template-rows,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav
            className={cn(
              "flex flex-col gap-5 px-4 py-5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6",
              menuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0",
            )}
          >
            {primaryLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={onNavigate}
                className="motion-link text-sm font-semibold uppercase tracking-[0.18em] text-[#4a3e39] transition-gentle hover:text-[#a98961]"
                style={{
                  transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
                }}
              >
                {link.label}
              </a>
            ))}

            <Button
              onClick={onBook}
              className={cn(
                "motion-button rounded-full bg-[#4a3e39] px-6 text-primary-foreground transition-silk hover:bg-[#7a6457]",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={{
                transitionDelay: menuOpen ? `${primaryLinks.length * 40}ms` : "0ms",
              }}
            >
              Book Consultation
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Hero({
  onBook,
  servicesHref,
}: {
  onBook: () => void;
  servicesHref: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="animate-glow-pulse absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#f2e8dc] blur-3xl sm:h-[520px] sm:w-[520px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-380 items-center gap-10 px-4 py-12 sm:min-h-[calc(100vh-5rem)] sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="order-2 animate-fade-up-soft lg:order-1">
          <h1 className="max-w-3xl font-heading text-[2.25rem] font-light leading-[1.08] tracking-tight text-[#2a2421] sm:text-5xl md:text-7xl">
            Move from burnout, anxiety, and transition into clarity and peace.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#6e5d53] sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            Somatic wellness support for high-capacity people who look composed
            on the outside but feel overextended, anxious, or disconnected on
            the inside.
          </p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-5">
            This is coaching and wellness support, not therapy. Start with a
            clarity consultation request to understand which format fits your
            season and what support makes sense next.
          </p>

          <div className="animate-fade-up-soft-delay-1 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button
              onClick={onBook}
              className="motion-button w-full rounded-full bg-[#4a3e39] px-6 text-primary-foreground transition-silk hover:-translate-y-0.5 hover:bg-[#7a6457] sm:w-auto sm:px-7"
            >
              Request Consultation
              <ArrowRight size={16} className="transition-silk group-hover/button:translate-x-1" />
            </Button>

            <a
              href={servicesHref}
              className="motion-button inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#d8cbbb] px-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#4a3e39] transition-silk hover:-translate-y-0.5 hover:border-[#4a3e39] hover:bg-[#f7efe6] sm:w-auto sm:px-7 sm:text-sm"
            >
              View Services
            </a>
          </div>
        </div>

        <div className="relative order-1 animate-fade-up-soft-delay-1 lg:order-2">
          <div>
            <img
              src="/hero-image.jpeg"
              alt="Portrait for The Becoming hero section"
              className="motion-card-media animate-drift-soft h-full w-full rounded-[1.4rem] object-cover sm:rounded-[2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="border-y border-border bg-[#faf6ef] py-12 sm:py-16">
      <div className="mx-auto grid max-w-380 gap-4 px-4 sm:px-6 md:grid-cols-3">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="motion-card motion-panel group rounded-[1.75rem] border border-[#eadfd3] bg-white p-6 transition-silk hover:shadow-md"
          >
            <item.icon
              className="mb-4 text-[#a98961] transition-silk group-hover:scale-105 group-hover:-translate-y-0.5"
              size={24}
            />
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#4a3e39]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#6e5d53]">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection({ onBook }: { onBook: () => void }) {
  return (
    <section
      id={sectionLinks.about.id}
      className="mx-auto grid max-w-380 gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
    >
      <div className="motion-card motion-panel group overflow-hidden rounded-[1.75rem] border border-border bg-[#f8f1e8] transition-silk sm:rounded-[2.5rem]">
        <img
          src="/about-image.jpeg"
          alt="About Kamohelo"
          className="motion-card-media h-full w-full rounded-[1.25rem] object-cover sm:rounded-[2rem]"
        />
      </div>

      <div className="flex flex-col justify-center">
        <SectionLabel>About Kamohelo</SectionLabel>
        <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight sm:text-4xl md:text-5xl">
          Grounded guidance for people who need both emotional safety and real
          direction.
        </h2>

        <div className="mt-6 space-y-4 text-sm leading-7 text-[#6e5d53] sm:mt-7 sm:space-y-5 sm:text-base sm:leading-8">
          <p>
            The Becoming exists for people who look functional on the outside
            but feel overwhelmed, tired, anxious, or disconnected on the inside.
          </p>
          <p>
            The work combines coaching, somatic awareness, emotional reflection,
            practical boundaries, and grounded next steps.
          </p>
          <p>
            Kamo’s credibility comes from the combination of calm presence,
            structured reflection, and practical integration. The work is meant
            to help you understand yourself more clearly, not perform progress.
          </p>
        </div>

        <div className="mt-8">
          <Button
            onClick={onBook}
            className="motion-button w-full rounded-full bg-[#4a3e39] px-7 text-primary-foreground transition-silk hover:-translate-y-0.5 hover:bg-[#7a6457] sm:w-auto"
          >
            Start with a clarity consultation
          </Button>
        </div>
      </div>
    </section>
  );
}

export function WhoIHelpSection() {
  return (
    <section
      id={sectionLinks.who.id}
      className="relative overflow-hidden bg-[#f7f1e8] py-16 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="absolute right-[-5rem] top-16 h-56 w-56 rounded-full bg-[#ead9c4] blur-3xl" />
      <div className="absolute left-[-4rem] bottom-8 h-44 w-44 rounded-full bg-[#efe1cf] blur-3xl" />

      <div className="relative mx-auto grid max-w-380 gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="motion-panel rounded-[2rem] border border-[#e5d5c5] bg-[#4a3e39] p-6 text-white shadow-[0_24px_70px_rgba(74,62,57,0.14)] sm:rounded-[2.5rem] sm:p-8">
          <SectionLabel>Who this is for</SectionLabel>
          <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight text-white sm:text-4xl md:text-5xl">
            Support for the season where carrying everything alone no longer
            works.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#eadfd3] sm:text-base sm:leading-8">
            This space is built for people who have kept functioning, coping,
            and showing up, but can feel that something underneath now needs
            care, language, and steadier support.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9c3a5]">
              What this usually sounds like
            </p>
            <p className="mt-3 text-sm leading-7 text-[#f3e8dc] sm:text-base">
              You may not be in full collapse. You may simply know that the way
              you have been holding everything is no longer sustainable.
            </p>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
          {whoIHelpItems.map((item, index) => (
            <article
              key={item}
              className={[
                "motion-card motion-panel group relative flex h-full min-h-[11rem] flex-col overflow-hidden rounded-[1.5rem] border p-5 shadow-sm transition-silk hover:-translate-y-1 hover:shadow-xl sm:rounded-[1.75rem] sm:p-6",
                index % 3 === 0
                  ? "border-[#d7c3ad] bg-[#fff8ef]"
                  : index % 3 === 1
                    ? "border-[#e5d9cd] bg-white"
                    : "border-[#d8cbbb] bg-[#f9f2e8]",
              ].join(" ")}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#c49a6c] via-[#e7d4bf] to-transparent opacity-80 transition-silk group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#dbc9b7] bg-white/80 text-xs font-semibold tracking-[0.18em] text-[#8c7a6b]">
                  0{index + 1}
                </span>
       
              </div>
              <p className="mt-8 flex-1 text-base font-medium leading-7 text-[#4a3e39] sm:text-lg">
                {item}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({
  onBook,
}: {
  onBook: (service: string) => void;
}) {
  return (
    <section
      id={sectionLinks.services.id}
      className="bg-[#faf6ef] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-380 px-4 sm:px-6">
        <div>
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight sm:text-4xl md:text-5xl">
            Choose the format that matches the support you need.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            Compare the format, pace, and support level first, then request the
            option that feels most aligned with what you are navigating now.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-2">
          {services.map((service) => (
            <Card
              key={service.title}
              className="motion-card motion-panel group rounded-[1.75rem] border border-border bg-white py-0 shadow-sm transition-silk hover:shadow-xl sm:rounded-[2rem]"
            >
              <CardHeader className="rounded-t-[1.75rem] border-b border-border bg-[#fcf8f2] px-5 py-6 sm:rounded-t-[2rem] sm:px-8 sm:py-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <CardTitle className="font-heading text-[1.75rem] font-light tracking-tight text-[#4a3e39] normal-case sm:text-3xl">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-xs uppercase tracking-[0.18em] text-[#a98961]">
                      {service.duration}
                    </CardDescription>
                  </div>
                  <div className="rounded-full border border-[#d8cbbb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6e5d53] transition-silk group-hover:border-[#bfa58a] group-hover:bg-[#fff8ef]">
                    {service.cadence}
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-[#6e5d53]">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent className="grid gap-6 px-5 py-6 sm:grid-cols-2 sm:px-8 sm:py-8">
                <ServiceList title="Best for" items={service.bestFor} />
                <ServiceList title="Includes" items={service.includes} />
              </CardContent>

              <CardFooter className="flex-col items-stretch justify-between gap-4 border-t border-border px-5 py-6 sm:px-8 md:flex-row md:items-center">
                <Button
                  onClick={() => onBook(service.title)}
                  className="motion-button w-full justify-center rounded-full bg-[#4a3e39] px-6 text-primary-foreground transition-silk hover:-translate-y-0.5 hover:bg-[#7a6457] md:w-auto"
                >
                  Book this service
                  <ArrowRight size={15} className="transition-silk group-hover/button:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApproachSection() {
  return (
    <section
      id={sectionLinks.approach.id}
      className="bg-[#4a3e39] py-16 text-white sm:py-24"
    >
      <div className="mx-auto grid max-w-380 gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
        <div>
          <SectionLabel>Kamo’s approach</SectionLabel>
          <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight text-white sm:text-4xl md:text-5xl">
            How the work is held, paced, and made practical.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#eadfd3] sm:text-base sm:leading-8">
            The work is held with emotional steadiness, body awareness, and
            practical structure so each session feels safe, useful, and easier
            to carry into daily life.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {approachPrinciples.map((principle, index) => (
            <div
              key={principle.title}
              className="motion-card rounded-[1.5rem] border border-white/15 bg-white/8 p-5 backdrop-blur-sm transition-silk hover:bg-white/10 sm:rounded-[2rem] sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9c3a5]">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-heading text-xl text-white sm:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#eadfd3]">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [featured, ...supporting] = testimonials;

  return (
    <section
      id={sectionLinks.testimonials.id}
      className="px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-380">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight sm:text-4xl md:text-5xl">
            Client stories of clarity, steadiness, and growth.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="motion-card motion-panel rounded-[1.75rem] bg-[#f4eadf] p-5 transition-silk hover:shadow-lg sm:rounded-[2rem] sm:p-8 md:rounded-[2.5rem] md:p-10">
            <h3 className="mt-4 max-w-2xl font-heading text-[1.9rem] font-light leading-tight text-[#4a3e39] sm:text-4xl">
              “{featured.quote}”
            </h3>
            <div className="mt-8 grid gap-4 border-t border-[#dbc9b7] pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c7a6b]">
                  Came for
                </p>
                <p className="mt-1 text-sm text-[#4a3e39]">
                  {featured.cameFor}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c7a6b]">
                  Outcome
                </p>
                <p className="mt-1 text-sm text-[#4a3e39]">
                  {featured.outcome}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-[#dbc9b7] pt-6">
              <p className="font-semibold text-[#4a3e39]">{featured.name}</p>
              <p className="mt-1 text-sm text-[#8c7a6b]">{featured.role}</p>
            </div>
          </article>

          <div className="grid gap-6">
            {supporting.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={cn(
                  "group motion-card motion-panel rounded-[1.75rem] border p-5 shadow-sm transition-silk hover:shadow-lg sm:rounded-[2rem] sm:p-7",
                  index === 0
                    ? "border-border bg-white"
                    : "border-[#e0d0bf] bg-[#fff8ef]",
                )}
              >
                <div className="mb-4 flex gap-1 text-[#a98961]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={15}
                      fill="currentColor"
                      className="transition-silk group-hover:scale-110"
                      style={{ transitionDelay: `${starIndex * 35}ms` }}
                    />
                  ))}
                </div>
                <p className="text-sm leading-7 text-[#6e5d53]">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6 grid gap-3 border-t border-border pt-5">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c7a6b]">
                        Came for
                      </p>
                      <p className="mt-1 text-sm text-[#4a3e39]">
                        {testimonial.cameFor}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c7a6b]">
                        Outcome
                      </p>
                      <p className="mt-1 text-sm text-[#4a3e39]">
                        {testimonial.outcome}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-[#4a3e39]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-[#8c7a6b]">
                    {testimonial.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section
      id={sectionLinks.faq.id}
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="text-center">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight sm:text-4xl md:text-5xl">
          Common questions.
        </h2>
      </div>

      <Accordion
        defaultValue={["faq-0"]}
        className="mt-10 rounded-[1.5rem] border border-border bg-white px-4 sm:mt-12 sm:rounded-[2rem] sm:px-6"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`faq-${index}`}
            className={cn(
              "border-border",
              index !== faqs.length - 1 && "border-b",
            )}
          >
            <AccordionTrigger className="py-5 text-left text-sm font-semibold text-[#4a3e39] transition-silk hover:text-[#7a6457] hover:no-underline sm:py-6 sm:text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-7 text-[#6e5d53]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section
      id={sectionLinks.contact.id}
      className="px-4 pb-16 sm:px-6 sm:pb-24"
    >
      <div className="motion-panel mx-auto max-w-6xl rounded-[1.75rem] bg-[#4a3e39] px-5 py-10 text-center text-white transition-silk hover:shadow-xl sm:rounded-[2rem] sm:px-8 sm:py-16 md:rounded-[2.5rem] md:px-16">
        <h2 className="mx-auto max-w-3xl font-heading text-[2rem] font-light tracking-tight sm:text-4xl md:text-5xl">
          You do not need to have the right words before asking for support.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#eadfd3]">
          Start with a simple clarity consultation request. You can explain
          where you are, and Kamohelo will follow up with the best next step.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={onBook}
            className="motion-button w-full rounded-full bg-white px-8 text-[#4a3e39] transition-silk hover:-translate-y-0.5 hover:bg-[#f2e8dc] sm:w-auto"
          >
            Request Consultation
            <ArrowRight size={16} className="transition-silk group-hover/button:translate-x-1" />
          </Button>
          {/* <a
            href="mailto:kamohelo@thebecoming.co.za"
            className="motion-button inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition-silk hover:-translate-y-0.5 hover:bg-white/8 sm:w-auto"
          >
            Email Kamohelo
          </a> */}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#6e5d53]">
              Somatic support, and wellness guidance for emotional clarity and
              personal growth.
            </p>
            {/* <p className="mt-5 text-xs tracking-[0.08em] text-[#8c7a6b]">
              Website by{" "}
              <a
                href="https://jishin-website.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="motion-link font-medium text-[#6e5d53] transition-gentle hover:text-[#a98961]"
              >
                Jishin Labs
              </a>
            </p> */}
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4a3e39]">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-[#6e5d53]">
              <a
                href="mailto:kamohelomariti98@yahoo.com"
                className="motion-link flex items-center gap-2 break-all transition-gentle hover:text-[#a98961] sm:break-normal"
              >
                <Mail size={15} className="text-[#a98961]" />
                kamohelomariti98@yahoo.com
              </a>
              <a
                href="tel:+27724567891"
                className="motion-link flex items-center gap-2 transition-gentle hover:text-[#a98961]"
              >
                <Phone size={15} className="text-[#a98961]" />
                +27 74 698 6276
              </a>
              <p className="pt-2 text-xs leading-6 text-[#8c7a6b]">
                Ready to begin? Request a consultation. Need to ask a question
                first? Email or call directly.
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4a3e39]">
              Links
            </h4>

            <div className="flex flex-col gap-3 text-sm text-[#6e5d53]">
              {primaryLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="motion-link transition-gentle hover:text-[#a98961]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs tracking-[0.08em] text-[#8c7a6b]">
            © {new Date().getFullYear()} The Becoming. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4a3e39]">
        {title}
      </h4>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-[#6e5d53]">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-[#a98961]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
