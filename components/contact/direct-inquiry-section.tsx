"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/common/container";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitContactMessage } from "@/lib/actions/contact";

export function DirectInquirySection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await submitContactMessage({
        name,
        email,
        phone,
        message,
      });

      if (res.success) {
        setStatus({
          type: "success",
          text: res.message || "Thank you! Your message has been received by Miraya Diamonds.",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus({ type: "error", text: res.error || "Failed to submit message." });
      }
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="bg-[#F7FFF7] py-10 sm:py-14"
    >
      <Container className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8">

        {/* Left Column: Interactive Form */}
        <div
          className="relative flex min-w-0 flex-col rounded-2xl border border-[#214E34]/10 bg-white"
        >
          {/* Shadow overlay */}
          <div className="absolute inset-0 rounded-[18px] bg-[#FFFFFF01] pointer-events-none hidden lg:block" />

          {/* Inner content */}
          <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-6 p-5 sm:p-8">

            {/* Top Section: Eyebrow + Heading + Description */}
            <div className="flex flex-col gap-[7.31px] pt-0 lg:pt-[6.19px]">
              {/* Eyebrow */}
              <span className="font-inter font-semibold text-xs leading-[18px] tracking-[2.48px] text-[#214E34] uppercase">
                DIRECT ENQUIRY
              </span>

              {/* Heading */}
              <h2 className=" font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]" style={{ letterSpacing: "-0.45px" }}>
                Send Us a Message
              </h2>

              {/* Description */}
              <p className="text-[#757575] pt-[1.69px] text-sm leading-6">
                Ask about a piece, share a design idea or get help choosing jewellery for a special moment.
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
              {/* Status Alert */}
              {status && (
                <div
                  className={`mb-4 flex items-center gap-2.5 rounded-lg p-3 text-xs font-medium ${
                    status.type === "success"
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle size={16} className="text-red-600 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              {/* Row 1: Full Name + Email Address */}
              <div className="flex flex-col sm:flex-row gap-[18px]">
                {/* Full Name */}
                <div className="min-w-0 flex-1 flex flex-col">
                  <div className="pb-[4.5px]">
                    <label className="font-inter font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                      FULL NAME <span className="text-[#214E34]">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maharani Gayatri Devi"
                    className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-inter placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#214E34]"
                  />
                </div>
                {/* Email Address */}
                <div className="min-w-0 flex-1 flex flex-col">
                  <div className="pb-[4.5px]">
                    <label className="font-inter font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                      EMAIL ADDRESS <span className="text-[#214E34]">*</span>
                    </label>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-inter placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#214E34]"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number */}
              <div className="flex flex-col mt-[18px]">
                <div className="pb-[4.5px]">
                  <label className="font-inter font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                    PHONE NUMBER <span className="font-normal text-[#A8A29E]">(OPTIONAL)</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your mobile number"
                  className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-inter placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#214E34]"
                />
              </div>

              {/* Row 3: Message / Inquiry */}
              <div className="flex flex-col mt-[18px]">
                <div className="pb-[4.5px]">
                  <label className="font-inter font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                    MESSAGE / ENQUIRY <span className="text-[#214E34]">*</span>
                  </label>
                </div>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the piece you envision, preferred gemstones, or any bespoke design requests..."
                  className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-inter placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#214E34] resize-none"
                />
              </div>

              {/* Bottom: Button + Confidential */}
              <div className="mt-auto pt-6 sm:pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Connect Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-[#214E34] px-6 py-3.5 text-white transition-colors hover:bg-[#173d28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-[14px] h-[14px] text-white animate-spin" />
                    ) : (
                      <>
                        <span className="font-inter font-semibold text-[14px] leading-[18px] text-white text-center whitespace-nowrap">
                          Connect With Miraya
                        </span>
                        <ArrowRight className="w-[12px] h-[12px] text-white shrink-0" strokeWidth={2} />
                      </>
                    )}
                  </button>

                  {/* Jewellery Enquiry */}
                  <div className="flex items-center justify-center gap-[6.75px]">
                    <Image src="/contact/inquiry-lock_icon.png" alt="" width={12} height={16} className="shrink-0 object-contain" />
                    <span className="font-inter font-normal text-[12px] leading-[20.25px] text-[#757575]" style={{ letterSpacing: "0.13px" }}>
                      Jewellery Enquiry
                    </span>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>

        {/* Right Column: Virtual Jewellery Consultation */}
        <div
          className="flex min-w-0 flex-col justify-between rounded-2xl border border-[#214E34]/10 bg-white p-5 sm:p-6"
        >
          {/* Top Content */}
          <div className="flex flex-col gap-[8.21px] pt-[2.25px] pb-[18px]">
            {/* Badge */}
            <div className="flex">
              <div className="bg-white rounded-full px-[13.5px] py-[4.5px] flex items-center justify-center">
                <span className="font-inter font-medium text-[12px] leading-[18px] text-[#214E34] uppercase">
                  100% DIGITAL EXPERIENCE
                </span>
              </div>
            </div>

            {/* Heading */}
            <h3 className="font-serif text-[28px] font-semibold leading-tight text-[#353333]">
              Virtual Jewellery Consultation
            </h3>

            {/* Description */}
            <p className="text-[#757575] pl-[1px] text-sm leading-6">
              Experience luxury fine jewellery from the comfort of your home. We ship fully insured worldwide directly from our master craft studio.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="flex flex-col gap-[13.5px]">
            {/* Feature 1 */}
            <div className="bg-[#F7FFF7] rounded-xl p-4 flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0">
                <Image src="/contact/video_icon.png" alt="" width={19} height={15} className="shrink-0 object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif text-xl font-semibold leading-tight text-[#353333]">
                  4K Live Video Appointments
                </h4>
                <p className="text-[#757575] text-sm leading-6">
                  View diamonds &amp; bespoke pieces live under high magnification with our gemmologists.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F7FFF7] rounded-xl p-4 flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0">
                <Image src="/contact/van-icon.png" alt="" width={19} height={15} className="shrink-0 object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif text-xl font-semibold leading-tight text-[#353333]">
                  Complimentary At-Home Try-On
                </h4>
                <p className="text-[#757575] text-sm leading-6">
                  Doorstep white-glove insured delivery and return pickup across India.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F7FFF7] rounded-xl p-4 flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0">
                <Image src="/contact/pen-icon.png" alt="" width={19} height={15} className="shrink-0 object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif text-xl font-semibold leading-tight text-[#353333]">
                  Direct Master Jeweller Consultation
                </h4>
                <p className="text-[#757575] text-sm leading-6">
                  Custom 3D CAD renders and bespoke heirloom custom pieces crafted easily online.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#F7FFF7] rounded-xl p-4 flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0">
                <Image src="/contact/hallmark.png" alt="" width={20} height={20} className="shrink-0 object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif text-xl font-semibold leading-tight text-[#353333]">
                  Certified &amp; Hallmarked
                </h4>
                <p className="text-[#757575] text-sm leading-6">
                  100% IGI/GIA certified solitaires and 18KT/22KT BIS hallmarked gold delivered to your doorstep.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="pt-5">
            <div className="border-t border-[#214E34]/15 pt-5 flex flex-wrap items-center gap-3">
              <a href="mailto:Sales.mirayadiamonds@gmail.com?subject=Jewellery%20consultation" className="bg-[#214E34] rounded-[54px] py-3 lg:py-[13.5px] px-2 sm:px-[18px] lg:px-[24px] flex items-center justify-center gap-1.5 sm:gap-[10px] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)] min-h-11 flex-1">
                <span className="font-inter font-semibold text-[11px] sm:text-[14px] leading-[18px] tracking-[0.5px] text-white capitalize whitespace-nowrap">Schedule Live Call</span>
                <Image src="/contact/calendar-icon.png" alt="" width={14} height={15} className="shrink-0 object-contain" />
              </a>
              <a href="https://wa.me/919869698984" target="_blank" rel="noopener noreferrer" className="bg-white border-[1.13px] border-[#214E34] rounded-[54px] py-3 lg:py-[13.5px] px-[16px] sm:px-[18px] lg:px-[32px] flex items-center justify-center gap-1.5 sm:gap-[6.74px] min-h-11 flex-1">
                <span className="font-inter font-semibold text-[11px] sm:text-[14px] leading-[18px] text-[#214E34] whitespace-nowrap">WhatsApp</span>
                <Image src="/contact/message-icon.png" alt="" width={15} height={15} className="shrink-0 object-contain" />
              </a>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
