import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "dark";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  onClick?: () => void;
  disabled?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gold text-cream border border-gold hover:bg-gold-dark hover:border-gold-dark focus-visible:outline-gold",
  // Used on the white page background (e.g. the gallery teaser CTA).
  outline: "bg-transparent text-charcoal border border-charcoal/30 hover:border-charcoal focus-visible:outline-charcoal",
  // Used only where a button floats over a dark photo (e.g. the hero).
  ghost: "bg-transparent text-cream border border-cream/40 hover:border-cream focus-visible:outline-cream",
  // Dark button for the rare case of sitting on a bright olive surface (e.g. the reservation band).
  dark: "bg-charcoal text-cream border border-charcoal hover:bg-noir hover:border-noir focus-visible:outline-cream",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} disabled={props.disabled} className={classes}>
      {children}
    </button>
  );
}
