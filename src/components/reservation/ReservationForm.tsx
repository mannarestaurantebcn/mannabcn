"use client";

import { useMemo, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { Button } from "@/components/ui/Button";
import { getTimeSlots } from "@/lib/opening-hours";

type ReservationFormProps = {
  form: Dictionary["reservation"]["form"];
  locale: Locale;
};

const inputClass =
  "w-full border border-charcoal/60 bg-maroon-soft/40 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 transition-colors duration-300 [color-scheme:light] focus:border-gold focus:outline-none";
const labelClass = "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-charcoal/55";
// Native <option> popups don't render translucent backgrounds reliably, so they need a solid color.
const optionStyle = { backgroundColor: "#efeae0", color: "#430c05" };

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

const todayIso = () => new Date().toISOString().slice(0, 10);
/** Mirrors MAX_DAYS_AHEAD in the reservations API route. */
const MAX_DAYS_AHEAD = 180;
const maxBookableIso = () => new Date(Date.now() + MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Mirrors PHONE_RE / MIN_NAME_LENGTH in the reservations API route. Enforced via
 * setCustomValidity rather than relying solely on `pattern`/`minLength`, since some
 * browsers apply those constraints inconsistently. */
const PHONE_RE = /^[0-9+()\-\s]{6,30}$/;
const MIN_NAME_LENGTH = 3;

function applyCustomValidity(target: FormControl) {
  if (!("setCustomValidity" in target)) return;
  if (target.name === "phone") {
    target.setCustomValidity(target.value === "" || PHONE_RE.test(target.value) ? "" : "invalid");
  } else if (target.name === "name") {
    target.setCustomValidity(target.value === "" || target.value.trim().length >= MIN_NAME_LENGTH ? "" : "invalid");
  }
}

const PHONE_ALLOWED_CHARS = /[^0-9+()\-\s]/g;

function handlePhoneInput(event: FormEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  const sanitized = input.value.replace(PHONE_ALLOWED_CHARS, "");
  if (sanitized !== input.value) input.value = sanitized;
}

export function ReservationForm({ form, locale }: ReservationFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [isValid, setIsValid] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);
  const minDate = useMemo(() => todayIso(), []);
  const maxDate = useMemo(() => maxBookableIso(), []);
  const timeSlots = useMemo(() => (date ? getTimeSlots(date) : []), [date]);

  function handleFormInput(event: FormEvent<HTMLFormElement>) {
    const target = event.target as unknown as FormControl;
    applyCustomValidity(target);
    setIsValid(formRef.current?.checkValidity() ?? false);

    // Clear an already-shown error as soon as the field becomes valid again.
    if (target.name && fieldErrors.has(target.name) && target.validity?.valid) {
      setFieldErrors((prev) => {
        const next = new Set(prev);
        next.delete(target.name);
        return next;
      });
    }
  }

  function handleFieldBlur(event: FocusEvent<HTMLFormElement>) {
    const target = event.target as unknown as FormControl;
    if (!target.name) return;
    applyCustomValidity(target);
    setFieldErrors((prev) => {
      const next = new Set(prev);
      if (target.validity.valid) next.delete(target.name);
      else next.add(target.name);
      return next;
    });
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value);
    setTime("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    setStatus("submitting");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          date: data.get("date"),
          time: data.get("time"),
          guests: Number(data.get("guests")),
          requests: data.get("requests"),
          company: data.get("company"),
          locale,
        }),
      });

      if (res.status === 409) {
        setStatus("unavailable");
        return;
      }
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      formElement.reset();
      setDate("");
      setTime("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="border border-gold/40 bg-gold/5 p-8 text-center">
        <h3 className="font-display text-xl italic text-charcoal">{form.successTitle}</h3>
        <p className="mt-3 text-sm text-charcoal/70">{form.successMessage}</p>
        <p className="mt-2 text-[0.78rem] text-charcoal/45">{form.successSpamNote}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={handleFormInput}
      onBlur={handleFieldBlur}
      noValidate
      className="min-w-0 grid gap-6 sm:grid-cols-2"
    >
      {/* Honeypot: hidden from real users, but bots that fill every field will trip it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
        <label htmlFor="company">Empresa</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className={labelClass} htmlFor="name">
          {form.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={3}
          maxLength={100}
          className={inputClass}
        />
        {fieldErrors.has("name") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.nameError}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="email">
          {form.email}
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} className={inputClass} />
        {fieldErrors.has("email") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.emailError}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="phone">
          {form.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+()\-\s]{6,30}"
          onInput={handlePhoneInput}
          required
          maxLength={30}
          className={inputClass}
        />
        {fieldErrors.has("phone") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.phoneError}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="guests">
          {form.guests}
        </label>
        <input
          id="guests"
          name="guests"
          type="number"
          inputMode="numeric"
          min={1}
          max={40}
          required
          className={inputClass}
        />
        {fieldErrors.has("guests") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.guestsError}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="date">
          {form.date}
        </label>
        <input
          id="date"
          name="date"
          type="date"
          lang={locale === "en" ? "en-GB" : "es-ES"}
          min={minDate}
          max={maxDate}
          required
          value={date}
          onChange={handleDateChange}
          className={inputClass}
        />
        {fieldErrors.has("date") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.dateError}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="time">
          {form.time}
        </label>
        <select
          id="time"
          name="time"
          required
          disabled={!date}
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className={inputClass}
        >
          <option value="" disabled style={optionStyle}>
            {date ? form.timeChoose : form.timeSelectDateFirst}
          </option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot} style={optionStyle}>
              {slot}
            </option>
          ))}
        </select>
        {fieldErrors.has("time") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.timeError}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="requests">
          {form.requests}
        </label>
        <textarea
          id="requests"
          name="requests"
          rows={4}
          maxLength={500}
          placeholder={form.requestsPlaceholder}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" disabled={status === "submitting" || !isValid}>
          {status === "submitting" ? form.submitting : form.submit}
        </Button>
        <p className="mt-4 text-[0.78rem] text-charcoal/45">{form.disclaimer}</p>
        <div role="status" aria-live="polite">
          {status === "error" && <p className="mt-2 text-[0.78rem] text-terracotta">{form.errorMessage}</p>}
          {status === "unavailable" && <p className="mt-2 text-[0.78rem] text-terracotta">{form.unavailableMessage}</p>}
        </div>
      </div>
    </form>
  );
}
