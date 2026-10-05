import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeirloomBanner() {
  return (
    <section className="w-full pt-4 pb-10 lg:pt-[30px] lg:pb-[60px] px-4 lg:px-[100px] bg-white">
      <div
        className="relative w-full max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center justify-between lg:h-[540px] lg:rounded-[18px] lg:bg-[#FCE9EC] lg:shadow-[0px_4.5px_6.75px_-4.5px_rgba(0,0,0,0.1),0px_11.25px_16.88px_-3.38px_rgba(0,0,0,0.1)] gap-8 lg:gap-0 lg:p-[54px]"
      >
        {/* Left Text Content (Bottom on mobile) */}
        <div className="order-2 lg:order-1 flex flex-col gap-6 lg:gap-[98px] w-full lg:w-[470px]">
          {/* Text Block */}
          <div className="flex flex-col gap-2 lg:gap-[7px]">
            {/* Eyebrow */}
            <span className="font-sans font-semibold text-[12px] leading-[18px] tracking-[3.09px] text-[#CB485E] uppercase">
              HEIRLOOM COMMISSIONS
            </span>

            {/* Heading */}
            <h3 className="font-serif font-bold text-[32px] sm:text-[40px] leading-[1.1] lg:leading-[44px] text-[#454545]">
              Made Just for Your Story
            </h3>

            {/* Description */}
            <p className="font-sans font-normal text-[14px] leading-[24.75px] text-[#757575] lg:pt-[1.69px] lg:pb-[10.69px]">
              Create a piece that feels uniquely yours. From personal details to meaningful occasions, we craft jewellery designed to celebrate the moments that matter most.
            </p>
          </div>

          {/* Button */}
          <button className="w-[205px] h-[46px] bg-[#CB485E] rounded-[50px] py-[13.5px] px-[31.5px] flex items-center justify-center gap-[9px] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)] transition-transform hover:scale-105">
            <span className="font-sans font-semibold text-[14px] leading-[18px] text-white capitalize">Create Your Piece</span>
            <ArrowRight className="w-[12px] h-[12px] text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Right Image (Top on mobile) */}
        <div
          className="order-1 lg:order-2 relative w-full aspect-square lg:w-[432px] lg:h-[432px] rounded-[13.5px] overflow-hidden lg:shadow-[0px_2.25px_4.5px_-2.25px_rgba(0,0,0,0.1),0px_4.5px_6.75px_-1.13px_rgba(0,0,0,0.1)]"
        >
          <Image
            src="/contact/heirloom.jpg"
            alt="Heirloom Commissions"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
