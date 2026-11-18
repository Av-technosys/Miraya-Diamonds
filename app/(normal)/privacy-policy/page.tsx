import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";

export const metadata: Metadata = {
  title: "Our Privacy Policy | Miraya Diamonds, Jaipur",
  description: "Read how Miraya Diamonds collects, uses, and protects your personal information when you browse our website, create an account, or contact our team.",
};

const POLICY_SECTIONS = [
  {
    id: 1,
    title: "Information We Collect",
    content: "When you create an account or contact us, we receive the details you provide, such as your name, email address, phone number, enquiry and design preferences. Your profile may also include an address and optional personal dates. Account services may use cookies and related technical information."
  },
  {
    id: 2,
    title: "How We Use Your Information",
    content: "We use these details to manage accounts, respond to enquiries, discuss jewellery requirements and provide requested support. Please share only the information needed for your request."
  },
  {
    id: 3,
    title: "Sharing of Information",
    content: "The website uses service providers for functions such as account authentication, data hosting and uploaded-file storage. Relevant information is processed through these services to support the features you use."
  },
  {
    id: 4,
    title: "Cookies and Tracking Technologies",
    content: "Account and authentication features may use cookies or similar technologies. You can manage cookies through your browser settings; blocking them may affect sign-in and related features."
  },
  {
    id: 5,
    title: "Data Security",
    content: "Please keep your sign-in details private and avoid sending sensitive payment information through enquiry forms. Contact us if you have a concern about your account or information."
  },
  {
    id: 6,
    title: "Your Rights",
    content: "You can edit available profile fields in your account. To request access, correction or deletion of other personal information, contact us with enough detail to identify your request."
  },
  {
    id: 7,
    title: "Changes to This Policy",
    content: "This page may be updated as our website and services change. Please check the date shown above for the latest revision."
  },
  {
    id: 8,
    title: "Contact Us",
    content: "For questions about this Privacy Policy or your information, contact Miraya Diamonds at Sales.mirayadiamonds@gmail.com.",
    isContact: true
  }
];

export default function PolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we handle your account and enquiry information"
      introduction="At Miraya Diamonds, we value your privacy. This Privacy Policy explains how we collect, use, disclose and protect your personal information when you visit our website, create an account or contact our team."
      lastUpdated="13 November 2026"
      supportMessage="If you have any questions about our Privacy Policy, feel free to reach out."
      badgeTitle="Your Privacy is Our Priority"
      badgeDescription="We are committed to keeping your information safe and secure."
      contactMessage="If you have any questions or concerns about this Privacy Policy, please contact us at Sales.mirayadiamonds@gmail.com."
      sections={POLICY_SECTIONS}
    />
  );
}
