import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { getDictionary } from "@/i18n/get-dictionary";

const BASE = "https://lensies.ma";

export default function sitemap(): MetadataRoute.Sitemap {
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
