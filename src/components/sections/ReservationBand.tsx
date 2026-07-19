import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { path } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type ReservationBandProps = {
  locale: Locale;
  home: Dictionary["home"];
};

export function ReservationBand({ locale, home }: ReservationBandProps) {
  const { reservationBand } = home;

  return (
    <section className="bg-gold px-6 py-24 text-center md:py-28">
      <Reveal className="mx-auto max-w-[640px]">
        <SectionHeading
          eyebrow={reservationBand.eyebrow}
          title={reservationBand.title}
          subtitle={reservationBand.subtitle}
          align="center"
          tone="olive"
        />
        <Button href={path(locale, "reservation")} variant="dark" className="mt-10">
          {reservationBand.cta}
        </Button>
      </Reveal>
    </section>
  );
}
