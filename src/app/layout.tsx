import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "@/components/lenis-provider";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/BackToTop";
import AISupport from "@/components/AISupport";
import { TranslationProvider } from "@/i18n/provider";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";
import "./globals.css";

const zagma = localFont({
  variable: "--font-zagma",
  src: [
    { path: "../../public/fonts/zagma-book.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/zagma-book-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
});

const neueHaas = localFont({
  variable: "--font-neuehaas",
  src: [{ path: "../../public/fonts/neuehaas-medium.woff2", weight: "400", style: "normal" }],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return {
    ...buildMetadata(dict.meta, { locale }),
    verification: {
      google: "IfeXsRle82hM5gov7trb83T_gFHJ2HiO_7BWv7yY_18",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${zagma.variable} ${neueHaas.variable} antialiased`}
      style={{
        ["--duration" as string]: "0.4",
        scrollBehavior: "smooth",
      }}
    >
      <head>
        <link rel="preload" href="/images/logo.png" as="image" />
        <link rel="preload" href="/images/feature-safe.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.lensies.co/#localbusiness",
              name: "Lensies",
              alternateName: "Lensies Studio",
              description: "Marrakech-based creative studio specializing in real estate photography, videography, drone footage, events, experiences, and curated tours across Morocco.",
              url: "https://www.lensies.co",
              logo: "https://www.lensies.co/images/logo.png",
              image: "https://www.lensies.co/images/work-2.png",
              telephone: "+212-621-947-493",
              email: "contact@lensies.com",
              foundingDate: "2017",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gueliz",
                addressLocality: "Marrakech",
                addressRegion: "Marrakech-Safi",
                postalCode: "40000",
                addressCountry: "MA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 31.6295,
                longitude: -7.9811,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "19:00",
              },
              priceRange: "$$",
              areaServed: {
                "@type": "Country",
                name: "Morocco",
              },
              sameAs: [
                "https://instagram.com/lensies.ma",
                "https://youtube.com/@lensies",
                "https://x.com/lensies",
                "https://share.google/Tu1iMQpouuJuXSQdb",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                bestRating: "5",
                ratingCount: "5",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.lensies.co/#website",
              name: "Lensies",
              url: "https://www.lensies.co",
              publisher: { "@id": "https://www.lensies.co/#localbusiness" },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.lensies.co/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NFS5S9FZ');` }} />
        <noscript>
          <style>{`.reveal,.reveal-fade,.reveal-rise,.reveal-scale,.reveal-slide-right,.reveal-slide-left{opacity:1!important;transform:none!important;animation:none!important;}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-background text-foreground font-body selection:bg-pink selection:text-white">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NFS5S9FZ"
height={0} width={0} style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <LenisProvider>
          <TranslationProvider dictionary={dict} locale={locale}>
            <Header />
            {children}
            <Footer />
            <BackToTop />
            <AISupport />
          </TranslationProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
