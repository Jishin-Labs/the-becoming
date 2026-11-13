import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, Mail, MapPin, Ticket } from "lucide-react";

import {
  type PastExperience,
  contactEmail,
  mediaCount,
  pastExperiences,
  placeholderTone,
  upcomingExperiences,
} from "@/components/moments/content";
import { ExperienceGallery } from "@/components/moments/gallery";
import { Eyebrow } from "@/components/moments/parts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MomentsTab = "gallery" | "highlights" | "upcoming";

const tabTriggerClass =
  "h-auto flex-none px-2.5 py-4 text-[0.68rem] tracking-[0.1em] sm:tracking-[0.18em] text-[#6e5d53] hover:text-[#2a2421] data-active:text-[#2a2421] after:bg-[#2a2421] group-data-horizontal/tabs:after:bottom-0 sm:px-6 sm:py-5 sm:text-xs";

const darkButtonClass =
  "motion-button h-12 rounded-full bg-[#4a3e39] px-7 text-primary-foreground transition-silk hover:-translate-y-0.5 hover:bg-[#7a6457]";

const outlineButtonClass =
  "motion-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4a3e39] px-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#4a3e39] transition-silk hover:-translate-y-0.5 hover:bg-[#f7efe6]";

export function MomentsPage({ onBook }: { onBook: () => void }) {
  const latest = pastExperiences[0];
  const [tab, setTab] = useState<MomentsTab>(latest ? "gallery" : "upcoming");
  const [experienceId, setExperienceId] = useState(latest?.id);
  const tabsRef = useRef<HTMLDivElement>(null);

  const experience =
    pastExperiences.find((item) => item.id === experienceId) ?? latest;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Moments & Experiences | The Becoming";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const showTab = (next: MomentsTab) => {
    setTab(next);
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openExperience = (id: string) => {
    setExperienceId(id);
    showTab("gallery");
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="animate-glow-pulse absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#f2e8dc] blur-3xl sm:h-[460px] sm:w-[460px]" />
        <div className="relative mx-auto flex max-w-3xl animate-fade-up-soft flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-24">
          <Eyebrow>Moments &amp; Experiences</Eyebrow>
          <h1 className="mt-5 font-heading text-[2.5rem] font-light leading-[1.05] tracking-tight text-[#2a2421] sm:text-6xl md:text-7xl">
            Moments we&rsquo;ve <em className="text-[#8a6a52]">shared</em>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#6e5d53] sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            Gatherings for creativity, conversation and connection. Look back on
            the moments we&rsquo;ve shared, and see what&rsquo;s coming next.
          </p>
        </div>
      </section>

      <Tabs
        ref={tabsRef}
        value={tab}
        onValueChange={(value) => setTab(value as MomentsTab)}
        className="scroll-mt-18 gap-0 sm:scroll-mt-20"
      >
        <div className="sticky top-18 z-30 border-y border-border bg-background/95 backdrop-blur-xl sm:top-20">
          <TabsList
            variant="line"
            aria-label="Moments and experiences"
            className="mx-auto flex h-auto w-full max-w-380 justify-start gap-0 overflow-x-auto p-0 px-2 group-data-horizontal/tabs:h-auto sm:justify-center sm:px-6"
          >
            {experience && (
              <TabsTrigger value="gallery" className={tabTriggerClass}>
                {experience.title}
              </TabsTrigger>
            )}
            {/* {pastExperiences.length > 0 && (
              <TabsTrigger value="highlights" className={tabTriggerClass}>
                <span className="sm:hidden">Highlights</span>
                <span className="hidden sm:inline">Event highlights</span>
              </TabsTrigger>
            )} */}
            {/* <TabsTrigger value="upcoming" className={tabTriggerClass}>
              <span className="sm:hidden">Upcoming</span>
              <span className="hidden sm:inline">Upcoming experiences</span>
            </TabsTrigger> */}
          </TabsList>
        </div>

        {experience && (
          <TabsContent value="gallery" className="text-base">
            <div className="mx-auto max-w-380 px-4 py-12 sm:px-6 sm:py-16">
              <ExperienceGallery
                key={experience.id}
                experience={experience}
                onSeeUpcoming={() => showTab("upcoming")}
              />
            </div>
          </TabsContent>
        )}

        <TabsContent value="highlights" className="text-base">
          <div className="mx-auto max-w-380 px-4 py-12 sm:px-6 sm:py-16">
            <HighlightsPanel experiences={pastExperiences} onOpen={openExperience} />
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="text-base">
          <div className="mx-auto max-w-380 px-4 py-12 sm:px-6 sm:py-16">
            <UpcomingPanel onBook={onBook} />
          </div>
        </TabsContent>
      </Tabs>

      {/* <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="motion-panel mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-[1.75rem] bg-[#f2e8dc] px-5 py-12 text-center sm:rounded-[2rem] sm:px-8 sm:py-16 md:rounded-[2.5rem]">
          <h2 className="max-w-2xl font-heading text-[2rem] font-light leading-tight tracking-tight text-[#2a2421] sm:text-4xl md:text-5xl">
            Want to be part of the{" "}
            <em className="text-[#8a6a52]">next moment?</em>
          </h2>
          <p className="max-w-lg text-sm leading-7 text-[#6e5d53] sm:text-base">
            See what&rsquo;s coming up next, or book a one-on-one consultation.
          </p>
          <div className="mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button onClick={() => showTab("upcoming")} className={darkButtonClass}>
              See upcoming experiences
              <ArrowRight size={15} className="transition-silk group-hover/button:translate-x-1" />
            </Button>
            <button type="button" onClick={onBook} className={outlineButtonClass}>
              Book consultation
            </button>
          </div>
        </div>
      </section> */}
    </>
  );
}

function HighlightsPanel({
  experiences,
  onOpen,
}: {
  experiences: PastExperience[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Eyebrow>Event highlights</Eyebrow>
        <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight text-[#2a2421] sm:text-4xl md:text-5xl">
          Every gathering, in one place
        </h2>
      </div>

      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((experience, index) => {
          const cover = experience.photos.find((photo) => photo.src)?.src;
          return (
            <li key={experience.id}>
              <article className="motion-card group flex flex-col gap-4 transition-silk">
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]"
                  style={{ backgroundColor: placeholderTone(index + 1) }}
                >
                  {cover && (
                    <img
                      src={cover}
                      alt=""
                      loading="lazy"
                      className="motion-card-media absolute inset-0 size-full object-cover"
                    />
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-[#faf6ef] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#4a3e39]">
                    {index === 0 ? "Latest" : "Past"}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#6e5d53]">
                    {experience.date}
                  </p>
                  <h3 className="font-heading text-2xl font-light text-[#2a2421] sm:text-3xl">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-[#6e5d53]">{mediaCount(experience)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpen(experience.id)}
                  className="motion-link inline-flex min-h-11 items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.16em] text-[#4a3e39] transition-gentle hover:text-[#8a6a52]"
                >
                  View gallery
                  <span className="sr-only">: {experience.title}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function UpcomingPanel({ onBook }: { onBook: () => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Eyebrow>Upcoming experiences</Eyebrow>
        <h2 className="mt-4 font-heading text-[2rem] font-light tracking-tight text-[#2a2421] sm:text-4xl md:text-5xl">
          Save the date
        </h2>
      </div>

      {upcomingExperiences.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-[1.75rem] border border-dashed border-[#d8cbbb] px-6 py-10 sm:rounded-[2rem] sm:px-10">
          <h3 className="font-heading text-2xl font-light text-[#2a2421] sm:text-3xl">
            The next experience is being planned
          </h3>
          <p className="max-w-xl text-sm leading-7 text-[#6e5d53]">
            New dates will be shared here soon. In the meantime, you can book a
            one-on-one consultation.
          </p>
          <Button onClick={onBook} className={darkButtonClass}>
            Book consultation
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-8">
          {upcomingExperiences.map((event, index) => (
            <li key={event.id}>
              <article className="flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-sm md:flex-row sm:rounded-[2rem]">
                <div
                  className="relative min-h-64 md:min-h-[24rem] md:w-[45%]"
                  style={{ backgroundColor: placeholderTone(index + 1) }}
                >
                  {event.image && (
                    <img
                      src={event.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover"
                    />
                  )}
                  <p className="absolute top-5 left-5 flex flex-col items-center gap-0.5 rounded-2xl bg-[#faf6ef] px-4 py-3 text-center text-[#2a2421]">
                    <span className="font-heading text-4xl leading-none font-light">{event.day}</span>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
                      {event.month}
                    </span>
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-5 px-5 py-8 sm:px-10 sm:py-10">
                  <Eyebrow>{index === 0 ? "Next experience" : "Coming up"}</Eyebrow>
                  <h3 className="font-heading text-3xl font-light leading-tight text-[#2a2421] sm:text-4xl">
                    {event.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-7 text-[#6e5d53] sm:text-base sm:leading-8">
                    {event.description}
                  </p>
                  <dl className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#2a2421]">
                    <EventDetail icon={<Clock size={16} />} label="Time" value={event.time} />
                    <EventDetail icon={<MapPin size={16} />} label="Venue" value={event.venue} />
                    <EventDetail icon={<Ticket size={16} />} label="Price" value={event.price} />
                  </dl>
                  <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
                    <span className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f7efe6] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#6e5d53]">
                      Reservations open soon
                    </span>
                    <a
                      href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Question about ${event.title}`)}`}
                      className={outlineButtonClass}
                    >
                      <Mail size={15} aria-hidden="true" />
                      Ask about this experience
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <dt className="text-[#8a6a52]">
        <span aria-hidden="true">{icon}</span>
        <span className="sr-only">{label}</span>
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
