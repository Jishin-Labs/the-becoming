import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Volume2, VolumeX, X } from "lucide-react";

import {
  type MomentPhoto,
  type MomentReel,
  padNumber,
  placeholderTone,
} from "@/components/moments/content";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/** Turns the shared centred dialog into a full-screen dark viewer. */
const fullScreenViewer =
  "inset-0 top-0 left-0 flex h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col items-center justify-center gap-5 rounded-none bg-night/95 p-0 text-white shadow-none ring-0 sm:w-full sm:max-w-none sm:p-0";

const roundIconButton =
  "grid size-12 shrink-0 place-items-center rounded-full border border-white/35 bg-transparent text-white transition-silk hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-40";

/**
 * Keeps the last opened index while the dialog animates closed, so the
 * content doesn't jump back to the first item mid-animation.
 */
function useShownIndex(openIndex: number | null) {
  const [shownIndex, setShownIndex] = useState(openIndex ?? 0);
  if (openIndex !== null && openIndex !== shownIndex) {
    setShownIndex(openIndex);
  }
  return shownIndex;
}

export function PhotoLightbox({
  title,
  photos,
  openIndex,
  onClose,
}: {
  title: string;
  photos: MomentPhoto[];
  openIndex: number | null;
  onClose: () => void;
}) {
  const shownIndex = useShownIndex(openIndex);

  return (
    <Dialog open={openIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className={cn(fullScreenViewer, "px-4 py-20 sm:px-8")}>
        <LightboxSlides key={shownIndex} title={title} photos={photos} startIndex={shownIndex} />
      </DialogContent>
    </Dialog>
  );
}

function LightboxSlides({
  title,
  photos,
  startIndex,
}: {
  title: string;
  photos: MomentPhoto[];
  startIndex: number;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(startIndex);
  const canLoop = photos.length > 1;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  const prevButton = (className?: string) => (
    <button
      type="button"
      onClick={() => api?.scrollPrev()}
      disabled={!canLoop}
      aria-label="Previous photo"
      className={cn(roundIconButton, className)}
    >
      <ChevronLeft size={20} />
    </button>
  );
  const nextButton = (className?: string) => (
    <button
      type="button"
      onClick={() => api?.scrollNext()}
      disabled={!canLoop}
      aria-label="Next photo"
      className={cn(roundIconButton, className)}
    >
      <ChevronRight size={20} />
    </button>
  );

  return (
    <div onKeyDown={handleKeyDown} className="flex w-full flex-col items-center gap-6">
      <DialogTitle className="sr-only">{title} photos</DialogTitle>
      <DialogDescription className="sr-only">
        Use the arrow keys or swipe to move between photos.
      </DialogDescription>

      <DialogClose
        aria-label="Close photo viewer"
        className={cn(roundIconButton, "absolute top-4 right-4 z-10 sm:top-6 sm:right-6")}
      >
        <X size={20} />
      </DialogClose>

      <div className="flex w-full max-w-6xl items-center gap-6">
        {prevButton("hidden sm:grid")}

        <Carousel setApi={setApi} opts={{ startIndex, loop: canLoop }} className="min-w-0 flex-1">
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="max-h-[72dvh] w-auto max-w-full rounded-xl object-contain"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={photo.alt}
                    className="grid aspect-[3/2] w-full max-w-[860px] place-items-center rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-espresso"
                    style={{ backgroundColor: placeholderTone(index) }}
                  >
                    Photo {padNumber(index + 1)}
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {nextButton("hidden sm:grid")}
      </div>

      <div className="flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-on-dark">
        {prevButton("sm:hidden")}
        <span className="hidden sm:inline">{title}</span>
        <span aria-live="polite" className="text-on-dark-muted">
          {current + 1} / {photos.length}
        </span>
        {nextButton("sm:hidden")}
      </div>
    </div>
  );
}

export function ReelViewer({
  title,
  reels,
  openIndex,
  onClose,
  onSeeUpcoming,
}: {
  title: string;
  reels: MomentReel[];
  openIndex: number | null;
  onClose: () => void;
  onSeeUpcoming: () => void;
}) {
  const shownIndex = useShownIndex(openIndex);

  return (
    <Dialog open={openIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className={cn(fullScreenViewer, "bg-night sm:bg-night/95 sm:p-6")}
      >
        <ReelPlayer
          key={shownIndex}
          title={title}
          reels={reels}
          startIndex={shownIndex}
          onClose={onClose}
          onSeeUpcoming={onSeeUpcoming}
        />
      </DialogContent>
    </Dialog>
  );
}

function ReelPlayer({
  title,
  reels,
  startIndex,
  onClose,
  onSeeUpcoming,
}: {
  title: string;
  reels: MomentReel[];
  startIndex: number;
  onClose: () => void;
  onSeeUpcoming: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reel = reels[index];

  const goTo = (next: number) => {
    if (next >= reels.length) {
      onClose();
      return;
    }
    if (next < 0) {
      // On the first reel, "previous" restarts it.
      if (videoRef.current) videoRef.current.currentTime = 0;
      setProgress(0);
      return;
    }
    setIndex(next);
    setProgress(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="relative size-full overflow-hidden bg-night sm:aspect-[9/16] sm:h-[min(90dvh,52rem)] sm:w-auto sm:rounded-[1.5rem]"
    >
      <DialogTitle className="sr-only">{title} reels</DialogTitle>
      <DialogDescription className="sr-only">
        Use the arrow keys, or the left and right sides of the reel, to skip.
      </DialogDescription>

      {reel.src ? (
        <video
          key={index}
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          autoPlay
          playsInline
          muted={muted}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            if (video.duration) setProgress(video.currentTime / video.duration);
          }}
          onEnded={() => goTo(index + 1)}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center text-xs font-semibold uppercase tracking-[0.16em] text-espresso"
          style={{ backgroundColor: placeholderTone(index + 2) }}
        >
          Reel {padNumber(index + 1)} · 9:16 video
        </div>
      )}

      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-night/65 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-72 bg-linear-to-t from-night/85 to-transparent" />

      {/* Tap zones: left third goes back, right third goes forward. */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous reel"
        className="absolute top-24 bottom-56 left-0 z-10 w-1/3 cursor-w-resize focus-visible:outline-none"
      />
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next reel"
        className="absolute top-24 right-0 bottom-56 z-10 w-1/3 cursor-e-resize focus-visible:outline-none"
      />

      <div aria-hidden="true" className="absolute inset-x-4 top-4 z-20 flex gap-1">
        {reels.map((_, barIndex) => (
          <span key={barIndex} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
            <span
              className="absolute inset-y-0 left-0 bg-white"
              style={{
                width:
                  barIndex < index ? "100%" : barIndex === index ? `${progress * 100}%` : "0%",
              }}
            />
          </span>
        ))}
      </div>

      <div className="absolute top-8 right-2 left-4 z-20 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold tracking-[0.14em]">THE BECOMING</span>
          <span className="text-[0.7rem] tracking-[0.1em] text-on-dark">
            <span className="sr-only">Reel </span>
            {index + 1} / {reels.length}
          </span>
        </div>
        <div className="flex gap-1">
          {reel.src && (
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              aria-label={muted ? "Unmute" : "Mute"}
              aria-pressed={muted}
              className="grid size-11 place-items-center rounded-full text-white transition-silk hover:bg-white/10"
            >
              {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
          )}
          <DialogClose
            aria-label="Close reels"
            className="grid size-11 place-items-center rounded-full text-white transition-silk hover:bg-white/10"
          >
            <X size={22} />
          </DialogClose>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3.5 px-5 pb-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-on-dark">
          {title}
        </p>
        {reel.caption && (
          <p className="font-heading text-2xl font-light leading-snug">{reel.caption}</p>
        )}
        <button
          type="button"
          onClick={onSeeUpcoming}
          className="motion-button mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cream px-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-silk hover:bg-white"
        >
          Upcoming experiences
          <ArrowRight size={15} />
        </button>
        <p className="text-center text-[0.7rem] uppercase tracking-[0.12em] text-on-dark">
          Tap the sides to skip
        </p>
      </div>
    </div>
  );
}
