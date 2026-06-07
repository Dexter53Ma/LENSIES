import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import BlogPostView from "@/components/sections/BlogPostView";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const post = getPostBySlug(locale, slug);
  const dict = getDictionary(locale);
  if (!post) {
    return buildMetadata(dict.meta, {
      title: dict.blogPost.notFoundTitle,
      locale,
      path: `/blog/${slug}`,
    });
  }
  return buildMetadata(dict.meta, {
    title: post.title,
    description: post.excerpt,
    image: post.heroImage,
    locale,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const related = getRelatedPosts(locale, post.relatedSlugs);
  return <BlogPostView post={post} related={related} />;
}
