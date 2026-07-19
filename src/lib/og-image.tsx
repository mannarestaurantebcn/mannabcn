import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/config";

const COPY: Record<Locale, { tagline: string }> = {
  es: { tagline: "Cocina mediterránea en el corazón de Barcelona" },
  en: { tagline: "Mediterranean cuisine in the heart of Barcelona" },
};

export function renderOgImage(locale: Locale) {
  const { tagline } = COPY[locale] ?? COPY.es;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#430C05",
          color: "#F7F2E9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 128, fontWeight: 800, letterSpacing: -2 }}>MANNÀ</div>
        <div style={{ width: 160, height: 6, backgroundColor: "#FFBF66", borderRadius: 3, marginTop: 8, marginBottom: 20 }} />
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 12, opacity: 0.85 }}>RESTAURANT</div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 56, opacity: 0.6 }}>{tagline}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
