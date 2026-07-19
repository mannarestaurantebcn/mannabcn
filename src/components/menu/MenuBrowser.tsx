"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { MenuCategory, MenuCategoryId } from "@/lib/menu-types";
import { MenuItemRow } from "./MenuItemRow";

type MenuBrowserProps = {
  categories: MenuCategory[];
  categoryLabels: Record<MenuCategoryId, string>;
  groupLabels: { food: string; drinks: string };
  locale: Locale;
  favoriteLabel: string;
};

function navButtonClass(active: boolean) {
  return `block w-full whitespace-nowrap border-l-2 px-4 py-2 text-left text-[0.8rem] transition-all duration-200 active:scale-95 ${
    active
      ? "border-gold text-gold translate-x-1"
      : "border-transparent text-charcoal hover:translate-x-1 hover:border-charcoal/25"
  }`;
}

export function MenuBrowser({ categories, categoryLabels, groupLabels, locale, favoriteLabel }: MenuBrowserProps) {
  const [activeId, setActiveId] = useState<MenuCategoryId>(categories[0]?.id);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeId]);

  const foodCategories = categories.filter((category) => category.group === "food");
  const drinkCategories = categories.filter((category) => category.group === "drinks");
  const activeCategory = categories.find((category) => category.id === activeId) ?? categories[0];

  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-14">
      {/* Mobile: flat scrollable pill row. Desktop: grouped vertical sidebar. */}
      <nav aria-label={`${groupLabels.food} / ${groupLabels.drinks}`} className="min-w-0 md:sticky md:top-28 md:self-start">
        <ul className="flex gap-2 overflow-x-auto pb-2 md:hidden">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => setActiveId(category.id)}
                className={`rounded-full border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-all duration-200 active:scale-90 ${
                  category.id === activeId
                    ? "border-gold bg-gold text-cream"
                    : "border-charcoal/20 text-charcoal/60 hover:-translate-y-0.5 hover:border-charcoal/40"
                }`}
              >
                {categoryLabels[category.id]}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <h3 className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-charcoal/35">
            {groupLabels.food}
          </h3>
          <ul className="mb-8 space-y-1">
            {foodCategories.map((category) => (
              <li key={category.id}>
                <button type="button" onClick={() => setActiveId(category.id)} className={navButtonClass(category.id === activeId)}>
                  {categoryLabels[category.id]}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-charcoal/35">
            {groupLabels.drinks}
          </h3>
          <ul className="space-y-1">
            {drinkCategories.map((category) => (
              <li key={category.id}>
                <button type="button" onClick={() => setActiveId(category.id)} className={navButtonClass(category.id === activeId)}>
                  {categoryLabels[category.id]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div ref={contentRef} key={activeCategory.id} style={{ scrollMarginTop: 96 }} className="animate-fade-up">
        <h2 className="font-display mb-6 text-2xl italic text-charcoal md:text-3xl">
          {categoryLabels[activeCategory.id]}
        </h2>
        <ul>
          {activeCategory.items.map((item, index) => (
            <MenuItemRow
              key={item.number ?? `${activeCategory.id}-${index}`}
              item={item}
              locale={locale}
              favoriteLabel={favoriteLabel}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
