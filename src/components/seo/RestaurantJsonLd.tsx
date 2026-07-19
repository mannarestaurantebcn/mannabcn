import type { Locale } from "@/i18n/config";
import { path } from "@/lib/routes";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Renders Restaurant structured data (schema.org) so Google can show hours,
 * address and cuisine directly in search results. */
export function RestaurantJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Mannà",
    // TODO: swap for a real photo of the restaurant once professional photography is available.
    image: `${BASE_URL}${path(locale, "home")}/opengraph-image`,
    url: `${BASE_URL}${path(locale, "home")}`,
    telephone: "+34633832057",
    priceRange: "€€",
    servesCuisine: "Mediterranean",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer de Llull 74",
      addressLocality: "Barcelona",
      postalCode: "08005",
      addressCountry: "ES",
    },
    menu: `${BASE_URL}${path(locale, "menu")}`,
    acceptsReservations: "True",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:30",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:00",
        closes: "17:00",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
