import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutStory from "@/components/sections/AboutStory";
import TeamGrid from "@/components/sections/TeamGrid";
import GearShowcase from "@/components/sections/GearShowcase";
import ValuesGrid from "@/components/sections/ValuesGrid";
import CareersCTA from "@/components/sections/CareersCTA";
import SectionDivider from "@/components/section-divider";
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
      <SectionDivider />
      <AboutStory data={t.story} />
      <SectionDivider />
      <TeamGrid data={t.team} />
      <SectionDivider />
      <GearShowcase data={t.gear} />
      <SectionDivider />
      <ValuesGrid data={t.values} />
      <SectionDivider />
      <CareersCTA data={t.cta} />
    </>
  );
}
