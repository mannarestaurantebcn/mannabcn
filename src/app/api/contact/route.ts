import { NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;

type ContactInput = { name: string; email: string; message: string };

function parseContactInput(body: unknown): { ok: true; data: ContactInput } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "invalid_body" };
  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: "invalid_name" };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return { ok: false, error: "invalid_email" };
  }
  if (typeof message !== "string" || message.trim().length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: "invalid_message" };
  }

  return { ok: true, data: { name: name.trim(), email: email.trim(), message: message.trim() } };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in.
  if (typeof body === "object" && body !== null && "company" in body && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseContactInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  try {
    await sendContactMessage(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Failed to send contact message:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
