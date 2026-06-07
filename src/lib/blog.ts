import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/i18n/types";

export type BlogAuthor = BlogPost["author"];
export type BlogSection = BlogPost["sections"][number];
export type BlogPostFull = BlogPost;

export function getAllSlugs(): { slug: string }[] {
  const en = getDictionary("en");
  return en.blog.data.posts.map((p) => ({ slug: p.slug }));
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | undefined {
  return getDictionary(locale).blog.data.posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(locale: Locale, slugs: string[]): BlogPost[] {
  return slugs
    .map((s) => getPostBySlug(locale, s))
    .filter((p): p is BlogPost => Boolean(p));
}
