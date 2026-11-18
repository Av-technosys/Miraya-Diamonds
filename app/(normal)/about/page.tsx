import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { BrandIntroduction } from "@/components/about/brand-introduction";
import { OurStoryAndTimeline } from "@/components/about/our-story-timeline";
import { OurValues } from "@/components/about/our-values";
import { ArtOfCraftsmanship } from "@/components/about/art-of-craftsmanship";
import { CollectionPhilosophy } from "@/components/about/collection-philosophy";
import { TrustAndCredibility } from "@/components/about/trust-credibility";
import { ConfidencePledge } from "@/components/about/confidence-pledge";
import { FinalCTA } from "@/components/about/final-cta";

export const metadata: Metadata = {
  title: "About Miraya Diamonds | Diamond & Gold Jewellery in Jaipur",
  description: "Miraya Diamonds is a Jaipur-based jeweller of customised diamond & gold jewellery. We create personalised designs for your special moments. Explore designs.",
};

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <AboutHero />
      <BrandIntroduction />
      <OurStoryAndTimeline />
      <OurValues />
      <ArtOfCraftsmanship />
      <CollectionPhilosophy />
      <TrustAndCredibility />
      <ConfidencePledge />
      <FinalCTA />
    </main>
  );
}
