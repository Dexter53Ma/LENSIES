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
  return {
    ...buildMetadata(dict.meta, {
      title: post.title,
      description: post.excerpt,
      image: post.heroImage,
      locale,
      path: `/blog/${slug}`,
    }),
    other: {
      "og:type": "article",
      "article:published_time": post.date,
      "article:author": post.author.name,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const related = getRelatedPosts(locale, post.relatedSlugs);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://www.lensies.co/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@id": "https://www.lensies.co/#localbusiness",
    },
    image: post.heroImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.lensies.co/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lensies.co" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.lensies.co/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.lensies.co/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostView post={post} related={related} />
    </>
  );
}
