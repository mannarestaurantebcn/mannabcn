import { allergenLabels, allergenColors, type AllergenCode } from "@/lib/allergens";
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
  const textColor = tone === "light" ? "white" : "white";

  return (
    <span
      title={label[locale]}
      className="inline-flex h-6 min-w-6 items-center justify-center rounded-full text-[0.55rem] font-semibold uppercase tracking-wide transition-transform hover:scale-110"
      style={{
        backgroundColor: color,
        color: textColor,
        border: "none",
      }}
    >
      {label.short}
    </span>
  );
}
