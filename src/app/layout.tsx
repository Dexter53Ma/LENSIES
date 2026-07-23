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
    icons: {
      icon: [
        { url: "/images/favicon.png", sizes: "any", type: "image/png" },
        { url: "/seo/favicon.ico", sizes: "32x32" },
        { url: "/seo/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/seo/favicon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/seo/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
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
        <noscript>
          <style>{`.reveal,.reveal-fade,.reveal-rise,.reveal-scale,.reveal-slide-right,.reveal-slide-left{opacity:1!important;transform:none!important;animation:none!important;}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-background text-foreground font-body selection:bg-pink selection:text-white">
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
