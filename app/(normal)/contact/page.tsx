import { ContactHero } from "@/components/contact/contact-hero";
import { QuickContact } from "@/components/contact/quick-contact";
import { ConsultationBooking } from "@/components/contact/consultation-booking";
import { FaqSection } from "@/components/contact/faq-section";
import { DirectInquirySection } from "@/components/contact/direct-inquiry-section";
import { HeirloomBanner } from "@/components/contact/heirloom-banner";

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <QuickContact />
      <ConsultationBooking />
      <FaqSection />
      <DirectInquirySection />
      <HeirloomBanner />
    </main>
  );
}
