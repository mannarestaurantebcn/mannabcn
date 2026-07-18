"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
};

export function Reveal({ children, delay, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", visible && "is-visible", delay ? `reveal-delay-${delay}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
