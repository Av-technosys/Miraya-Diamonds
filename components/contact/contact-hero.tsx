import Image from "next/image";
import { BadgeCheck, Clock, ChevronRight } from "lucide-react";

export function ContactHero() {
  return (
    <section className="w-full bg-white pt-[16px] md:pt-[30px] pb-[60px] lg:pb-[80px] px-4 md:px-8">
      {/* Inner Container */}
      <div className="w-full max-w-[1240px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 md:mb-[60px] text-[#757575] font-sans text-sm">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 text-[#CB485E]" />
          <span>Contact Us</span>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-1 md:gap-[31.5px]">
          
          {/* Left Side Content */}
          <div className="flex flex-col justify-center w-full lg:w-[607px] lg:pr-[54px]">
            
            {/* Top Pill */}
            <div className="inline-flex items-center w-fit bg-[#FDECEF] px-[10px] md:px-[12px] py-[4px] md:py-[6px] rounded-full mb-4 md:mb-6">
              <span className="font-sans font-semibold text-[10px] md:text-[12px] leading-[14px] md:leading-[18px] text-[#CB485E] uppercase tracking-wide">
                Client Concierge & Assistance
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif font-bold text-[40px] md:text-[64px] leading-[44px] md:leading-[71px] tracking-[-1px] md:tracking-[-1.57px] text-[#313030] mb-3 md:mb-6">
              We Are Here<br />
              <span 
                className="italic font-serif font-bold text-[40px] md:text-[96px] md:leading-[71px] text-[#CB485E] block mt-[-4px] md:-mt-[15px] align-middle"
                style={{ letterSpacing: "-1.57px" }}
              >
                To Assist You
              </span>
            </h1>

            {/* Paragraph */}
            <p className="font-sans font-normal text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.09px] text-[#757575] max-w-[490px] mb-3 md:mb-8">
              Whether you seek bespoke heirloom guidance, high solitaire selection, or wish to schedule an intimate atelier viewing, our master gemologists and personal stylists await your message.
            </p>

            {/* Features */}
            {/* Scrollable on mobile to match image 1 */}
            <div className="flex flex-row items-center gap-[25px] md:gap-8 mt-3 md:mt-auto pb-4 md:pb-4 overflow-x-auto whitespace-nowrap scrollbar-hide snap-x -mr-4 pr-4 md:mr-0 md:pr-0">
              <div className="flex items-center gap-[4px] md:gap-[6px] shrink-0 snap-start">
                <BadgeCheck className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-[#CB485E] shrink-0" strokeWidth={1.5} />
                <span className="font-sans font-semibold text-[11px] md:text-[12px] leading-[14px] md:leading-[18px] text-[#CB485E] uppercase">
                  IGI & GIA Certified Staff
                </span>
              </div>
              <div className="flex items-center gap-[4px] md:gap-[6px] shrink-0 snap-start">
                <Clock className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-[#CB485E] shrink-0" strokeWidth={1.5} />
                <span className="font-sans font-semibold text-[11px] md:text-[12px] leading-[14px] md:leading-[18px] text-[#CB485E] uppercase">
                  Typical Atelier Reply: &lt; 4 Hours
                </span>
              </div>
            </div>

          </div>

          {/* Right Side Image */}
          <div className="relative w-[calc(100%+16px)] -mx-2 md:mx-0 md:w-full lg:w-[538px] h-[260px] md:h-[348.5px] rounded-[16px] md:rounded-[22.74px] shadow-[0px_11.37px_14.21px_-8.53px_rgba(0,0,0,0.1),0px_28.42px_35.53px_-7.11px_rgba(0,0,0,0.1)] flex-shrink-0 mt-0 lg:mt-0 z-0">
            {/* Image Wrapper */}
            <div className="absolute inset-0 rounded-[16px] md:rounded-[22.74px] overflow-hidden">
              <Image 
                src="/contact/heroSection.jpg" 
                alt="Fine Jewellery Studio" 
                fill 
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Floating Glass Card Overlay */}
            <div className="absolute -bottom-[20px] left-4 md:left-auto md:right-[15px] w-[280px] sm:w-[314px] h-[64px] sm:h-[72px] bg-white rounded-[8px] shadow-[0px_2.84px_5.68px_-2.84px_rgba(0,0,0,0.1),0px_5.68px_8.53px_-1.42px_rgba(0,0,0,0.1)] px-[16px] sm:px-[18px] py-[10px] sm:py-[12px] flex justify-between items-center z-10">
              <div className="flex flex-col justify-center gap-0.5">
                <span className="font-sans font-semibold text-[12px] sm:text-[14px] leading-[18px] sm:leading-[22.74px] text-[#861632] uppercase">
                  Fine Jewellery Studio
                </span>
                <span className="font-sans font-normal text-[11px] sm:text-[14px] leading-[16px] sm:leading-[28.42px] text-[#1C1B1B]">
                  Private Virtual Appointments
                </span>
              </div>
              <Image src="/contact/Lock_Icon.png" alt="Lock" width={20} height={26} style={{ width: '20px', height: '26px' }} className="object-contain shrink-0" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
