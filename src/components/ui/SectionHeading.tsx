type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** "dark" = black text on white; "light" = cream text on black; "olive" = white text on the olive band. */
  tone?: "dark" | "light" | "olive";
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
  const titleColor = tone === "dark" ? "text-charcoal" : "text-cream";
  const subtitleColor = tone === "dark" ? "text-charcoal/60" : "text-cream/60";
  const eyebrowColor = tone === "dark" ? "text-charcoal" : tone === "olive" ? "text-cream" : "text-gold";

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
