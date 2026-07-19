import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { path } from "@/lib/routes";
import { stockPhotos } from "@/lib/stock-photos";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type GalleryTeaserProps = {
  locale: Locale;
  home: Dictionary["home"];
  placeholderLabel: string;
};

const delays = [1, 2, 3, 4] as const;

export function GalleryTeaser({ locale, home, placeholderLabel }: GalleryTeaserProps) {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow={home.galleryTeaser.eyebrow} title={home.galleryTeaser.title} tone="dark" />
          </Reveal>
          <Reveal delay={1}>
            <Button href={path(locale, "gallery")} variant="outline">
              {home.galleryTeaser.cta}
            </Button>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {delays.map((delay, index) => (
            <Reveal key={delay} delay={delay}>
              <PlaceholderImage
                label={placeholderLabel}
                src={stockPhotos.galleryTeaser[index]}
                className="h-[220px] w-full md:h-[280px]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
