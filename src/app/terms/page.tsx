import type { Metadata } from "next";
import { getServerLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return buildMetadata(dict.meta, {
    title: "Terms of Service",
    description: "Lensies terms of service — booking, payment, cancellation, and usage policies.",
    locale,
    path: "/terms",
  });
}

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="flex flex-col gap-40 font-body text-[1.5rem] font-medium leading-[1.65] text-foreground/80 md:text-[1.6rem]">
          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              1. Services
            </h2>
            <p>
              Lensies provides professional photography, videography, drone aerial, event coverage, 3D virtual tours, and curated tour experiences based in Marrakech, Morocco. All services are subject to availability and our acceptance of your booking request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              2. Booking & Scheduling
            </h2>
            <ul className="flex flex-col gap-8 list-disc pl-24">
              <li>Bookings are confirmed upon receipt of a signed quote or deposit payment.</li>
              <li>We aim to respond to all booking requests within 24 hours on weekdays.</li>
              <li>Shoot dates and times are subject to weather conditions, especially for drone and twilight sessions.</li>
              <li>We reserve the right to reschedule in case of unsafe weather or force majeure events.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              3. Pricing & Payment
            </h2>
            <ul className="flex flex-col gap-8 list-disc pl-24">
              <li>All prices are quoted in Moroccan Dirhams (MAD) unless otherwise stated.</li>
              <li>Payment is due upon delivery of final edited files unless otherwise agreed in writing.</li>
              <li>Accepted payment methods: bank transfer, cash, and other methods as agreed.</li>
              <li>Custom quotes are valid for 14 days from the date of issue.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              4. Cancellation & Rescheduling
            </h2>
            <ul className="flex flex-col gap-8 list-disc pl-24">
              <li>Free cancellation up to 48 hours before the scheduled shoot.</li>
              <li>Cancellations within 48 hours may incur a 50% fee.</li>
              <li>No-shows or same-day cancellations are charged in full.</li>
              <li>Rescheduling is free once, subject to availability.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              5. Delivery
            </h2>
            <ul className="flex flex-col gap-8 list-disc pl-24">
              <li>Standard delivery is within 24 hours for real estate photography.</li>
              <li>Video and drone projects may take 3–5 business days.</li>
              <li>Files are delivered via digital download link, valid for 30 days.</li>
              <li>Rush delivery is available upon request for an additional fee.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              6. Copyright & Usage
            </h2>
            <ul className="flex flex-col gap-8 list-disc pl-24">
              <li>Lensies retains copyright over all delivered images and videos.</li>
              <li>Clients receive a perpetual, non-exclusive license to use the content for their stated purpose (e.g., property listings, social media, marketing).</li>
              <li>Commercial resale or redistribution requires written permission.</li>
              <li>Lensies may use images for portfolio and marketing purposes unless the client requests otherwise in writing before the shoot.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              7. Drone Regulations
            </h2>
            <p>
              All drone flights are conducted in compliance with Moroccan aviation regulations. We hold the necessary permits and handle all regulatory requirements. Certain areas (medina, airports, military zones) may have flight restrictions. We will advise on feasibility during the booking process.
            </p>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              8. Liability
            </h2>
            <p>
              Lensies carries professional liability insurance. Our total liability is limited to the value of the services booked. We are not liable for indirect, incidental, or consequential damages. We are not responsible for delays caused by factors beyond our control (weather, access restrictions, force majeure).
            </p>
          </section>

          <section>
            <h2 className="font-display text-foreground mb-16" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              9. Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
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
