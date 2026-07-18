import type { CSSProperties } from "react";

type PlaceholderImageProps = {
  label: string;
  className?: string;
  style?: CSSProperties;
  /** Temporary stock photo URL (e.g. Unsplash) for previewing the design — swap for the real photo shoot later. */
  src?: string;
};

/**
 * Stand-in for real photography (menu shots, interior, gallery). When `src`
 * is set it shows a temporary stock photo instead of the gradient tile —
 * swap every `src` for the professional shoot once it's delivered, or drop
 * it to fall back to the placeholder tile.
 */
export function PlaceholderImage({ label, className = "", style, src }: PlaceholderImageProps) {
  if (src) {
    return (
      <div style={style} className={`media-zoom relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- temporary stock photo, not optimized/hosted content */}
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          className="media-zoom-inner h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      style={style}
      className={`media-zoom relative flex items-center justify-center bg-gradient-to-br from-maroon-soft via-charcoal to-charcoal text-cream/30 ${className}`}
    >
      <div className="media-zoom-inner flex flex-col items-center gap-3">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M6 2v8a2 2 0 0 0 2 2v10M6 2v6M9 2v6M12 2v20M18 2c-2 2-2 5-2 8 0 2 1 3 2 3s2-1 2-3c0-3 0-6-2-8Z" />
        </svg>
        <span className="text-center text-[0.6rem] font-medium uppercase tracking-[0.25em]">{label}</span>
      </div>
    </div>
  );
}
