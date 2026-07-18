"use client";

import { useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { stockPhotos } from "@/lib/stock-photos";
import type { Dictionary } from "@/i18n/dictionary";

type GalleryCategory = "dishes" | "interior" | "exterior";
type GalleryFilter = "all" | GalleryCategory;
type GalleryItem = { id: string; category: GalleryCategory; src: string };

// Mock gallery — swap each `src` for a real photo once the shoot is delivered.
const items: GalleryItem[] = [
  { id: "1", category: "dishes", src: stockPhotos.gallery.dishes[0] },
  { id: "2", category: "interior", src: stockPhotos.gallery.interior[0] },
  { id: "3", category: "dishes", src: stockPhotos.gallery.dishes[1] },
  { id: "4", category: "exterior", src: stockPhotos.gallery.exterior[0] },
  { id: "5", category: "dishes", src: stockPhotos.gallery.dishes[2] },
  { id: "6", category: "interior", src: stockPhotos.gallery.interior[1] },
  { id: "7", category: "dishes", src: stockPhotos.gallery.dishes[3] },
  { id: "8", category: "exterior", src: stockPhotos.gallery.exterior[1] },
  { id: "9", category: "interior", src: stockPhotos.gallery.interior[2] },
  { id: "10", category: "dishes", src: stockPhotos.gallery.dishes[4] },
  { id: "11", category: "exterior", src: stockPhotos.gallery.exterior[2] },
  { id: "12", category: "interior", src: stockPhotos.gallery.interior[3] },
];

type GalleryGridProps = {
  categories: Dictionary["gallery"]["categories"];
  placeholderLabel: string;
};

export function GalleryGrid({ categories, placeholderLabel }: GalleryGridProps) {
  const [filter, setFilter] = useState<GalleryFilter>("all");

  const filters: { key: GalleryFilter; label: string }[] = [
    { key: "all", label: categories.all },
    { key: "dishes", label: categories.dishes },
    { key: "interior", label: categories.interior },
    { key: "exterior", label: categories.exterior },
  ];

  const visibleItems = filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <div>
      <div role="tablist" aria-label={categories.all} className="mb-10 flex flex-wrap gap-3">
        {filters.map((entry) => {
          const active = filter === entry.key;
          return (
            <button
              key={entry.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(entry.key)}
              className={`rounded-full border px-5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-95 ${
                active
                  ? "border-gold bg-gold text-charcoal"
                  : "border-cream/20 text-cream/60 hover:border-cream/40 hover:-translate-y-0.5"
              }`}
            >
              {entry.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {visibleItems.map((item, index) => (
          <PlaceholderImage
            key={`${filter}-${item.id}`}
            label={placeholderLabel}
            src={item.src}
            className="card-hover animate-tile-in h-[240px] w-full md:h-[300px]"
            style={{ animationDelay: `${(index % 6) * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
