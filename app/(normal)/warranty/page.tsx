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
    title: "Warranty Coverage",
    content: "All Miraya Diamonds jewellery comes with a comprehensive warranty that covers manufacturing defects in materials and craftsmanship. This includes issues such as loose settings, clasp malfunctions, rhodium plating wear and structural defects that occur under normal usage conditions."
  },
  {
    id: 2,
    title: "Warranty Duration",
    content: "Our standard warranty is valid for 1 year from the date of purchase. Solitaire and diamond jewellery above ₹1,00,000 comes with a 2-year extended warranty. The warranty period begins from the date mentioned on your invoice."
  },
  {
    id: 3,
    title: "What Is Covered",
    content: "Manufacturing defects in prong settings, clasps and closures. Loose or missing stones due to faulty settings (not impact damage). Tarnishing or discolouration under normal wear conditions. Rhodium re-plating for white gold pieces (once per year)."
  },
  {
    id: 4,
    title: "What Is Not Covered",
    content: "Damage caused by accidents, misuse, negligence or improper storage. Normal wear and tear including minor scratches on metal surfaces. Damage from exposure to chemicals, perfumes, chlorine or harsh cleaning agents. Loss or theft of the jewellery piece. Unauthorised repairs or modifications by third parties."
  },
  {
    id: 5,
    title: "How to Claim Warranty",
    content: "To initiate a warranty claim, contact our support team with your order number, original invoice and photographs of the issue. Our team will assess the claim within 3–5 business days and guide you through the repair or replacement process."
  },
  {
    id: 6,
    title: "Repair & Replacement",
    content: "If your warranty claim is approved, we will repair or replace the defective piece at no additional cost. Repairs typically take 10–15 business days. If the exact piece is unavailable for replacement, we will offer a piece of equal or higher value."
  },
  {
    id: 7,
    title: "Lifetime Services",
    content: "Beyond the warranty period, Miraya Diamonds offers complimentary lifetime services including professional ultrasonic cleaning, prong tightening inspection and polishing. These services are available at any authorised Miraya Diamonds service centre."
  },
  {
    id: 8,
    title: "Diamond Certification",
    content: "All Miraya Diamonds solitaires are IGI or GIA certified with unique laser inscriptions for authenticity. Your diamond certificate is a permanent record of your stone's characteristics and serves as proof of quality and authenticity."
  },
  {
    id: 9,
    title: "Contact Us",
    content: "If you have any questions or concerns about our Warranty Policy, please contact us at support@mirayadiamonds.com.",
    isContact: true
  }
];

const NAV_SECTIONS = [
  { id: "introduction", label: "Introduction", desktopLabel: "Introduction" },
  { id: "warranty-coverage", label: "1. Warranty Coverage", desktopLabel: "Warranty Coverage" },
  { id: "warranty-duration", label: "2. Warranty Duration", desktopLabel: "Warranty Duration" },
  { id: "what-is-covered", label: "3. What Is Covered", desktopLabel: "What Is Covered" },
  { id: "what-is-not-covered", label: "4. What Is Not Covered", desktopLabel: "What Is Not Covered" },
  { id: "how-to-claim-warranty", label: "5. How to Claim Warranty", desktopLabel: "How to Claim Warranty" },
  { id: "repair-&-replacement", label: "6. Repair & Replacement", desktopLabel: "Repair & Replacement" },
  { id: "lifetime-services", label: "7. Lifetime Services", desktopLabel: "Lifetime Services" },
  { id: "diamond-certification", label: "8. Diamond Certification", desktopLabel: "Diamond Certification" },
  { id: "contact-us", label: "9. Contact Us", desktopLabel: "Contact Us" }
];

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function WarrantyHero() {
  return (
    <section className="relative w-full h-[160px] md:h-[350px] bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/privacy-policy/hero-img.png"
          alt="Warranty Policy Hero"
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
          <span className="font-sans font-medium text-[12px] md:text-[16px] leading-[21.6px] text-[#CB485E] md:text-[#6F6A68]">Warranty</span>
        </div>

        <h1 className="font-serif font-bold text-[32px] md:text-[64px] leading-[1.1] md:leading-[59px] text-[#454545] mb-1 md:mb-[12px]">
          Warranty Policy
        </h1>

        <div className="w-[60px] md:w-[131px] h-0 border-[1.5px] md:border-[2px] border-[#CB485E] mb-2 md:mb-[24px]" />

        <p className="font-sans font-medium text-[12px] md:text-[16px] leading-[18px] md:leading-[20px] text-[#757575]">
          Your jewellery, protected with care and confidence
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTENT SECTION
   ────────────────────────────────────────────── */

function WarrantyContent() {
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
            At Miraya Diamonds, every piece of jewellery is crafted with the highest standards of quality and precision. We stand behind the craftsmanship of our products and offer a comprehensive warranty to ensure your complete satisfaction and peace of mind.
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
                  If you have any questions or concerns about our Warranty Policy, please contact us at <br className="hidden md:block"/>
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

function WarrantySidebar() {
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
          If you have any questions about our Warranty Policy, feel free to reach out.
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
          <span className="font-sans font-bold text-[12px] leading-[16px] text-[#171717]">Quality You Can Trust</span>
          <span className="font-sans font-normal text-[11px] leading-[17.88px] text-[#6F6A68]">Every Miraya piece is backed by our craftsmanship guarantee.</span>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function WarrantyPage() {
  return (
    <main className="bg-white min-h-screen">
      <WarrantyHero />
      <div className="w-full max-w-[1440px] mx-auto px-3 md:px-[100px] pb-6 md:pb-10 -mt-[12px] md:-mt-[114px] relative z-20 flex flex-col lg:flex-row gap-[8px] md:gap-[18px] items-start">
        <div className="order-2 lg:order-none w-full lg:w-[800px] flex flex-col shrink-0">
          <WarrantyContent />
        </div>
        <div className="contents lg:flex lg:flex-col lg:w-[422px] lg:gap-[20px] lg:sticky lg:top-[100px] lg:h-fit lg:pb-10">
          <WarrantySidebar />
        </div>
      </div>
    </main>
  );
}
