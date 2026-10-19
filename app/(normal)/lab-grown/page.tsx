import type { Metadata } from "next";
import { LabGrownHero } from "@/components/lab-grown/lab-grown-hero";
import { DiscoverLabGrown } from "@/components/lab-grown/discover-lab-grown";
import { LabVsNatural } from "@/components/lab-grown/lab-vs-natural";
import { HowItsMade } from "@/components/lab-grown/how-its-made";
import { DiamondEducation } from "@/components/lab-grown/diamond-education";
import { SustainabilityBanner } from "@/components/lab-grown/sustainability-banner";

export const metadata: Metadata = {
  title: "Lab Grown Diamonds | Miraya Diamonds",
  description:
    "The same brilliance. A more conscious choice. Explore our exquisite collection of ethically crafted lab grown diamond jewellery.",
};

export default function LabGrownPage() {
  return (
    <main className="min-h-screen bg-white">
      <LabGrownHero />
      <DiscoverLabGrown />
      <LabVsNatural />
      <HowItsMade />
      <DiamondEducation />
      <SustainabilityBanner />
    </main>
  );
}
