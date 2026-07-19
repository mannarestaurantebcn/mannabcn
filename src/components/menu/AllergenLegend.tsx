import { ALLERGEN_CODES, allergenLabels, allergenColors } from "@/lib/allergens";
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
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
        {ALLERGEN_CODES.map((code) => {
          const label = allergenLabels[code];
          const color = allergenColors[code];
          return (
            <li key={code} className="flex items-center gap-2 text-[0.78rem] text-cream">
              <span
                className="inline-flex h-6 min-w-6 items-center justify-center rounded-full text-[0.55rem] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: color, color: "white" }}
              >
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
