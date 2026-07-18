"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Value as printed, e.g. "100+", "15h", "100%", "7" — the leading number is animated. */
  value: string;
  durationMs?: number;
};

const numberPattern = /^(\d+)(.*)$/;

export function CountUp({ value, durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(numberPattern);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    const node = ref.current;
    if (!node || target === null) return;

    let frame: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(String(target));
          return;
        }

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(String(Math.round(target! * eased)));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        }
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, durationMs]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
