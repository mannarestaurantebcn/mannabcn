import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

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

  return {
    title: {
      default: `${dict.meta.siteName} — ${dict.meta.titleSuffix}`,
      template: `%s — ${dict.meta.siteName}`,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      languages: { es: "/es", en: "/en" },
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
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 bg-gold px-4 py-2 text-sm font-medium text-charcoal transition-transform focus:translate-y-0"
        >
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <Nav locale={locale} nav={dictionary.nav} languageSwitcherLabel={dictionary.common.languageSwitcherLabel} />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
