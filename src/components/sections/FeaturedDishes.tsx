import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { AllergenBadge } from "@/components/menu/AllergenBadge";
import { getFeaturedItems } from "@/lib/menu-data";
import { path } from "@/lib/routes";
import { stockPhotos } from "@/lib/stock-photos";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type FeaturedDishesProps = {
  locale: Locale;
  home: Dictionary["home"];
  placeholderLabel: string;
};

// Keyed by the dish's printed menu number (see lib/menu-data.ts).
const dishPhotosByNumber: Record<number, string> = {
  3: stockPhotos.dishes.ensaladaCesar,
  6: stockPhotos.dishes.jamonIberico,
  10: stockPhotos.dishes.panConTomate,
  17: stockPhotos.dishes.patatasBravas,
  19: stockPhotos.dishes.croquetas,
  28: stockPhotos.dishes.pimientosPadron,
};

export async function FeaturedDishes({ locale, home, placeholderLabel }: FeaturedDishesProps) {
  const items = await getFeaturedItems(6);
  const delays = [1, 2, 3, 1, 2, 3] as const;

  return (
    <section className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow={home.featured.eyebrow} title={home.featured.title} tone="dark" />
          </Reveal>
          <Reveal delay={1}>
            <Button href={path(locale, "menu")} variant="primary">
              {home.featured.cta}
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.number ?? index} delay={delays[index % delays.length]} className="group card-hover">
              <article className="relative overflow-hidden ring-1 ring-charcoal/10">
                <PlaceholderImage
                  label={placeholderLabel}
                  src={item.number ? dishPhotosByNumber[item.number] : undefined}
                  className="w-full"
                  style={{ height: 360 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-noir/35 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl italic text-cream transition-colors duration-300 group-hover:text-gold">
                    {item.name[locale]}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-cream/70">{item.description[locale]}</p>
                  )}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.allergens.map((code) => (
                        <AllergenBadge key={code} code={code} locale={locale} />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
