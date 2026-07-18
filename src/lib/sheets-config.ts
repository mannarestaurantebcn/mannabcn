/**
 * Published-to-web CSV endpoints for the client's Google Sheet
 * (Manna-Google-Sheet-Modelo). Each tab is published individually via
 * Archivo > Compartir > Publicar en la web > CSV.
 */
export const SHEET_CSV_URLS = {
  carta:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvWLjUmuM_gSsNV1c9gtz3duF7AKxezdk3jl1zf1asMuh25KgmvKO18K6nQ4wohA/pub?gid=1248154921&single=true&output=csv",
  ofertaDesayuno:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvWLjUmuM_gSsNV1c9gtz3duF7AKxezdk3jl1zf1asMuh25KgmvKO18K6nQ4wohA/pub?gid=2096618240&single=true&output=csv",
  menuDelDia:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvWLjUmuM_gSsNV1c9gtz3duF7AKxezdk3jl1zf1asMuh25KgmvKO18K6nQ4wohA/pub?gid=794789075&single=true&output=csv",
} as const;

/** How long (in seconds) Next.js may serve a cached copy before re-fetching the sheet. */
export const SHEET_REVALIDATE_SECONDS = 300;
