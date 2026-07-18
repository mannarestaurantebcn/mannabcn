import "./globals.css";

// Actual <html>/<body> and localized <head> metadata live in
// src/app/[locale]/layout.tsx — every route sits under a locale segment.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
