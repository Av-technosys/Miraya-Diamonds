"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const POLICY_SECTIONS = [
  {
    id: 1,
    title: "Eligibility for Returns",
    content: "Items must be returned within 15 days of delivery in their original, unworn condition with all tags, certificates and packaging intact. Custom-made or engraved jewellery, earrings and items marked as final sale are not eligible for return."
  },
  {
    id: 2,
    title: "How to Initiate a Return",
    content: "To start a return, contact our support team at support@mirayadiamonds.com or call +91 98765 43210 with your order number and reason for return. Our team will guide you through the process and arrange a secure pickup."
  },
  {
    id: 3,
    title: "Inspection & Approval",
    content: "Once we receive your returned item, our quality team will inspect it within 3–5 business days. If the item meets our return criteria, your return will be approved and you will be notified via email."
  },
  {
    id: 4,
    title: "Refund Process",
    content: "Approved refunds will be processed to your original payment method within 7–10 business days after inspection. Bank processing times may vary. Shipping charges are non-refundable unless the return is due to a defect or error on our part."
  },
  {
    id: 5,
    title: "Exchange Policy",
    content: "We offer one-time exchanges for a different size or design of equal or higher value within 15 days of delivery. For exchanges of higher value, the price difference must be paid at the time of exchange."
  },
  {
    id: 6,
    title: "Damaged or Defective Items",
    content: "If you receive a damaged or defective item, please contact us within 48 hours of delivery with photographs. We will arrange a free return pickup and offer a full replacement or refund at no additional cost."
  },
  {
    id: 7,
    title: "Non-Returnable Items",
    content: "Personalised or custom-engraved jewellery, earrings (for hygiene reasons), gift cards, and items purchased during clearance or final sale events cannot be returned or exchanged."
  },
  {
    id: 8,
    title: "Contact Us",
    content: "If you have any questions or concerns about our Return Policy, please contact us at support@mirayadiamonds.com.",
    isContact: true
  }
];

const NAV_SECTIONS = [
  { id: "introduction", label: "Introduction", desktopLabel: "Introduction" },
  { id: "eligibility-for-returns", label: "1. Eligibility for Returns", desktopLabel: "Eligibility for Returns" },
  { id: "how-to-initiate-a-return", label: "2. How to Initiate a Return", desktopLabel: "How to Initiate a Return" },
  { id: "inspection-&-approval", label: "3. Inspection & Approval", desktopLabel: "Inspection & Approval" },
  { id: "refund-process", label: "4. Refund Process", desktopLabel: "Refund Process" },
  { id: "exchange-policy", label: "5. Exchange Policy", desktopLabel: "Exchange Policy" },
  { id: "damaged-or-defective-items", label: "6. Damaged or Defective Items", desktopLabel: "Damaged or Defective Items" },
  { id: "non-returnable-items", label: "7. Non-Returnable Items", desktopLabel: "Non-Returnable Items" },
  { id: "contact-us", label: "8. Contact Us", desktopLabel: "Contact Us" }
];

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function ReturnHero() {
  return (
    <section className="relative w-full h-[160px] md:h-[350px] bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/privacy-policy/hero-img.png"
          alt="Return Policy Hero"
          fill
          className="object-cover object-right-top md:object-center"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full px-4 md:px-[100px] flex flex-col pt-6 md:pt-[44px]">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-[6px] mb-1 md:mb-[17px]">
          <span className="font-sans font-medium text-[12px] md:text-[16px] leading-[21.6px] text-[#757575] md:text-[#6F6A68]">Home</span>
          <ChevronRight className="w-3 h-3 md:w-[14px] md:h-[14px] text-[#757575] md:text-[#CB485E]" strokeWidth={2} />
          <span className="font-sans font-medium text-[12px] md:text-[16px] leading-[21.6px] text-[#CB485E] md:text-[#6F6A68]">Return Policy</span>
        </div>

        {/* Title */}
        <h1 className="font-serif font-bold text-[32px] md:text-[64px] leading-[1.1] md:leading-[59px] text-[#454545] mb-1 md:mb-[12px]">
          Return Policy
        </h1>

        {/* Red Line */}
        <div className="w-[60px] md:w-[131px] h-0 border-[1.5px] md:border-[2px] border-[#CB485E] mb-2 md:mb-[24px]" />

        {/* Subtitle */}
        <p className="font-sans font-medium text-[12px] md:text-[16px] leading-[18px] md:leading-[20px] text-[#757575]">
          Hassle-free returns for your peace of mind
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTENT SECTION
   ────────────────────────────────────────────── */

function ReturnContent() {
  return (
    <div className="w-full bg-white rounded-[16px] border-[1px] border-[#F0EDEB] overflow-hidden">
      
      <div className="px-3 md:px-[41px] pt-[8px] md:pt-[35px] pb-5 md:pb-[41px]">
        {/* Date */}
        <div className="bg-[#F8F6F5] md:bg-transparent rounded-[6px] md:rounded-none px-[10px] py-[4px] md:px-0 md:py-0 w-fit md:w-auto mb-3 md:mb-[8px]">
          <span className="font-[family-name:var(--font-jakarta)] font-medium text-[12px] leading-[16px] tracking-[0.3px] text-[#757575]">
            Last Updated: <span className="text-[#171717] font-semibold md:font-medium">01 September 2026</span>
          </span>
        </div>
        {/* Intro */}
        <div id="introduction" className="pb-6 md:pb-[25px] border-b-[1px] border-[#E8E4E2] scroll-mt-24">
          <p className="font-sans font-normal text-[14px] leading-[22.75px] text-[#6F6A68]">
            At Miraya Diamonds, your satisfaction is our priority. If you are not completely happy with your purchase, we are here to help. Please review our return and exchange guidelines below to ensure a smooth experience.
          </p>
        </div>

        {/* Sections List */}
        <div className="flex flex-col pt-6 md:pt-[30px]">
          {POLICY_SECTIONS.map((section, index) => (
            <div 
              key={section.id} 
              id={section.title.toLowerCase().replace(/ /g, '-')}
              className={`flex items-start gap-4 md:gap-[20px] scroll-mt-24 ${index !== 0 ? "pt-[30px] border-t-[1px] border-[#E8E4E2]" : ""} pb-[30px]`}
            >
            {/* Circle Number */}
            <div className="w-[36px] h-[36px] rounded-full bg-[#FFF4F5] border-[1px] border-[#CB485E1A] flex items-center justify-center shrink-0">
              <span className="font-sans font-semibold text-[14px] text-[#CB485E]">{section.id}</span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 w-full pt-[2px]">
              <h2 className="font-serif font-medium text-[20px] md:text-[24px] leading-[1.2] md:leading-[32px] text-[#171717]">
                {section.title}
              </h2>
              {section.isContact ? (
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#6F6A68]">
                  If you have any questions or concerns about our Return Policy, please contact us at <br className="hidden md:block"/>
                  <a href="mailto:support@mirayadiamonds.com" className="font-medium text-[#CB485E]">support@mirayadiamonds.com</a>.
                </p>
              ) : (
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#6F6A68]">
                  {section.content}
                </p>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SIDEBAR SECTION
   ────────────────────────────────────────────── */

function ReturnSidebar() {
  const [activeId, setActiveId] = useState("introduction");

  return (
    <>
      {/* On This Page Nav */}
      <div className="w-full order-1 lg:order-none bg-transparent lg:bg-white lg:rounded-[16px] lg:border-[1px] lg:border-[#F0EDEB] lg:shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.03)] lg:p-[25px] pb-0 lg:pb-0 mb-0 lg:mb-0">
        {/* Desktop Header */}
        <h3 className="hidden lg:block font-serif font-medium text-[24px] leading-[32px] text-[#171717] mb-[25px]">
          On This Page
        </h3>

        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between mb-2">
          <span className="font-sans uppercase font-medium text-[12px] text-[#CB485E] tracking-[2px] flex items-center gap-2">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H13M1 5H13M1 9H13" stroke="#CB485E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            ON THIS PAGE
          </span>
          <span className="font-sans text-[10px] text-[#A8A29E]">Swipe to navigate &gt;</span>
        </div>

        {/* Navigation Items container */}
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 scrollbar-hide">
          {NAV_SECTIONS.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <button 
                type="button"
                key={idx} 
                onClick={() => {
                  setActiveId(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex-shrink-0 lg:w-full text-center lg:text-left rounded-full lg:rounded-[8px] py-[8px] px-[18px] lg:py-[10px] lg:px-0 lg:pl-[14px] cursor-pointer transition-colors outline-none ${
                  isActive 
                    ? "bg-[#FFF4F5] border-[1px] lg:border-0 lg:border-l-[4px] border-[#CB485E33] lg:border-[#9E384B]" 
                    : "bg-[#F8F6F5] lg:bg-transparent border-[1px] lg:border-0 border-[#E8E4E2]"
                }`}
              >
                <span className={`font-sans text-[13px] lg:text-[14px] leading-[16px] whitespace-nowrap ${isActive ? "font-medium lg:font-semibold text-[#CB485E] lg:text-[#9E384B]" : "font-normal text-[#6F6A68]"}`}>
                  <span className="lg:hidden">{item.label}</span>
                  <span className="hidden lg:block">{item.desktopLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Help & Support Card */}
      <div className="w-full order-3 lg:order-none bg-white rounded-[16px] border-[1px] border-[#F0EDEB] shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.03)] p-[25px]">
        <h3 className="font-serif font-medium text-[24px] leading-[32px] text-[#171717] mb-2">
          Need Help?
        </h3>
        <p className="font-sans font-normal text-[14px] leading-[19.5px] text-[#6F6A68] mb-[25px]">
          If you have any questions about our Return Policy, feel free to reach out.
        </p>

        <div className="flex flex-col gap-4 mb-[25px]">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-[36px] h-[36px] bg-[#FFF4F5] rounded-full flex items-center justify-center shrink-0 border-[1px] border-[#CB485E33]">
              <Image src="/privacy-policy/email-icon.png" alt="Email" width={16} height={16} className="object-contain w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#171717] mb-1">support@mirayadiamonds.com</span>
              <span className="font-sans font-normal text-[14px] leading-[16px] text-[#6F6A68]">We typically reply within 24 hours</span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="w-[36px] h-[36px] bg-[#FFF4F5] rounded-full flex items-center justify-center shrink-0 border-[1px] border-[#CB485E33]">
              <Image src="/privacy-policy/phone-icon.png" alt="Phone" width={16} height={16} className="object-contain w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#171717] mb-1">+91 98765 43210</span>
              <span className="font-sans font-normal text-[14px] leading-[16px] text-[#6F6A68]">Mon – Sat, 10 AM to 6 PM</span>
            </div>
          </div>
        </div>

        {/* Contact Us Button */}
        <button className="w-full h-[46px] bg-[#FFF4F5] border-[1px] border-[#CB485E33] rounded-[50px] flex items-center justify-center gap-[8px] transition-transform hover:scale-[1.02]">
          <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#9E384B]">Contact Us</span>
          <ArrowRight className="w-[14px] h-[14px] text-[#9E384B]" strokeWidth={2} />
        </button>
      </div>

      {/* Return Policy Badge */}
      <div className="w-full order-4 lg:order-none bg-[#FFF4F5] border-[1px] border-[#CB485E1A] rounded-[16px] py-[21px] px-[21px] flex items-center gap-4">
        {/* Shield Icon */}
        <div className="w-[32px] h-[32px] bg-white border-[1px] border-[#CB485E33] rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L1 3V6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6V3L6 1Z" stroke="#CB485E" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 6L5.5 7.5L8 4.5" stroke="#CB485E" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Text */}
        <div className="flex flex-col">
          <span className="font-sans font-bold text-[12px] leading-[16px] text-[#171717]">Hassle-Free Returns Guaranteed</span>
          <span className="font-sans font-normal text-[11px] leading-[17.88px] text-[#6F6A68]">We are committed to making every return smooth and effortless.</span>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function ReturnPolicyPage() {
  return (
    <main className="bg-white min-h-screen">
      <ReturnHero />
      <div className="w-full max-w-[1440px] mx-auto px-3 md:px-[100px] pb-6 md:pb-10 -mt-[12px] md:-mt-[114px] relative z-20 flex flex-col lg:flex-row gap-[8px] md:gap-[18px] items-start">
        
        {/* Left Content Area */}
        <div className="order-2 lg:order-none w-full lg:w-[800px] flex flex-col shrink-0">
          <ReturnContent />
        </div>

        {/* Right Sidebar (Desktop) / Mixed ordering (Mobile) */}
        <div className="contents lg:flex lg:flex-col lg:w-[422px] lg:gap-[20px] lg:sticky lg:top-[100px] lg:h-fit lg:pb-10">
          <ReturnSidebar />
        </div>
      </div>
    </main>
  );
}
