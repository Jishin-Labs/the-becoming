import { useState } from "react";
import { CalendarDays, ImageIcon, MapPin, Play } from "lucide-react";

import {
  type PastExperience,
  type PhotoLayout,
  mediaCount,
  padNumber,
  placeholderTone,
} from "@/components/moments/content";
import { PhotoLightbox, ReelViewer } from "@/components/moments/media-viewers";
import { Eyebrow, MediaChip } from "@/components/moments/parts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type MediaFilter = "all" | "photos" | "reels";

const filters: Array<{ value: MediaFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "photos", label: "Photos" },
  { value: "reels", label: "Reels" },
];

const PHOTOS_PER_PAGE = 12;

/**
 * Tiles are 3:2 to suit landscape photos; spans make a few stand out.
 * Tall and large tiles span two rows; their ratios roughly match two 3:2 rows.
 */
const layoutSpan: Record<PhotoLayout, string> = {
  standard: "aspect-[3/2]",
  wide: "col-span-2 aspect-[3/1]",
  tall: "row-span-2 aspect-[3/4]",
  large: "col-span-2 row-span-2 aspect-[3/2]",
};

/** Photos and reels from one past experience, with their viewers. */
export function ExperienceGallery({
  experience,
  onSeeUpcoming,
}: {
  experience: PastExperience;
  onSeeUpcoming: () => void;
}) {
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [visiblePhotos, setVisiblePhotos] = useState(PHOTOS_PER_PAGE);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [reelIndex, setReelIndex] = useState<number | null>(null);

  const { photos, reels } = experience;
  const hasBoth = photos.length > 0 && reels.length > 0;
  const showReels = reels.length > 0 && filter !== "photos";
  const showPhotos = photos.length > 0 && filter !== "reels";

  return (
    <div className="flex flex-col gap-12 sm:gap-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Past experience</Eyebrow>
          <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight text-ink sm:text-4xl md:text-5xl">
            {experience.title}
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-bronze" aria-hidden="true" />
              {experience.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-bronze" aria-hidden="true" />
              {experience.venue}
            </span>
            <span>{mediaCount(experience)}</span>
          </div>
        </div>

        {hasBoth && (
          <ToggleGroup
            aria-label="Show media"
            value={[filter]}
            onValueChange={(value) => {
              if (value[0]) setFilter(value[0] as MediaFilter);
            }}
            spacing={2}
          >
            {filters.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                variant="outline"
                className="h-11 rounded-full border-line-strong px-5 text-espresso transition-silk hover:border-espresso hover:bg-sand aria-pressed:border-espresso aria-pressed:bg-espresso aria-pressed:text-white aria-pressed:hover:bg-espresso"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </div>

      {showReels && (
        <section aria-labelledby="moments-reels-heading" className="flex flex-col gap-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 id="moments-reels-heading" className="font-heading text-2xl font-light text-ink sm:text-3xl">
              Reels
            </h3>
            {reels.length > 2 && (
              <span aria-hidden="true" className="text-xs tracking-[0.08em] text-ink-soft">
                <span className="sm:hidden">Swipe for more →</span>
                <span className="hidden sm:inline">Scroll for more →</span>
              </span>
            )}
          </div>

          <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:scroll-px-6 sm:gap-4 sm:px-6">
            {reels.map((reel, index) => (
              <li key={index} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => setReelIndex(index)}
                  aria-label={`Play reel ${index + 1}${reel.caption ? `: ${reel.caption}` : ""}`}
                  className="group relative block aspect-[9/16] w-[9.5rem] overflow-hidden rounded-2xl sm:w-[13.5rem] sm:rounded-[1.25rem]"
                  style={{ backgroundColor: placeholderTone(index + 2) }}
                >
                  {reel.poster && (
                    <img
                      src={reel.poster}
                      alt=""
                      loading="lazy"
                      className="motion-card-media absolute inset-0 size-full object-cover group-hover:scale-[1.035]"
                    />
                  )}
                  <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-sm transition-silk group-hover:scale-105 sm:size-15">
                    <Play size={20} fill="currentColor" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-x-3 bottom-3 flex justify-between gap-2">
                    <MediaChip>Reel {padNumber(index + 1)}</MediaChip>
                    {reel.duration && <MediaChip>{reel.duration}</MediaChip>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showPhotos && (
        <section aria-labelledby="moments-photos-heading" className="flex flex-col gap-5">
          <h3 id="moments-photos-heading" className="font-heading text-2xl font-light text-ink sm:text-3xl">
            Photos
          </h3>

          <ul className="grid grid-cols-2 gap-2.5 [grid-auto-flow:dense] sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4">
            {photos.slice(0, visiblePhotos).map((photo, index) => (
              <li key={index} className={layoutSpan[photo.layout ?? "standard"]}>
                <button
                  type="button"
                  onClick={() => setPhotoIndex(index)}
                  aria-label={`Open photo ${index + 1}: ${photo.alt}`}
                  className="group relative grid size-full cursor-zoom-in place-items-center overflow-hidden rounded-xl text-ink-soft sm:rounded-2xl"
                  style={{ backgroundColor: placeholderTone(index) }}
                >
                  {photo.src ? (
                    <img
                      src={photo.src}
                      alt=""
                      loading="lazy"
                      className="motion-card-media absolute inset-0 size-full object-cover group-hover:scale-[1.035]"
                    />
                  ) : (
                    <>
                      <ImageIcon size={26} strokeWidth={1.3} aria-hidden="true" />
                      <span className="absolute bottom-3 left-3">
                        <MediaChip>Photo {padNumber(index + 1)}</MediaChip>
                      </span>
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {visiblePhotos < photos.length && (
            <div className="flex justify-center pt-3">
              <button
                type="button"
                onClick={() => setVisiblePhotos((count) => count + PHOTOS_PER_PAGE)}
                className="motion-button inline-flex min-h-12 items-center justify-center rounded-full border border-espresso px-8 text-xs font-semibold uppercase tracking-[0.16em] text-espresso transition-silk hover:-translate-y-0.5 hover:bg-sand"
              >
                Load more moments
              </button>
            </div>
          )}
        </section>
      )}

      <PhotoLightbox
        title={experience.title}
        photos={photos}
        openIndex={photoIndex}
        onClose={() => setPhotoIndex(null)}
      />
      {reels.length > 0 && (
        <ReelViewer
          title={experience.title}
          reels={reels}
          openIndex={reelIndex}
          onClose={() => setReelIndex(null)}
          onSeeUpcoming={() => {
            setReelIndex(null);
            onSeeUpcoming();
          }}
        />
      )}
    </div>
  );
}
