import type { ReactNode } from "react";

/** Consistent top offset for every page below the fixed nav (home page's hero handles its own spacing). */
export function SubpageShell({ children }: { children: ReactNode }) {
  return <div className="pt-24 md:pt-28">{children}</div>;
}
