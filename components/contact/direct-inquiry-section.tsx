import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function DirectInquirySection() {
  return (
    <section
      className="w-full pt-0 pb-0 lg:pb-[90px] md:py-[90px] px-4 md:px-[100px]"
      style={{ backgroundColor: "#FCF9F8" }}
    >
      <div className="w-full max-w-[1240px] mx-auto flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]">

        {/* Left Column: Interactive Form */}
        <div
          className="relative w-full lg:w-[685px] lg:h-[730px] lg:rounded-[18px] lg:bg-white lg:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.05)] shrink-0"
        >
          {/* Shadow overlay */}
          <div className="absolute inset-0 rounded-[18px] bg-[#FFFFFF01] pointer-events-none hidden lg:block" />

          {/* Inner content */}
          <div className="relative z-10 w-full max-w-[597px] mx-auto py-0 lg:py-[47px] px-0 lg:px-[44px] flex flex-col gap-8 md:gap-[69px]">

            {/* Top Section: Eyebrow + Heading + Description */}
            <div className="flex flex-col gap-[7.31px] pt-0 lg:pt-[6.19px]">
              {/* Eyebrow */}
              <span className="font-[family-name:var(--font-jakarta)] font-semibold text-[12.38px] leading-[18px] tracking-[2.48px] text-[#CB485E] uppercase">
                DIRECT INQUIRY
              </span>

              {/* Heading */}
              <h2 className="font-[family-name:var(--font-playfair)] font-normal text-[40px] leading-[54px] text-[#1C1B1B] whitespace-nowrap" style={{ letterSpacing: "-0.45px" }}>
                Send Us a Message
              </h2>

              {/* Description */}
              <p className="font-sans font-normal text-[14px] leading-[24.75px] text-[#757575] pt-[1.69px]">
                Connect directly with our master gemologists for bespoke consultations, solitaire acquisition, or custom heirlooms.
              </p>
            </div>

            {/* Form Section */}
            <div className="flex flex-col">
              {/* Row 1: Full Name + Email Address */}
              <div className="flex flex-col sm:flex-row gap-[18px]">
                {/* Full Name */}
                <div className="flex-1 flex flex-col">
                  <div className="pb-[4.5px]">
                    <label className="font-sans font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                      FULL NAME <span className="text-[#CB485E]">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Maharani Gayatri Devi"
                    className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]"
                  />
                </div>
                {/* Email Address */}
                <div className="flex-1 flex flex-col">
                  <div className="pb-[4.5px]">
                    <label className="font-sans font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                      EMAIL ADDRESS <span className="text-[#CB485E]">*</span>
                    </label>
                  </div>
                  <input
                    type="email"
                    placeholder="name@aurora-patron.com"
                    className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number */}
              <div className="flex flex-col mt-[18px]">
                <div className="pb-[4.5px]">
                  <label className="font-sans font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                    PHONE NUMBER <span className="font-normal text-[#A8A29E]">(OPTIONAL)</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]"
                />
              </div>

              {/* Row 3: Message / Inquiry */}
              <div className="flex flex-col mt-[18px]">
                <div className="pb-[4.5px]">
                  <label className="font-sans font-semibold text-[12px] leading-[18px] text-[#1C1B1B] uppercase">
                    MESSAGE / INQUIRY <span className="text-[#CB485E]">*</span>
                  </label>
                </div>
                <textarea
                  rows={5}
                  placeholder="Describe the piece you envision, preferred gemstones, or any bespoke design requests..."
                  className="w-full bg-[#F5F5F4] rounded-[9px] py-[14.63px] px-[18px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E] resize-none"
                />
              </div>

              {/* Bottom: Button + Confidential */}
              <div className="pt-8 lg:pt-[18px]">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4 lg:gap-0 pt-[9px]">
                  {/* Connect Button */}
                  <button className="bg-[#CB485E] rounded-[49px] py-[15.75px] px-[54px] flex items-center justify-center gap-[13.5px] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)]">
                    <span className="font-sans font-semibold text-[14px] leading-[18px] text-white text-center whitespace-nowrap">Connect With Miraya</span>
                    <ArrowRight className="w-[12px] h-[12px] text-white shrink-0" strokeWidth={2} />
                  </button>

                  {/* Confidential Inquiry */}
                  <div className="flex items-center justify-center gap-[6.75px]">
                    <Image src="/contact/inquiry-lock_icon.png" alt="Lock" width={12} height={16} style={{ width: '12px', height: '15.75px' }} className="object-contain" />
                    <span className="font-sans font-normal text-[12px] leading-[20.25px] text-[#574143]" style={{ letterSpacing: "0.13px" }}>
                      Confidential Inquiry
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Virtual Jewelry Consultation */}
        <div
          className="w-full lg:w-[495px] lg:h-[730px] rounded-[18px] border-[1.13px] border-[#DEBFC166] bg-[#FCE9EC] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.05)] py-5 px-3 lg:p-[31.5px] flex flex-col justify-between shrink-0"
        >
          {/* Top Content */}
          <div className="flex flex-col gap-[8.21px] pt-[2.25px] pb-[18px]">
            {/* Badge */}
            <div className="flex">
              <div className="bg-white rounded-full px-[13.5px] py-[4.5px] flex items-center justify-center">
                <span className="font-sans font-medium text-[12px] leading-[18px] text-[#CB485E] uppercase">
                  100% DIGITAL EXPERIENCE
                </span>
              </div>
            </div>

            {/* Heading */}
            <h3 className="font-[family-name:var(--font-playfair)] font-medium text-[31.5px] leading-[40.5px] text-[#1C1B1B] pt-[5.29px]">
              Virtual Jewelry Consultation
            </h3>

            {/* Description */}
            <p className="font-[family-name:var(--font-jakarta)] font-normal text-[14px] leading-[20px] text-[#574143] pl-[1px]">
              Experience luxury fine jewellery from the comfort of your home. We ship fully insured worldwide directly from our master craft studio.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="flex flex-col gap-[13.5px]">
            {/* Feature 1 */}
            <div className="bg-white rounded-[13.5px] py-[12px] px-[15px] flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#FCE9EC] flex items-center justify-center shrink-0">
                <Image src="/contact/video_icon.png" alt="Video" width={19} height={15} className="object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif font-bold text-[16px] leading-[25.31px] text-[#1C1B1B]">
                  4K Live Video Appointments
                </h4>
                <p className="font-sans font-normal text-[12px] leading-[18.56px] text-[#757575]">
                  View diamonds & bespoke pieces live under high magnification with our gemologists.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-[13.5px] py-[12px] px-[15px] flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#FCE9EC] flex items-center justify-center shrink-0">
                <Image src="/contact/van-icon.png" alt="Delivery" width={19} height={15} className="object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif font-bold text-[16px] leading-[25.31px] text-[#1C1B1B]">
                  Complimentary At-Home Try-On
                </h4>
                <p className="font-sans font-normal text-[12px] leading-[18.56px] text-[#757575]">
                  Doorstep white-glove insured delivery and return pickup across India.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-[13.5px] py-[12px] px-[15px] flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#FCE9EC] flex items-center justify-center shrink-0">
                <Image src="/contact/pen-icon.png" alt="Custom" width={19} height={15} className="object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif font-bold text-[16px] leading-[25.31px] text-[#1C1B1B]">
                  Direct Master Jeweller Consultation
                </h4>
                <p className="font-sans font-normal text-[12px] leading-[18.56px] text-[#757575]">
                  Custom 3D CAD renders and bespoke heirloom custom pieces crafted easily online.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-[13.5px] py-[12px] px-[15px] flex items-start gap-[13.5px]">
              <div className="w-[45px] h-[45px] rounded-full bg-[#FCE9EC] flex items-center justify-center shrink-0">
                <Image src="/contact/Lock_Icon.png" alt="Certified" width={19} height={15} className="object-contain" />
              </div>
              <div className="flex flex-col gap-[1.41px]">
                <h4 className="font-serif font-bold text-[16px] leading-[25.31px] text-[#1C1B1B]">
                  Certified & Hallmarked
                </h4>
                <p className="font-sans font-normal text-[12px] leading-[18.56px] text-[#757575]">
                  100% IGI/GIA certified solitaires and 18KT/22KT BIS hallmarked gold delivered to your doorstep.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="pt-[18px]">
            <div className="border-t-[1.13px] border-[#CB485E33] pt-[17px] flex items-center justify-between gap-[6px] sm:gap-[13.5px]">
              <button className="bg-[#CB485E] rounded-[54px] py-3 lg:py-[13.5px] px-2 sm:px-[18px] lg:px-[24px] flex items-center justify-center gap-1.5 sm:gap-[10px] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)] w-[56%] lg:w-auto lg:flex-1">
                <span className="font-sans font-semibold text-[11px] sm:text-[14px] leading-[18px] tracking-[0.5px] text-white capitalize whitespace-nowrap">Schedule Live Call</span>
                <Image src="/contact/calendar-icon.png" alt="Calendar" width={14} height={15} className="object-contain shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button className="bg-white border-[1.13px] border-[#DEBFC1] rounded-[54px] py-3 lg:py-[13.5px] px-[16px] sm:px-[18px] lg:px-[32px] flex items-center justify-center gap-1.5 sm:gap-[6.74px] w-[41%] lg:w-auto lg:flex-none">
                <span className="font-sans font-semibold text-[11px] sm:text-[14px] leading-[18px] text-[#CB485E] whitespace-nowrap">Whatsapp</span>
                <Image src="/contact/message-icon.png" alt="Message" width={15} height={15} className="object-contain shrink-0 w-3 h-3 sm:w-[15px] sm:h-[15px]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
