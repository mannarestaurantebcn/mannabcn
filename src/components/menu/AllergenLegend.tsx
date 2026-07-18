import { ALLERGEN_CODES, allergenLabels } from "@/lib/allergens";
import type { Locale } from "@/i18n/config";

type AllergenLegendProps = {
  locale: Locale;
  title: string;
};

export function AllergenLegend({ locale, title }: AllergenLegendProps) {
  return (
    <div className="border border-line bg-maroon-soft/40 p-6 md:p-8">
      <h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-cream/50">
        {title}
      </h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
        {ALLERGEN_CODES.map((code) => {
          const label = allergenLabels[code];
          return (
            <li key={code} className="flex items-center gap-2 text-[0.78rem] text-cream/70">
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-cream/20 bg-cream/8 px-1.5 text-[0.55rem] font-semibold uppercase tracking-wide text-cream/70">
                {label.short}
              </span>
              {label[locale]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
