import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { path } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type HeroProps = {
  locale: Locale;
  home: Dictionary["home"];
  placeholderLabel: string;
};

export function Hero({ locale, home, placeholderLabel }: HeroProps) {
  const infoItems = [
    home.infoBar.address,
    home.infoBar.hours,
    home.infoBar.phone,
    home.infoBar.cuisine,
  ];

  return (
    <section className="relative flex h-screen min-h-[640px] flex-col items-center justify-center overflow-hidden text-center">
      <HeroBackground label={placeholderLabel} />

      <div className="relative z-10 max-w-[900px] px-6">
        <Reveal>
          <span className="mb-6 block text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-cream/85">
            {home.heroEyebrow}
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="font-display whitespace-pre-line text-[clamp(2.6rem,9vw,6.5rem)] italic leading-[1.05] text-cream">
            {home.heroTitle}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-[46ch] text-sm leading-relaxed text-cream/70">
            {home.heroSubtitle}
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={path(locale, "menu")} variant="ghost">
              {home.heroCtaPrimary}
            </Button>
            <Button href={path(locale, "reservation")} variant="primary">
              {home.heroCtaSecondary}
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 [@media(min-width:640px)_and_(min-height:760px)]:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/40">{home.scroll}</span>
        <span className="relative h-10 w-px overflow-hidden bg-cream/30">
          <span className="animate-scroll-line absolute inset-x-0 -top-full h-full bg-cream/80" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-1 border-t border-cream/10 sm:grid-cols-4">
        {infoItems.map((value, index) => (
          <div
            key={value}
            className={`border-b border-cream/10 px-4 py-4 text-center text-[0.62rem] uppercase tracking-[0.14em] text-cream/50 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 ${index === infoItems.length - 1 ? "sm:border-r-0" : ""}`}
          >
            {value}
          </div>
        ))}
      </div>
    </section>
  );
}
