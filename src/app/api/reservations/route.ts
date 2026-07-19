import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/i18n/config";
import { createReservationEvent, SlotBlockedError, SlotFullError, type ReservationInput } from "@/lib/google-calendar";
import { isTimeSlotValid } from "@/lib/opening-hours";
import { sendReservationConfirmationEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,30}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_PHONE_LENGTH = 30;
const MAX_REQUESTS_LENGTH = 500;
/** How far ahead guests can book, so the form can't be used to spam the calendar with far-future junk. */
const MAX_DAYS_AHEAD = 180;

function parseReservationInput(
  body: unknown,
): { ok: true; data: ReservationInput; locale: Locale } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "invalid_body" };
  const { name, email, phone, date, time, guests, requests, locale } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: "invalid_name" };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return { ok: false, error: "invalid_email" };
  }
  if (typeof phone !== "string" || phone.length > MAX_PHONE_LENGTH || !PHONE_RE.test(phone.trim())) {
    return { ok: false, error: "invalid_phone" };
  }
  if (typeof date !== "string" || !DATE_RE.test(date)) return { ok: false, error: "invalid_date" };
  if (typeof time !== "string" || !TIME_RE.test(time)) return { ok: false, error: "invalid_time" };
  if (typeof date === "string" && typeof time === "string" && !isTimeSlotValid(date, time)) {
    return { ok: false, error: "invalid_time" };
  }

  const guestsNumber = typeof guests === "number" ? guests : Number(guests);
  if (!Number.isInteger(guestsNumber) || guestsNumber < 1 || guestsNumber > 40) {
    return { ok: false, error: "invalid_guests" };
  }

  const today = new Date().toISOString().slice(0, 10);
  const maxDate = new Date(Date.now() + MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (date < today || date > maxDate) return { ok: false, error: "invalid_date" };

  if (requests !== undefined && (typeof requests !== "string" || requests.length > MAX_REQUESTS_LENGTH)) {
    return { ok: false, error: "invalid_requests" };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      time,
      guests: guestsNumber,
      requests: typeof requests === "string" && requests.trim().length > 0 ? requests.trim() : undefined,
    },
    locale: typeof locale === "string" && isLocale(locale) ? locale : "es",
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in. If it's set, this is a bot —
  // pretend success so it doesn't learn to work around the check, but skip the actual booking.
  if (typeof body === "object" && body !== null && "company" in body && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseReservationInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  try {
    await createReservationEvent(parsed.data);
  } catch (error) {
    if (error instanceof SlotBlockedError || error instanceof SlotFullError) {
      return NextResponse.json({ ok: false, error: "slot_unavailable" }, { status: 409 });
    }
    console.error("[api/reservations] Failed to create calendar event:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  // The reservation itself is already booked at this point — a failed confirmation
  // email shouldn't turn into an error for the customer, just get logged.
  try {
    await sendReservationConfirmationEmail(parsed.data, parsed.locale);
  } catch (error) {
    console.error("[api/reservations] Failed to send confirmation email:", error);
  }

  return NextResponse.json({ ok: true });
}
