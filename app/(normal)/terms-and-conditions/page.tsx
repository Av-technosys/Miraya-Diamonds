import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Miraya Diamonds, Jaipur",
  description: "Read the terms & conditions of Miraya Diamonds, covering pricing, orders, payment, shipping, cancellations and use of our website.",
};

const POLICY_SECTIONS = [
  {
    id: 1,
    title: "Acceptance of Terms",
    content: "These terms explain how to use the Miraya Diamonds website and contact our team. Please read the information relevant to your enquiry or purchase and ask us about anything that is unclear."
  },
  {
    id: 2,
    title: "Products & Pricing",
    content: "Product availability, specifications and prices may vary by design and selected options. Images may appear different across screens. Please confirm the final details, price and applicable taxes with our team before placing an order."
  },
  {
    id: 3,
    title: "Orders & Payment",
    content: "Submitting an enquiry or saving a selection in your browser does not place or confirm an order. Our team will confirm availability, the final quotation, payment arrangements and order acceptance directly with you."
  },
  {
    id: 4,
    title: "Shipping & Delivery",
    content: "Delivery availability, charges and estimated timing depend on the piece and destination. Confirm dispatch, packaging, insurance and tracking arrangements with our team before ordering."
  },
  {
    id: 5,
    title: "Cancellations",
    content: "Contact our team to request a cancellation. The available options depend on the order status and any custom work already approved. Please confirm cancellation and refund terms before proceeding with a purchase."
  },
  {
    id: 6,
    title: "Intellectual Property",
    content: "Please do not copy or reuse website text, images, logos or designs without the permission of the relevant rights holder. Contact us if you have a question about using Miraya Diamonds material."
  },
  {
    id: 7,
    title: "Limitation of Liability",
    content: "This website provides collection information and enquiry tools. Please confirm important product and service details with our team before relying on them for a purchase. Nothing on this page is intended to limit rights that cannot be excluded under applicable law."
  },
  {
    id: 8,
    title: "Governing Law",
    content: "The laws and dispute-resolution requirements applicable to your transaction will apply. Please contact us first if you have a concern so that our team can assist."
  },
  {
    id: 9,
    title: "Changes to Terms",
    content: "These terms may be updated as our website and services change. Please review the latest version and confirm the terms that apply to your purchase with our team."
  },
  {
    id: 10,
    title: "Contact Us",
    content: "For questions about these terms, contact Miraya Diamonds at Sales.mirayadiamonds@gmail.com.",
    isContact: true
  }
];

export default function PolicyPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our services"
      introduction="Welcome to Miraya Diamonds. These Terms and Conditions govern your use of our website, purchase of products and interaction with our services. By using our platform, you acknowledge that you have read, understood and agree to abide by these terms."
      lastUpdated="13 November 2026"
      supportMessage="If you have any questions about our Terms & Conditions, feel free to reach out."
      badgeTitle="Transparent & Fair Policies"
      badgeDescription="We believe in clear, honest terms for every customer."
      contactMessage="If you have any questions or concerns about these Terms and Conditions, please contact us at Sales.mirayadiamonds@gmail.com."
      sections={POLICY_SECTIONS}
    />
  );
}
