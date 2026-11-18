import { Container } from "@/components/common/container";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function BrandIntroduction() {
  return (
    <section className="w-full bg-[#FFFFFF] border-t-[1.05px] border-[#E5E7EB] py-10 sm:py-14">
      <Container className="flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-[60px]">
        
        {/* Left Image */}
        <div className="hidden md:block w-full min-w-0 lg:flex-1 relative">
          {/* Image container */}
          <div
            className="relative w-full aspect-[590/462] rounded-[25px] overflow-hidden border-[4.22px] border-white shadow-[0px_4px_30px_rgba(0,0,0,0.06)]"
          >
            <Image
              src="/about/intro.jpg"
              alt="Miraya Diamonds Introduction"
              fill
              className="object-cover"
            />
          </div>

          {/* Floating Badge (Bottom Right) */}
          <div
            className="absolute -bottom-[25px] right-[20px] md:right-[40px] flex flex-col items-center justify-center w-[84px] h-[84px] rounded-full bg-[#FFFFFF] border-[1.05px] border-[#E5E7EB] z-20 shadow-sm"
          >
            <Sparkles className="size-5 text-[#214E34]" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-inter font-semibold text-[10px] leading-4 tracking-[0.84px] uppercase text-[#353333]">
              High-end
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full min-w-0 lg:flex-1 flex flex-col pt-0 lg:pt-[9px]">
          {/* Label */}
          <div className="flex items-center gap-[8px] mb-[21px]">
            <div className="w-[34px] h-[1px] bg-[#214E34]" />
            <span className="font-inter font-semibold text-[12px] leading-[17px] tracking-[3.16px] uppercase text-[#214E34]">
              THE MIRAYA ESSENCE
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-[16px] md:mb-[24px] font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            More Than Jewellery. <span className="text-[#214E34] italic">A Reflection of You.</span>
          </h2>

          {/* Mobile Description */}
          <p className="md:hidden font-inter text-[#757575] mb-[20px] text-sm font-normal leading-6">
            At Miraya Diamonds, jewellery celebrates individuality, meaningful connections and the moments you want to treasure.
          </p>

          {/* Desktop Description */}
          <p className="hidden md:block font-inter text-[#757575] mb-[40px] max-w-[578px] text-sm font-normal leading-6">
            At Miraya Diamonds, we believe jewellery is more than an accessory. It is a reflection of individuality, emotions, celebrations, and unforgettable moments. Every piece we create is thoughtfully designed to become part of your story — today, tomorrow, and for generations to come.
          </p>

          {/* Quote Box - Mobile */}
          <div className="md:hidden w-full bg-[#F7FFF7] border-l-[2px] border-[#214E34] rounded-r-[12px] p-[20px] flex flex-col gap-[12px] mb-[30px]">
            <p className="font-serif font-normal italic text-[14px] leading-[18px] text-[#454545]">
              Thoughtful design turns a beautiful diamond into a piece that feels personal.
            </p>
            <span className="font-inter font-bold text-[10px] tracking-[1.2px] uppercase text-[#214E34]">
              THE MIRAYA DESIGN PHILOSOPHY
            </span>
          </div>

          {/* Quote Box - Desktop */}
          <div className="hidden md:flex w-full bg-[#F7FFF7] border-[1.05px] border-[#E5E7EB] rounded-[17px] p-[25px] flex-col gap-[12.66px] mb-[40px]">
            <p className="font-serif font-medium italic text-[16px] leading-[20px] text-[#454545]">
              Thoughtful design turns a beautiful diamond into a piece that feels personal. Our inspiration comes from the stories and individuality of the people who wear our jewellery.
            </p>
            <span className="font-inter font-semibold text-[12px] leading-[17px] tracking-[1.27px] uppercase text-[#214E34]">
              THE MIRAYA DESIGN PHILOSOPHY
            </span>
          </div>

          {/* Stats - Mobile */}
          <div className="flex md:hidden flex-row items-stretch justify-between gap-[10px] mb-[20px]">
            <div className="flex-1 bg-white border-[1px] border-[#F7FFF7] rounded-[12px] py-[20px] px-[4px] flex flex-col items-center justify-center gap-[6px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#111827]">Detail</span>
              <span className="font-inter font-normal text-[10px] sm:text-[11px] uppercase tracking-wide text-[#6B7280] text-center">Thoughtful Design</span>
            </div>
            <div className="flex-1 bg-white border-[1px] border-[#F7FFF7] rounded-[12px] py-[20px] px-[4px] flex flex-col items-center justify-center gap-[6px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#111827]">Fine</span>
              <span className="font-inter font-normal text-[10px] sm:text-[11px] uppercase tracking-wide text-[#6B7280] text-center">Jewellery</span>
            </div>
            <div className="flex-1 bg-white border-[1px] border-[#F7FFF7] rounded-[12px] py-[20px] px-[4px] flex flex-col items-center justify-center gap-[6px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#111827]">Personal</span>
              <span className="font-inter font-normal text-[10px] sm:text-[11px] uppercase tracking-wide text-[#6B7280] text-center">Guidance</span>
            </div>
          </div>

          {/* Stats - Desktop */}
          <div className="hidden md:flex w-full border-t-[2px] border-[#E5E7EB] pt-[17px] flex-row items-center justify-start gap-6 lg:gap-10">
            {/* Stat 1 */}
            <div className="flex flex-col gap-[2px]">
              <span className="font-serif font-bold text-[20px] leading-[29.5px] text-[#454545]">Fine</span>
              <span className="font-inter font-normal text-[12px] leading-[17px] text-[#757575]">Jewellery</span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col gap-[2px]">
              <span className="font-serif font-bold text-[20px] leading-[29.5px] text-[#454545]">Detail</span>
              <span className="font-inter font-normal text-[12px] leading-[17px] text-[#757575]">Thoughtful Design</span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col gap-[2px]">
              <span className="font-serif font-bold text-[20px] leading-[29.5px] text-[#454545]">Personal</span>
              <span className="font-inter font-normal text-[12px] leading-[17px] text-[#757575]">Guidance</span>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
