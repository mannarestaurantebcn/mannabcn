import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CountUp } from "@/components/ui/CountUp";
import { path } from "@/lib/routes";
import { stockPhotos } from "@/lib/stock-photos";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type AboutTeaserProps = {
  locale: Locale;
  home: Dictionary["home"];
  placeholderLabel: string;
};

export function AboutTeaser({ locale, home, placeholderLabel }: AboutTeaserProps) {
  const { about } = home;

  return (
    <section className="bg-noir px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <SectionHeading eyebrow={about.eyebrow} title={about.title} tone="light" />
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 max-w-[44ch] text-[0.95rem] leading-relaxed text-cream/65">
              {about.paragraph1}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-4 max-w-[44ch] text-[0.95rem] leading-relaxed text-cream/65">
              {about.paragraph2}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <Button href={path(locale, "about")} variant="primary" className="mt-8">
              {about.cta}
            </Button>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-line-dark pt-8">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl font-light text-gold">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <PlaceholderImage
            label={placeholderLabel}
            src={stockPhotos.aboutTeaser}
            className="card-hover h-[420px] w-full md:h-[560px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
