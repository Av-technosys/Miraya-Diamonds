"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

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
    "content": "If you have any questions or concerns about shipping and delivery, please contact us at miraya.diamond23@gmail.com or call +91 9869698984."
  }
];

const NAV_SECTIONS = [
  {
    "id": "introduction",
    "label": "Introduction",
    "desktopLabel": "Introduction"
  },
  {
    "id": "order-processing",
    "label": "1. Order Processing",
    "desktopLabel": "Order Processing"
  },
  {
    "id": "delivery-timelines",
    "label": "2. Delivery Timelines",
    "desktopLabel": "Delivery Timelines"
  },
  {
    "id": "shipping-charges",
    "label": "3. Shipping Charges",
    "desktopLabel": "Shipping Charges"
  },
  {
    "id": "insured-&-secure-packaging",
    "label": "4. Insured & Secure Packaging",
    "desktopLabel": "Insured & Secure Packaging"
  },
  {
    "id": "order-tracking",
    "label": "5. Order Tracking",
    "desktopLabel": "Order Tracking"
  },
  {
    "id": "delivery-&-verification",
    "label": "6. Delivery & Verification",
    "desktopLabel": "Delivery & Verification"
  },
  {
    "id": "delays-&-damaged-shipments",
    "label": "7. Delays & Damaged Shipments",
    "desktopLabel": "Delays & Damaged Shipments"
  },
  {
    "id": "contact-us",
    "label": "8. Contact Us",
    "desktopLabel": "Contact Us"
  }
];

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function ShippingHero() {
  return (
    <section className="relative w-full min-h-[190px] md:h-[350px] bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/privacy-policy/hero-img.png"
          alt="Shipping & Delivery Hero"
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
          <span className="font-sans font-medium text-[12px] md:text-[16px] leading-[21.6px] text-[#214E34] md:text-[#6F6A68]">Shipping & Delivery</span>
        </div>

        {/* Title */}
        <h1 className="font-serif font-bold text-[32px] md:text-[64px] leading-[1.1] md:leading-[59px] text-[#454545] mb-1 md:mb-[12px]">
          Shipping & Delivery
        </h1>

        {/* Red Line */}
        <div className="w-[60px] md:w-[131px] h-0 border-[1.5px] md:border-[2px] border-[#214E34] mb-2 md:mb-[24px]" />

        {/* Subtitle */}
        <p className="font-sans font-medium text-[12px] md:text-[16px] leading-[18px] md:leading-[20px] text-[#757575]">
          Everything you need to know about receiving your piece
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTENT SECTION
   ────────────────────────────────────────────── */

function ShippingContent() {
  return (
    <div className="w-full bg-white rounded-[16px] border-[1px] border-[#F0EDEB] overflow-hidden">
      
      <div className="px-3 md:px-[41px] pt-[8px] md:pt-[35px] pb-5 md:pb-[41px]">
        {/* Intro */}
        <div id="introduction" className="pb-6 md:pb-[25px] border-b-[1px] border-[#E8E4E2] scroll-mt-24">
          <p className="font-sans font-normal text-[14px] leading-[22.75px] text-[#6F6A68]">
            We want your jewellery to reach you safely and on time. The guidance below explains how dispatch and delivery work. For timelines on your specific piece, please confirm with our team before ordering.
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
            <div className="flex flex-col gap-2 w-full min-w-0 pt-[2px]">
              <h2 className="font-sans md:font-serif font-semibold md:font-medium text-[16px] md:text-[24px] leading-[1.2] md:leading-[32px] text-[#171717]">
                {section.title}
              </h2>
              <p className="font-sans font-normal text-[14px] leading-[20px] text-[#6F6A68]">
                {section.id === 8 ? (
                  <>If you have any questions or concerns about shipping and delivery, please contact us at <a href="mailto:miraya.diamond23@gmail.com" className="font-medium text-[#214E34] break-all">miraya.diamond23@gmail.com</a> or call <a href="tel:+919869698984" className="font-medium text-[#214E34] whitespace-nowrap">+91 9869698984</a>.</>
                ) : section.content}
              </p>
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

function ShippingSidebar() {
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
                <span className={`font-sans text-[13px] lg:text-[14px] leading-[16px] whitespace-nowrap lg:whitespace-normal ${isActive ? "font-medium lg:font-semibold text-[#214E34] lg:text-[#9E384B]" : "font-normal text-[#6F6A68]"}`}>
                  <span className="lg:hidden">{item.label}</span>
                  <span className="hidden lg:block">{item.desktopLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function ShippingDeliveryPage() {
  return (
    <main className="bg-white min-h-screen">
      <ShippingHero />
      <div className="w-full max-w-[1440px] mx-auto px-3 md:px-[100px] pb-6 md:pb-10 -mt-[12px] md:-mt-[114px] relative z-20 flex flex-col lg:flex-row gap-[8px] md:gap-[18px] items-start">
        
        {/* Left Content Area */}
        <div className="order-2 lg:order-none w-full lg:w-[calc(100%-300px)] xl:w-[800px] flex flex-col min-w-0">
          <ShippingContent />
        </div>

        {/* Right Sidebar (Desktop) / Mixed ordering (Mobile) */}
        <div className="contents lg:flex lg:flex-col lg:flex-1 lg:min-w-0 lg:gap-[20px] lg:sticky lg:top-[100px] lg:h-fit lg:pb-10">
          <ShippingSidebar />
        </div>
      </div>
    </main>
  );
}
