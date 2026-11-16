import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";

import {
  type BookingDetails,
  serviceOptions,
} from "@/components/landing/content";
import { fieldClassName } from "@/components/form-styles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  bookingSlots,
  earliestBookableDate,
  findBookingSlot,
  isSlotOpen,
  johannesburgClock,
} from "@/validation/booking-slots";

type BookingFieldErrors = Partial<Record<keyof BookingDetails, string>>;

type BookingModalProps = {
  booking: BookingDetails;
  bookingComplete: boolean;
  canSubmit: boolean;
  errors: BookingFieldErrors;
  submitError: string | null;
  submitting: boolean;
  open: boolean;
  submitAttempted: boolean;
  onClose: () => void;
  onChange: <Key extends keyof BookingDetails>(
    key: Key,
    value: BookingDetails[Key],
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function BookingModal({
  booking,
  bookingComplete,
  canSubmit,
  errors,
  submitError,
  submitting,
  open,
  submitAttempted,
  onClose,
  onChange,
  onSubmit,
}: BookingModalProps) {
  const isMobile = useIsMobile();
  const isCorporateRequest = booking.service === "Corporate Wellness";
  const [touched, setTouched] = useState<
    Partial<Record<keyof BookingDetails, boolean>>
  >({});

  useEffect(() => {
    if (open) {
      setTouched({});
    }
  }, [open]);

  const visibleErrors = useMemo(() => {
    return Object.fromEntries(
      Object.entries(errors).filter(([field, message]) => {
        return Boolean(
          message &&
          (submitAttempted || touched[field as keyof BookingDetails]),
        );
      }),
    ) as BookingFieldErrors;
  }, [errors, submitAttempted, touched]);

  const markTouched = (field: keyof BookingDetails) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  // Read on every render, so slots grey out as the day goes on while the
  // form is open.
  const clock = johannesburgClock();

  // Picking a date on which the chosen slot has already started (today, later
  // in the day) clears the slot, rather than leaving a time that can't be sent.
  const changeDate = (date: string) => {
    onChange("date", date);
    const slot = findBookingSlot(booking.time);
    if (date && slot && !isSlotOpen(date, slot, clock)) {
      onChange("time", "");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        // The popup never scrolls itself: the title and buttons stay in place,
        // and only the fields between them scroll.
        className="animate-scale-in-soft flex max-h-[calc(100dvh-0.75rem)] flex-col gap-0 overflow-hidden rounded-[1.25rem] bg-paper p-0 sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2rem] lg:max-w-6xl"
        showCloseButton
      >
        {bookingComplete ? (
          <div className="animate-fade-up-soft px-4 py-8 text-center sm:px-8 sm:py-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
              <Check size={32} />
            </div>

            <h3 className="font-heading text-2xl font-light text-espresso sm:text-3xl">
              Consultation request received
            </h3>

            <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
              Kamo will review your preferred timing and follow up soon to
              confirm the best next step.
            </p>

            <DialogFooter className="mt-8 justify-center">
              <Button
                onClick={onClose}
                className="rounded-full bg-espresso px-7 text-primary-foreground hover:bg-espresso-soft"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <DialogHeader className="shrink-0 border-b border-border bg-linen px-4 py-5 sm:px-8 sm:py-6">
              <DialogTitle className="pr-10 font-heading text-xl font-light normal-case tracking-tight text-espresso sm:text-2xl">
                Request a consultation
              </DialogTitle>
              <DialogDescription className="max-w-2xl text-sm leading-7 text-ink-soft">
                Share your preferred service, timing, and contact details for
                follow-up.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={onSubmit}
              className="flex min-h-0 min-w-0 flex-1 flex-col"
            >
              <ScrollArea
                // The dialog only has a maximum height, so the viewport can't
                // use height: 100%. As a flex child it shrinks to the space
                // left between the header and footer, and scrolls instead.
                className="flex min-h-0 flex-1 flex-col *:data-[slot=scroll-area-viewport]:min-h-0 *:data-[slot=scroll-area-viewport]:flex-1 **:data-[slot=scroll-area-thumb]:rounded-full **:data-[slot=scroll-area-thumb]:bg-line-strong **:data-[slot=scroll-area-scrollbar]:mr-1 **:data-[slot=scroll-area-scrollbar]:py-2">
              <FieldGroup className="gap-6 px-4 py-4 sm:gap-8 sm:px-8 sm:py-6">
                <FieldSet>
                  <FieldLegend className="text-ink-soft">
                    Booking details
                  </FieldLegend>
                  <FieldDescription>
                    Start with the service, share your preferred date and time,
                    then add the contact details Kamo would use for follow-up.
                  </FieldDescription>
                </FieldSet>

                <Field data-invalid={Boolean(visibleErrors.service)}>
                  <FieldContent>
                    <FieldTitle>Service</FieldTitle>
                    {isMobile ? (
                      <NativeSelect
                        aria-label="Service"
                        aria-invalid={Boolean(visibleErrors.service)}
                        className="w-full"
                        value={booking.service}
                        onBlur={() => markTouched("service")}
                        onChange={(event) => {
                          onChange("service", event.target.value);
                          markTouched("service");
                        }}
                      >
                        {serviceOptions.map((service) => (
                          <NativeSelectOption
                            key={service.value}
                            value={service.value}
                          >
                            {service.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    ) : (
                      <Select
                        value={booking.service}
                        onValueChange={(value) => {
                          onChange("service", String(value));
                          markTouched("service");
                        }}
                        items={serviceOptions}
                      >
                        <SelectTrigger
                          aria-label="Service"
                          aria-invalid={Boolean(visibleErrors.service)}
                          className={cn(fieldClassName, "h-12 w-full min-w-0")}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FieldError>{visibleErrors.service}</FieldError>
                  </FieldContent>
                </Field>

                <div className="grid gap-5 md:grid-cols-2 md:gap-8">
                  <Field data-invalid={Boolean(visibleErrors.date)}>
                    <FieldContent>
                      <Label htmlFor="booking-date" className="text-ink-soft">
                        Preferred date
                      </Label>
                      <Input
                        id="booking-date"
                        type="date"
                        min={earliestBookableDate(clock)}
                        value={booking.date}
                        onBlur={() => markTouched("date")}
                        onChange={(event) => changeDate(event.target.value)}
                        aria-invalid={Boolean(visibleErrors.date)}
                        className={cn(fieldClassName, "h-12")}
                      />
                      <FieldError>{visibleErrors.date}</FieldError>
                    </FieldContent>
                  </Field>

                  <Field data-invalid={Boolean(visibleErrors.phone)}>
                    <FieldContent>
                      <Label htmlFor="booking-phone" className="text-ink-soft">
                        Phone
                      </Label>
                      <Input
                        id="booking-phone"
                        type="tel"
                        value={booking.phone}
                        onBlur={() => markTouched("phone")}
                        onChange={(event) =>
                          onChange("phone", event.target.value)
                        }
                        aria-invalid={Boolean(visibleErrors.phone)}
                        className={cn(fieldClassName, "h-12")}
                      />
                      <FieldError>{visibleErrors.phone}</FieldError>
                    </FieldContent>
                  </Field>
                </div>

                <FieldSet>
                  <FieldLegend className="text-ink-soft">
                    Preferred time
                  </FieldLegend>
                  <FieldDescription>
                    Select the time window you would prefer. Times are in South
                    African time (SAST), and availability will be confirmed
                    during follow-up.
                  </FieldDescription>
                  <RadioGroup
                    aria-label="Preferred time"
                    value={booking.time}
                    onValueChange={(value) => {
                      onChange("time", String(value));
                      markTouched("time");
                    }}
                    className="grid gap-3 min-[420px]:grid-cols-2 xl:grid-cols-5"
                  >
                    {bookingSlots.map((slot) => {
                      const checked = booking.time === slot.label;
                      // Before a date is picked, every slot is offered.
                      const started =
                        booking.date !== "" &&
                        !isSlotOpen(booking.date, slot, clock);
                      return (
                        <Label
                          key={slot.label}
                          className={cn(
                            "flex min-h-14 items-center gap-3 rounded-xl border p-3 normal-case tracking-normal transition-silk sm:min-h-16 sm:rounded-2xl sm:p-4",
                            checked
                              ? "border-espresso bg-espresso text-white shadow-raised"
                              : started
                                ? "cursor-not-allowed border-dashed border-line-strong bg-transparent text-subtle"
                                : "border-line-strong bg-white text-espresso hover:-translate-y-0.5 hover:border-bronze-soft hover:bg-linen",
                          )}
                        >
                          <RadioGroupItem
                            value={slot.label}
                            disabled={started}
                            className={
                              checked
                                ? "border-white data-checked:border-white"
                                : undefined
                            }
                          />
                          <span className="text-sm leading-5 font-medium">
                            {slot.label}
                            {started ? (
                              <span className="sr-only"> (already started)</span>
                            ) : null}
                          </span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                  <FieldError>{visibleErrors.time}</FieldError>
                </FieldSet>

                <div className="grid gap-5 md:grid-cols-2 md:gap-8">
                  <Field data-invalid={Boolean(visibleErrors.name)}>
                    <FieldContent>
                      <Label htmlFor="booking-name" className="text-ink-soft">
                        Name
                      </Label>
                      <Input
                        id="booking-name"
                        value={booking.name}
                        onBlur={() => markTouched("name")}
                        onChange={(event) =>
                          onChange("name", event.target.value)
                        }
                        aria-invalid={Boolean(visibleErrors.name)}
                        className={cn(fieldClassName, "h-12")}
                      />
                      <FieldError>{visibleErrors.name}</FieldError>
                    </FieldContent>
                  </Field>

                  <Field data-invalid={Boolean(visibleErrors.email)}>
                    <FieldContent>
                      <Label htmlFor="booking-email" className="text-ink-soft">
                        Email
                      </Label>
                      <Input
                        id="booking-email"
                        type="email"
                        value={booking.email}
                        onBlur={() => markTouched("email")}
                        onChange={(event) =>
                          onChange("email", event.target.value)
                        }
                        aria-invalid={Boolean(visibleErrors.email)}
                        className={cn(fieldClassName, "h-12")}
                      />
                      <FieldError>{visibleErrors.email}</FieldError>
                    </FieldContent>
                  </Field>
                </div>

                {isCorporateRequest ? (
                  <div className="grid gap-5 md:grid-cols-2 md:gap-8">
                    <Field data-invalid={Boolean(visibleErrors.companyName)}>
                      <FieldContent>
                        <Label
                          htmlFor="booking-company-name"
                          className="text-ink-soft"
                        >
                          Company name
                        </Label>
                        <Input
                          id="booking-company-name"
                          value={booking.companyName}
                          onBlur={() => markTouched("companyName")}
                          onChange={(event) =>
                            onChange("companyName", event.target.value)
                          }
                          aria-invalid={Boolean(visibleErrors.companyName)}
                          className={cn(fieldClassName, "h-12")}
                        />
                        <FieldError>{visibleErrors.companyName}</FieldError>
                      </FieldContent>
                    </Field>

                    <Field data-invalid={Boolean(visibleErrors.jobTitle)}>
                      <FieldContent>
                        <Label
                          htmlFor="booking-job-title"
                          className="text-ink-soft"
                        >
                          Your role
                        </Label>
                        <Input
                          id="booking-job-title"
                          value={booking.jobTitle}
                          onBlur={() => markTouched("jobTitle")}
                          onChange={(event) =>
                            onChange("jobTitle", event.target.value)
                          }
                          aria-invalid={Boolean(visibleErrors.jobTitle)}
                          className={cn(fieldClassName, "h-12")}
                        />
                        <FieldError>{visibleErrors.jobTitle}</FieldError>
                      </FieldContent>
                    </Field>
                  </div>
                ) : null}

                <Field>
                  <FieldContent>
                    <Label
                      htmlFor="booking-description"
                      className="text-ink-soft"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="booking-description"
                      value={booking.description}
                      onBlur={() => markTouched("description")}
                      onChange={(event) =>
                        onChange("description", event.target.value)
                      }
                      placeholder={
                        isCorporateRequest
                          ? "Share what your team is navigating, what kind of support you need, and any workshop or wellness goals."
                          : "Share a little about what you are navigating and what kind of support you are looking for."
                      }
                      className={cn(fieldClassName, "min-h-32 py-3")}
                    />
                  </FieldContent>
                </Field>

              </FieldGroup>
              </ScrollArea>

              <DialogFooter className="shrink-0 border-t border-border bg-paper px-4 py-4 sm:items-center sm:px-8 sm:py-5">
                {/* Phones stack the footer bottom-up: any error on top, then
                    Send, then Cancel. Wider screens put the error on the left
                    and both buttons on the right. */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full rounded-full border-line-strong px-8 text-espresso hover:bg-sand sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting || (!canSubmit && submitAttempted)}
                  className="motion-button w-full justify-center rounded-full bg-espresso px-8 text-primary-foreground transition-silk hover:bg-espresso-soft sm:w-auto disabled:cursor-not-allowed disabled:bg-line-strong"
                >
                  {submitting ? "Sending..." : "Send request"}
                </Button>
                {submitError ? (
                  <p role="alert" className="text-sm text-error sm:order-first sm:mr-auto">
                    {submitError}
                  </p>
                ) : null}
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
