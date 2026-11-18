"use client";

import { useState } from "react";
import { Container } from "@/components/common/container";
import Image from "next/image";
import { Heart, Sparkles, Gift, Calendar, Clock, User, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";

export function ConsultationBooking() {
  const [experience, setExperience] = useState<"in-store" | "virtual">("in-store");
  const [category, setCategory] = useState<"engagement" | "bridal" | "custom" | "gifting">("engagement");

  return (
    <section id="consultation-booking" className="bg-white py-10 sm:py-14">
      <Container className="flex flex-col gap-8 sm:gap-10">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className=" font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            Let&apos;s Find the Perfect Piece, Together
          </h2>
          <p className="text-[#757575] text-center max-w-[629px] mt-2 text-sm leading-6">
            Explore your preferences below, then contact our team to arrange a consultation.
          </p>
        </div>

        {/* Main Content (Form + Image) */}
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Left Form Section */}
          <div className="flex min-w-0 flex-col gap-4">

            {/* Experience Type Selection */}
            <div className="flex flex-col gap-[9px]">
              <label className="font-inter font-semibold text-[12px] leading-[20.25px] text-[#292524]">
                Choose Your Experience
              </label>
              <div className="flex flex-row gap-[13.5px]">
                {/* In-Store Option */}
                <button
                  type="button"
                  aria-pressed={experience === "in-store"}
                  onClick={() => setExperience("in-store")}
                  className={`min-w-0 flex-1 flex flex-col items-center justify-center gap-1 rounded-[8px] py-[18px] transition-colors duration-300 ${
                    experience === "in-store"
                      ? "bg-[#F7FFF7] border-2 border-[#214E34]"
                      : "bg-white border-2 border-[#E7E5E4]"
                  }`}
                >
                  <Image src="/contact/in-store_icon.png" alt="" width={22} height={22} className="shrink-0 object-contain" />
                  <span className={`font-inter font-bold text-[14px] uppercase tracking-[0.65px] mt-1 ${
                    experience === "in-store" ? "text-[#214E34]" : "text-[#292524]"
                  }`}>
                    In-Store
                  </span>
                  <span className={`font-inter font-normal text-[12px] ${
                    experience === "in-store" ? "text-[#78716C]" : "text-[#A8A29E]"
                  }`}>
                    Visit our studio
                  </span>
                </button>
                {/* Virtual Option */}
                <button
                  type="button"
                  aria-pressed={experience === "virtual"}
                  onClick={() => setExperience("virtual")}
                  className={`min-w-0 flex-1 flex flex-col items-center justify-center gap-1 rounded-[8px] py-[18px] transition-colors duration-300 ${
                    experience === "virtual"
                      ? "bg-[#F7FFF7] border-2 border-[#214E34]"
                      : "bg-white border-2 border-[#E7E5E4]"
                  }`}
                >
                  <Image src="/contact/virtual_icon.png" alt="" width={22} height={22} className="shrink-0 object-contain" />
                  <span className={`font-inter font-bold text-[14px] uppercase tracking-[0.65px] mt-1 ${
                    experience === "virtual" ? "text-[#214E34]" : "text-[#292524]"
                  }`}>
                    Virtual
                  </span>
                  <span className={`font-inter font-normal text-[12px] text-center ${
                    experience === "virtual" ? "text-[#78716C]" : "text-[#A8A29E]"
                  }`}>
                    Video consultation<br/>from anywhere
                  </span>
                </button>
              </div>
            </div>

            {/* Category Pill Filter */}
            <div className="flex flex-col gap-[9px] mt-2">
              <label className="font-inter font-semibold text-[12px] leading-[20.25px] text-[#292524]">
                What are you looking for?
              </label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-[9px]">
                <button
                  type="button"
                  aria-pressed={category === "engagement"}
                  onClick={() => setCategory("engagement")}
                  className={`flex items-center justify-center sm:justify-start gap-[6px] rounded-[8px] px-[8px] sm:px-[12px] py-[9px] transition-colors duration-300 ${
                    category === "engagement"
                      ? "bg-[#F7FFF7] border-[1.13px] border-[#214E34] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)]"
                      : "bg-white border-[1.13px] border-[#E7E5E4]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <circle cx="8" cy="10" r="4.5" stroke={category === "engagement" ? "#214E34" : "#A8A29E"} strokeWidth="1.18" />
                    <path d="M5.5 5.5L8 2L10.5 5.5H5.5Z" stroke={category === "engagement" ? "#214E34" : "#A8A29E"} strokeWidth="1.18" />
                  </svg>
                  <span className={`font-inter font-medium text-[12px] sm:text-[14px] whitespace-nowrap ${category === "engagement" ? "text-[#214E34]" : "text-[#57534E]"}`}>Engagement</span>
                </button>
                <button
                  type="button"
                  aria-pressed={category === "bridal"}
                  onClick={() => setCategory("bridal")}
                  className={`flex items-center justify-center sm:justify-start gap-[6px] rounded-[8px] px-[8px] sm:px-[12px] py-[9px] transition-colors duration-300 ${
                    category === "bridal"
                      ? "bg-[#F7FFF7] border-[1.13px] border-[#214E34] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)]"
                      : "bg-white border-[1.13px] border-[#E7E5E4]"
                  }`}
                >
                  <Heart className={`w-4 h-4 shrink-0 ${category === "bridal" ? "text-[#214E34]" : "text-[#A8A29E]"}`} strokeWidth={1.5} />
                  <span className={`font-inter font-medium text-[12px] sm:text-[14px] ${category === "bridal" ? "text-[#214E34]" : "text-[#57534E]"}`}>Bridal</span>
                </button>
                <button
                  type="button"
                  aria-pressed={category === "custom"}
                  onClick={() => setCategory("custom")}
                  className={`flex items-center justify-center sm:justify-start gap-[6px] rounded-[8px] px-[8px] sm:px-[12px] py-[9px] transition-colors duration-300 ${
                    category === "custom"
                      ? "bg-[#F7FFF7] border-[1.13px] border-[#214E34] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)]"
                      : "bg-white border-[1.13px] border-[#E7E5E4]"
                  }`}
                >
                  <Sparkles className={`w-4 h-4 shrink-0 ${category === "custom" ? "text-[#214E34]" : "text-[#A8A29E]"}`} strokeWidth={1.5} />
                  <span className={`font-inter font-medium text-[12px] sm:text-[14px] ${category === "custom" ? "text-[#214E34]" : "text-[#57534E]"}`}>Custom</span>
                </button>
                <button
                  type="button"
                  aria-pressed={category === "gifting"}
                  onClick={() => setCategory("gifting")}
                  className={`flex items-center justify-center sm:justify-start gap-[6px] rounded-[8px] px-[8px] sm:px-[12px] py-[9px] transition-colors duration-300 ${
                    category === "gifting"
                      ? "bg-[#F7FFF7] border-[1.13px] border-[#214E34] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)]"
                      : "bg-white border-[1.13px] border-[#E7E5E4]"
                  }`}
                >
                  <Gift className={`w-4 h-4 shrink-0 ${category === "gifting" ? "text-[#214E34]" : "text-[#A8A29E]"}`} strokeWidth={1.5} />
                  <span className={`font-inter font-medium text-[12px] sm:text-[14px] ${category === "gifting" ? "text-[#214E34]" : "text-[#57534E]"}`}>Gifting</span>
                </button>
              </div>
            </div>

            {/* Date and Time & Below Wrapped in Border for Mobile */}
            <div className="flex min-w-0 flex-col gap-4 mt-2">

              {/* Date and Time */}
              <div className="flex flex-col sm:flex-row gap-[16px] mt-2">
              <div className="min-w-0 flex-1 flex flex-col gap-2">
                <label className="font-inter font-semibold text-[12px] text-[#292524]">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Select a date"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[36px] text-[14px] font-inter placeholder:text-[#57534E] text-[#292524] outline-none focus:ring-1 ring-[#214E34] cursor-pointer"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E] pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>
              <div className="min-w-0 flex-1 flex flex-col gap-2">
                <label className="font-inter font-semibold text-[12px] text-[#292524]">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Select a time"
                    onFocus={(e) => (e.target.type = "time")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[36px] text-[14px] font-inter placeholder:text-[#57534E] text-[#292524] outline-none focus:ring-1 ring-[#214E34] cursor-pointer"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E] pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Name and Phone */}
            <div className="flex flex-col sm:flex-row gap-[16px] mt-2">
              <div className="min-w-0 flex-1 flex flex-col gap-2">
                <label className="font-inter font-semibold text-[12px] text-[#292524]">Full Name <span className="text-[#214E34]">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                  <input type="text" placeholder="Enter your full name" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-inter placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#214E34]" />
                </div>
              </div>
              <div className="min-w-0 flex-1 flex flex-col gap-2">
                <label className="font-inter font-semibold text-[12px] text-[#292524]">Phone Number <span className="text-[#214E34]">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                  <input type="text" placeholder="Your mobile number" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-inter placeholder:text-[#292524] text-[#292524] outline-none focus:ring-1 ring-[#214E34]" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-inter font-semibold text-[12px] text-[#292524]">Email Address <span className="text-[#214E34]">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                <input type="email" placeholder="you@example.com" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-inter placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#214E34]" />
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-inter font-semibold text-[12px] text-[#292524]">Anything you&apos;d like us to know?</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-[14px] w-4 h-4 text-[#A8A29E]" />
                <textarea rows={4} placeholder="Tell us about your requirements, occasion, or any specific designs you&apos;re interested in..." className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-inter placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#214E34] resize-none"></textarea>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-[11.25px] mt-[18px]">
              <a href="mailto:Sales.mirayadiamonds@gmail.com?subject=Consultation%20request" className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#214E34] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173d28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34]">
                Discuss an Appointment <ArrowRight size={16} aria-hidden="true" />
              </a>

              <div className="flex items-center justify-center pt-1">
                <Calendar className="w-[15.75px] h-[15.75px] text-[#78716C]" strokeWidth={1.18} />
                <span className="font-inter font-normal text-xs leading-5 text-[#78716C] pl-[6.75px]">
                  Call or email us to request a time. Appointments require confirmation.
                </span>
              </div>
            </div>

            </div> {/* End of Date and Time & Below Wrapped in Border for Mobile */}

          </div>

          {/* Right Image Section */}
          <div className="relative min-h-[560px] min-w-0 overflow-hidden rounded-xl bg-[#F7FFF7]">
            <Image
              src="/contact/consultant-booking.png"
              alt="Consultation Booking"
              sizes="(max-width: 1023px) 100vw, 50vw"
              fill
              className="object-cover object-center"
            />

            {/* Content overlay */}
            <div className="relative z-10 max-w-sm p-5 sm:p-8 flex flex-col gap-5">

              {/* Sidebar Eyebrow & Title */}
              <div className="flex flex-col gap-[4.5px]">
                <span className="font-inter font-bold text-[12px] leading-[16.88px] text-[#214E34] uppercase">
                  YOUR TIME, YOUR SPACE
                </span>
                <h3 className="font-serif text-[28px] font-semibold leading-tight text-[#353333]">
                  A More Personal Experience
                </h3>
                <p className="text-[#757575] mt-[-1px] text-sm leading-6">
                  Discover exquisite jewellery with dedicated guidance from our experts, in a setting that&apos;s private, relaxed and entirely about you.
                </p>
              </div>

              {/* Key Benefits List */}
              <div className="flex flex-col gap-[15.75px] mt-[4.5px]">
                {/* Benefit 1 */}
                <div className="flex items-start gap-[11.25px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0 mt-[2.25px]">
                    <Image src="/contact/consultant_icon.png" alt="" width={18} height={18} className="shrink-0 object-contain" />
                  </div>
                  <div className="flex flex-col gap-[1.39px]">
                    <span className="font-inter font-semibold text-[14px] leading-[17.79px] text-[#292524]">One-on-one expert guidance</span>
                    <span className="font-inter font-normal text-xs leading-5 text-[#757575]">Get personalised recommendations.</span>
                  </div>
                </div>
                {/* Benefit 2 */}
                <div className="flex items-start gap-[11.25px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0 mt-[2.25px]">
                    <Image src="/contact/diamond_icon.png" alt="" width={18} height={18} className="shrink-0 object-contain" />
                  </div>
                  <div className="flex flex-col gap-[1.39px]">
                    <span className="font-inter font-semibold text-[14px] leading-[17.79px] text-[#292524]">Personal jewellery guidance</span>
                    <span className="font-inter font-normal text-xs leading-5 text-[#757575]">Explore at your own pace in complete privacy.</span>
                  </div>
                </div>
                {/* Benefit 3 */}
                <div className="flex items-start gap-[11.25px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0 mt-[2.25px]">
                    <Image src="/contact/virtual_icon.png" alt="" width={18} height={18} className="shrink-0 object-contain" />
                  </div>
                  <div className="flex flex-col gap-[1.39px]">
                    <span className="font-inter font-semibold text-[14px] leading-[17.79px] text-[#292524]">In-store or virtual</span>
                    <span className="font-inter font-normal text-xs leading-5 text-[#757575]">Choose what&apos;s most convenient for you.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
