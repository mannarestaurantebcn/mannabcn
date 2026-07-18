import { NextResponse } from "next/server";
import { createReservationEvent, SlotBlockedError, SlotFullError, type ReservationInput } from "@/lib/google-calendar";
import { isTimeSlotValid } from "@/lib/opening-hours";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function parseReservationInput(body: unknown): { ok: true; data: ReservationInput } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "invalid_body" };
  const { name, email, phone, date, time, guests, requests } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) return { ok: false, error: "invalid_name" };
  if (typeof email !== "string" || !EMAIL_RE.test(email)) return { ok: false, error: "invalid_email" };
  if (typeof phone !== "string" || phone.trim().length === 0) return { ok: false, error: "invalid_phone" };
  if (typeof date !== "string" || !DATE_RE.test(date)) return { ok: false, error: "invalid_date" };
  if (typeof time !== "string" || !TIME_RE.test(time)) return { ok: false, error: "invalid_time" };
  if (typeof date === "string" && typeof time === "string" && !isTimeSlotValid(date, time)) {
    return { ok: false, error: "invalid_time" };
  }

  const guestsNumber = typeof guests === "number" ? guests : Number(guests);
  if (!Number.isInteger(guestsNumber) || guestsNumber < 1 || guestsNumber > 20) {
    return { ok: false, error: "invalid_guests" };
  }

  const today = new Date().toISOString().slice(0, 10);
  if (date < today) return { ok: false, error: "invalid_date" };

  if (requests !== undefined && typeof requests !== "string") return { ok: false, error: "invalid_requests" };

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
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseReservationInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  try {
    await createReservationEvent(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SlotBlockedError || error instanceof SlotFullError) {
      return NextResponse.json({ ok: false, error: "slot_unavailable" }, { status: 409 });
    }
    console.error("[api/reservations] Failed to create calendar event:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
