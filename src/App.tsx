import { useEffect, useState } from "react";

import { BookingModal } from "@/components/landing/booking-modal";
import {
  AboutSection,
  ApproachSection,
  FaqSection,
  FinalCta,
  Footer,
  Hero,
  Navbar,
  ServicesSection,
  TrustSection,
  WhoIHelpSection,
} from "@/components/landing/sections";
import { sectionLinks } from "@/components/landing/content";
import { MomentsPage } from "@/components/moments/moments-page";
import { useBooking } from "@/hooks/use-booking";
import { getPage, usePage } from "@/lib/router";

function InitialLoader({ leaving }: { leaving: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading The Becoming"
      className={[
        "fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#fbf6ef] px-6 transition-[opacity,visibility,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        leaving
          ? "pointer-events-none scale-[1.01] opacity-0"
          : "opacity-100",
      ].join(" ")}
    >
      <div className="animate-loader-aura absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0e4d4] blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-[#d9c6b2] to-transparent opacity-70" />
      <div className="absolute inset-x-8 bottom-10 h-px bg-gradient-to-r from-transparent via-[#d9c6b2] to-transparent opacity-70" />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        <div className="relative grid size-28 place-items-center sm:size-32">
          <div className="animate-loader-ring absolute inset-0 rounded-full border border-[#d8c6b5]" />
          <div className="animate-loader-ring-reverse absolute inset-3 rounded-full border border-[#a98961]/40" />
          <img
            src="/logo.jpeg"
            alt=""
            className="animate-loader-mark size-20 rounded-full border border-[#eadfd3] object-cover shadow-[0_18px_55px_rgb(74_62_57_/_0.18)] sm:size-24"
          />
        </div>

        <p className="mt-8 font-heading text-2xl font-light tracking-[0.16em] text-[#2a2421] sm:text-3xl">
          THE BECOMING
        </p>

        <div className="mt-8 h-px w-44 overflow-hidden rounded-full bg-[#eadfd3]">
          <div className="animate-loader-progress h-full w-full rounded-full bg-[#a98961]" />
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
        links={sectionLinks}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onNavigate={() => setMenuOpen(false)}
        onBook={() => openBooking()}
      />

      <main className="pt-[4.5rem] sm:pt-20">
        {page === "moments" ? (
          <MomentsPage onBook={() => openBooking()} />
        ) : (
          <>
            <Hero
              servicesHref={`#${sectionLinks.services.id}`}
              onBook={() => openBooking()}
            />

            <TrustSection />
            <AboutSection onBook={() => openBooking()} />
            <WhoIHelpSection />
            <ServicesSection onBook={openBooking} />
            <ApproachSection />

            {/* <TestimonialsSection /> */}

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
