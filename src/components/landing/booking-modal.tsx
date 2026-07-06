import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";

import {
  type BookingDetails,
  serviceOptions,
  timeSlots,
} from "@/components/landing/content";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BookingFieldErrors = Partial<Record<keyof BookingDetails, string>>;

type BookingModalProps = {
  booking: BookingDetails;
  bookingComplete: boolean;
  canSubmit: boolean;
  errors: BookingFieldErrors;
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
  open,
  submitAttempted,
  onClose,
  onChange,
  onSubmit,
}: BookingModalProps) {
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
        className="max-h-[calc(100vh-1rem)] overflow-hidden rounded-[1.5rem] bg-[#fffdf9] p-0 sm:max-h-[calc(100vh-2rem)] sm:rounded-[2rem] lg:max-w-6xl"
        showCloseButton
      >
        <DialogHeader className="border-b border-border bg-[#fcf6ee] px-6 py-6 sm:px-8">
          <DialogTitle className="font-heading text-2xl font-light normal-case tracking-tight text-[#4a3e39]">
            Book a consultation
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-sm leading-7 text-[#6e5d53]">
            Choose your service, preferred time, and contact details.
          </DialogDescription>
        </DialogHeader>

        {bookingComplete ? (
          <div className="px-8 py-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Check size={32} />
            </div>

            <h3 className="font-heading text-3xl font-light text-[#4a3e39]">
              Booking flow preview complete
            </h3>

      

            <DialogFooter className="mt-8 justify-center">
              <Button
                onClick={onClose}
                className="rounded-full bg-[#4a3e39] px-7 text-primary-foreground hover:bg-[#7a6457]"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="grid max-h-[calc(100vh-8rem)] overflow-y-auto">
            <form
              onSubmit={onSubmit}
              className="min-w-0 px-4 py-5 sm:px-8 sm:py-6"
            >
              <FieldGroup className="gap-8">
                <FieldSet>
                  <FieldLegend className="text-[#6e5d53]">
                    Booking details
                  </FieldLegend>
                  <FieldDescription>
                    Start with the service, choose a date and one-hour slot,
                    then add the contact details Kamo would use for follow-up.
                  </FieldDescription>
                </FieldSet>

                <Field data-invalid={Boolean(visibleErrors.service)}>
                  <FieldContent>
                    <FieldTitle>Service</FieldTitle>
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
                        className="h-12 w-full min-w-0 rounded-xl border border-[#e1d4c8] bg-white px-4"
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
                    <FieldError>{visibleErrors.service}</FieldError>
                  </FieldContent>
                </Field>

                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  <Field data-invalid={Boolean(visibleErrors.date)}>
                    <FieldContent>
                      <Label htmlFor="booking-date" className="text-[#6e5d53]">
                        Preferred date
                      </Label>
                      <Input
                        id="booking-date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={booking.date}
                        onBlur={() => markTouched("date")}
                        onChange={(event) =>
                          onChange("date", event.target.value)
                        }
                        aria-invalid={Boolean(visibleErrors.date)}
                        className="h-12 rounded-xl border border-[#e1d4c8] bg-white px-4"
                      />
                      <FieldError>{visibleErrors.date}</FieldError>
                    </FieldContent>
                  </Field>

                  <Field data-invalid={Boolean(visibleErrors.phone)}>
                    <FieldContent>
                      <Label htmlFor="booking-phone" className="text-[#6e5d53]">
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
                        className="h-12 rounded-xl border border-[#e1d4c8] bg-white px-4"
                      />
                      <FieldError>{visibleErrors.phone}</FieldError>
                    </FieldContent>
                  </Field>
                </div>

                <FieldSet>
                  <FieldLegend className="text-[#6e5d53]">
                    Preferred time
                  </FieldLegend>
                  <FieldDescription>
                    Select a one-hour daytime slot from 08:00 through 17:00.
                  </FieldDescription>
                  <RadioGroup
                    aria-label="Preferred time"
                    value={booking.time}
                    onValueChange={(value) => {
                      onChange("time", String(value));
                      markTouched("time");
                    }}
                    className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
                  >
                    {timeSlots.map((time) => {
                      const checked = booking.time === time;
                      return (
                        <Label
                          key={time}
                          className={[
                            "flex min-h-16 items-center gap-3 rounded-2xl border p-3.5 normal-case tracking-normal transition sm:p-4",
                            checked
                              ? "border-[#4a3e39] bg-[#4a3e39] text-white shadow-sm"
                              : "border-[#e1d4c8] bg-white text-[#4a3e39] hover:border-[#b79b7d] hover:bg-[#faf2e8]",
                          ].join(" ")}
                        >
                          <RadioGroupItem
                            value={time}
                            className={
                              checked
                                ? "border-white data-checked:border-white"
                                : undefined
                            }
                          />
                          <span className="text-sm leading-5 font-medium sm:text-base">
                            {time}
                          </span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                  <FieldError>{visibleErrors.time}</FieldError>
                </FieldSet>

                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  <Field data-invalid={Boolean(visibleErrors.name)}>
                    <FieldContent>
                      <Label htmlFor="booking-name" className="text-[#6e5d53]">
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
                        className="h-12 rounded-xl border border-[#e1d4c8] bg-white px-4"
                      />
                      <FieldError>{visibleErrors.name}</FieldError>
                    </FieldContent>
                  </Field>

                  <Field data-invalid={Boolean(visibleErrors.email)}>
                    <FieldContent>
                      <Label htmlFor="booking-email" className="text-[#6e5d53]">
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
                        className="h-12 rounded-xl border border-[#e1d4c8] bg-white px-4"
                      />
                      <FieldError>{visibleErrors.email}</FieldError>
                    </FieldContent>
                  </Field>
                </div>

                <DialogFooter className="sticky bottom-0 -mx-4 border-t border-border bg-[#fffdf9] px-4 pt-5 sm:-mx-8 sm:px-8">
                  <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <Button
                      type="submit"
                      disabled={!canSubmit && submitAttempted}
                      className="w-full rounded-full bg-[#4a3e39] px-8 text-primary-foreground hover:bg-[#7a6457] sm:w-auto disabled:cursor-not-allowed disabled:bg-[#d8cbbb] justify-self-end"
                    >
                      Validate and preview confirmation
                    </Button>
                  </div>
                </DialogFooter>
              </FieldGroup>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
