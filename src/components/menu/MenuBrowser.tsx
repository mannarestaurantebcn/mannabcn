"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { MenuCategory, MenuCategoryId } from "@/lib/menu-types";
import { MenuItemRow } from "./MenuItemRow";

type MenuBrowserProps = {
  categories: MenuCategory[];
  categoryLabels: Record<MenuCategoryId, string>;
  locale: Locale;
  favoriteLabel: string;
  backToTopLabel: string;
};

function navButtonClass(active: boolean) {
  return `block w-full whitespace-nowrap border-l-2 px-4 py-2 text-left text-[0.8rem] transition-all duration-200 active:scale-95 ${
    active
      ? "border-gold text-gold translate-x-1"
      : "border-transparent text-charcoal hover:translate-x-1 hover:border-charcoal/25"
  }`;
}

function BackToTopIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 19V5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuBrowser({ categories, categoryLabels, locale, favoriteLabel, backToTopLabel }: MenuBrowserProps) {
  const [activeId, setActiveId] = useState<MenuCategoryId>(categories[0]?.id);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll only in direct response to a category click — never as a side
  // effect of mounting — so opening this browser never jumps the page.
  function selectCategory(id: MenuCategoryId) {
    setActiveId(id);
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Floating "back to top" control appears once the reader has scrolled
  // down a bit, so they can jump back to the start of the page (and the
  // "back to menu" button) without scrolling all the way up manually.
  useEffect(() => {
    function onScroll() {
      setShowBackToTop(window.scrollY > 300);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Portal the button to <body>: an ancestor (Reveal) animates with a CSS
  // transform, which creates a new containing block and would otherwise
  // pin this "fixed" button to that ancestor instead of the viewport.
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCategory = categories.find((category) => category.id === activeId) ?? categories[0];

  return (
    <div className="relative">
      <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-14">
        {/* Mobile: wrapped pill grid. Desktop: vertical sidebar. */}
        <nav aria-label={categoryLabels[activeCategory.id]} className="relative min-w-0 md:sticky md:top-28 md:self-start">
          <ul className="flex flex-wrap gap-2 md:hidden">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => selectCategory(category.id)}
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

          <ul className="hidden space-y-1 md:block">
            {categories.map((category) => (
              <li key={category.id}>
                <button type="button" onClick={() => selectCategory(category.id)} className={navButtonClass(category.id === activeId)}>
                  {categoryLabels[category.id]}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={contentRef} key={activeCategory.id} style={{ scrollMarginTop: 128 }} className="animate-fade-up">
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

      {mounted &&
        showBackToTop &&
        createPortal(
          <button
            type="button"
            aria-label={backToTopLabel}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-cream shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-90"
          >
            <BackToTopIcon />
          </button>,
          document.body,
        )}
    </div>
  );
}
