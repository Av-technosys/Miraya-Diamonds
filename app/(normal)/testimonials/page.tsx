import { TestimonialsHero } from "@/components/testimonials/testimonials-hero";
import { TestimonialsContent } from "@/components/testimonials/testimonials-content";

export default function TestimonialsPage() {
  return (
    <main className="w-full bg-white">
      <TestimonialsHero />
      <TestimonialsContent />
    </main>
  );
}
