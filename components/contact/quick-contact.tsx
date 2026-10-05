import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export function QuickContact() {
  return (
    <section className="w-full bg-[#FCE9EC] py-[54px] px-4 md:px-[100px]">
      <div className="w-full max-w-[1240px] mx-auto flex flex-row overflow-x-auto lg:overflow-visible gap-[17px] justify-start lg:justify-between snap-x snap-mandatory pb-4 lg:pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Card 1 */}
        <div className="w-[85vw] sm:w-[320px] lg:w-[402px] shrink-0 snap-center h-auto lg:h-[342px] bg-white rounded-[18px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.05)] p-[24px] lg:p-[31px] flex flex-col">
          {/* Icon Container */}
          <div className="w-[63px] h-[63px] bg-[#FCE9EC] rounded-full flex items-center justify-center mb-5">
            <Image src="/contact/phone_icon.png" alt="Phone" width={22} height={22} className="object-contain" />
          </div>

          {/* Subheading */}
          <span className="font-sans font-semibold text-[14px] leading-[18px] tracking-[1.24px] text-[#CB485E] uppercase mb-4">
            Voice & Whatsapp Concierge
          </span>

          {/* Heading */}
          <h3 className="font-serif font-semibold text-[24px] leading-[33.75px] tracking-[0.25px] text-[#1C1B1B] mb-2 lining-nums">
            +91 98765 43210
          </h3>

          {/* Text */}
          <p className="font-sans font-normal text-[14px] leading-[20px] text-[#757575] mb-auto">
            Mon – Sat: 10:00 AM – 7:00 PM IST. Direct access to our senior diamond concierge and bridal desk.
          </p>

          {/* Button */}
          <button className="mt-6 flex items-center justify-center gap-[10px] bg-[#CB485E] hover:bg-[#a83647] transition-colors w-fit h-[40px] px-[17px] rounded-[8px]">
            <span className="font-sans font-semibold text-[12px] leading-[18px] tracking-[0px] text-white uppercase">
              Call now
            </span>
            <ArrowRight className="w-3 h-3 text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Card 2 */}
        <div className="w-[85vw] sm:w-[320px] lg:w-[402px] shrink-0 snap-center h-auto lg:h-[342px] bg-white rounded-[18px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.05)] p-[24px] lg:p-[31px] flex flex-col">
          <div className="w-[63px] h-[63px] bg-[#FCE9EC] rounded-full flex items-center justify-center mb-5">
            <Image src="/contact/mail_icon.png" alt="Mail" width={22} height={22} className="object-contain" />
          </div>
          <span className="font-sans font-semibold text-[14px] leading-[18px] tracking-[1.24px] text-[#CB485E] uppercase mb-4">
            Email Concierge
          </span>
          <h3 className="font-serif font-semibold text-[24px] leading-[33.75px] tracking-[0.25px] text-[#1C1B1B] mb-2 lining-nums">
            concierge@aurorajewels.com
          </h3>
          <p className="font-sans font-normal text-[14px] leading-[20px] text-[#757575] mb-auto">
            Send portfolio custom briefs, CAD design adjustments, or certificate validation inquiries.
          </p>
          <button className="mt-6 flex items-center justify-center gap-[10px] bg-[#CB485E] hover:bg-[#a83647] transition-colors w-fit h-[40px] px-[17px] rounded-[8px]">
            <span className="font-sans font-semibold text-[12px] leading-[18px] tracking-[0px] text-white uppercase">
              Send Email
            </span>
            <ArrowRight className="w-3 h-3 text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Card 3 */}
        <div className="w-[85vw] sm:w-[320px] lg:w-[402px] shrink-0 snap-center h-auto lg:h-[342px] bg-white rounded-[18px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.05)] p-[24px] lg:p-[31px] flex flex-col">
          <div className="w-[63px] h-[63px] bg-[#FCE9EC] rounded-full flex items-center justify-center mb-5">
            <Image src="/contact/video_icon.png" alt="Video" width={22} height={22} className="object-contain" />
          </div>
          <span className="font-sans font-semibold text-[14px] leading-[18px] tracking-[1.24px] text-[#CB485E] uppercase mb-4">
            1-on-1 Virtual Experience
          </span>
          <h3 className="font-serif font-semibold text-[24px] leading-[33.75px] tracking-[0.25px] text-[#1C1B1B] mb-2 lining-nums">
            Private Video Suite
          </h3>
          <p className="font-sans font-normal text-[14px] leading-[20px] text-[#757575] mb-auto">
            Examine 4K high-magnification stone fire, cut facets, and neckline balance with our design director.
          </p>
          <button className="mt-6 flex items-center justify-center gap-[10px] bg-[#CB485E] hover:bg-[#a83647] transition-colors w-fit h-[40px] px-[17px] rounded-[8px]">
            <span className="font-sans font-semibold text-[12px] leading-[18px] tracking-[0px] text-white uppercase">
              Book Appointment
            </span>
            <Calendar className="w-3 h-3 text-white" strokeWidth={2} />
          </button>
        </div>

      </div>
    </section>
  );
}
