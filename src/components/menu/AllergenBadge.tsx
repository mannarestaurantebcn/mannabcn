import { allergenLabels, allergenColors, type AllergenCode } from "@/lib/allergens";
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
  const color = allergenColors[code];
  const borderColor = tone === "light" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";

  return (
    <button
      type="button"
      title={label[locale]}
      className="inline-flex items-center justify-center rounded-full transition-transform hover:scale-110"
      style={{
        width: "28px",
        height: "28px",
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
      }}
    >
      <AllergenIcon code={code} size={16} />
    </button>
  );
}
