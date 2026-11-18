import type { Metadata } from "next";
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero";
import { TestimonialsContent } from "@/components/testimonials/testimonials-content";

export const metadata: Metadata = {
  title: "Customer Testimonials | Miraya Diamonds, Jaipur",
  description: "Read customer stories from Miraya Diamonds, or share your own. Tell us about the jewellery you chose and the moment it celebrates.",
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white font-inter text-[#353333]">
      <TestimonialsHero />
      <TestimonialsContent />
    </main>
  );
}
