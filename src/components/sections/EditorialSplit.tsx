import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

type EditorialSplitProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  placeholderLabel: string;
  reverse?: boolean;
  imageSrc?: string;
};

export function EditorialSplit({
  eyebrow,
  title,
  paragraphs,
  placeholderLabel,
  reverse = false,
  imageSrc,
}: EditorialSplitProps) {
  return (
    <section className="md:grid md:grid-cols-2 md:items-start">
      <Reveal
        className={`flex flex-col justify-center px-6 py-20 md:px-16 md:py-16 ${reverse ? "md:order-2" : ""}`}
      >
        <SectionHeading eyebrow={eyebrow} title={title} tone="dark" />
        <div className="mt-6 space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-[46ch] text-[0.95rem] leading-relaxed text-charcoal/65">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
      <PlaceholderImage
        label={placeholderLabel}
        src={imageSrc}
        className={`editorial-image-align w-full ${reverse ? "md:order-1" : ""}`}
        style={{ height: 520 }}
      />
    </section>
  );
}
