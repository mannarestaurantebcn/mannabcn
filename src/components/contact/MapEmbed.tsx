type MapEmbedProps = {
  query: string;
  title: string;
  className?: string;
};

/** Embeds Google Maps for the given address — no API key needed for this basic embed. */
export function MapEmbed({ query, title, className = "" }: MapEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <iframe
      src={src}
      title={title}
      className={`border-0 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
