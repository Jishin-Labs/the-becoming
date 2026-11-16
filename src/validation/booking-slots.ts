// The one-hour slots people can request, and which of them are still open.
// The browser uses this to grey out past slots, and the server uses it (through
// the booking schema) to reject them, so it stays free of browser- and
// Node-only APIs.

// Slots are Kamo's working hours in Johannesburg, so "already passed" is judged
// on the Johannesburg clock, wherever the visitor is.
const bookingTimeZone = "Africa/Johannesburg";

const firstStartHour = 8;
const slotCount = 10;

export type BookingSlot = {
  /** What the visitor sees and what the request sends, e.g. "8am - 9am". */
  label: string;
  /** 24-hour clock, e.g. 13 for 1pm. */
  startHour: number;
};

function hourLabel(hour: number) {
  if (hour === 0) {
    return "12am";
  }
  if (hour < 12) {
    return `${hour}am`;
  }
  if (hour === 12) {
    return "12pm";
  }
  return `${hour - 12}pm`;
}

export const bookingSlots: BookingSlot[] = Array.from(
  { length: slotCount },
  (_, index) => {
    const startHour = firstStartHour + index;
    return {
      startHour,
      label: `${hourLabel(startHour)} - ${hourLabel(startHour + 1)}`,
    };
  },
);

export function findBookingSlot(label: string) {
  return bookingSlots.find((slot) => slot.label === label);
}

/** The date and time of day in Johannesburg at a given moment. */
export type JohannesburgClock = {
  /** "YYYY-MM-DD", the same format a date input gives. */
  date: string;
  minutesSinceMidnight: number;
};

const clockFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: bookingTimeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function johannesburgClock(now = new Date()): JohannesburgClock {
  const parts = Object.fromEntries(
    clockFormat.formatToParts(now).map((part) => [part.type, part.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutesSinceMidnight: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

/**
 * Whether a slot on `date` has not started yet. On a past date nothing is
 * open; on a future date everything is.
 */
export function isSlotOpen(
  date: string,
  slot: BookingSlot,
  clock = johannesburgClock(),
) {
  // "YYYY-MM-DD" strings sort in date order, so plain comparison works.
  if (date !== clock.date) {
    return date > clock.date;
  }
  return slot.startHour * 60 > clock.minutesSinceMidnight;
}

/** Today, or tomorrow once today's last slot has started. */
export function earliestBookableDate(clock = johannesburgClock()) {
  const todayHasOpenSlot = bookingSlots.some((slot) =>
    isSlotOpen(clock.date, slot, clock),
  );
  if (todayHasOpenSlot) {
    return clock.date;
  }

  const tomorrow = new Date(`${clock.date}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}
