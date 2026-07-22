"use client";

import { useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import type { MenuCategory, MenuCategoryId } from "@/lib/menu-types";
import { BreakfastOfferCard, MenuDelDiaCard } from "./OfferCards";
import { MenuBrowser } from "./MenuBrowser";
import { AllergenLegend } from "./AllergenLegend";

type MenuTab = "breakfast" | "menuDelDia" | "food" | "drinks";

type MenuTabsProps = {
  locale: Locale;
  tabLabels: Dictionary["menu"]["tabs"];
  breakfast: Dictionary["menu"]["breakfastOffer"];
  menuDelDia: Dictionary["menu"]["menuDelDia"];
  foodCategories: MenuCategory[];
  drinkCategories: MenuCategory[];
  categoryLabels: Record<MenuCategoryId, string>;
  favoriteLabel: string;
  priceHiddenNote: string;
  downloadPdf: string;
  downloadPdfDrinks: string;
  allergenLegendTitle: string;
  allergenNote: string;
  backToTopLabel: string;
  backToMenuLabel: string;
};

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" strokeLinejoin="round" />
      <path d="M17 9.5h1.2a2.3 2.3 0 0 1 0 4.6H17" strokeLinejoin="round" />
      <path d="M8 4c0 1-1 1-1 2M12 4c0 1-1 1-1 2" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M8 11h8M8 15h8M8 19h5" strokeLinecap="round" />
    </svg>
  );
}

function UtensilsIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path
        d="M7 2v7a2 2 0 0 0 4 0V2M9 11v11M18 2c-1.7 0-3 1.8-3 5v3a1 1 0 0 0 1 1h1v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M6 3h12l-1.5 15.2a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8L6 3Z" strokeLinejoin="round" />
      <path d="M7 8h10" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuTabs({
  locale,
  tabLabels,
  breakfast,
  menuDelDia,
  foodCategories,
  drinkCategories,
  categoryLabels,
  favoriteLabel,
  priceHiddenNote,
  downloadPdf,
  downloadPdfDrinks,
  allergenLegendTitle,
  allergenNote,
  backToTopLabel,
  backToMenuLabel,
}: MenuTabsProps) {
  const [selectedTab, setSelectedTab] = useState<MenuTab | null>(null);

  const tabs: { key: MenuTab; label: string; icon: ReactNode }[] = [
    { key: "breakfast", label: tabLabels.breakfast, icon: <CoffeeIcon /> },
    { key: "menuDelDia", label: tabLabels.menuDelDia, icon: <ClipboardIcon /> },
    { key: "food", label: tabLabels.food, icon: <UtensilsIcon /> },
    { key: "drinks", label: tabLabels.drinks, icon: <GlassIcon /> },
  ];

  if (selectedTab === null) {
    return (
      <div>
        <div className="mx-auto max-w-[560px] space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedTab(tab.key)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-cream/10 bg-noir px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold">
                {tab.icon}
              </span>
              <span className="flex-1 text-[0.95rem] font-medium text-cream">{tab.label}</span>
              <span className="shrink-0 text-cream/30 transition-transform duration-200 group-hover:translate-x-1">
                <ChevronRightIcon />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-16">
          <AllergenLegend locale={locale} title={allergenLegendTitle} />
          <p className="mt-6 text-center text-[0.8rem] text-charcoal/50">{allergenNote}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={() => setSelectedTab(null)}
          className="inline-flex items-center gap-2 self-start text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-charcoal/60 transition-colors duration-200 hover:text-gold"
        >
          <BackArrowIcon />
          {backToMenuLabel}
        </button>

        {selectedTab === "food" && (
          <a
            href="/documents/carta-manna.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold hover:text-gold-dark"
          >
            {downloadPdf}
          </a>
        )}
      </div>

      {selectedTab === "breakfast" && (
        <div>
          <BreakfastOfferCard breakfast={breakfast} />
          <p className="mx-auto mt-6 max-w-[560px] text-[0.8rem] text-charcoal/50">{priceHiddenNote}</p>
        </div>
      )}

      {selectedTab === "menuDelDia" && (
        <div>
          <MenuDelDiaCard menuDelDia={menuDelDia} />
          <p className="mx-auto mt-6 max-w-[720px] text-[0.8rem] text-charcoal/50">{priceHiddenNote}</p>
        </div>
      )}

      {selectedTab === "food" && (
        <div>
          <MenuBrowser
            categories={foodCategories}
            categoryLabels={categoryLabels}
            locale={locale}
            favoriteLabel={favoriteLabel}
            backToTopLabel={backToTopLabel}
          />
          <div className="mt-12 border-t border-line pt-6">
            <p className="max-w-[52ch] text-[0.8rem] text-charcoal/50">{priceHiddenNote}</p>
          </div>
          <div className="mb-4 mt-10">
            <AllergenLegend locale={locale} title={allergenLegendTitle} />
            <p className="mt-6 text-center text-[0.8rem] text-charcoal/50">{allergenNote}</p>
          </div>
        </div>
      )}

      {selectedTab === "drinks" && (
        <div>
          <MenuBrowser
            categories={drinkCategories}
            categoryLabels={categoryLabels}
            locale={locale}
            favoriteLabel={favoriteLabel}
            backToTopLabel={backToTopLabel}
          />
          <div className="mt-12 border-t border-line pt-6">
            <p className="max-w-[52ch] text-[0.8rem] text-charcoal/50">{priceHiddenNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}
