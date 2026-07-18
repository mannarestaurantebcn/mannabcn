import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { path } from "@/lib/routes";
import { WaveDivider } from "./WaveDivider";

type LogoProps = {
  locale: Locale;
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Temporary digital reproduction of the restaurant's hand-cut storefront
 * sign (bold caps + wave underline). Swap for the vectorised original once
 * it's ready — see Logo.tsx for the one place that needs updating.
 */
export function Logo({ locale, variant = "light", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-charcoal";
  const waveColor = variant === "light" ? "#ffbf66" : "#430c05";

  return (
    <Link
      href={path(locale, "home")}
      className={`group inline-flex flex-col items-start leading-none transition-transform duration-300 ease-out hover:scale-[1.03] ${textColor} ${className}`}
      aria-label="Mannà Restaurant"
    >
      <span className="font-sans text-2xl font-black uppercase tracking-tight md:text-[1.7rem]">
        Mannà
      </span>
      <WaveDivider
        className="-mt-0.5 h-2 w-16 transition-transform duration-300 group-hover:scale-x-110"
        color={waveColor}
        animated
      />
      <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.35em]">
        Restaurant
      </span>
    </Link>
  );
}
