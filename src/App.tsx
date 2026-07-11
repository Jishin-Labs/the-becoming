import { useMemo, useState } from "react";

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
};

function validateBooking(booking: BookingDetails): BookingFieldErrors {
  const errors: BookingFieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = booking.phone.replace(/\D/g, "");

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
  if (phoneDigits.length < 8) {
    errors.phone = "Enter a phone number with at least 8 digits.";
  }

  return errors;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [booking, setBooking] = useState<BookingDetails>(initialBooking);

  const bookingErrors = useMemo(() => validateBooking(booking), [booking]);
  const canSubmit = Object.keys(bookingErrors).length === 0;

  const openBooking = (service = initialBooking.service) => {
    setMenuOpen(false);
    setBooking((current) => ({ ...current, service }));
    setBookingComplete(false);
    setSubmitAttempted(false);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
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

  const handleBookingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!canSubmit) {
      return;
    }

    setBookingComplete(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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
