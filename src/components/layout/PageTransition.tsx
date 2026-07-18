"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Replays a subtle fade/rise on every route change, including locale switches. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
