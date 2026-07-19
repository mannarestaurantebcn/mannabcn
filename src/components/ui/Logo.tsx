import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { path } from "@/lib/routes";

type LogoProps = {
  locale: Locale;
  className?: string;
  /** Logo height in px. Defaults to the compact nav size. */
  height?: number;
};

export function Logo({ locale, className = "", height }: LogoProps) {
  return (
    <Link
      href={path(locale, "home")}
      className={`inline-flex items-center transition-transform duration-300 ease-out hover:scale-[1.03] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local static SVG, no benefit from next/image optimization */}
      <img
        src="/logo-manna.svg"
        alt="Mannà Restaurant"
        style={height ? { height, width: "auto" } : undefined}
        className={height ? "" : "h-14 w-auto md:h-16"}
      />
    </Link>
  );
}
