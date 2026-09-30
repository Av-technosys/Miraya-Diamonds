import Image from "next/image";
import { BadgeCheck, Clock, Lock, ChevronRight } from "lucide-react";

export function ContactHero() {
  return (
    <section className="w-full max-w-[1620px] mx-auto py-[30px] px-4 md:px-8 bg-white">
      {/* Inner Container */}
      <div className="w-full max-w-[1240px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[#757575] font-sans text-sm">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 text-[#CB485E]" />
          <span>Contact Us</span>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-[31.5px]">
          
          {/* Left Side Content */}
          <div className="flex flex-col justify-center w-full lg:w-[607px] lg:pr-[54px]">
            
            {/* Top Pill */}
            <div className="inline-flex items-center w-fit bg-[#FDF0F2] px-[12px] py-[6px] rounded-full mb-6">
              <span className="font-sans font-semibold text-[12px] leading-[18px] text-[#CB485E] uppercase tracking-wide">
                Client Concierge & Assistance
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif font-bold text-[64px] leading-[71px] tracking-[-1.57px] text-[#313030] mb-6">
              We Are Here<br />
              <span className="italic font-bold text-[96px] text-[#CB485E]">
                To Assist You
              </span>
            </h1>

            {/* Paragraph */}
            <p className="font-sans font-normal text-[14px] leading-[20px] tracking-[0.09px] text-[#757575] max-w-[490px] mb-8">
              Whether you seek bespoke heirloom guidance, high solitaire selection, or wish to schedule an intimate atelier viewing, our master gemologists and personal stylists await your message.
            </p>

            {/* Features */}
            <div className="flex items-center gap-8 mt-auto pb-4">
              <div className="flex items-center gap-[6px]">
                <BadgeCheck className="w-[18px] h-[18px] text-[#CB485E]" strokeWidth={1.5} />
                <span className="font-sans font-semibold text-[12px] leading-[18px] text-[#CB485E] uppercase">
                  IGI & GIA Certified Staff
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                <Clock className="w-[18px] h-[18px] text-[#CB485E]" strokeWidth={1.5} />
                <span className="font-sans font-semibold text-[12px] leading-[18px] text-[#CB485E] uppercase">
                  Typical Atelier Reply: &lt; 4 Hours
                </span>
              </div>
            </div>

          </div>

          {/* Right Side Image */}
          <div className="relative w-full lg:w-[538px] h-[348.5px] rounded-[22.74px] shadow-[0px_11.37px_14.21px_-8.53px_rgba(0,0,0,0.1),0px_28.42px_35.53px_-7.11px_rgba(0,0,0,0.1)] flex-shrink-0 mt-10 lg:mt-0">
            {/* Image Wrapper */}
            <div className="absolute inset-0 rounded-[22.74px] overflow-hidden">
              <Image 
                src="/contact/heroSection.jpg" 
                alt="Fine Jewellery Studio" 
                fill 
                className="object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(49,48,48,0.6)] via-[transparent_50%] to-transparent pointer-events-none" />
            </div>

            {/* Floating Glass Card Overlay (Hanging off the bottom right) */}
            <div className="absolute -bottom-[20px] right-8 w-[314px] h-[72px] bg-white rounded-[8px] shadow-[0px_2.84px_5.68px_-2.84px_rgba(0,0,0,0.1),0px_5.68px_8.53px_-1.42px_rgba(0,0,0,0.1)] px-[18px] py-[12px] flex justify-between items-center z-10">
              <div className="flex flex-col justify-center gap-0.5">
                <span className="font-sans font-semibold text-[14px] leading-[22.74px] text-[#861632] uppercase">
                  Fine Jewellery Studio
                </span>
                <span className="font-sans font-normal text-[14px] leading-[28.42px] text-[#1C1B1B]">
                  Private Virtual Appointments
                </span>
              </div>
              <Lock className="w-[26.5px] h-[34.8px] text-[#861632]" strokeWidth={1.5} />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
