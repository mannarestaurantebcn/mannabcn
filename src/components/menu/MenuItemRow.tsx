import type { CSSProperties } from "react";
import type { MenuItem } from "@/lib/menu-types";
import type { Locale } from "@/i18n/config";
import { AllergenBadge } from "./AllergenBadge";

type MenuItemRowProps = {
  item: MenuItem;
  locale: Locale;
  favoriteLabel: string;
  className?: string;
  style?: CSSProperties;
};

export function MenuItemRow({ item, locale, favoriteLabel, className = "", style }: MenuItemRowProps) {
  return (
    <li
      style={style}
      className={`group -mx-3 flex items-start justify-between gap-4 rounded-sm border-b border-line px-3 py-4 transition-colors duration-200 last:border-b-0 hover:bg-charcoal/5 ${className}`}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          {item.number && <span className="text-[0.7rem] text-charcoal/35">{item.number}.</span>}
          <span className="font-display text-lg italic text-charcoal transition-colors duration-200 group-hover:text-gold">
            {item.name[locale]}
          </span>
          {item.featured && (
            <span className="rounded-full bg-terracotta/10 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide text-terracotta transition-transform duration-200 group-hover:scale-105">
              {favoriteLabel}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 text-[0.82rem] text-charcoal/55">{item.description[locale]}</p>
        )}
        {item.allergens && item.allergens.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.allergens.map((code) => (
              <AllergenBadge key={code} code={code} locale={locale} />
            ))}
          </div>
        )}
      </div>
      {item.price !== undefined && (
        <span className="font-display shrink-0 text-lg text-charcoal transition-colors duration-200 group-hover:text-gold">
          {item.price.toFixed(2).replace(".", ",")} €
        </span>
      )}
    </li>
  );
}
