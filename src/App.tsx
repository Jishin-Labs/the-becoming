import { useEffect, useState } from "react";

import { BookingModal } from "@/components/landing/booking-modal";
import {
  AboutSection,
  ApproachSection,
  BeginSection,
  FaqSection,
  FinalCta,
  Footer,
  Hero,
  Navbar,
  ServicesSection,
  WhoSection,
} from "@/components/landing/sections";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { MomentsPage } from "@/components/moments/moments-page";
import { TestimonialsPage } from "@/components/testimonials/testimonials-page";
import { useBooking } from "@/hooks/use-booking";
import { getPage, usePage } from "@/lib/router";

function InitialLoader({ leaving }: { leaving: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading The Becoming"
      className={[
        "fixed inset-0 z-50 grid place-items-center overflow-hidden bg-cream px-6 transition-[opacity,visibility,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        leaving
          ? "pointer-events-none scale-[1.01] opacity-0"
          : "opacity-100",
      ].join(" ")}
    >
      <div className="animate-loader-aura absolute left-1/2 top-1/2 h-88 w-88 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand-deep blur-3xl sm:h-136 sm:w-136" />
      <div className="absolute inset-x-8 top-10 h-px bg-linear-to-r from-transparent via-line-strong to-transparent opacity-70" />
      <div className="absolute inset-x-8 bottom-10 h-px bg-linear-to-r from-transparent via-line-strong to-transparent opacity-70" />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        <div className="relative grid size-28 place-items-center sm:size-32">
          <div className="animate-loader-ring absolute inset-0 rounded-full border border-line-strong" />
          <div className="animate-loader-ring-reverse absolute inset-3 rounded-full border border-bronze/40" />
          <img
            src="/logo.jpeg"
            alt=""
            className="animate-loader-mark size-20 rounded-full border border-line object-cover shadow-float sm:size-24"
          />
        </div>

        <p className="mt-8 font-heading text-2xl font-light tracking-[0.16em] text-ink sm:text-3xl">
          THE BECOMING
        </p>

        <div className="mt-8 h-px w-44 overflow-hidden rounded-full bg-line">
          <div className="animate-loader-progress h-full w-full rounded-full bg-bronze" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const page = usePage();
  // The intro loader only plays when the site is first opened on the home page.
  const [showInitialLoader, setShowInitialLoader] = useState(
    () => getPage(window.location.pathname) === "home",
  );
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking: openBookingModal, modalProps } = useBooking();

  useEffect(() => {
    if (!showInitialLoader) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const visibleDuration = prefersReducedMotion ? 350 : 1500;
    const exitDuration = prefersReducedMotion ? 80 : 520;

    const leaveTimer = window.setTimeout(() => {
      setLoaderLeaving(true);
    }, visibleDuration);
    const hideTimer = window.setTimeout(() => {
      setShowInitialLoader(false);
    }, visibleDuration + exitDuration);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, [showInitialLoader]);

  const openBooking = (service?: string) => {
    setMenuOpen(false);
    openBookingModal(service);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showInitialLoader && <InitialLoader leaving={loaderLeaving} />}

      <Navbar
        page={page}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onNavigate={() => setMenuOpen(false)}
        onBook={() => openBooking()}
      />

      <main className="pt-18 sm:pt-20">
        {page === "moments" && <MomentsPage onBook={() => openBooking()} />}

        {page === "testimonials" && (
          <>
            <TestimonialsPage />
            <FinalCta onBook={() => openBooking()} />
          </>
        )}

        {page === "home" && (
          <>
            <Hero onBook={() => openBooking()} />
            <WhoSection onBook={() => openBooking()} />
            <AboutSection />
            <ServicesSection onBook={openBooking} />
            <ApproachSection />
            <TestimonialsSection />
            <BeginSection />
            <FaqSection />
            <FinalCta onBook={() => openBooking()} />
          </>
        )}

        <Footer />
      </main>

      <BookingModal {...modalProps} />
    </div>
  );
}
