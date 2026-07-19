"use client";

import { setCookieConsent, useCookieConsent } from "@/components/legal/CookieBanner";

type MapEmbedProps = {
  query: string;
  title: string;
  className?: string;
  blockedMessage: string;
  loadLabel: string;
};

/** Embeds Google Maps for the given address — gated behind cookie consent, since the
 * embed can set its own third-party cookies once loaded. No API key needed. */
export function MapEmbed({ query, title, className = "", blockedMessage, loadLabel }: MapEmbedProps) {
  const consent = useCookieConsent();

  if (consent !== "accepted") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 border border-line bg-maroon-soft/40 p-8 text-center ${className}`}
      >
        <p className="max-w-[42ch] text-sm text-cream/60">{blockedMessage}</p>
        <button
          type="button"
          onClick={() => setCookieConsent("accepted")}
          className="border border-gold px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
        >
          {loadLabel}
        </button>
      </div>
    );
  }

  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <iframe
      src={src}
      title={title}
      className={`border-0 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
