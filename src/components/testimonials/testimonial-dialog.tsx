import { useState } from "react";
import { Check } from "lucide-react";

import {
  type TestimonialDraft,
  testimonialsContent,
} from "@/components/testimonials/content";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { validateTestimonial } from "@/hooks/use-testimonials";
import { cn } from "@/lib/utils";
import { serviceTitles } from "@/validation/services";
import { testimonialLimits } from "@/validation/testimonial";

const copy = testimonialsContent.form;

const fieldClassName =
  "motion-field rounded-xl border border-[#e1d4c8] bg-white px-4 focus-visible:border-[#b79b7d] focus-visible:ring-[#d8cbbb]/60";

const primaryButtonClassName =
  "motion-button rounded-full bg-[#4a3e39] px-7 text-primary-foreground transition-silk hover:bg-[#7a6457] disabled:cursor-not-allowed disabled:bg-[#d8cbbb]";

type SubmitTestimonial = (draft: TestimonialDraft) => Promise<void>;

/**
 * A "Share your story" button. Several can open the same dialog (the page
 * header and the invite card), so the page owns the open state.
 */
export function ShareStoryButton({
  onClick,
  size = "default",
}: {
  onClick: () => void;
  size?: "default" | "small";
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        primaryButtonClassName,
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze",
        size === "small" && "h-auto px-[22px] py-[13px] text-xs",
      )}
    >
      {testimonialsContent.shareButton}
    </Button>
  );
}

/** The "Share your story" form, in a dialog. */
export function TestimonialDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: SubmitTestimonial;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="animate-scale-in-soft max-h-[calc(100vh-0.75rem)] overflow-y-auto rounded-[1.25rem] bg-[#fffdf9] p-0 sm:max-h-[calc(100vh-2rem)] sm:max-w-xl sm:p-0 sm:rounded-[2rem]"
        showCloseButton
      >
        {/* The dialog removes this form when it closes, so it starts empty
            each time it opens. */}
        <TestimonialForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

type FormStatus = "editing" | "submitting" | "shared";

function TestimonialForm({ onSubmit }: { onSubmit: SubmitTestimonial }) {
  const [draft, setDraft] = useState<TestimonialDraft>({
    name: "",
    message: "",
    service: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof TestimonialDraft, boolean>>
  >({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("editing");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = validateTestimonial(draft);
  const canSubmit = Object.keys(errors).length === 0;
  // Errors only show once someone has left a field or pressed submit, so the
  // form does not start out covered in red.
  const visibleError = (field: keyof TestimonialDraft) =>
    submitAttempted || touched[field] ? errors[field] : undefined;

  const updateField = (field: keyof TestimonialDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const markTouched = (field: keyof TestimonialDraft) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    if (!canSubmit) {
      return;
    }

    setStatus("submitting");

    try {
      await onSubmit({
        name: draft.name.trim(),
        message: draft.message.trim(),
        service: draft.service,
      });
      setStatus("shared");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to share your story.",
      );
      setStatus("editing");
    }
  };

  if (status === "shared") {
    return (
      <div className="animate-fade-up-soft px-4 py-8 text-center sm:px-8 sm:py-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Check size={32} />
        </div>
        <DialogTitle className="font-heading text-2xl font-light normal-case tracking-tight text-[#4a3e39] sm:text-3xl">
          {copy.successTitle}
        </DialogTitle>
        <DialogFooter className="mt-8 justify-center">
          <DialogClose render={<Button className={primaryButtonClassName} />}>
            {copy.close}
          </DialogClose>
        </DialogFooter>
      </div>
    );
  }

  const nameError = visibleError("name");
  const serviceError = visibleError("service");
  const messageError = visibleError("message");

  return (
    <div className="grid">
      <DialogHeader className="border-b border-border bg-[#fcf6ee] px-4 py-5 sm:px-8 sm:py-6">
        <DialogTitle className="pr-10 font-heading text-xl font-light normal-case tracking-tight text-[#4a3e39] sm:text-2xl">
          {copy.title}
        </DialogTitle>
        <DialogDescription className="text-sm leading-7 text-[#6e5d53]">
          {copy.description}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid gap-6 px-4 py-5 sm:px-8 sm:py-6"
      >
        <Field data-invalid={Boolean(nameError)}>
          <FieldContent>
            <Label htmlFor="testimonial-name" className="text-[#6e5d53]">
              {copy.nameLabel}
            </Label>
            <Input
              id="testimonial-name"
              autoComplete="name"
              maxLength={testimonialLimits.name.max}
              placeholder={copy.namePlaceholder}
              value={draft.name}
              onChange={(event) => updateField("name", event.target.value)}
              onBlur={() => markTouched("name")}
              aria-invalid={Boolean(nameError)}
              className={`${fieldClassName} h-12`}
            />
            <FieldError>{nameError}</FieldError>
          </FieldContent>
        </Field>

        <Field data-invalid={Boolean(serviceError)}>
          <FieldContent>
            <Label htmlFor="testimonial-service" className="text-[#6e5d53]">
              {copy.serviceLabel}
            </Label>
            <NativeSelect
              id="testimonial-service"
              // Styles the inner <select> to match the other fields.
              className="w-full [&_select]:h-12 [&_select]:rounded-xl [&_select]:border-[#e1d4c8] [&_select]:bg-white [&_select]:px-4 [&_select]:focus-visible:border-[#b79b7d] [&_svg]:right-4"
              value={draft.service}
              onChange={(event) => updateField("service", event.target.value)}
              onBlur={() => markTouched("service")}
              aria-invalid={Boolean(serviceError)}
            >
              <NativeSelectOption value="">{copy.servicePlaceholder}</NativeSelectOption>
              {serviceTitles.map((service) => (
                <NativeSelectOption key={service} value={service}>
                  {service}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{serviceError}</FieldError>
          </FieldContent>
        </Field>

        <Field data-invalid={Boolean(messageError)}>
          <FieldContent>
            <Label htmlFor="testimonial-message" className="text-[#6e5d53]">
              {copy.messageLabel}
            </Label>
            <Textarea
              id="testimonial-message"
              maxLength={testimonialLimits.message.max}
              placeholder={copy.messagePlaceholder}
              value={draft.message}
              onChange={(event) => updateField("message", event.target.value)}
              onBlur={() => markTouched("message")}
              aria-invalid={Boolean(messageError)}
              aria-describedby="testimonial-message-count"
              className={`${fieldClassName} min-h-36 py-3`}
            />
            <FieldDescription id="testimonial-message-count" className="text-right">
              {draft.message.length} / {testimonialLimits.message.max}
            </FieldDescription>
            <FieldError>{messageError}</FieldError>
          </FieldContent>
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            disabled={status === "submitting" || (!canSubmit && submitAttempted)}
            className={`${primaryButtonClassName} w-full sm:w-auto`}
          >
            {status === "submitting" ? copy.submitting : copy.submit}
          </Button>
          {submitError ? (
            <p role="alert" className="text-sm text-red-700">
              {submitError}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
