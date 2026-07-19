import type { MetadataRoute } from "next";

const getSiteUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.startsWith("http") ? url : `https://${url}`;
};
const BASE_URL = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
