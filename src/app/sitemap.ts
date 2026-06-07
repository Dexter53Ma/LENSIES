import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { getDictionary } from "@/i18n/get-dictionary";

const BASE = "https://lensies.ma";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/blog",
    "/contact",
  ];
  const staticEntries = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));
  const enPosts = getDictionary("en").blog.data.posts;
  const slugs = getAllSlugs();
  const blogEntries = slugs.map((s: { slug: string }) => {
    const post = enPosts.find((p) => p.slug === s.slug);
    return {
      url: `${BASE}/blog/${s.slug}`,
      lastModified: post ? new Date(post.date) : now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    };
  });
  return [...staticEntries, ...blogEntries];
}
