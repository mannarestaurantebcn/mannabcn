import type { Locale } from "@/i18n/config";

export const routeSlugs = {
  home: "",
  about: "sobre-nosotros",
  menu: "menu",
  reservation: "reserva",
  gallery: "galeria",
  contact: "contacto",
} as const;

export type RouteKey = keyof typeof routeSlugs;

export function path(locale: Locale, key: RouteKey): string {
  const slug = routeSlugs[key];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
