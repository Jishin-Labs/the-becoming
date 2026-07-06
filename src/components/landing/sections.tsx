import { ArrowRight, Mail, Menu, Phone, Star, X } from "lucide-react";

import {
  approachPrinciples,
  editorialQuote,
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <span className="flex items-center gap-3">
      <img
        src="/logo.jpeg"
        alt="The Becoming logo"
        className="size-11 rounded-full border border-[#e7d9cb] object-cover shadow-sm sm:size-12"
      />
      <span className={cn("leading-none", compact && "hidden sm:block")}>
        <span className="block font-heading text-sm tracking-[0.22em] text-[#4a3e39] sm:text-lg sm:tracking-[0.28em]">
          THE BECOMING
        </span>
        <span className="block text-[9px] uppercase tracking-[0.3em] text-[#8c7a6b] sm:text-[10px] sm:tracking-[0.35em]">
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
  onMenuToggle,
  onBook,
}: {
  links: SectionLinkMap;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onBook: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-380 items-center justify-between px-4 sm:px-6">
        <a href="#" className="shrink-0">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {Object.values(links).map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6e5d53] transition-gentle hover:text-[#a98961]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={onBook}
            className="rounded-full bg-[#4a3e39] px-6 text-primary-foreground transition-gentle hover:-translate-y-0.5 hover:bg-[#7a6457]"
          >
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-full border border-border p-2 text-[#4a3e39] transition-gentle hover:bg-[#f7efe6] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden animate-fade-up-soft">
          <nav className="flex flex-col gap-5">
            <a href="#" className="mb-2">
              <BrandMark />
            </a>
            {primaryLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4a3e39] transition-gentle hover:text-[#a98961]"
              >
                {link.label}
              </a>
            ))}

            <Button
              onClick={onBook}
              className="rounded-full bg-[#4a3e39] px-6 text-primary-foreground transition-gentle hover:bg-[#7a6457]"
            >
              Book Consultation
            </Button>
          </nav>
        </div>
      )}
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
      <div className="animate-glow-pulse absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#f2e8dc] blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-380 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="animate-fade-up-soft">
         

          <h1 className="max-w-3xl font-heading text-4xl font-light leading-tight tracking-tight text-[#2a2421] sm:text-5xl md:text-7xl">
            Move from burnout, anxiety, and transition into clarity and peace.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#6e5d53] md:text-lg">
            Somatic wellness support for high-capacity people who look composed
            on the outside but feel overextended, anxious, or disconnected on
            the inside.
          </p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            Begin with a clarity consultation, understand which support format
            fits your season, and leave with a clearer sense of what needs care
            next.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-up-soft-delay-1">
            <Button
              onClick={onBook}
              className="w-full rounded-full bg-[#4a3e39] px-7 text-primary-foreground transition-gentle hover:-translate-y-0.5 hover:bg-[#7a6457] sm:w-auto"
            >
              Book Consultation
              <ArrowRight size={16} />
            </Button>

            <a
              href={servicesHref}
              className="inline-flex h-10 w-full items-center justify-center rounded-full border border-[#d8cbbb] px-7 text-center text-sm font-semibold uppercase tracking-[0.12em] text-[#4a3e39] transition-gentle hover:-translate-y-0.5 hover:border-[#4a3e39] hover:bg-[#f7efe6] sm:w-auto"
            >
              View Services
            </a>
          </div>

      
        </div>

        <div className="relative animate-fade-up-soft-delay-1">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-[#f8f1e8] shadow-sm transition-gentle hover:-translate-y-1 hover:shadow-xl sm:rounded-[2.5rem]">
            <div className="flex h-full items-center justify-center p-10 text-center">
              <div>
                <div className="animate-float-soft mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white font-heading text-3xl text-[#a98961] shadow-sm">
                  KB
                </div>
                <p className="mx-auto max-w-sm font-heading text-3xl leading-tight text-[#4a3e39]">
                  Isthombe sakho
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="border-y border-border bg-[#faf6ef] py-16">
      <div className="mx-auto grid max-w-380 gap-4 px-4 sm:px-6 md:grid-cols-3">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="group rounded-[1.75rem] border border-[#eadfd3] bg-white p-6 transition-gentle hover:-translate-y-1 hover:shadow-md"
          >
            <item.icon className="mb-4 text-[#a98961] transition-gentle group-hover:scale-105" size={24} />
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#4a3e39]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#6e5d53]">
              {item.text}
            </p>
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
      className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
    >
      <div className="rounded-[2.5rem] border border-border bg-[#f8f1e8] p-8">
        <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-white text-center">
          <p className="max-w-xs font-heading text-3xl leading-tight text-[#4a3e39]">
                  Isthombe sakho
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <SectionLabel>About Kamohelo</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-light tracking-tight md:text-5xl">
          Grounded guidance for people who need both emotional safety and real direction.
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-[#6e5d53]">
          <p>
            The Becoming exists for people who look functional on the outside
            but feel overwhelmed, tired, anxious, or disconnected on the inside.
          </p>
          <p>
            The work combines coaching, somatic awareness, emotional
            reflection, practical boundaries, and grounded next steps.
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
            className="rounded-full bg-[#4a3e39] px-7 text-primary-foreground transition-gentle hover:-translate-y-0.5 hover:bg-[#7a6457]"
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
    <section id={sectionLinks.who.id} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>Who this is for</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-light tracking-tight md:text-5xl">
          Support for the season where carrying everything alone no longer
          works.
        </h2>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {whoIHelpItems.map((item) => (
          <div
            key={item}
            className="rounded-[1.75rem] border border-border bg-white p-6 text-lg font-medium text-[#4a3e39] shadow-sm transition-gentle hover:-translate-y-0.5 hover:shadow-md"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection({ onBook }: { onBook: (service: string) => void }) {
  return (
    <section id={sectionLinks.services.id} className="bg-[#faf6ef] py-20 sm:py-24">
      <div className="mx-auto max-w-380 px-4 sm:px-6">
        <div>
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-light tracking-tight md:text-5xl">
            Choose the format that matches the support you need.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            Compare the time commitment, rhythm, and intended outcome first.
            The cards are structured so a visitor can identify fit before
            reading every sentence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <Card
              key={service.title}
              className="rounded-[2rem] border border-border bg-white py-0 shadow-sm transition-gentle hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="rounded-t-[2rem] border-b border-border bg-[#fcf8f2] px-5 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle className="font-heading text-3xl font-light tracking-tight text-[#4a3e39] normal-case">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-xs uppercase tracking-[0.18em] text-[#a98961]">
                      {service.duration}
                    </CardDescription>
                  </div>
                  <div className="rounded-full border border-[#d8cbbb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6e5d53]">
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
                  className="w-full rounded-full bg-[#4a3e39] px-6 text-primary-foreground transition-gentle hover:-translate-y-0.5 hover:bg-[#7a6457] md:w-auto justify-end"
                >
                  Book this service
                  <ArrowRight size={15} />
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
    <section id={sectionLinks.approach.id} className="bg-[#4a3e39] py-24 text-white">
      <div className="mx-auto grid max-w-380 gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
        <div>
          <SectionLabel>Kamo’s approach</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-light tracking-tight text-white md:text-5xl">
            How the work is held, paced, and made practical.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#eadfd3]">
            This section is about methodology rather than biography. The goal is
            to show how Kamo works in session: emotionally safe, body-aware,
            and concrete enough to create real movement.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {approachPrinciples.map((principle, index) => (
            <div
              key={principle.title}
              className="rounded-[2rem] border border-white/15 bg-white/8 p-6 backdrop-blur-sm transition-gentle hover:-translate-y-1 hover:bg-white/10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9c3a5]">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-heading text-2xl text-white">
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
    <section id={sectionLinks.testimonials.id} className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-380">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-light tracking-tight md:text-5xl">
            Client stories of clarity, steadiness, and growth.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] bg-[#f4eadf] p-6 sm:p-8 md:rounded-[2.5rem] md:p-10 transition-gentle hover:-translate-y-1 hover:shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a98961]">
              {editorialQuote.eyebrow}
            </p>
            <h3 className="mt-4 max-w-2xl font-heading text-3xl font-light leading-tight text-[#4a3e39] sm:text-4xl">
              “{featured.quote}”
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6e5d53]">
              {editorialQuote.body}
            </p>
            <div className="mt-8 grid gap-4 border-t border-[#dbc9b7] pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c7a6b]">
                  Came for
                </p>
                <p className="mt-1 text-sm text-[#4a3e39]">{featured.cameFor}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c7a6b]">
                  Outcome
                </p>
                <p className="mt-1 text-sm text-[#4a3e39]">{featured.outcome}</p>
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
                  "rounded-[2rem] border p-7 shadow-sm transition-gentle hover:-translate-y-1 hover:shadow-lg",
                  index === 0
                    ? "border-border bg-white"
                    : "border-[#e0d0bf] bg-[#fff8ef]",
                )}
              >
                <div className="mb-4 flex gap-1 text-[#a98961]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={15} fill="currentColor" />
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
    <section id={sectionLinks.faq.id} className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="text-center">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-light tracking-tight md:text-5xl">
          Common questions.
        </h2>
      </div>

      <Accordion
        defaultValue={["faq-0"]}
        className="mt-12 rounded-[2rem] border border-border bg-white px-4 sm:px-6"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`faq-${index}`}
            className={cn("border-border", index !== faqs.length - 1 && "border-b")}
          >
            <AccordionTrigger className="py-6 text-base font-semibold text-[#4a3e39] hover:no-underline">
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
    <section id={sectionLinks.contact.id} className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#4a3e39] px-5 py-12 text-center text-white sm:px-8 sm:py-16 md:rounded-[2.5rem] md:px-16 transition-gentle hover:shadow-xl">
        <h2 className="mx-auto max-w-3xl font-heading text-4xl font-light tracking-tight md:text-5xl">
          You do not need to have the right words before asking for support.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#eadfd3]">
          Start with a simple clarity consultation. You can explain where you
          are, and Kamohelo will help you identify the next right step.
        </p>

        <div className="mt-9">
          <Button
            onClick={onBook}
          className="w-full rounded-full bg-white px-8 text-[#4a3e39] transition-gentle hover:-translate-y-0.5 hover:bg-[#f2e8dc] sm:w-auto"
          >
            Book Consultation
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="mx-auto grid max-w-360 gap-8 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#6e5d53]">
            Somatic support, and wellness guidance
            for emotional clarity and personal growth.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#8c7a6b]">
            Built and maintained by{" "}
            <a
              href="https://jishin-website.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-[#4a3e39] transition-gentle hover:text-[#a98961]"
            >
              Jishin-Labs
            </a>
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4a3e39]">
            Contact
          </h4>

          <div className="space-y-3 text-sm text-[#6e5d53]">
            <p className="flex items-center gap-2">
              <Mail size={15} className="text-[#a98961]" />
              kamohelo@thebecoming.co.za
            </p>
            <p className="flex items-center gap-2">
              <Phone size={15} className="text-[#a98961]" />
              +27 72 456 7891
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4a3e39]">
            Links
          </h4>

          <div className="flex flex-col gap-3 text-sm text-[#6e5d53]">
            {primaryLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="transition-gentle hover:text-[#a98961]">
                {link.label}
              </a>
            ))}
          </div>
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
