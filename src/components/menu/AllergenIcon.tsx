import type { AllergenCode } from "@/lib/allergens";
import { allergenColors } from "@/lib/allergens";

type AllergenIconProps = {
  code: AllergenCode;
  size?: number;
};

export function AllergenIcon({ code, size = 24 }: AllergenIconProps) {
  const color = allergenColors[code];

  const icons: Record<AllergenCode, React.ReactNode> = {
    gluten: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round">
        <path d="M30 70 Q30 40 50 20 Q70 40 70 70" />
        <circle cx="30" cy="75" r="3" fill={color} />
        <circle cx="50" cy="80" r="3" fill={color} />
        <circle cx="70" cy="75" r="3" fill={color} />
      </svg>
    ),
    crustaceans: (
      <svg viewBox="0 0 100 100" fill={color}>
        <ellipse cx="50" cy="50" rx="25" ry="30" />
        <path d="M25 40 Q15 35 10 25 M75 40 Q85 35 90 25" stroke={color} strokeWidth="5" fill="none" />
        <circle cx="40" cy="45" r="4" fill="white" />
        <circle cx="60" cy="45" r="4" fill="white" />
      </svg>
    ),
    eggs: (
      <svg viewBox="0 0 100 100" fill={color}>
        <path d="M50 15 Q35 25 35 45 Q35 70 50 80 Q65 70 65 45 Q65 25 50 15" />
      </svg>
    ),
    fish: (
      <svg viewBox="0 0 100 100" fill={color}>
        <ellipse cx="50" cy="50" rx="30" ry="20" />
        <polygon points="80,50 95,40 95,60" fill={color} />
        <circle cx="65" cy="45" r="3" fill="white" />
      </svg>
    ),
    peanuts: (
      <svg viewBox="0 0 100 100" fill={color}>
        <ellipse cx="35" cy="45" rx="18" ry="25" />
        <ellipse cx="65" cy="50" rx="18" ry="25" />
        <ellipse cx="50" cy="70" rx="16" ry="20" />
      </svg>
    ),
    soy: (
      <svg viewBox="0 0 100 100" fill={color}>
        <circle cx="40" cy="35" r="15" />
        <circle cx="60" cy="45" r="15" />
        <circle cx="45" cy="65" r="15" />
      </svg>
    ),
    milk: (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="5">
        <rect x="30" y="20" width="40" height="60" rx="5" />
        <path d="M40 20 Q40 10 50 8 Q60 10 60 20" />
      </svg>
    ),
    nuts: (
      <svg viewBox="0 0 100 100" fill={color}>
        <ellipse cx="50" cy="50" rx="28" ry="32" />
        <path d="M35 40 Q35 28 50 22 Q65 28 65 40" fill="white" opacity="0.3" />
      </svg>
    ),
    celery: (
      <svg viewBox="0 0 100 100" fill={color}>
        <line x1="30" y1="80" x2="30" y2="20" stroke={color} strokeWidth="6" />
        <path d="M25 30 Q20 25 15 20 M35 40 Q40 35 45 30 M25 50 Q18 48 12 50" stroke={color} strokeWidth="4" fill="none" />
      </svg>
    ),
    mustard: (
      <svg viewBox="0 0 100 100" fill={color}>
        <circle cx="50" cy="45" r="20" />
        <path d="M50 25 L45 15 L50 10 L55 15 Z" />
      </svg>
    ),
    sesame: (
      <svg viewBox="0 0 100 100" fill={color}>
        <rect x="25" y="30" width="50" height="40" rx="8" />
        <circle cx="35" cy="40" r="3" fill="white" />
        <circle cx="50" cy="35" r="3" fill="white" />
        <circle cx="65" cy="42" r="3" fill="white" />
        <circle cx="38" cy="58" r="3" fill="white" />
        <circle cx="55" cy="62" r="3" fill="white" />
        <circle cx="68" cy="55" r="3" fill="white" />
      </svg>
    ),
    sulphites: (
      <svg viewBox="0 0 100 100" fill={color}>
        <circle cx="50" cy="50" r="18" />
        <circle cx="50" cy="32" r="12" />
        <circle cx="65" cy="58" r="12" />
        <circle cx="35" cy="58" r="12" />
      </svg>
    ),
    lupins: (
      <svg viewBox="0 0 100 100" fill={color}>
        <circle cx="50" cy="30" r="12" />
        <circle cx="50" cy="48" r="12" />
        <circle cx="50" cy="66" r="12" />
      </svg>
    ),
    molluscs: (
      <svg viewBox="0 0 100 100" fill={color}>
        <path d="M30 70 Q30 40 50 30 Q70 40 70 70 L70 80 Q50 85 30 80 Z" />
        <path d="M45 50 L55 50" stroke="white" strokeWidth="3" />
      </svg>
    ),
  };

  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icons[code]}
    </div>
  );
}
