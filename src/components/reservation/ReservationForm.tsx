"use client";

import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { Button } from "@/components/ui/Button";
import { getTimeSlots } from "@/lib/opening-hours";

type ReservationFormProps = {
  form: Dictionary["reservation"]["form"];
};

const inputClass =
  "w-full border border-line bg-maroon-soft/40 px-4 py-3 text-sm text-cream placeholder:text-cream/35 transition-colors duration-300 [color-scheme:dark] focus:border-gold focus:outline-none";
const labelClass = "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cream/55";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

const todayIso = () => new Date().toISOString().slice(0, 10);

export function ReservationForm({ form }: ReservationFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [isValid, setIsValid] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const minDate = useMemo(() => todayIso(), []);
  const timeSlots = useMemo(() => (date ? getTimeSlots(date) : []), [date]);

  function handleFormInput() {
    setIsValid(formRef.current?.checkValidity() ?? false);
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
      <div className="border border-gold/40 bg-gold/5 p-8 text-center">
        <h3 className="font-display text-xl italic text-cream">{form.successTitle}</h3>
        <p className="mt-3 text-sm text-cream/70">{form.successMessage}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} onInput={handleFormInput} noValidate className="grid gap-6 sm:grid-cols-2">
      <div>
        <label className={labelClass} htmlFor="name">
          {form.name}
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="email">
          {form.email}
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="phone">
          {form.phone}
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="guests">
          {form.guests}
        </label>
        <input id="guests" name="guests" type="number" min={1} max={20} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="date">
          {form.date}
        </label>
        <input
          id="date"
          name="date"
          type="date"
          min={minDate}
          required
          value={date}
          onChange={handleDateChange}
          className={inputClass}
        />
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
          <option value="" disabled>
            {date ? form.timeChoose : form.timeSelectDateFirst}
          </option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="requests">
          {form.requests}
        </label>
        <textarea
          id="requests"
          name="requests"
          rows={4}
          placeholder={form.requestsPlaceholder}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" disabled={status === "submitting" || !isValid}>
          {status === "submitting" ? form.submitting : form.submit}
        </Button>
        <p className="mt-4 text-[0.78rem] text-cream/45">{form.disclaimer}</p>
        {status === "error" && <p className="mt-2 text-[0.78rem] text-terracotta">{form.errorMessage}</p>}
        {status === "unavailable" && <p className="mt-2 text-[0.78rem] text-terracotta">{form.unavailableMessage}</p>}
      </div>
    </form>
  );
}
