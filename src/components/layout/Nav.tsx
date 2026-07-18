"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { path } from "@/lib/routes";

type NavProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  languageSwitcherLabel: string;
};

export function Nav({ locale, nav, languageSwitcherLabel }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  // Only the home page has a full-bleed dark hero the nav can float over.
  const isHomePage = pathname === path(locale, "home");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHomePage && !scrolled && !mobileOpen;
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  const links = [
    { href: path(locale, "home"), label: nav.home },
    { href: path(locale, "about"), label: nav.about },
    { href: path(locale, "menu"), label: nav.menu },
    { href: path(locale, "gallery"), label: nav.gallery },
    { href: path(locale, "contact"), label: nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "border-b border-line bg-charcoal/95 shadow-[0_1px_20px_-8px_rgba(0,0,0,0.35)] backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Logo locale={locale} />

        <nav aria-label={nav.mainNavLabel} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-[0.7rem] font-medium uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href={switchedPath}
            hrefLang={otherLocale}
            aria-label={languageSwitcherLabel}
            className="link-underline text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cream/70 transition-colors hover:text-cream"
          >
            {otherLocale.toUpperCase()}
          </Link>

          <Button
            href={path(locale, "reservation")}
            variant={isTransparent ? "ghost" : "primary"}
            className="hidden sm:inline-flex"
          >
            {nav.reserveCta}
          </Button>

          <button
            type="button"
            aria-label={nav.toggleMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-cream md:hidden"
          >
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ease-out ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ease-out ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="animate-mobile-panel-in border-t border-line bg-charcoal px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {links.map((link, index) => (
              <li key={link.href} className="animate-fade-up" style={{ animationDelay: `${index * 40}ms` }}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="link-underline text-sm font-medium uppercase tracking-[0.16em] text-cream/75"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            href={path(locale, "reservation")}
            variant="primary"
            className="mt-6 w-full"
            onClick={() => setMobileOpen(false)}
          >
            {nav.reserveCta}
          </Button>
        </div>
      )}
    </header>
  );
}
