"use client";

import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { Button } from "@/components/ui/Button";

type ContactFormProps = {
  form: Dictionary["contact"]["form"];
};

const inputClass =
  "w-full border border-charcoal/60 bg-maroon-soft/40 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 transition-colors duration-300 focus:border-gold focus:outline-none";
const labelClass = "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-charcoal/55";

type Status = "idle" | "submitting" | "success" | "error";
type FormControl = HTMLInputElement | HTMLTextAreaElement;

const MIN_NAME_LENGTH = 3;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;

/** Enforced via setCustomValidity rather than relying solely on `minLength`,
 * since some browsers apply that constraint inconsistently. */
function applyCustomValidity(target: FormControl) {
  if (target.name === "name") {
    target.setCustomValidity(target.value === "" || target.value.trim().length >= MIN_NAME_LENGTH ? "" : "invalid");
  } else if (target.name === "message") {
    target.setCustomValidity(target.value === "" || target.value.trim().length >= MIN_MESSAGE_LENGTH ? "" : "invalid");
  }
}

export function ContactForm({ form }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [isValid, setIsValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  function handleFormInput(event: FormEvent<HTMLFormElement>) {
    const target = event.target as unknown as FormControl;
    applyCustomValidity(target);
    setIsValid(formRef.current?.checkValidity() ?? false);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      formElement.reset();
      setIsValid(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="border border-gold/40 bg-gold/5 p-8 text-center">
        <h3 className="font-display text-xl italic text-charcoal">{form.successTitle}</h3>
        <p className="mt-3 text-sm text-charcoal/70">{form.successMessage}</p>
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
      className="grid gap-6"
    >
      {/* Honeypot: hidden from real users, but bots that fill every field will trip it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
        <label htmlFor="contact-company">Empresa</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-name">
          {form.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={MIN_NAME_LENGTH}
          maxLength={100}
          className={inputClass}
        />
        {fieldErrors.has("name") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.nameError}</p>}
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
          maxLength={200}
          className={inputClass}
        />
        {fieldErrors.has("email") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.emailError}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">
          {form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={MIN_MESSAGE_LENGTH}
          maxLength={MAX_MESSAGE_LENGTH}
          className={inputClass}
        />
        {fieldErrors.has("message") && <p className="mt-1 text-[0.72rem] text-terracotta">{form.messageError}</p>}
      </div>
      <div style={{ marginTop: -21 }}>
        <Button type="submit" variant="primary" className="justify-self-start" disabled={status === "submitting" || !isValid}>
          {status === "submitting" ? form.submitting : form.submit}
        </Button>
      </div>
      {status === "error" && (
        <p role="status" aria-live="polite" className="text-[0.78rem] text-terracotta">
          {form.errorMessage}
        </p>
      )}
    </form>
  );
}
