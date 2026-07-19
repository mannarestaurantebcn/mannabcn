import { allergenLabels, type AllergenCode } from "@/lib/allergens";
import { AllergenIcon } from "./AllergenIcon";
import type { Locale } from "@/i18n/config";

type AllergenBadgeProps = {
  code: AllergenCode;
  locale: Locale;
  /** "light" (default) for badges floating over a dark photo; "dark" for badges sitting directly on the white page. */
  tone?: "light" | "dark";
};

export function AllergenBadge({ code, locale, tone = "light" }: AllergenBadgeProps) {
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
