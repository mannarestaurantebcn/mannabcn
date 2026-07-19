import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { OfferCards } from "@/components/menu/OfferCards";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { AllergenLegend } from "@/components/menu/AllergenLegend";
import { getMenuCategories } from "@/lib/menu-data";
import { getBreakfastOfferData, getMenuDelDiaData } from "@/lib/offers-data";

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
      ? "Browse Mannà's full menu: tapas, mixed plates, rice dishes, sandwiches and drinks, with allergens listed and an up-to-date daily set menu."
      : "Consulta la carta completa de Mannà: tapas, platos combinados, arroces, bocadillos y bebidas, con alérgenos indicados y menú del día actualizado.";
  return buildPageMetadata({ locale, routeKey: "menu", title: dict.nav.menu, description });
}

export default async function MenuPage({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const { menu } = dict;

  const [categories, breakfastData, menuDelDiaData] = await Promise.all([
    getMenuCategories(),
    getBreakfastOfferData(locale, menu.breakfastOffer),
    getMenuDelDiaData(locale, menu.menuDelDia),
  ]);
  const breakfast = { ...menu.breakfastOffer, ...breakfastData };
  const menuDelDia = { ...menu.menuDelDia, ...menuDelDiaData };

  return (
    <SubpageShell>
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pt-20">
        <Reveal>
          <SectionHeading eyebrow={menu.eyebrow} title={menu.title} subtitle={menu.subtitle} tone="dark" />
        </Reveal>

        <Reveal delay={1} className="mt-10">
          <OfferCards breakfast={breakfast} menuDelDia={menuDelDia} />
        </Reveal>

        <Reveal
          delay={2}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
        >
          <p className="max-w-[52ch] text-[0.8rem] text-charcoal/50">{menu.priceHiddenNote}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="/documents/carta-manna.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold hover:text-gold-dark"
            >
              {menu.downloadPdf}
            </a>
            <a
              href="/documents/carta-bebidas-manna.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold hover:text-gold-dark"
            >
              {menu.downloadPdfDrinks}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10">
        <MenuBrowser
          categories={categories}
          categoryLabels={menu.categories}
          groupLabels={menu.groupLabels}
          locale={locale}
          favoriteLabel={menu.favoriteLabel}
        />

        <div className="mb-20 mt-16">
          <AllergenLegend locale={locale} title={menu.allergenLegendTitle} />
          <p className="mt-6 text-[0.8rem] text-charcoal/50">{menu.allergenNote}</p>
        </div>
      </div>
    </SubpageShell>
  );
}
