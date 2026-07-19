"use client";

import { useParams } from "next/navigation";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { path } from "@/lib/routes";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// not-found.tsx receives no props (no params), so the locale is read
// client-side from the URL via useParams() instead.
export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params?.locale ?? "") ? (params!.locale as typeof defaultLocale) : defaultLocale;
  const { notFound } = getDictionary(locale);

  return (
    <SubpageShell>
      <div className="mx-auto flex min-h-[60vh] max-w-[1400px] flex-col items-center justify-center px-6 py-24 text-center md:px-10">
        <SectionHeading
          eyebrow={notFound.eyebrow}
          title={notFound.title}
          subtitle={notFound.message}
          align="center"
          tone="dark"
        />
        <Button href={path(locale, "home")} className="mt-10">
          {notFound.cta}
        </Button>
      </div>
    </SubpageShell>
  );
}
