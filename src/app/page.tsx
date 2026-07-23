import Hero from "@/components/sections/Hero";
import Platforms from "@/components/sections/Platforms";
import ParallaxGrid from "@/components/sections/ParallaxGrid";
import FeatureTabs from "@/components/sections/FeatureTabs";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SafetyHero from "@/components/sections/SafetyHero";
import Partners from "@/components/sections/Partners";
import Insights from "@/components/sections/Insights";
import CareersCTA from "@/components/sections/CareersCTA";
import SectionDivider from "@/components/section-divider";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).home;
  return (
    <main>
      <Hero data={t.hero} />
      <SectionDivider />
      <Platforms />
      <SectionDivider />
      <ParallaxGrid data={t.parallax} />
      <SectionDivider />
      <FeatureTabs data={t.features} />
      <SectionDivider />
      <ProductShowcase data={t.showcase} />
      <SectionDivider />
      <SafetyHero data={t.safety} />
      <SectionDivider />
      <Partners data={t.partners} />
      <SectionDivider />
      <Insights />
      <SectionDivider />
      <CareersCTA data={t.cta} />
    </main>
  );
}
