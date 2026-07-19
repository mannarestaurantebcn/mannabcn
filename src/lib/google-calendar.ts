import { google, type calendar_v3 } from "googleapis";

const TIME_ZONE = "Europe/Madrid";
const RESERVATION_DURATION_HOURS = 2;

/** Total guests the restaurant can seat at once for online bookings. */
const MAX_GUESTS_PER_SLOT = Number(process.env.RESERVATION_MAX_GUESTS_PER_SLOT) || 40;

/** Marks an event as created by the website's own reservation form, as opposed to one the client added manually (phone booking, private event…). */
const WEBSITE_SOURCE_TAG = "website";

export type ReservationInput = {
  name: string;
  email: string;
  phone: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM */
  time: string;
  guests: number;
  requests?: string;
};

/** The requested slot overlaps an event the client added manually — treated as fully booked. */
export class SlotBlockedError extends Error {}

/** The requested slot has enough existing website reservations to hit capacity. */
export class SlotFullError extends Error {}

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: getEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: getEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });
  return google.calendar({ version: "v3", auth });
}

/**
 * Adds `hours` to a local wall-clock date/time, handling day rollover, without
 * ever touching an actual time zone conversion (Google Calendar API accepts a
 * timezone-less dateTime + a separate `timeZone` field, so all we need here is
 * correct calendar arithmetic).
 */
function addHours(date: string, time: string, hours: number) {
  const asUtc = new Date(`${date}T${time}:00Z`);
  asUtc.setUTCHours(asUtc.getUTCHours() + hours);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${asUtc.getUTCFullYear()}-${pad(asUtc.getUTCMonth() + 1)}-${pad(asUtc.getUTCDate())}`,
    time: `${pad(asUtc.getUTCHours())}:${pad(asUtc.getUTCMinutes())}`,
  };
}

/** How far (in ms) `timeZone`'s wall clock is ahead of UTC at the given instant. */
function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return asUtc - date.getTime();
}

/** Converts a local wall-clock date/time in `timeZone` to the real UTC instant it represents. */
function zonedTimeToUtcDate(date: string, time: string, timeZone: string): Date {
  const guess = new Date(`${date}T${time}:00Z`);
  const offsetMs = getTimeZoneOffsetMs(guess, timeZone);
  return new Date(guess.getTime() - offsetMs);
}

type CapacityImpact = { type: "guests"; count: number } | { type: "block" };

/**
 * How much of the capacity an existing event takes up. Website reservations are
 * always tagged with their real guest count. A manual entry (phone booking, private
 * event…) blocks the whole slot by default — unless its title has "(N)", e.g.
 * "Familia López (4)", in which case it only reserves N seats.
 */
function resolveEventCapacityImpact(event: calendar_v3.Schema$Event): CapacityImpact {
  const props = event.extendedProperties?.private;
  if (props?.source === WEBSITE_SOURCE_TAG) {
    const guests = Number(props.guests);
    return Number.isFinite(guests) ? { type: "guests", count: guests } : { type: "block" };
  }

  const match = event.summary?.match(/\((\d{1,3})\)/);
  if (match) return { type: "guests", count: Number(match[1]) };

  return { type: "block" };
}

async function assertSlotAvailable(
  calendar: calendar_v3.Calendar,
  calendarId: string,
  start: Date,
  end: Date,
  requestedGuests: number,
) {
  const { data } = await calendar.events.list({
    calendarId,
    timeMin: new Date(start.getTime() - RESERVATION_DURATION_HOURS * 60 * 60 * 1000).toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  let reservedGuests = 0;

  for (const event of data.items ?? []) {
    // An all-day entry (e.g. "Closed for a private event") blocks the whole day.
    if (event.start?.date && !event.start.dateTime) {
      throw new SlotBlockedError("Slot blocked by an all-day event");
    }
    if (!event.start?.dateTime || !event.end?.dateTime) continue;

    const eventStart = new Date(event.start.dateTime);
    const eventEnd = new Date(event.end.dateTime);
    const overlaps = eventStart < end && start < eventEnd;
    if (!overlaps) continue;

    const impact = resolveEventCapacityImpact(event);
    if (impact.type === "block") {
      throw new SlotBlockedError("Slot blocked by a manually added event");
    }
    reservedGuests += impact.count;
  }

  if (reservedGuests + requestedGuests > MAX_GUESTS_PER_SLOT) {
    throw new SlotFullError("Slot is at capacity");
  }
}

export async function createReservationEvent(reservation: ReservationInput) {
  const calendar = getCalendarClient();
  const calendarId = getEnv("GOOGLE_CALENDAR_ID");
  const end = addHours(reservation.date, reservation.time, RESERVATION_DURATION_HOURS);

  const start = zonedTimeToUtcDate(reservation.date, reservation.time, TIME_ZONE);
  const endUtc = zonedTimeToUtcDate(end.date, end.time, TIME_ZONE);

  await assertSlotAvailable(calendar, calendarId, start, endUtc, reservation.guests);

  const descriptionLines = [
    `Teléfono: ${reservation.phone}`,
    `Email: ${reservation.email}`,
    `Comensales: ${reservation.guests}`,
  ];
  if (reservation.requests) descriptionLines.push(`Petición especial: ${reservation.requests}`);

  await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Reserva - ${reservation.name} (${reservation.guests} pers.)`,
      description: descriptionLines.join("\n"),
      start: { dateTime: `${reservation.date}T${reservation.time}:00`, timeZone: TIME_ZONE },
      end: { dateTime: `${end.date}T${end.time}:00`, timeZone: TIME_ZONE },
      extendedProperties: {
        private: {
          source: WEBSITE_SOURCE_TAG,
          guests: String(reservation.guests),
        },
      },
    },
  });
}
