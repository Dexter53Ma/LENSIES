import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServiceCards from "@/components/sections/ServiceCards";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import ServicePortfolio from "@/components/sections/ServicePortfolio";
import CareersCTA from "@/components/sections/CareersCTA";
import SectionDivider from "@/components/section-divider";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return buildMetadata(dict.meta, { title: dict.meta.pageTitle.services, locale, path: "/services" });
}

export default async function ServicesPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).services;
  return (
    <>
      <Hero data={t.hero} />
      <SectionDivider />
      <ServiceCards data={t.serviceCards} />
      <SectionDivider />
      <ProcessTimeline data={t.process} />
      <SectionDivider />
      <ServicePortfolio />
      <SectionDivider />
      <CareersCTA data={t.cta} />
    </>
  );
}
