import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  const dict = getDictionary(locale);
  return { title: dict.nav.contact };
}

export default async function ContactPage({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const { contact } = dict;

  return (
    <SubpageShell>
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <Reveal className="mb-16">
          <SectionHeading eyebrow={contact.eyebrow} title={contact.title} tone="light" />
        </Reveal>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal delay={1} className="space-y-10">
            <p className="max-w-[42ch] text-[0.95rem] leading-relaxed text-cream/60">{contact.subtitle}</p>

            <div>
              <h3 className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-cream/45">
                {contact.infoTitle}
              </h3>
              <p className="text-[0.95rem] text-cream/70">{contact.address}</p>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-[0.95rem] text-cream/70 hover:text-gold"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 block text-[0.95rem] text-cream/70 hover:text-gold"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <h3 className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-cream/45">
                {contact.hoursTitle}
              </h3>
              <ul>
                {contact.hours.map((entry) => (
                  <li
                    key={entry.days}
                    className="flex justify-between gap-4 border-b border-line py-2 text-[0.9rem] text-cream/65"
                  >
                    <span>{entry.days}</span>
                    <span>{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <ContactForm form={contact.form} />
          </Reveal>
        </div>

        <Reveal delay={3} className="mt-12">
          <MapEmbed
            query={contact.address}
            title={contact.mapPlaceholder}
            className="h-[360px] w-full md:h-[420px]"
          />
        </Reveal>
      </div>
    </SubpageShell>
  );
}
