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
          backgroundColor: "#000000",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo SVG - simplified from the brand logo */}
        <svg
          width="280"
          height="120"
          viewBox="0 0 280 120"
          style={{ marginBottom: 20 }}
        >
          {/* M letter in white */}
          <text
            x="140"
            y="90"
            fontSize="100"
            fontWeight="bold"
            textAnchor="middle"
            fill="white"
            fontFamily="serif"
            letterSpacing="-4"
          >
            M
          </text>
          {/* "ANNÀ" in white */}
          <text
            x="145"
            y="90"
            fontSize="100"
            fontWeight="bold"
            textAnchor="start"
            fill="white"
            fontFamily="serif"
            letterSpacing="-4"
          >
            ANNÀ
          </text>
        </svg>

        {/* Olive line accent */}
        <div style={{ width: 140, height: 4, backgroundColor: "#6B7C3C", borderRadius: 2, marginTop: 0, marginBottom: 24 }} />

        {/* Restaurant label */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            color: "#F7F2E9",
            marginBottom: 40,
          }}
        >
          RESTAURANT
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#F7F2E9",
            opacity: 0.7,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
