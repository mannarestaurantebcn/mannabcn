export const ALLERGEN_CODES = [
  "gluten",
  "crustaceans",
  "eggs",
  "fish",
  "peanuts",
  "soy",
  "milk",
  "nuts",
  "celery",
  "mustard",
  "sesame",
  "sulphites",
  "lupins",
  "molluscs",
] as const;

export type AllergenCode = (typeof ALLERGEN_CODES)[number];

export const allergenLabels: Record<AllergenCode, { es: string; en: string; short: string }> = {
  gluten: { es: "Gluten", en: "Gluten", short: "GLU" },
  crustaceans: { es: "Crustáceos", en: "Crustaceans", short: "CRU" },
  eggs: { es: "Huevos", en: "Eggs", short: "HUE" },
  fish: { es: "Pescado", en: "Fish", short: "PES" },
  peanuts: { es: "Cacahuetes", en: "Peanuts", short: "CAC" },
  soy: { es: "Soja", en: "Soy", short: "SOJ" },
  milk: { es: "Lácteos", en: "Milk products", short: "LAC" },
  nuts: { es: "Frutos de cáscara", en: "Tree nuts", short: "FRU" },
  celery: { es: "Apio", en: "Celery", short: "API" },
  mustard: { es: "Mostaza", en: "Mustard", short: "MOS" },
  sesame: { es: "Granos de sésamo", en: "Sesame", short: "SES" },
  sulphites: { es: "Dióxido de azufre y sulfitos", en: "Sulphites", short: "SUL" },
  lupins: { es: "Altramuces", en: "Lupins", short: "LUP" },
  molluscs: { es: "Moluscos", en: "Molluscs", short: "MOL" },
};

const codeBySpanishLabel: Record<string, AllergenCode> = Object.fromEntries(
  ALLERGEN_CODES.map((code) => [allergenLabels[code].es.toLowerCase(), code]),
);

/** Looks up an AllergenCode from the Spanish label used in the client's Google Sheet. */
export function allergenCodeFromSpanishLabel(label: string): AllergenCode | undefined {
  return codeBySpanishLabel[label.trim().toLowerCase()];
}
