import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { FeaturedDishes } from "@/components/sections/FeaturedDishes";
import { ReservationBand } from "@/components/sections/ReservationBand";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";

type PageParams = { locale: string };

export default async function HomePage({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const placeholderLabel = dict.common.placeholderPhotoLabel;

  return (
    <>
      <Hero locale={locale} home={dict.home} placeholderLabel={placeholderLabel} />
      <AboutTeaser locale={locale} home={dict.home} placeholderLabel={placeholderLabel} />
      <FeaturedDishes locale={locale} home={dict.home} placeholderLabel={placeholderLabel} />
      <ReservationBand locale={locale} home={dict.home} />
      <GalleryTeaser locale={locale} home={dict.home} placeholderLabel={placeholderLabel} />
    </>
  );
}
