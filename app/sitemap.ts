import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getAllSlugs } from "@/content/blog";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/courses",
  "/teachers",
  "/level-test",
  "/business",
  "/blog",
  "/contact",
  "/partnership",
  "/b1-exercises",
  "/legal/privacy",
  "/legal/refund",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const slug of getAllSlugs()) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
