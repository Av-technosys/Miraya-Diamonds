"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const SECTIONS = [
  { id: "introduction", label: "Introduction", desktopLabel: "Introduction" },
  { id: "information-we-collect", label: "1. Information We Collect", desktopLabel: "Information We Collect" },
  { id: "how-we-use-your-information", label: "2. How We Use Your Information", desktopLabel: "How We Use Your Information" },
  { id: "sharing-of-information", label: "3. Sharing of Information", desktopLabel: "Sharing of Information" },
  { id: "cookies-and-tracking-technologies", label: "4. Cookies and Tracking Technologies", desktopLabel: "Cookies and Tracking Technologies" },
  { id: "data-security", label: "5. Data Security", desktopLabel: "Data Security" },
  { id: "your-rights", label: "6. Your Rights", desktopLabel: "Your Rights" },
  { id: "changes-to-this-policy", label: "7. Changes to This Policy", desktopLabel: "Changes to This Policy" },
  { id: "contact-us", label: "8. Contact Us", desktopLabel: "Contact Us" }
];

export function PrivacySidebar() {
  const [activeId, setActiveId] = useState("introduction");

  return (
    <>
      {/* On This Page Nav */}
      <div className="w-full order-1 lg:order-none bg-transparent lg:bg-white lg:rounded-[16px] lg:border-[1px] lg:border-[#F0EDEB] lg:shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.03)] lg:p-[25px] pb-3 lg:pb-0 mb-0 lg:mb-0">
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
          {SECTIONS.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <button 
                type="button"
                key={idx} 
                onClick={() => {
                  setActiveId(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex-shrink-0 lg:w-full text-left rounded-full lg:rounded-[8px] py-[8px] px-[18px] lg:py-[10px] lg:px-0 lg:pl-[14px] cursor-pointer transition-colors outline-none ${
                  isActive 
                    ? "bg-[#FFF4F5] border-[1px] lg:border-0 lg:border-l-[4px] border-[#CB485E33] lg:border-[#9E384B]" 
                    : "bg-white lg:bg-transparent border-[1px] lg:border-0 border-[#E8E4E2]"
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
          If you have any questions about our Privacy Policy, feel free to reach out.
        </p>

        <div className="flex flex-col gap-4 mb-[25px]">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-[36px] h-[36px] bg-[#FFF4F5] rounded-full flex items-center justify-center shrink-0 border-[1px] border-[#CB485E33]">
              <Image src="/privacy-policy/email-icon.png" alt="Email" width={16} height={16} className="object-contain w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-sans font-semibold text-[14px] leading-[16px] text-[#171717] mb-1">support@aurorajewels.com</span>
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

      {/* Privacy Commitment Badge */}
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
          <span className="font-sans font-bold text-[12px] leading-[16px] text-[#171717]">Your Privacy is Our Priority</span>
          <span className="font-sans font-normal text-[11px] leading-[17.88px] text-[#6F6A68]">We are committed to keeping your information safe and secure.</span>
        </div>
      </div>
    </>
  );
}
