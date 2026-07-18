import type { AllergenCode } from "./allergens";

export type MenuCategoryId =
  | "tapas"
  | "platosCombinados"
  | "bocadillosFrios"
  | "bocadillosCalientes"
  | "paella"
  | "postres"
  | "cafes"
  | "refrescos"
  | "cervezas"
  | "vinosSangrias"
  | "combinadosLargos";

export type MenuGroup = "food" | "drinks";

export type MenuItem = {
  /** Item number as printed on the physical menu — kept so staff can cross-reference. */
  number?: number;
  name: { es: string; en: string };
  description?: { es: string; en: string };
  allergens?: AllergenCode[];
  /** Price in euros, as printed on the menu. */
  price?: number;
  featured?: boolean;
};

export type MenuCategory = {
  id: MenuCategoryId;
  group: MenuGroup;
  items: MenuItem[];
};
