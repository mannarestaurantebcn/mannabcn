import { SubpageShell } from "@/components/layout/SubpageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalPageContent } from "@/lib/legal-content";

export function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <SubpageShell>
      <div className="mx-auto max-w-[840px] px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <SectionHeading title={content.title} tone="dark" />
          <p className="mt-4 text-[0.75rem] uppercase tracking-[0.16em] text-charcoal/40">{content.updated}</p>
        </Reveal>

        <div className="mt-14 space-y-10">
          {content.sections.map((section, index) => (
            <Reveal key={section.heading} delay={(((index % 3) + 1) as 1 | 2 | 3)}>
              <h2 className="font-display mb-3 text-lg italic text-charcoal">{section.heading}</h2>
              <div className="space-y-3">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[0.92rem] leading-relaxed text-charcoal/65">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SubpageShell>
  );
}
