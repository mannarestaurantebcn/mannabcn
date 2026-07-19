import { ALLERGEN_CODES, allergenLabels } from "@/lib/allergens";
import type { Locale } from "@/i18n/config";

type AllergenLegendProps = {
  locale: Locale;
  title: string;
};

export function AllergenLegend({ locale, title }: AllergenLegendProps) {
  return (
    <div className="bg-gold p-6 md:p-8">
      <h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-charcoal/70">
        {title}
      </h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
        {ALLERGEN_CODES.map((code) => {
          const label = allergenLabels[code];
          return (
            <li key={code} className="flex items-center gap-2 text-[0.78rem] text-charcoal/80">
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-charcoal/25 bg-charcoal/10 px-1.5 text-[0.55rem] font-semibold uppercase tracking-wide text-charcoal/80">
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
