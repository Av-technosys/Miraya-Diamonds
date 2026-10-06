import Image from "next/image";

export function AboutHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFDFC 0%, #FCF9F8 50%, rgba(251, 239, 243, 0.6) 100%)",
      }}
    >


      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 md:px-0 pt-6 md:pt-[60px] pb-6 md:pb-[30px] flex flex-col lg:flex-row items-center gap-8 lg:gap-[60px]">
        {/* Left Content */}
        <div className="w-full lg:w-[590px] flex flex-col pr-0 lg:pr-[25px]">
          {/* Mobile Breadcrumb */}
          <div className="flex md:hidden items-center gap-[6px] mb-[12px]">
            <span className="font-sans font-normal text-[12px] text-[#757575]">Home</span>
            <span className="font-sans font-normal text-[10px] text-[#CB485E]">{'>'}</span>
            <span className="font-sans font-normal text-[12px] text-[#757575]">About Us</span>
          </div>

          {/* Label */}
          <div className="flex items-center gap-[8px] mb-[21px]">
            <div className="w-[34px] h-[1px] bg-[#CB485E]" />
            <span className="font-sans font-semibold text-[12px] leading-[17px] tracking-[3.16px] uppercase text-[#CB485E]">
              THE MIRAYA CRAFTSMANSHIP
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif font-bold text-[32px] md:text-[40px] leading-[36px] md:leading-[40px] text-[#454545] mb-[21px]">
            Where Every <span className="text-[#CB485E]">Diamond</span> Tells a
            <br className="hidden md:block" /> Story
          </h1>

          {/* Description */}
          <p className="font-sans font-light text-[14px] leading-[20px] text-[#454545] mb-[21px] max-w-[565px]">
            Discover the story behind Miraya Diamonds — where timeless
            craftsmanship, exceptional diamonds, and contemporary elegance come
            together.
          </p>

          {/* Patrons Section - Desktop */}
          <div className="hidden md:block border-t-[1px] border-[#FCE9EC] pt-[17px]">
            <div className="flex items-center gap-[17px]">
              {/* Avatar circles */}
              <div className="flex items-center -space-x-[6px]">
                {/* M */}
                <div className="w-[42px] h-[42px] rounded-full bg-[#FCE9EC] flex items-center justify-center shadow-[0px_0px_0px_2.11px_#FFFFFF] relative z-[4]">
                  <span className="font-serif font-bold text-[13px] leading-[17px] text-[#CB485E]">
                    M
                  </span>
                </div>
                {/* R */}
                <div className="w-[42px] h-[42px] rounded-full bg-[#FBEFF3] flex items-center justify-center shadow-[0px_0px_0px_2.11px_#FFFFFF] relative z-[3]">
                  <span className="font-serif font-bold text-[13px] leading-[17px] text-[#454545]">
                    R
                  </span>
                </div>
                {/* D */}
                <div className="w-[42px] h-[42px] rounded-full bg-[#FCF9F8] flex items-center justify-center shadow-[0px_0px_0px_2.11px_#FFFFFF] relative z-[2]">
                  <span className="font-serif font-bold text-[13px] leading-[17px] text-[#454137]">
                    D
                  </span>
                </div>
                {/* + */}
                <div className="w-[42px] h-[42px] rounded-full bg-[#FCE9EC] flex items-center justify-center shadow-[0px_0px_0px_2.11px_#FFFFFF] relative z-[1]">
                  <span className="font-sans font-bold text-[11px] leading-[16px] text-[#CB485E]">
                    +
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-[4px]">
                <span className="font-serif font-bold text-[20px] leading-[19px] text-[#454545]">
                  250K+
                </span>
                <span className="font-sans font-normal text-[14px] leading-[17px] tracking-[0.32px] text-[#454545]">
                  Cherished Patrons Across India &amp; Abroad
                </span>
              </div>
            </div>
          </div>

          {/* Patrons Section - Mobile */}
          <div className="flex md:hidden items-center gap-[12px] border border-[#FFE4E699] rounded-[16px] px-[14px] py-[10px] w-max bg-[#FFF1F266] mt-[5px]">
            {/* Avatars */}
            <div className="flex items-center -space-x-[6px]">
              <div className="w-[28px] h-[28px] rounded-full bg-[#CB485E] flex items-center justify-center border-[1.5px] border-white relative z-[4]">
                <span className="font-sans font-bold text-[10px] text-white">M</span>
              </div>
              <div className="w-[28px] h-[28px] rounded-full bg-[#D97706] flex items-center justify-center border-[1.5px] border-white relative z-[3]">
                <span className="font-sans font-bold text-[10px] text-white">R</span>
              </div>
              <div className="w-[28px] h-[28px] rounded-full bg-[#FB7185] flex items-center justify-center border-[1.5px] border-white relative z-[2]">
                <span className="font-sans font-bold text-[10px] text-white">D</span>
              </div>
              <div className="w-[28px] h-[28px] rounded-full bg-[#111827] flex items-center justify-center border-[1.5px] border-white relative z-[1]">
                <span className="font-sans font-bold text-[10px] text-white">+</span>
              </div>
            </div>
            {/* Text */}
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[12px] leading-[15px] text-[#111827]">250K+ Cherished Patrons</span>
              <span className="font-sans font-normal text-[10px] leading-[14px] text-[#9CA3AF]">Across India & Abroad</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[590px] relative pb-[8px]">
          {/* Image container with border and shadow */}
          <div
            className="relative w-[calc(100%+16px)] -mx-2 md:mx-0 md:w-full aspect-[590/462] rounded-[20px] md:rounded-[25px] overflow-hidden border-[4px] border-white"
            style={{
              boxShadow: "0px 21.1px 47.47px -15.82px #C96F911F",
            }}
          >
            <Image
              src="/about/about-hero.jpg"
              alt="Miraya Diamonds luxury jewellery"
              fill
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(59, 42, 48, 0.3) 0%, rgba(59, 42, 48, 0) 50%, rgba(59, 42, 48, 0) 100%)",
              }}
            />
          </div>

          {/* Floating card - half inside, half outside image */}
          <div
            className="absolute -bottom-[8px] left-0 md:left-auto md:right-4 flex items-center gap-[12px] px-[19px] py-[12px] rounded-[11px] border-[1.22px] border-[#FCE9EC] z-20"
            style={{
              background: "#FFFDFCD1",
              backdropFilter: "blur(17.14px)",
              boxShadow: "0px 30.61px 61.22px -14.69px #C96F912E",
            }}
          >
            {/* Star icon circle */}
            <div className="w-[39px] h-[39px] rounded-full bg-[#FCE9EC] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.5L12.47 7.03L18.5 7.91L14.25 12.05L15.18 18.05L10 15.27L4.82 18.05L5.75 12.05L1.5 7.91L7.53 7.03L10 1.5Z"
                  fill="#CB485E"
                />
              </svg>
            </div>

            {/* Card text */}
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[14px] md:text-[17px] leading-[20px] tracking-[0.67px] uppercase text-[#454545]">
                CRAFTED WITH PASSION
              </span>
              <span className="font-sans font-normal text-[14px] md:text-[17px] leading-[18px] text-[#757575]">
                Hand-set natural solitaires
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
