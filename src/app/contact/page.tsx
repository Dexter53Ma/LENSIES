import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ParallaxGrid from "@/components/sections/ParallaxGrid";
import FeatureTabs from "@/components/sections/FeatureTabs";
import SafetyHero from "@/components/sections/SafetyHero";
import CareersCTA from "@/components/sections/CareersCTA";
import ContactForm from "@/components/sections/ContactForm";
import { Reveal } from "@/components/reveal";
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
      <section className="bg-background px-24 pb-80 sm:px-40 md:px-90">
        <div className="mx-auto max-w-[120rem]">
          <Reveal>
            <div className="overflow-hidden rounded-[1.6rem] border border-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.1234567890123!2d-7.9811!3d31.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ2LjIiTiA3wrA1OCc1Mi4wIlc!5e0!3m2!1sen!2sma!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lensies studio location in Gueliz, Marrakech"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <SafetyHero data={t.safety} />
      <CareersCTA data={t.cta} />
    </>
  );
}
