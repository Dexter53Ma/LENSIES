import type { Metadata } from "next";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return buildMetadata(dict.meta, {
    title: "Privacy Policy",
    description: "Lensies privacy policy — how we collect, use, and protect your personal data.",
    locale,
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-[80rem] px-24 py-120 sm:px-40 md:px-90 md:py-160">
        <h1
          className="font-display text-balance text-foreground mb-48"
          style={{
            fontSize: "clamp(3rem, 6vw, 6rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          Privacy Policy
        </h1>

        <div className="flex flex-col gap-40 font-body text-[1.5rem] font-medium leading-[1.65] text-foreground/80 md:text-[1.6rem]">
          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              1. Information We Collect
            </h2>
            <p>
              When you contact us through our website, book a shoot, or subscribe to our newsletter, we may collect the following personal information:
            </p>
            <ul className="mt-16 flex flex-col gap-8 list-disc pl-24">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Project location and details</li>
              <li>Any additional information you voluntarily provide in messages</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              2. How We Use Your Information
            </h2>
            <p>We use your personal data to:</p>
            <ul className="mt-16 flex flex-col gap-8 list-disc pl-24">
              <li>Respond to inquiries and provide quotes</li>
              <li>Schedule and deliver photography, videography, and drone services</li>
              <li>Send booking confirmations and invoices</li>
              <li>Improve our website and services</li>
              <li>Send occasional updates about our work (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              3. Data Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers (such as email delivery services) solely to fulfill our services to you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              4. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              5. Cookies
            </h2>
            <p>
              Our website uses cookies to improve your browsing experience. You can choose to disable cookies through your browser settings. Some features of the site may not function properly without cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-16 flex flex-col gap-8 list-disc pl-24">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              7. Contact Us
            </h2>
            <p>
              For any questions about this privacy policy or to exercise your data rights, contact us at{" "}
              <a href="mailto:contact@lensies.com" className="text-pink underline">contact@lensies.com</a>{" "}
              or call{" "}
              <a href="tel:+212621947493" className="text-pink underline">+212 621 947 493</a>.
            </p>
          </section>

          <section>
            <p className="text-foreground/50 text-[1.3rem]">
              Last updated: July 2026
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
