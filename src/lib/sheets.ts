import { csvToObjects, parseCsv } from "./csv";
import { SHEET_REVALIDATE_SECONDS } from "./sheets-config";

/** Fetches a published Google Sheets CSV endpoint and returns its rows as objects. */
export async function fetchSheetRows(url: string): Promise<Record<string, string>[]> {
  const res = await fetch(url, { next: { revalidate: SHEET_REVALIDATE_SECONDS } });
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet (${res.status}): ${url}`);
  }
  const text = await res.text();
  return csvToObjects(parseCsv(text));
}
