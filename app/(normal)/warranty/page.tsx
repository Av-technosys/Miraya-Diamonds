import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";

export const metadata: Metadata = {
  title: "Warranty Policy | Miraya Diamonds, Jaipur",
  description: "Learn about warranty, repair, jewellery care and diamond certification at Miraya Diamonds. Share your purchase details to request a service assessment.",
};

const POLICY_SECTIONS = [
  {
    id: 1,
    title: "Warranty Coverage",
    content: "Warranty coverage depends on the piece and the terms supplied with your purchase. Please ask our team to confirm any coverage before ordering."
  },
  {
    id: 2,
    title: "Warranty Duration",
    content: "Please refer to your invoice and any written warranty terms for the applicable duration. Contact us if the duration is not specified."
  },
  {
    id: 3,
    title: "What Is Covered",
    content: "Our team can assess concerns about a setting, clasp, stone or finish and explain whether the issue falls within the terms provided with your purchase."
  },
  {
    id: 4,
    title: "What Is Not Covered",
    content: "Accidental damage, normal wear, chemical exposure and repairs by another jeweller may affect service eligibility. Please contact us for an assessment of your specific concern."
  },
  {
    id: 5,
    title: "How to Claim Warranty",
    content: "To request an assessment, share your purchase details, a description of the issue and clear photographs. Our team will explain the next steps."
  },
  {
    id: 6,
    title: "Repair & Replacement",
    content: "Repair options, charges and estimated completion times depend on the piece and the assessment. Please confirm the arrangements before sending jewellery to us."
  },
  {
    id: 7,
    title: "Jewellery Care",
    content: "Ask our team about cleaning, polishing, setting checks and other care options. Availability and charges depend on the piece and the service requested."
  },
  {
    id: 8,
    title: "Diamond Certification",
    content: "Ask for the grading documentation available for your selected diamond. A report should identify the stone and its origin; documentation varies by diamond and laboratory."
  },
  {
    id: 9,
    title: "Contact Us",
    content: "For questions about jewellery care or warranty terms, contact Miraya Diamonds at Sales.mirayadiamonds@gmail.com.",
    isContact: true
  }
];

export default function PolicyPage() {
  return (
    <LegalPage
      title="Warranty Policy"
      subtitle="Your jewellery, protected with care and confidence"
      introduction="Find guidance on jewellery care and requesting a service assessment. Warranty coverage, duration and service arrangements must be confirmed for your individual piece."
      lastUpdated="13 November 2026"
      supportMessage="If you have any questions about our Warranty Policy, feel free to reach out."
      badgeTitle="Quality You Can Trust"
      badgeDescription="Ask us about care and service options for your piece."
      contactMessage="If you have any questions or concerns about our Warranty Policy, please contact us at Sales.mirayadiamonds@gmail.com."
      sections={POLICY_SECTIONS}
    />
  );
}
