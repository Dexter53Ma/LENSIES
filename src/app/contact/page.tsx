import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ParallaxGrid from "@/components/sections/ParallaxGrid";
import FeatureTabs from "@/components/sections/FeatureTabs";
import SafetyHero from "@/components/sections/SafetyHero";
import CareersCTA from "@/components/sections/CareersCTA";
import ContactForm from "@/components/sections/ContactForm";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return {
    ...buildMetadata(dict.meta, { title: dict.meta.pageTitle.contact, description: "Book a shoot or get a custom quote. Lensies studio in Gueliz, Marrakech. Phone: +212 621 947 493. We reply within 24 hours.", locale, path: "/contact" }),
  };
}

export default async function ContactPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).contact;
  return (
    <>
      <Hero data={t.hero} />
      <ParallaxGrid data={t.parallax} />
      <FeatureTabs data={t.features} />
      <ContactForm />
      <SafetyHero data={t.safety} />
      <CareersCTA data={t.cta} />
    </>
  );
}
