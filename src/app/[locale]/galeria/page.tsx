import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  const dict = getDictionary(locale);
  return { title: dict.nav.gallery };
}

export default async function GalleryPage({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const { gallery, common } = dict;

  return (
    <SubpageShell>
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            subtitle={gallery.subtitle}
            tone="light"
          />
        </Reveal>
        <GalleryGrid categories={gallery.categories} placeholderLabel={common.placeholderPhotoLabel} />
      </div>
    </SubpageShell>
  );
}
