"use client";

import type { FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { Button } from "@/components/ui/Button";

type ContactFormProps = {
  form: Dictionary["contact"]["form"];
};

const inputClass =
  "w-full border border-line bg-maroon-soft/40 px-4 py-3 text-sm text-cream placeholder:text-cream/35 transition-colors duration-300 focus:border-gold focus:outline-none";
const labelClass = "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cream/55";

/** Design preview only — no submit logic yet, pending backend integration. */
export function ContactForm({ form }: ContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <div>
        <label className={labelClass} htmlFor="contact-name">
          {form.name}
        </label>
        <input id="contact-name" name="name" type="text" autoComplete="name" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-email">
          {form.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">
          {form.message}
        </label>
        <textarea id="contact-message" name="message" rows={5} required className={inputClass} />
      </div>
      <Button type="submit" variant="primary" className="justify-self-start">
        {form.submit}
      </Button>
    </form>
  );
}
