import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { WaveDivider } from "@/components/ui/WaveDivider";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { path } from "@/lib/routes";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const { nav, footer, contact } = dictionary;

  const links = [
    { href: path(locale, "home"), label: nav.home },
    { href: path(locale, "about"), label: nav.about },
    { href: path(locale, "menu"), label: nav.menu },
    { href: path(locale, "reservation"), label: nav.reservation },
    { href: path(locale, "gallery"), label: nav.gallery },
    { href: path(locale, "contact"), label: nav.contact },
  ];

  return (
    <footer className="bg-noir px-6 pb-8 pt-16 text-cream md:px-10 md:pt-20">
      <WaveDivider className="mx-auto mb-14 h-3 w-24" color="#ffbf66" animated />

      <div className="mx-auto grid max-w-[1400px] gap-12 border-b border-cream/10 pb-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo locale={locale} variant="light" />
          <p className="mt-5 max-w-[30ch] whitespace-pre-line text-sm leading-relaxed text-cream/45">
            {footer.tagline}
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-cream/35">
            {footer.navTitle}
          </h4>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline inline-block py-1 text-sm text-cream/65 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-cream/35">
            {footer.contactTitle}
          </h4>
          <p className="text-sm leading-relaxed text-cream/65">{contact.address}</p>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="link-underline mt-2 inline-block text-sm text-cream/65 transition-colors hover:text-cream"
          >
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="link-underline mt-1 inline-block text-sm text-cream/65 transition-colors hover:text-cream"
          >
            {contact.email}
          </a>
        </div>

        <div>
          <h4 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-cream/35">
            {footer.hoursTitle}
          </h4>
          <ul className="space-y-2 text-sm text-cream/65">
            {contact.hours.map((entry) => (
              <li key={entry.days}>
                <span className="block text-cream/40">{entry.days}</span>
                {entry.hours}
              </li>
            ))}
          </ul>

          <h4 className="mb-3 mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-cream/35">
            {footer.socialTitle}
          </h4>
          <p className="text-sm text-cream/40">{footer.socialSoon}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col-reverse items-center gap-4 pt-6 text-[0.72rem] text-cream/25 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Mannà Restaurant. {footer.rights}</span>
        <div className="flex gap-6">
          <span className="cursor-default">{footer.privacy}</span>
          <span className="cursor-default">{footer.terms}</span>
          <span className="cursor-default">{footer.cookies}</span>
        </div>
      </div>
    </footer>
  );
}
