import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ReservationForm } from "@/components/reservation/ReservationForm";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  const dict = getDictionary(locale);
  const description =
    locale === "en"
      ? "Book your table at Mannà, a restaurant on Carrer de Llull 74, Barcelona. Fill in the form and we'll confirm your booking by phone or email."
      : "Reserva tu mesa en Mannà, restaurante en Calle Llull 74, Barcelona. Completa el formulario y te confirmaremos la reserva por teléfono o email.";
  return buildPageMetadata({ locale, routeKey: "reservation", title: dict.nav.reservation, description });
}

export default async function ReservationPage({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const { reservation } = dict;

  return (
    <SubpageShell>
      <div className="mx-auto grid max-w-[1100px] gap-16 px-6 py-16 md:grid-cols-[1fr_1.3fr] md:px-10 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={reservation.eyebrow}
            title={reservation.title}
            subtitle={reservation.subtitle}
            tone="dark"
          />
        </Reveal>
        <Reveal delay={1}>
          <ReservationForm form={reservation.form} locale={locale} />
        </Reveal>
      </div>
    </SubpageShell>
  );
}
