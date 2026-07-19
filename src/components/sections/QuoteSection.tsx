import { Reveal } from "@/components/ui/Reveal";

type QuoteSectionProps = {
  text: string;
  cite: string;
};

export function QuoteSection({ text, cite }: QuoteSectionProps) {
  return (
    <section className="bg-paper px-6 py-24 text-center md:py-28">
      <Reveal className="mx-auto max-w-[900px]">
        <blockquote className="font-display text-[clamp(1.6rem,4vw,3rem)] italic leading-[1.2] text-charcoal">
          {text}
        </blockquote>
        <cite className="mt-6 block text-[0.7rem] not-italic uppercase tracking-[0.2em] text-charcoal">
          {cite}
        </cite>
      </Reveal>
    </section>
  );
}
