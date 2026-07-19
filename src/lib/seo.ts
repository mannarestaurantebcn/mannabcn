import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { path, type RouteKey } from "./routes";

type BuildPageMetadataParams = {
  locale: Locale;
  routeKey: RouteKey;
  title: string;
  description: string;
};

/** Builds title, description, canonical URL and hreflang alternates for a given page/locale. */
export function buildPageMetadata({ locale, routeKey, title, description }: BuildPageMetadataParams): Metadata {
  const canonical = path(locale, routeKey);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: path("es", routeKey),
        en: path("en", routeKey),
        "x-default": path("es", routeKey),
      },
    },
    openGraph: { title, description },
    twitter: { title, description },
  };
}
