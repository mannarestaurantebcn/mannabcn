type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Title/subtitle strings may contain \n for intentional line breaks. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto items-center text-center" : "items-start text-left";
  const titleColor = tone === "light" ? "text-cream" : "text-charcoal";
  const subtitleColor = tone === "light" ? "text-cream/60" : "text-charcoal/60";
  const eyebrowColor = tone === "light" ? "text-gold" : "text-terracotta";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`mb-4 block text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display whitespace-pre-line text-[clamp(2rem,4.5vw,3.4rem)] font-light italic leading-[1.1] ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-[42ch] whitespace-pre-line text-[0.95rem] leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
