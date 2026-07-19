// Root-level not-found.tsx: catches any URL that doesn't match a route at
// all (e.g. a stray top-level path outside /es or /en). The root layout
// (src/app/layout.tsx) is a bare passthrough with no <html>/<body>, so this
// file has to supply its own, exactly like [locale]/layout.tsx does.
import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import { headers } from "next/headers";
import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { path } from "@/lib/routes";
import type { Locale } from "@/i18n/config";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const altLabel: Record<Locale, string> = { es: "English", en: "Español" };

export default async function GlobalNotFound() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") ?? "";
  const locale: Locale = acceptLanguage.toLowerCase().startsWith("en") ? "en" : "es";
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const { notFound } = getDictionary(locale);

  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col items-center justify-center bg-paper px-6 py-24 text-center antialiased">
        <span className="mb-4 block text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">
          {notFound.eyebrow}
        </span>
        <h1 className="font-display whitespace-pre-line text-[clamp(2rem,4.5vw,3.4rem)] font-light italic leading-[1.1] text-charcoal">
          {notFound.title}
        </h1>
        <p className="mt-5 max-w-[42ch] text-[0.95rem] leading-relaxed text-charcoal/60">{notFound.message}</p>
        <Link
          href={path(locale, "home")}
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-sm border border-gold bg-gold px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold-dark hover:bg-gold-dark"
        >
          {notFound.cta}
        </Link>
        <Link href={path(otherLocale, "home")} className="mt-6 text-[0.75rem] uppercase tracking-[0.18em] text-charcoal/50 underline-offset-4 hover:text-charcoal hover:underline">
          {altLabel[locale]}
        </Link>
      </body>
    </html>
  );
}
