import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { getDictionary } from "@/i18n/get-dictionary";

const BASE = "https://www.lensies.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const LAST_CONTENT_UPDATE = new Date("2026-07-26");
  const staticEntries = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_CONTENT_UPDATE,
  }));
  const enPosts = getDictionary("en").blog.data.posts;
  const slugs = getAllSlugs();
  const blogEntries = slugs.map((s: { slug: string }) => {
    const post = enPosts.find((p) => p.slug === s.slug);
    return {
      url: `${BASE}/blog/${s.slug}`,
      lastModified: post ? new Date(post.date) : undefined,
    };
  });
  return [...staticEntries, ...blogEntries];
}
