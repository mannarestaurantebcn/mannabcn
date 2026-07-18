import { allergenLabels, type AllergenCode } from "@/lib/allergens";
import type { Locale } from "@/i18n/config";

type AllergenBadgeProps = {
  code: AllergenCode;
  locale: Locale;
};

export function AllergenBadge({ code, locale }: AllergenBadgeProps) {
  const label = allergenLabels[code];
  return (
    <span
      title={label[locale]}
      className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-cream/20 bg-cream/8 px-1.5 text-[0.55rem] font-semibold uppercase tracking-wide text-cream/70"
    >
      {label.short}
    </span>
  );
}
