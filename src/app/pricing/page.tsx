import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import PricingComparison from "@/components/sections/PricingComparison";
import PricingFAQ from "@/components/sections/PricingFAQ";
import CareersCTA from "@/components/sections/CareersCTA";
import SectionDivider from "@/components/section-divider";
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
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <PricingComparison data={t.comparison} />
      <SectionDivider />
      <PricingFAQ data={t.faq} />
      <SectionDivider />
      <CareersCTA data={t.cta} />
    </>
  );
}
