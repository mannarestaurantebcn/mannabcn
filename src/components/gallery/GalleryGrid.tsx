"use client";

import { useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Dictionary } from "@/i18n/dictionary";

type GalleryCategory = "dishes" | "interior" | "exterior";
type GalleryFilter = "all" | GalleryCategory;
type GalleryItem = { id: string; category: GalleryCategory; src: string };

const items: GalleryItem[] = [
  { id: "f3", category: "exterior", src: "/imagenes/foto3.png" },
  { id: "f4", category: "interior", src: "/imagenes/foto4.jpg" },
  { id: "f5", category: "interior", src: "/imagenes/foto5.jpg" },
  { id: "f6", category: "interior", src: "/imagenes/foto6.jpg" },
  { id: "f7", category: "interior", src: "/imagenes/foto7.jpg" },
  { id: "f8", category: "exterior", src: "/imagenes/foto8.jpg" },
  { id: "f9", category: "exterior", src: "/imagenes/foto9.jpg" },
  { id: "1", category: "dishes", src: "/imagenes/plato1.jpg" },
  { id: "2", category: "dishes", src: "/imagenes/plato2.jpg" },
  { id: "3", category: "dishes", src: "/imagenes/plato3.jpg" },
  { id: "4", category: "dishes", src: "/imagenes/plato4.jpg" },
  { id: "5", category: "dishes", src: "/imagenes/plato5.jpg" },
  { id: "6", category: "dishes", src: "/imagenes/plato6.jpg" },
  { id: "7", category: "dishes", src: "/imagenes/plato7.jpg" },
  { id: "8", category: "dishes", src: "/imagenes/plato8.jpg" },
  { id: "9", category: "dishes", src: "/imagenes/plato9.jpg" },
  { id: "10", category: "dishes", src: "/imagenes/plato10.jpg" },
  { id: "11", category: "dishes", src: "/imagenes/plato11.jpg" },
  { id: "12", category: "dishes", src: "/imagenes/plato12.jpg" },
  { id: "13", category: "dishes", src: "/imagenes/plato13.jpg" },
  { id: "14", category: "dishes", src: "/imagenes/plato14.jpg" },
  { id: "15", category: "dishes", src: "/imagenes/plato15.jpg" },
  { id: "16", category: "dishes", src: "/imagenes/plato16.jpg" },
  { id: "17", category: "dishes", src: "/imagenes/plato17.jpg" },
  { id: "18", category: "dishes", src: "/imagenes/plato18.jpg" },
  { id: "19", category: "dishes", src: "/imagenes/plato19.jpg" },
  { id: "20", category: "dishes", src: "/imagenes/plato20.jpg" },
  { id: "21", category: "dishes", src: "/imagenes/plato21.jpg" },
  { id: "22", category: "dishes", src: "/imagenes/plato22.jpg" },
  { id: "23", category: "dishes", src: "/imagenes/plato23.jpg" },
  { id: "24", category: "dishes", src: "/imagenes/plato24.jpg" },
  { id: "25", category: "dishes", src: "/imagenes/plato25.jpg" },
  { id: "26", category: "dishes", src: "/imagenes/plato26.jpg" },
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
                  ? "border-gold bg-gold text-cream"
                  : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/40 hover:-translate-y-0.5"
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
