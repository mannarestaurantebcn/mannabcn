import { allergenLabels, type AllergenCode } from "@/lib/allergens";
import type { Locale } from "@/i18n/config";

type AllergenBadgeProps = {
  code: AllergenCode;
  locale: Locale;
  /** "light" (default) for badges floating over a dark photo; "dark" for badges sitting directly on the white page. */
  tone?: "light" | "dark";
};

export function AllergenBadge({ code, locale, tone = "light" }: AllergenBadgeProps) {
  const label = allergenLabels[code];
  const toneClass =
    tone === "light"
      ? "border-cream/20 bg-cream/8 text-cream/70"
      : "border-charcoal/20 bg-charcoal/8 text-charcoal/70";
  return (
    <span
      title={label[locale]}
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-[0.55rem] font-semibold uppercase tracking-wide ${toneClass}`}
    >
      {label.short}
    </span>
  );
}
