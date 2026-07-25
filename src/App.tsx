import { useEffect, useMemo, useState } from "react";

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
import { type BookingDetails, sectionLinks } from "@/components/landing/content";

type BookingFieldErrors = Partial<Record<keyof BookingDetails, string>>;

const initialBooking: BookingDetails = {
  service: "Free Clarity Consultation",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  companyName: "",
  jobTitle: "",
  description: "",
};

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

function validateBooking(booking: BookingDetails): BookingFieldErrors {
  const errors: BookingFieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = booking.phone.replace(/\D/g, "");
  const isCorporateRequest = booking.service === "Corporate Wellness";

  if (!booking.service.trim()) {
    errors.service = "Choose the service you want to discuss.";
  }
  if (!booking.date) {
    errors.date = "Select your preferred date.";
  }
  if (!booking.time) {
    errors.time = "Choose a one-hour slot.";
  }
  if (booking.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!emailPattern.test(booking.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (phoneDigits.length !== 10) {
    errors.phone = "Enter a valid 10-digit South African phone number.";
  }
  if (isCorporateRequest && booking.companyName.trim().length < 2) {
    errors.companyName = "Enter the company or organisation name.";
  }
  if (isCorporateRequest && booking.jobTitle.trim().length < 2) {
    errors.jobTitle = "Enter your role or job title.";
  }

  return errors;
}

export default function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<BookingDetails>(initialBooking);

  const bookingErrors = useMemo(() => validateBooking(booking), [booking]);
  const canSubmit = Object.keys(bookingErrors).length === 0;

  useEffect(() => {
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
  }, []);

  const resetBooking = (service = initialBooking.service) => {
    setBooking({
      ...initialBooking,
      service,
    });
  };

  const openBooking = (service = initialBooking.service) => {
    setMenuOpen(false);
    resetBooking(service);
    setBookingComplete(false);
    setSubmitAttempted(false);
    setSubmitError(null);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSubmitting(false);
  };

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  const updateBooking = <Key extends keyof BookingDetails>(
    key: Key,
    value: BookingDetails[Key],
  ) => {
    setBooking((current) => ({ ...current, [key]: value }));
  };

  const handleBookingSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    if (!canSubmit) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/consultation-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          result?.error ?? "Unable to send the consultation request.",
        );
      }

      resetBooking();
      setBookingComplete(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send the consultation request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showInitialLoader && <InitialLoader leaving={loaderLeaving} />}

      <Navbar
        links={sectionLinks}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onNavigate={handleNavigate}
        onBook={() => openBooking()}
      />

      <main className="pt-[4.5rem] sm:pt-20">
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
        <Footer />
      </main>

      <BookingModal
        booking={booking}
        bookingComplete={bookingComplete}
        errors={bookingErrors}
        submitError={submitError}
        submitting={submitting}
        open={bookingOpen}
        submitAttempted={submitAttempted}
        canSubmit={canSubmit}
        onClose={closeBooking}
        onChange={updateBooking}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
}
