import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ParallaxGrid from "@/components/sections/ParallaxGrid";
import FeatureTabs from "@/components/sections/FeatureTabs";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SafetyHero from "@/components/sections/SafetyHero";
import Partners from "@/components/sections/Partners";
import CareersCTA from "@/components/sections/CareersCTA";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return buildMetadata(dict.meta, { title: dict.meta.pageTitle.about, locale, path: "/about" });
}

export default async function AboutPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).about;
  return (
    <>
      <Hero data={t.hero} />
      <ParallaxGrid data={t.parallax} />
      <FeatureTabs data={t.features} />
      <ProductShowcase data={t.showcase} />
      <SafetyHero data={t.safety} />
      <Partners data={t.partners} />
      <CareersCTA data={t.cta} />
    </>
  );
}
