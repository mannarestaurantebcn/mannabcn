import { allergenLabels, type AllergenCode } from "@/lib/allergens";
import { AllergenIcon } from "./AllergenIcon";
import type { Locale } from "@/i18n/config";

type AllergenBadgeProps = {
  code: AllergenCode;
  locale: Locale;
};

export function AllergenBadge({ code, locale }: AllergenBadgeProps) {
  const label = allergenLabels[code];

  return (
    <button
      type="button"
      title={label[locale]}
      className="inline-flex items-center justify-center transition-transform hover:scale-110"
    >
      <AllergenIcon code={code} size={28} />
    </button>
  );
}
