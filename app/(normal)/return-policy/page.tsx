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
    content: "Return eligibility depends on the item and the terms confirmed at purchase. Please check the applicable return window, condition requirements and any exclusions with our team before ordering."
  },
  {
    id: 2,
    title: "How to Initiate a Return",
    content: "To discuss a return, email miraya.diamond23@gmail.com or call +91 9869698984 with your purchase details and reason for the request. Please obtain return instructions before sending an item."
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
    content: "For questions about returns or exchanges, contact Miraya Diamonds at miraya.diamond23@gmail.com.",
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
          <ChevronRight className="w-3 h-3 md:w-[14px] md:h-[14px] text-[#757575] md:text-[#214E34]" strokeWidth={2} />
          <span className="font-sans font-medium text-[12px] md:text-[16px] leading-[21.6px] text-[#214E34] md:text-[#6F6A68]">Return Policy</span>
        </div>

        {/* Title */}
        <h1 className="font-serif font-bold text-[32px] md:text-[64px] leading-[1.1] md:leading-[59px] text-[#454545] mb-1 md:mb-[12px]">
          Return Policy
        </h1>

        {/* Red Line */}
        <div className="w-[60px] md:w-[131px] h-0 border-[1.5px] md:border-[2px] border-[#214E34] mb-2 md:mb-[24px]" />

        {/* Subtitle */}
        <p className="font-sans font-medium text-[12px] md:text-[16px] leading-[18px] md:leading-[20px] text-[#757575]">
          Understand the terms for your chosen piece
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
            Last Updated: <span className="text-[#171717] font-semibold md:font-medium">13 November 2026</span>
          </span>
        </div>
        {/* Intro */}
        <div id="introduction" className="pb-6 md:pb-[25px] border-b-[1px] border-[#E8E4E2] scroll-mt-24">
          <p className="font-sans font-normal text-[14px] leading-[22.75px] text-[#6F6A68]">
            Before ordering, please confirm the return, exchange and refund terms for your chosen piece with our team. The guidance below explains how to contact us and discuss a request.
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
            <div className="w-[36px] h-[36px] rounded-full bg-[#FFF4F5] border-[1px] border-[#214E341A] flex items-center justify-center shrink-0">
              <span className="font-sans font-semibold text-[14px] text-[#214E34]">{section.id}</span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 w-full pt-[2px]">
              <h2 className="font-sans md:font-serif font-semibold md:font-medium text-[16px] md:text-[24px] leading-[1.2] md:leading-[32px] text-[#171717]">
                {section.title}
              </h2>
              {section.isContact ? (
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#6F6A68]">
                  If you have any questions or concerns about our Return Policy, please contact us at <br className="hidden md:block"/>
                  <a href="mailto:miraya.diamond23@gmail.com" className="font-medium text-[#214E34]">miraya.diamond23@gmail.com</a>.
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
          <span className="font-sans uppercase font-medium text-[12px] text-[#214E34] tracking-[2px] flex items-center gap-2">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H13M1 5H13M1 9H13" stroke="#214E34" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    ? "bg-[#FFF4F5] border-[1px] lg:border-0 lg:border-l-[4px] border-[#214E3433] lg:border-[#9E384B]" 
                    : "bg-[#F8F6F5] lg:bg-transparent border-[1px] lg:border-0 border-[#E8E4E2]"
                }`}
              >
                <span className={`font-sans text-[13px] lg:text-[14px] leading-[16px] whitespace-nowrap ${isActive ? "font-medium lg:font-semibold text-[#214E34] lg:text-[#9E384B]" : "font-normal text-[#6F6A68]"}`}>
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
            <div className="w-[36px] h-[36px] bg-[#FFF4F5] rounded-full flex items-center justify-center shrink-0 border-[1px] border-[#214E3433]">
              <Image src="/privacy-policy/email-icon.png" alt="Email" width={16} height={16} className="object-contain w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#171717] mb-1">miraya.diamond23@gmail.com</span>
              <span className="font-sans font-normal text-[14px] leading-[16px] text-[#6F6A68]">Contact us with your enquiry</span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="w-[36px] h-[36px] bg-[#FFF4F5] rounded-full flex items-center justify-center shrink-0 border-[1px] border-[#214E3433]">
              <Image src="/privacy-policy/phone-icon.png" alt="Phone" width={16} height={16} className="object-contain w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#171717] mb-1">+91 9869698984</span>
              <span className="font-sans font-normal text-[14px] leading-[16px] text-[#6F6A68]">Jaipur, India</span>
            </div>
          </div>
        </div>

        {/* Contact Us Button */}
        <a href="/contact" className="w-full h-[46px] bg-[#FFF4F5] border-[1px] border-[#214E3433] rounded-[50px] flex items-center justify-center gap-[8px] transition-transform hover:scale-[1.02]">
          <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#9E384B]">Contact Us</span>
          <ArrowRight className="w-[14px] h-[14px] text-[#9E384B]" strokeWidth={2} />
        </a>
      </div>

      {/* Return Policy Badge */}
      <div className="w-full order-4 lg:order-none bg-[#FFF4F5] border-[1px] border-[#214E341A] rounded-[16px] py-[21px] px-[21px] flex items-center gap-4">
        {/* Shield Icon */}
        <div className="w-[32px] h-[32px] bg-white border-[1px] border-[#214E3433] rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L1 3V6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6V3L6 1Z" stroke="#214E34" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 6L5.5 7.5L8 4.5" stroke="#214E34" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Text */}
        <div className="flex flex-col">
          <span className="font-sans font-bold text-[12px] leading-[16px] text-[#171717]">Return & Exchange Guidance</span>
          <span className="font-sans font-normal text-[11px] leading-[17.88px] text-[#6F6A68]">Contact our team to understand your available options.</span>
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
