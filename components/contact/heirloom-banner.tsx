import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeirloomBanner() {
  return (
    <section className="w-full pt-[30px] pb-[60px] px-4 md:px-[100px] bg-white">
      <div
        className="relative w-full max-w-[1240px] mx-auto h-[540px] rounded-[18px] bg-[#FCE9EC] overflow-hidden"
        style={{
          boxShadow: "0px 4.5px 6.75px -4.5px rgba(0,0,0,0.1), 0px 11.25px 16.88px -3.38px rgba(0,0,0,0.1)",
        }}
      >
        {/* Right Image - positioned with proper spacing from edges */}
        <div
          className="absolute top-[54px] right-[54px] w-[432px] h-[432px] rounded-[13.5px] overflow-hidden hidden lg:block"
          style={{
            boxShadow: "0px 2.25px 4.5px -2.25px rgba(0,0,0,0.1), 0px 4.5px 6.75px -1.13px rgba(0,0,0,0.1)",
          }}
        >
          <Image
            src="/contact/heirloom.jpg"
            alt="Heirloom Commissions"
            fill
            className="object-cover"
          />
        </div>

        {/* Left Text Content */}
        <div className="absolute top-[129.26px] left-[54px] w-[470px] flex flex-col gap-[98px]">
          {/* Text Block */}
          <div className="flex flex-col gap-[7px]">
            {/* Eyebrow */}
            <span className="font-sans font-semibold text-[12px] leading-[18px] tracking-[3.09px] text-[#CB485E] uppercase">
              HEIRLOOM COMMISSIONS
            </span>

            {/* Heading */}
            <h3 className="font-serif font-bold text-[40px] leading-[44px] text-[#454545]">
              Made Just for Your Story
            </h3>

            {/* Description */}
            <p className="font-sans font-normal text-[14px] leading-[24.75px] text-[#757575] pt-[1.69px] pb-[10.69px]">
              Create a piece that feels uniquely yours. From personal details to meaningful occasions, we craft jewellery designed to celebrate the moments that matter most.
            </p>
          </div>

          {/* Button */}
          <button className="w-[205px] h-[46px] bg-[#CB485E] rounded-[50px] py-[13.5px] px-[31.5px] flex items-center justify-center gap-[9px]">
            <span className="font-sans font-semibold text-[14px] leading-[18px] text-white capitalize">Create Your Piece</span>
            <ArrowRight className="w-[12px] h-[12px] text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
