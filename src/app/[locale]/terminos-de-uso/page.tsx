import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfUse } from "@/lib/legal-content";
import { buildPageMetadata } from "@/lib/seo";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  return buildPageMetadata({
    locale,
    routeKey: "terms",
    title: termsOfUse[locale].title,
    description: termsOfUse[locale].description,
  });
}

export default async function TermsOfUsePage({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  return <LegalPage content={termsOfUse[locale]} />;
}
