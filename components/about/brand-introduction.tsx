import Image from "next/image";

export function BrandIntroduction() {
  return (
    <section className="w-full bg-[#FFFDFC] border-t-[1.05px] border-[#F3E5EC] pt-[20px] md:pt-[30px] pb-[40px] md:pb-[60px]">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-[60px]">
        
        {/* Left Image */}
        <div className="w-full lg:w-[590px] relative">
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
            className="absolute -bottom-[25px] right-[20px] md:right-[40px] flex flex-col items-center justify-center w-[84px] h-[84px] rounded-full bg-[#FFFDFC] border-[1.05px] border-[#F3E5EC] z-20 shadow-sm"
          >
            <span className="text-[19px] leading-[29.5px] text-[#CB485E]">✨</span>
            <span className="font-sans font-semibold text-[8.44px] leading-[12.66px] tracking-[0.84px] uppercase text-[#3B2A30]">
              High-end
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[590px] flex flex-col pt-0 lg:pt-[9px]">
          {/* Label */}
          <div className="flex items-center gap-[8px] mb-[21px]">
            <div className="w-[34px] h-[1px] bg-[#CB485E]" />
            <span className="font-sans font-semibold text-[12px] leading-[17px] tracking-[3.16px] uppercase text-[#CB485E]">
              THE MIRAYA ESSENCE
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif font-bold text-[32px] md:text-[40px] leading-[1.1] md:leading-[42.2px] text-[#454545] mb-[24px]">
            More Than Jewellery.<br className="hidden md:block" />
            <span className="text-[#CB485E] italic"> A Reflection of You.</span>
          </h2>

          {/* Mobile Description */}
          <p className="md:hidden font-sans font-light text-[14px] leading-[20px] text-[#757575] mb-[20px]">
            At Miraya Diamonds, jewellery is a reflection of individuality, emotions, and unforgettable celebrations designed for generations.
          </p>

          {/* Desktop Description */}
          <p className="hidden md:block font-sans font-light text-[14px] leading-[20px] text-[#757575] mb-[40px] max-w-[578px]">
            At Miraya Diamonds, we believe jewellery is more than an accessory. It is a reflection of individuality, emotions, celebrations, and unforgettable moments. Every piece we create is thoughtfully designed to become part of your story — today, tomorrow, and for generations to come.
          </p>

          {/* Quote Box - Mobile */}
          <div className="md:hidden w-full bg-[#FCF5F7] border-l-[3px] border-[#CB485E] rounded-r-[12px] p-[16px] flex flex-col gap-[12px] mb-[24px]">
            <p className="font-serif font-normal italic text-[14px] leading-[18px] text-[#454545]">
              &quot;Diamonds are nature&apos;s most enduring poetry, sculpted to reflect the subtle brilliance of the woman who wears them.&quot;
            </p>
            <span className="font-sans font-bold text-[10px] tracking-[1.2px] uppercase text-[#CB485E]">
              — MIRAYA DESIGN ARTIST
            </span>
          </div>

          {/* Quote Box - Desktop */}
          <div className="hidden md:flex w-full bg-[#FBF4F6] border-[1.05px] border-[#F3E5EC] rounded-[17px] p-[25px] flex-col gap-[12.66px] mb-[40px]">
            <p className="font-serif font-medium italic text-[16px] leading-[20px] text-[#454545]">
              &quot;Diamonds are nature&apos;s most enduring poetry. Our joy lies in sculpting them to reflect the subtle brilliance of the woman who wears them.&quot;
            </p>
            <span className="font-sans font-semibold text-[12px] leading-[17px] tracking-[1.27px] uppercase text-[#CB485E]">
              — MIRAYA DESIGN ARTIST
            </span>
          </div>

          {/* Stats - Mobile */}
          <div className="flex md:hidden flex-row items-stretch justify-between gap-[8px] mb-0">
            <div className="flex-1 bg-white border-[1px] border-[#FCE9EC] rounded-[12px] py-[16px] px-[4px] flex flex-col items-center justify-center gap-[4px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <span className="font-serif font-bold text-[13px] text-[#111827]">100%</span>
              <span className="font-sans font-normal text-[9px] uppercase tracking-wide text-[#6B7280] text-center">Conflict-Free</span>
            </div>
            <div className="flex-1 bg-white border-[1px] border-[#FCE9EC] rounded-[12px] py-[16px] px-[4px] flex flex-col items-center justify-center gap-[4px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <span className="font-serif font-bold text-[13px] text-[#111827]">18KT & PT</span>
              <span className="font-sans font-normal text-[9px] uppercase tracking-wide text-[#6B7280] text-center">Precious Metals</span>
            </div>
            <div className="flex-1 bg-white border-[1px] border-[#FCE9EC] rounded-[12px] py-[16px] px-[4px] flex flex-col items-center justify-center gap-[4px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <span className="font-serif font-bold text-[13px] text-[#111827]">Lifetime</span>
              <span className="font-sans font-normal text-[9px] uppercase tracking-wide text-[#6B7280] text-center">Warranty</span>
            </div>
          </div>

          {/* Stats - Desktop */}
          <div className="hidden md:flex w-full border-t-[2px] border-[#F3E5EC] pt-[17px] flex-row items-center justify-start gap-[100px]">
            {/* Stat 1 */}
            <div className="flex flex-col gap-[2px]">
              <span className="font-serif font-bold text-[20px] leading-[29.5px] text-[#454545]">18KT &amp; PT</span>
              <span className="font-sans font-normal text-[12px] leading-[17px] text-[#757575]">Precious Metals</span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col gap-[2px]">
              <span className="font-serif font-bold text-[20px] leading-[29.5px] text-[#454545]">100%</span>
              <span className="font-sans font-normal text-[12px] leading-[17px] text-[#757575]">Conflict-Free</span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col gap-[2px]">
              <span className="font-serif font-bold text-[20px] leading-[29.5px] text-[#454545]">Lifetime</span>
              <span className="font-sans font-normal text-[12px] leading-[17px] text-[#757575]">Warranty</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
