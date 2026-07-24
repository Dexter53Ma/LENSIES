import type { Metadata } from "next";
import type { Dictionary } from "./types";

const SITE_URL = "https://lensies.ma";

/**
 * Build a Next.js `Metadata` object from a dictionary's `meta` block.
 * All locale-specific strings (title, description, OG, Twitter, etc.)
 * flow through here so the first server-rendered HTML is in the
 * active locale — no client hydration required for SEO.
 */
export function buildMetadata(
  meta: Dictionary["meta"],
  options: {
    title?: string;
    description?: string;
    image?: string;
    locale: string;
    path?: string;
  },
): Metadata {
  const { title, description, image, locale, path } = options;
  const ogLocale = locale === "fr" ? "fr_MA" : "en_US";
  const canonicalUrl = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImage = image ?? "/images/work-2.png";
  const desc = description ?? meta.description;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.titleDefault,
      template: meta.titleTemplate,
    },
    ...(title ? { title } : {}),
    description: desc,
    keywords: meta.keywords,
    authors: meta.authors,
    creator: meta.creator,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: canonicalUrl,
      siteName: meta.ogSiteName,
      title: title ?? meta.ogTitle,
      description: desc,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? meta.twitterTitle,
      description: desc,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/images/favicon.png",
      apple: [{ url: "/images/favicon.png", sizes: "192x192" }],
    },
  };
}
