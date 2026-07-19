"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { path } from "@/lib/routes";

export const COOKIE_CONSENT_KEY = "manna-cookie-consent";
export const COOKIE_CONSENT_EVENT = "manna:cookie-consent";

export type CookieConsent = "accepted" | "rejected";

function getCookieConsent(): CookieConsent | null {
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setCookieConsent(consent: CookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerConsentSnapshot(): CookieConsent | null {
  return null;
}

/** Reads the visitor's cookie consent choice, kept in sync across components/tabs. */
export function useCookieConsent(): CookieConsent | null {
  return useSyncExternalStore(subscribeToConsent, getCookieConsent, getServerConsentSnapshot);
}

type CookieBannerProps = {
  locale: Locale;
  message: string;
  policyLinkLabel: string;
  accept: string;
  reject: string;
};

export function CookieBanner({ locale, message, policyLinkLabel, accept, reject }: CookieBannerProps) {
  const consent = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label={policyLinkLabel}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-cream/10 bg-noir/95 px-6 py-5 backdrop-blur-sm md:px-10"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="max-w-[70ch] text-[0.85rem] leading-relaxed text-cream/65">
          {message}{" "}
          <Link href={path(locale, "cookies")} className="link-underline text-gold hover:text-gold-dark">
            {policyLinkLabel}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setCookieConsent("rejected")}
            className="border border-cream/30 px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-cream/75 transition-colors hover:border-cream hover:text-cream"
          >
            {reject}
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent("accepted")}
            className="bg-gold px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:bg-gold-dark"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
