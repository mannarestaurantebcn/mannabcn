import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { ReservationBand } from "@/components/sections/ReservationBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { stockPhotos } from "@/lib/stock-photos";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  const dict = getDictionary(locale);
  const description =
    locale === "en"
      ? "Discover the story of Mannà, a neighbourhood restaurant in Poblenou, Barcelona: honest Mediterranean cooking, trusted produce, and a welcoming table to share."
      : "Descubre la historia de Mannà, restaurante de barrio en Poblenou, Barcelona: cocina mediterránea honesta, producto de confianza y ambiente para compartir.";
  return buildPageMetadata({ locale, routeKey: "about", title: dict.nav.about, description });
}

export default async function AboutPage({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const { about, home, common } = dict;

  return (
    <SubpageShell>
      <EditorialSplit
        eyebrow={about.eyebrow}
        title={about.title}
        paragraphs={[about.intro, ...about.paragraphs]}
        placeholderLabel={common.placeholderPhotoLabel}
        imageSrc={stockPhotos.editorialSplit}
      />
      <WaveDivider className="mx-auto my-4 h-3 w-24" color="#ffbf66" animated />
      <ValuesGrid
        eyebrow={about.values.eyebrow}
        title={about.values.title}
        subtitle={about.values.subtitle}
        items={about.values.items}
      />
      <QuoteSection text={about.quote.text} cite={about.quote.cite} />
      <ReservationBand locale={locale} home={home} />
    </SubpageShell>
  );
}
