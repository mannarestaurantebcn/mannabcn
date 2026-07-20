"use client";

import { useEffect, useRef } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { stockPhotos } from "@/lib/stock-photos";

export function HeroBackground({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      ref.current.style.transform = `translateY(${window.scrollY * 0.32}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="absolute inset-[-12%] will-change-transform">
      <PlaceholderImage label={label} src={"foto-hero.jpeg"} className="h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/35 to-charcoal/70" />
    </div>
  );
}
