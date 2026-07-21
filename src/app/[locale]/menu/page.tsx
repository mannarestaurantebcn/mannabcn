import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MenuTabs } from "@/components/menu/MenuTabs";
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
  const foodCategories = categories.filter((category) => category.group === "food");
  const drinkCategories = categories.filter((category) => category.group === "drinks");

  return (
    <SubpageShell>
      <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-16 md:px-10 md:pt-20">
        <Reveal>
          <SectionHeading eyebrow={menu.eyebrow} title={menu.title} subtitle={menu.subtitle} tone="dark" />
        </Reveal>

        <Reveal delay={1} className="mt-12">
          <MenuTabs
            locale={locale}
            tabLabels={menu.tabs}
            breakfast={breakfast}
            menuDelDia={menuDelDia}
            foodCategories={foodCategories}
            drinkCategories={drinkCategories}
            categoryLabels={menu.categories}
            favoriteLabel={menu.favoriteLabel}
            priceHiddenNote={menu.priceHiddenNote}
            downloadPdf={menu.downloadPdf}
            downloadPdfDrinks={menu.downloadPdfDrinks}
            allergenLegendTitle={menu.allergenLegendTitle}
            allergenNote={menu.allergenNote}
            backToTopLabel={menu.backToTop}
            backToMenuLabel={menu.backToMenu}
          />
        </Reveal>
      </div>
    </SubpageShell>
  );
}
