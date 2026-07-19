import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { path, type RouteKey } from "@/lib/routes";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const PRIORITY: Record<RouteKey, number> = {
  home: 1,
  menu: 0.9,
  reservation: 0.9,
  about: 0.7,
  contact: 0.7,
  gallery: 0.6,
  legalNotice: 0.3,
  privacy: 0.3,
  terms: 0.3,
  cookies: 0.3,
};

const CHANGE_FREQUENCY: Record<RouteKey, MetadataRoute.Sitemap[number]["changeFrequency"]> = {
  home: "weekly",
  menu: "weekly",
  reservation: "monthly",
  about: "monthly",
  contact: "monthly",
  gallery: "monthly",
  legalNotice: "yearly",
  privacy: "yearly",
  terms: "yearly",
  cookies: "yearly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routeKeys = Object.keys(PRIORITY) as RouteKey[];

  return routeKeys.map((routeKey) => ({
    url: `${BASE_URL}${path("es", routeKey)}`,
    lastModified: new Date(),
    changeFrequency: CHANGE_FREQUENCY[routeKey],
    priority: PRIORITY[routeKey],
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, `${BASE_URL}${path(locale, routeKey)}`])),
    },
  }));
}
