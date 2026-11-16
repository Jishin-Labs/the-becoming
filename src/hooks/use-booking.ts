import { useMemo, useState } from "react";

import {
  type BookingDetails,
  clarityConsultationService,
} from "@/components/landing/content";
import { readApiError } from "@/lib/api";
import { bookingSchema } from "@/validation/booking";
import { firstFieldErrors } from "@/validation/field-errors";

export type BookingFieldErrors = Partial<Record<keyof BookingDetails, string>>;

const initialBooking: BookingDetails = {
  service: clarityConsultationService,
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  companyName: "",
  jobTitle: "",
  description: "",
};

function validateBooking(booking: BookingDetails): BookingFieldErrors {
  const result = bookingSchema.safeParse(booking);
  return result.success ? {} : firstFieldErrors(result.error);
}

/** Consultation booking state, shared by every page through the layout. */
export function useBooking() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<BookingDetails>(initialBooking);

  const bookingErrors = useMemo(() => validateBooking(booking), [booking]);
  const canSubmit = Object.keys(bookingErrors).length === 0;

  const resetBooking = (service = initialBooking.service) => {
    setBooking({
      ...initialBooking,
      service,
    });
  };

  const openBooking = (service = initialBooking.service) => {
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
        throw new Error(
          await readApiError(
            response,
            "Unable to send the consultation request.",
          ),
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

  return {
    openBooking,
    modalProps: {
      booking,
      bookingComplete,
      errors: bookingErrors,
      submitError,
      submitting,
      open: bookingOpen,
      submitAttempted,
      canSubmit,
      onClose: closeBooking,
      onChange: updateBooking,
      onSubmit: handleBookingSubmit,
    },
  };
}
