import type { Metadata } from "next";
import { CustomizeHero } from "@/components/customize/customize-hero";
import { DesignProcess } from "@/components/customize/design-process";
import { BehindTheCraft } from "@/components/customize/behind-craft";
import { GlimpsePossibilities } from "@/components/customize/glimpse-possibilities";
import { CustomizeContactSection } from "@/components/customize/customize-contact-section";
import { CustomizeFaq } from "@/components/customize/customize-faq";

export const metadata: Metadata = {
  title: "Customise Your Jewellery | Miraya Diamonds",
  description:
    "Turn your ideas into timeless bespoke jewellery. From the first sketch to the final sparkle, we bring your vision to life.",
};

export default function CustomizePage() {
  return (
    <main className="min-h-screen bg-white">
      <CustomizeHero />
      <DesignProcess />
      <BehindTheCraft />
      <CustomizeContactSection />
      <GlimpsePossibilities />
      <CustomizeFaq />
    </main>
  );
}
