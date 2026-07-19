import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  const dict = getDictionary(locale);
  const title = `${dict.meta.siteName} — ${dict.meta.titleSuffix}`;

  return {
    // TODO: replace with the real domain once it's registered (e.g. via NEXT_PUBLIC_SITE_URL),
    // so absolute OG/Twitter image URLs resolve correctly instead of falling back to localhost.
    metadataBase: new URL(
      (() => {
        const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
        return url.startsWith("http") ? url : `https://${url}`;
      })()
    ),
    title: {
      default: title,
      template: `%s — ${dict.meta.siteName}`,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      title,
      description: dict.meta.defaultDescription,
      siteName: dict.meta.siteName,
      locale: locale === "es" ? "es_ES" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.defaultDescription,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <RestaurantJsonLd locale={locale} />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 bg-gold px-4 py-2 text-sm font-medium text-cream transition-transform focus:translate-y-0"
        >
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <Nav locale={locale} nav={dictionary.nav} languageSwitcherLabel={dictionary.common.languageSwitcherLabel} />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer locale={locale} dictionary={dictionary} />
        <CookieBanner
          locale={locale}
          message={dictionary.cookieBanner.message}
          policyLinkLabel={dictionary.cookieBanner.policyLinkLabel}
          accept={dictionary.cookieBanner.accept}
          reject={dictionary.cookieBanner.reject}
        />
      </body>
    </html>
  );
}
