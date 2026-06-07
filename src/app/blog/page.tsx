import type { Metadata } from "next";
import Blog from "@/components/sections/Blog";
import CareersCTA from "@/components/sections/CareersCTA";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return buildMetadata(dict.meta, { title: dict.meta.pageTitle.blog, locale, path: "/blog" });
}

export default async function BlogPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).blog;
  return (
    <>
      <Blog />
      <CareersCTA data={t.cta} />
    </>
  );
}
