import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ValueItem = { title: string; description: string };

type ValuesGridProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ValueItem[];
};

const delays = [1, 2, 3, 4] as const;

export function ValuesGrid({ eyebrow, title, subtitle, items }: ValuesGridProps) {
  return (
    <section className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto mb-20 grid max-w-[1400px] gap-10 md:grid-cols-2 md:items-end">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} tone="dark" />
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-[38ch] text-[0.9rem] leading-relaxed text-charcoal/50 md:justify-self-end md:text-right">
            {subtitle}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-px bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal
            key={item.title}
            delay={delays[index % delays.length]}
            className="card-hover-dark group bg-paper p-10"
          >
            <span className="mb-6 block text-[0.6rem] tracking-[0.2em] text-gold transition-transform duration-300 group-hover:translate-x-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mb-3 text-lg italic leading-snug text-charcoal">{item.title}</h3>
            <p className="text-[0.82rem] leading-relaxed text-charcoal/45">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
