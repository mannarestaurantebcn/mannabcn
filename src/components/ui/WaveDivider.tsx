type WaveDividerProps = {
  className?: string;
  color?: string;
  animated?: boolean;
};

/**
 * Recurring brand motif echoing the wave under "MANNÀ" on the restaurant's
 * storefront sign. Used as a logo underline and as a section divider.
 */
export function WaveDivider({ className = "", color = "currentColor", animated = false }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className={`${animated ? "animate-wave-bob" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 10 C 12.5 0, 37.5 20, 50 10 C 62.5 0, 87.5 20, 100 10 C 112.5 0, 137.5 20, 150 10 C 162.5 0, 187.5 20, 200 10"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
