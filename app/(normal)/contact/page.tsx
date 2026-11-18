import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { QuickContact } from "@/components/contact/quick-contact";
import { ConsultationBooking } from "@/components/contact/consultation-booking";
import { FaqSection } from "@/components/common/faq-section";
import { DirectInquirySection } from "@/components/contact/direct-inquiry-section";
import { HeirloomBanner } from "@/components/contact/heirloom-banner";

export const metadata: Metadata = {
  title: "Contact Miraya Diamonds | Custom Jewellery Jaipur, India",
  description: "Contact Miraya Diamonds in Jaipur to ask about a design, discuss custom jewellery or book an in-store or virtual consultation. Call, email or WhatsApp us.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white font-inter text-[#353333]">
      <ContactHero />
      <QuickContact />
      <ConsultationBooking />
      <FaqSection />
      <DirectInquirySection />
      <HeirloomBanner />
    </main>
  );
}
