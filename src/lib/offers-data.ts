import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { parsePrice } from "./csv";
import { fetchSheetRows } from "./sheets";
import { SHEET_CSV_URLS } from "./sheets-config";

type BreakfastOfferData = Pick<Dictionary["menu"]["breakfastOffer"], "hours" | "options" | "supplements">;
type MenuDelDiaData = Pick<Dictionary["menu"]["menuDelDia"], "note" | "primeros" | "segundos" | "postres" | "tiers">;

function label(row: Record<string, string>, locale: Locale) {
  return locale === "en" ? row.etiqueta_en || row.etiqueta_es : row.etiqueta_es;
}

/**
 * Fetches the "OfertaDesayuno" tab of the client's Google Sheet. Falls back
 * to the given (dictionary-hardcoded) data if the sheet can't be reached.
 */
export async function getBreakfastOfferData(locale: Locale, fallback: BreakfastOfferData): Promise<BreakfastOfferData> {
  try {
    const rows = await fetchSheetRows(SHEET_CSV_URLS.ofertaDesayuno);
    const hours = rows.find((row) => row.tipo === "horario");
    const options = rows
      .filter((row) => row.tipo === "opcion")
      .map((row) => ({ label: label(row, locale), price: parsePrice(row.precio) ?? 0 }));
    const supplements = rows
      .filter((row) => row.tipo === "suplemento")
      .map((row) => ({ label: label(row, locale), price: parsePrice(row.precio) ?? 0 }));

    if (!hours || options.length === 0) throw new Error("OfertaDesayuno sheet is missing required rows");

    return { hours: label(hours, locale), options, supplements };
  } catch (error) {
    console.error("[offers-data] Falling back to static breakfast offer data:", error);
    return fallback;
  }
}

/**
 * Fetches the "MenuDelDia" tab of the client's Google Sheet. Falls back to
 * the given (dictionary-hardcoded) data if the sheet can't be reached.
 */
export async function getMenuDelDiaData(locale: Locale, fallback: MenuDelDiaData): Promise<MenuDelDiaData> {
  try {
    const rows = await fetchSheetRows(SHEET_CSV_URLS.menuDelDia);
    const note = rows.find((row) => row.tipo === "nota");
    const primeros = rows.filter((row) => row.tipo === "primero").map((row) => label(row, locale));
    const segundos = rows.filter((row) => row.tipo === "segundo").map((row) => label(row, locale));
    const postres = rows.filter((row) => row.tipo === "postre").map((row) => label(row, locale));
    const tiers = rows
      .filter((row) => row.tipo === "tarifa")
      .map((row) => ({
        label: label(row, locale),
        price: parsePrice(row.precio) ?? 0,
        halfPrice: parsePrice(row.precio_medio),
      }));

    if (!note || tiers.length === 0) throw new Error("MenuDelDia sheet is missing required rows");

    return { note: label(note, locale), primeros, segundos, postres, tiers };
  } catch (error) {
    console.error("[offers-data] Falling back to static menu del dia data:", error);
    return fallback;
  }
}
