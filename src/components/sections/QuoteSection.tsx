import { Reveal } from "@/components/ui/Reveal";

type QuoteSectionProps = {
  text: string;
  cite: string;
};

export function QuoteSection({ text, cite }: QuoteSectionProps) {
  return (
    <section className="bg-charcoal px-6 py-24 text-center md:py-28">
      <Reveal className="mx-auto max-w-[900px]">
        <blockquote className="font-display text-[clamp(1.6rem,4vw,3rem)] italic leading-[1.2] text-cream">
          {text}
        </blockquote>
        <cite className="mt-6 block text-[0.7rem] not-italic uppercase tracking-[0.2em] text-cream/35">
          {cite}
        </cite>
      </Reveal>
    </section>
  );
}
