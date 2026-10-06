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
    title: "Acceptance of Terms",
    content: "By accessing or using the Miraya Diamonds website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or make a purchase."
  },
  {
    id: 2,
    title: "Products & Pricing",
    content: "All products listed on our website are subject to availability. We strive to display accurate product images, descriptions and pricing. However, slight variations in colour and appearance may occur due to screen settings. Prices are inclusive of applicable taxes unless stated otherwise and are subject to change without prior notice."
  },
  {
    id: 3,
    title: "Orders & Payment",
    content: "By placing an order, you confirm that the information provided is accurate and complete. We accept payments via credit/debit cards, UPI, net banking and other available methods. Orders are confirmed only upon successful payment verification."
  },
  {
    id: 4,
    title: "Shipping & Delivery",
    content: "We offer insured and tamper-evident shipping across India. Estimated delivery timelines are provided at checkout and may vary based on location and availability. Miraya Diamonds is not responsible for delays caused by third-party logistics providers or unforeseen circumstances."
  },
  {
    id: 5,
    title: "Cancellations",
    content: "Orders may be cancelled within 24 hours of placement, provided they have not been shipped. Custom or personalised orders cannot be cancelled once production has begun. Refunds for eligible cancellations will be processed within 7–10 business days."
  },
  {
    id: 6,
    title: "Intellectual Property",
    content: "All content on the Miraya Diamonds website — including text, images, logos, designs and graphics — is the exclusive property of Miraya Diamonds and is protected under applicable intellectual property laws. Unauthorised reproduction or distribution is strictly prohibited."
  },
  {
    id: 7,
    title: "Limitation of Liability",
    content: "Miraya Diamonds shall not be liable for any indirect, incidental, special or consequential damages arising out of the use of our website or products. Our total liability shall not exceed the amount paid by you for the relevant product or service."
  },
  {
    id: 8,
    title: "Governing Law",
    content: "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra."
  },
  {
    id: 9,
    title: "Changes to Terms",
    content: "Miraya Diamonds reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website after any changes constitutes your acceptance of the revised terms."
  },
  {
    id: 10,
    title: "Contact Us",
    content: "If you have any questions or concerns about these Terms and Conditions, please contact us at support@mirayadiamonds.com.",
    isContact: true
  }
];

const NAV_SECTIONS = [
  { id: "introduction", label: "Introduction", desktopLabel: "Introduction" },
  { id: "acceptance-of-terms", label: "1. Acceptance of Terms", desktopLabel: "Acceptance of Terms" },
  { id: "products-&-pricing", label: "2. Products & Pricing", desktopLabel: "Products & Pricing" },
  { id: "orders-&-payment", label: "3. Orders & Payment", desktopLabel: "Orders & Payment" },
  { id: "shipping-&-delivery", label: "4. Shipping & Delivery", desktopLabel: "Shipping & Delivery" },
  { id: "cancellations", label: "5. Cancellations", desktopLabel: "Cancellations" },
  { id: "intellectual-property", label: "6. Intellectual Property", desktopLabel: "Intellectual Property" },
  { id: "limitation-of-liability", label: "7. Limitation of Liability", desktopLabel: "Limitation of Liability" },
  { id: "governing-law", label: "8. Governing Law", desktopLabel: "Governing Law" },
  { id: "changes-to-terms", label: "9. Changes to Terms", desktopLabel: "Changes to Terms" },
  { id: "contact-us", label: "10. Contact Us", desktopLabel: "Contact Us" }
];

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function TermsHero() {
  return (
    <section className="relative w-full h-[160px] md:h-[350px] bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/privacy-policy/hero-img.png"
          alt="Terms and Conditions Hero"
          fill
          className="object-cover object-right-top md:object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full px-4 md:px-[100px] flex flex-col pt-6 md:pt-[44px]">
        <div className="flex items-center gap-[6px] mb-1 md:mb-[17px]">
          <span className="font-sans font-medium text-[12px] md:text-[16px] leading-[21.6px] text-[#757575] md:text-[#6F6A68]">Home</span>
          <ChevronRight className="w-3 h-3 md:w-[14px] md:h-[14px] text-[#757575] md:text-[#CB485E]" strokeWidth={2} />
          <span className="font-sans font-medium text-[12px] md:text-[16px] leading-[21.6px] text-[#CB485E] md:text-[#6F6A68]">Terms & Conditions</span>
        </div>

        <h1 className="font-serif font-bold text-[32px] md:text-[64px] leading-[1.1] md:leading-[59px] text-[#454545] mb-1 md:mb-[12px]">
          Terms & Conditions
        </h1>

        <div className="w-[60px] md:w-[131px] h-0 border-[1.5px] md:border-[2px] border-[#CB485E] mb-2 md:mb-[24px]" />

        <p className="font-sans font-medium text-[12px] md:text-[16px] leading-[18px] md:leading-[20px] text-[#757575]">
          Please read these terms carefully before using our services
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTENT SECTION
   ────────────────────────────────────────────── */

function TermsContent() {
  return (
    <div className="w-full bg-white rounded-[16px] border-[1px] border-[#F0EDEB] overflow-hidden">
      
      <div className="px-3 md:px-[41px] pt-[8px] md:pt-[35px] pb-5 md:pb-[41px]">
        <div className="bg-[#F8F6F5] md:bg-transparent rounded-[6px] md:rounded-none px-[10px] py-[4px] md:px-0 md:py-0 w-fit md:w-auto mb-3 md:mb-[8px]">
          <span className="font-[family-name:var(--font-jakarta)] font-medium text-[12px] leading-[16px] tracking-[0.3px] text-[#757575]">
            Last Updated: <span className="text-[#171717] font-semibold md:font-medium">01 September 2026</span>
          </span>
        </div>
        <div id="introduction" className="pb-6 md:pb-[25px] border-b-[1px] border-[#E8E4E2] scroll-mt-24">
          <p className="font-sans font-normal text-[14px] leading-[22.75px] text-[#6F6A68]">
            Welcome to Miraya Diamonds. These Terms and Conditions govern your use of our website, purchase of products and interaction with our services. By using our platform, you acknowledge that you have read, understood and agree to abide by these terms.
          </p>
        </div>

        <div className="flex flex-col pt-6 md:pt-[30px]">
          {POLICY_SECTIONS.map((section, index) => (
            <div 
              key={section.id} 
              id={section.title.toLowerCase().replace(/ /g, '-')}
              className={`flex items-start gap-4 md:gap-[20px] scroll-mt-24 ${index !== 0 ? "pt-[30px] border-t-[1px] border-[#E8E4E2]" : ""} pb-[30px]`}
            >
            <div className="w-[36px] h-[36px] rounded-full bg-[#FFF4F5] border-[1px] border-[#CB485E1A] flex items-center justify-center shrink-0">
              <span className="font-sans font-semibold text-[14px] text-[#CB485E]">{section.id}</span>
            </div>

            <div className="flex flex-col gap-2 w-full pt-[2px]">
              <h2 className="font-serif font-medium text-[20px] md:text-[24px] leading-[1.2] md:leading-[32px] text-[#171717]">
                {section.title}
              </h2>
              {section.isContact ? (
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#6F6A68]">
                  If you have any questions or concerns about these Terms and Conditions, please contact us at <br className="hidden md:block"/>
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

function TermsSidebar() {
  const [activeId, setActiveId] = useState("introduction");

  return (
    <>
      <div className="w-full order-1 lg:order-none bg-transparent lg:bg-white lg:rounded-[16px] lg:border-[1px] lg:border-[#F0EDEB] lg:shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.03)] lg:p-[25px] pb-0 lg:pb-0 mb-0 lg:mb-0">
        <h3 className="hidden lg:block font-serif font-medium text-[24px] leading-[32px] text-[#171717] mb-[25px]">
          On This Page
        </h3>

        <div className="flex lg:hidden items-center justify-between mb-2">
          <span className="font-sans uppercase font-medium text-[12px] text-[#CB485E] tracking-[2px] flex items-center gap-2">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H13M1 5H13M1 9H13" stroke="#CB485E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            ON THIS PAGE
          </span>
          <span className="font-sans text-[10px] text-[#A8A29E]">Swipe to navigate &gt;</span>
        </div>

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

      <div className="w-full order-3 lg:order-none bg-white rounded-[16px] border-[1px] border-[#F0EDEB] shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.03)] p-[25px]">
        <h3 className="font-serif font-medium text-[24px] leading-[32px] text-[#171717] mb-2">
          Need Help?
        </h3>
        <p className="font-sans font-normal text-[14px] leading-[19.5px] text-[#6F6A68] mb-[25px]">
          If you have any questions about our Terms & Conditions, feel free to reach out.
        </p>

        <div className="flex flex-col gap-4 mb-[25px]">
          <div className="flex items-start gap-4">
            <div className="w-[36px] h-[36px] bg-[#FFF4F5] rounded-full flex items-center justify-center shrink-0 border-[1px] border-[#CB485E33]">
              <Image src="/privacy-policy/email-icon.png" alt="Email" width={16} height={16} className="object-contain w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#171717] mb-1">support@mirayadiamonds.com</span>
              <span className="font-sans font-normal text-[14px] leading-[16px] text-[#6F6A68]">We typically reply within 24 hours</span>
            </div>
          </div>

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

        <button className="w-full h-[46px] bg-[#FFF4F5] border-[1px] border-[#CB485E33] rounded-[50px] flex items-center justify-center gap-[8px] transition-transform hover:scale-[1.02]">
          <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#9E384B]">Contact Us</span>
          <ArrowRight className="w-[14px] h-[14px] text-[#9E384B]" strokeWidth={2} />
        </button>
      </div>

      <div className="w-full order-4 lg:order-none bg-[#FFF4F5] border-[1px] border-[#CB485E1A] rounded-[16px] py-[21px] px-[21px] flex items-center gap-4">
        <div className="w-[32px] h-[32px] bg-white border-[1px] border-[#CB485E33] rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L1 3V6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6V3L6 1Z" stroke="#CB485E" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 6L5.5 7.5L8 4.5" stroke="#CB485E" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-bold text-[12px] leading-[16px] text-[#171717]">Transparent & Fair Policies</span>
          <span className="font-sans font-normal text-[11px] leading-[17.88px] text-[#6F6A68]">We believe in clear, honest terms for every customer.</span>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white min-h-screen">
      <TermsHero />
      <div className="w-full max-w-[1440px] mx-auto px-3 md:px-[100px] pb-6 md:pb-10 -mt-[12px] md:-mt-[114px] relative z-20 flex flex-col lg:flex-row gap-[8px] md:gap-[18px] items-start">
        <div className="order-2 lg:order-none w-full lg:w-[800px] flex flex-col shrink-0">
          <TermsContent />
        </div>
        <div className="contents lg:flex lg:flex-col lg:w-[422px] lg:gap-[20px] lg:sticky lg:top-[100px] lg:h-fit lg:pb-10">
          <TermsSidebar />
        </div>
      </div>
    </main>
  );
}
