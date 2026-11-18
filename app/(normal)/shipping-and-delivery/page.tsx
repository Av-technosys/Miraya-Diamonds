import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Miraya Diamonds, Jaipur",
  description: "Learn how Miraya Diamonds ships your jewellery: order processing, delivery timelines, insured packaging, tracking and what to do if a parcel is delayed.",
};

const POLICY_SECTIONS = [
  {
    "id": 1,
    "title": "Order Processing",
    "content": "Once your order is confirmed, our team will begin preparing your piece. Processing time depends on the design, size, and whether it is ready to ship or made to order. We will share the expected dispatch date at the time of confirmation."
  },
  {
    "id": 2,
    "title": "Delivery Timelines",
    "content": "Delivery time depends on your location and the design you choose. Ready-to-ship pieces are dispatched sooner, while custom or made-to-order jewellery takes longer. Please ask our team for an estimated delivery date before you order."
  },
  {
    "id": 3,
    "title": "Shipping Charges",
    "content": "Any applicable shipping or insurance charges will be shared with you before you confirm your order. Please ask our team if you would like to know the charges for your location."
  },
  {
    "id": 4,
    "title": "Insured & Secure Packaging",
    "content": "Every piece is packed carefully in protective, tamper-evident packaging and sent through trusted courier partners. Shipments are insured for the value of the jewellery while in transit."
  },
  {
    "id": 5,
    "title": "Order Tracking",
    "content": "Once your order is dispatched, we will share the courier details and tracking information by email, call, or message. If you need an update on your order, feel free to contact us with your purchase reference."
  },
  {
    "id": 6,
    "title": "Delivery & Verification",
    "content": "Jewellery is a high-value item, so delivery may require a signature, and sometimes a valid ID or OTP. Please make sure someone is available at the address to receive the parcel, and check that the packaging is sealed and undamaged before accepting it."
  },
  {
    "id": 7,
    "title": "Delays & Damaged Shipments",
    "content": "Delays can occasionally happen due to weather, courier issues, or incorrect address details. If your parcel is delayed, or arrives damaged or tampered with, please contact us promptly with photographs and your purchase reference so we can assist."
  },
  {
    "id": 8,
    "title": "Contact Us",
    "content": "If you have any questions or concerns about shipping and delivery, please contact us at Sales.mirayadiamonds@gmail.com or call +91 9869698984."
  }
];

export default function PolicyPage() {
  return (
    <LegalPage
      title="Shipping & Delivery"
      subtitle="Everything you need to know about receiving your piece"
      introduction="We want your jewellery to reach you safely and on time. The guidance below explains how dispatch and delivery work. For timelines on your specific piece, please confirm with our team before ordering."
      supportMessage="If you have any questions about shipping and delivery, feel free to reach out."
      badgeTitle="Delivery Guidance"
      badgeDescription="Contact our team with your delivery questions."
      sections={POLICY_SECTIONS}
    />
  );
}
