import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import MasonryGallery from "@/components/sections/MasonryGallery";
import CareersCTA from "@/components/sections/CareersCTA";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return buildMetadata(dict.meta, { title: dict.meta.pageTitle.portfolio, locale, path: "/portfolio" });
}

export default async function PortfolioPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).portfolio;
  return (
    <>
      <Hero data={t.hero} />
      <MasonryGallery />
      <CareersCTA data={t.cta} />
    </>
  );
}
