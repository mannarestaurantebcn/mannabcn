import { ALLERGEN_CODES, allergenLabels } from "@/lib/allergens";
import { AllergenIcon } from "./AllergenIcon";
import type { Locale } from "@/i18n/config";

type AllergenLegendProps = {
  locale: Locale;
  title: string;
};

export function AllergenLegend({ locale, title }: AllergenLegendProps) {
  return (
    <div className="text-center">
      <h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-charcoal/50">
        {title}
      </h3>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-5">
        {ALLERGEN_CODES.map((code, index) => {
          const label = allergenLabels[code];
          return (
            <li key={code} className="flex w-[68px] flex-col items-center gap-1 text-center">
              <span className="text-[0.6rem] font-semibold text-charcoal/35">{index + 1}</span>
              <AllergenIcon code={code} size={40} />
              <span className="text-[0.6rem] leading-tight text-charcoal/60">{label[locale]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
