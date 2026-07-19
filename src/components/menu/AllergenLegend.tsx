import { ALLERGEN_CODES, allergenLabels } from "@/lib/allergens";
import { AllergenIcon } from "./AllergenIcon";
import type { Locale } from "@/i18n/config";

type AllergenLegendProps = {
  locale: Locale;
  title: string;
};

export function AllergenLegend({ locale, title }: AllergenLegendProps) {
  return (
    <div className="bg-gold p-6 md:p-8">
      <h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-cream/85">
        {title}
      </h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-4">
        {ALLERGEN_CODES.map((code) => {
          const label = allergenLabels[code];
          return (
            <li key={code} className="flex flex-col items-center gap-2 text-center text-[0.7rem] text-cream">
              <AllergenIcon code={code} size={40} />
              <span>{label[locale]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
