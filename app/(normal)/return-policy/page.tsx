import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Miraya Diamonds",
  description: "Understand Miraya Diamonds' return, exchange and refund process, including how to request a return and what applies to damaged or customised jewellery.",
};

const POLICY_SECTIONS = [
  {
    id: 1,
    title: "Eligibility for Returns",
    content: "Return eligibility depends on the item and the terms confirmed at purchase. Please check the applicable return window, condition requirements and any exclusions with our team before ordering."
  },
  {
    id: 2,
    title: "How to Initiate a Return",
    content: "To discuss a return, email Sales.mirayadiamonds@gmail.com or call +91 9869698984 with your purchase details and reason for the request. Please obtain return instructions before sending an item."
  },
  {
    id: 3,
    title: "Inspection & Approval",
    content: "Our team will review your request and may need to inspect the item and its accompanying documents. We will explain the assessment and next steps for your case."
  },
  {
    id: 4,
    title: "Refund Process",
    content: "If a refund is approved, our team will confirm the amount, payment method and estimated processing time. Please ask about any applicable delivery or service charges."
  },
  {
    id: 5,
    title: "Exchange Policy",
    content: "Contact our team to check whether an exchange is available for your piece. Design availability, size changes and price differences will be discussed before you proceed."
  },
  {
    id: 6,
    title: "Damaged or Defective Items",
    content: "If your jewellery arrives damaged or appears to have a defect, contact us promptly with photographs, packaging details and your purchase reference so we can assist."
  },
  {
    id: 7,
    title: "Non-Returnable Items",
    content: "Custom designs, engraving and other personalisation may affect return or exchange eligibility. Confirm any exclusions in writing before approving custom work."
  },
  {
    id: 8,
    title: "Contact Us",
    content: "For questions about returns or exchanges, contact Miraya Diamonds at Sales.mirayadiamonds@gmail.com.",
    isContact: true
  }
];

export default function PolicyPage() {
  return (
    <LegalPage
      title="Return Policy"
      subtitle="Understand the terms for your chosen piece"
      introduction="Before ordering, please confirm the return, exchange and refund terms for your chosen piece with our team. The guidance below explains how to contact us and discuss a request."
      lastUpdated="13 November 2026"
      supportMessage="If you have any questions about our Return Policy, feel free to reach out."
      badgeTitle="Return & Exchange Guidance"
      badgeDescription="Contact our team to understand your available options."
      contactMessage="If you have any questions or concerns about our Return Policy, please contact us at Sales.mirayadiamonds@gmail.com."
      sections={POLICY_SECTIONS}
    />
  );
}
