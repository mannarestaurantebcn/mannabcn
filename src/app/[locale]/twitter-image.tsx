import { isLocale, type Locale } from "@/i18n/config";
import { renderOgImage } from "@/lib/og-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageParams = { locale: string };

export default async function Image({ params }: { params: Promise<ImageParams> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  return renderOgImage(locale);
}
