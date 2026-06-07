import Hero from "@/components/sections/Hero";
import Platforms from "@/components/sections/Platforms";
import ParallaxGrid from "@/components/sections/ParallaxGrid";
import FeatureTabs from "@/components/sections/FeatureTabs";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SafetyHero from "@/components/sections/SafetyHero";
import Partners from "@/components/sections/Partners";
import Insights from "@/components/sections/Insights";
import CareersCTA from "@/components/sections/CareersCTA";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).home;
  return (
    <main>
      <Hero data={t.hero} />
      <Platforms />
      <ParallaxGrid data={t.parallax} />
      <FeatureTabs data={t.features} />
      <ProductShowcase data={t.showcase} />
      <SafetyHero data={t.safety} />
      <Partners data={t.partners} />
      <Insights />
      <CareersCTA data={t.cta} />
    </main>
  );
}
