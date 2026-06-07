import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import CareersCTA from "@/components/sections/CareersCTA";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return buildMetadata(dict.meta, { title: dict.meta.pageTitle.pricing, locale, path: "/pricing" });
}

export default async function PricingPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).pricing;
  return (
    <>
      <Hero data={t.hero} />
      <Pricing />
      <CareersCTA data={t.cta} />
    </>
  );
}
