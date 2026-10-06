import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";

export function TestimonialsHero() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 pt-[13px] md:pt-[40px]">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#757575]">
              Home
            </span>
            <ChevronRight className="w-[12px] h-[12px] text-[#CB485E]" strokeWidth={2.5} />
            <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#757575]">
              Testimonials
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative mt-[6px] flex flex-col lg:flex-row justify-between items-start">

          {/* Left Hero Content */}
          <div className="w-full lg:w-[553px] pt-[16px] md:pt-[32px] flex flex-col gap-[12px] md:gap-[27px]">
            {/* Top Content */}
            <div className="flex flex-col gap-[8px] md:gap-[20px] max-w-[553px]">
              {/* Badge */}
              <div className="flex">
                <div className="bg-[#FCE9EC] rounded-full px-[10px] md:px-[13.5px] py-[3px] md:py-[4.5px] flex items-center justify-center">
                  <span className="font-sans font-semibold text-[10px] md:text-[12px] leading-[18px] text-[#CB485E] uppercase">
                    Customer Stories
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="flex flex-col gap-0">
                <span className="font-serif font-bold text-[32px] md:text-[64px] leading-[34px] md:leading-[63px] text-[#454545] block" style={{ letterSpacing: "-1.57px" }}>
                  Loved, Worn &
                </span>
                <span className="font-serif font-bold italic text-[32px] md:text-[64px] leading-[34px] md:leading-[72px] text-[#CB485E] block mt-[-4px] md:mt-0" style={{ letterSpacing: "-1.57px" }}>
                  Cherished
                </span>
              </h1>

              {/* Description */}
              <p className="font-sans font-normal text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#757575] max-w-[553px] mt-[4px] md:mt-0">
                Real stories. Real moments. Real people. Discover how our jewellery becomes a part of life&apos;s most beautiful chapters.
              </p>
            </div>

            {/* Rating Badge */}
            <div className="flex items-center gap-[8px] md:gap-[13.5px] w-fit border md:border-none border-[#EDE5E1] rounded-[12px] md:rounded-none px-[16px] md:px-0 py-[12px] md:py-0 shadow-sm md:shadow-none bg-white md:bg-transparent mt-[4px] md:mt-0">
              {/* Rating Number */}
              <span className="font-sans font-bold text-[18px] md:text-[24px] leading-[22px] md:leading-[27px] text-[#252220]">
                4.9/5
              </span>

              {/* 5 Stars */}
              <div className="flex items-center gap-[2px] md:gap-[4.5px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-[12px] h-[12px] md:w-[16.1px] md:h-[15.35px] text-[#FFB922] fill-[#FFB922]"
                    strokeWidth={0}
                    style={{ borderRadius: "0.5px" }}
                  />
                ))}
              </div>

              {/* Verified Reviews Text */}
              <span className="font-sans font-normal text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] text-[#7A726E]">
                from 1,200+ verified reviews
              </span>
            </div>
          </div>

          {/* Right Hero Editorial Visual */}
          <div className="relative w-full lg:w-[588px] mt-[8px] lg:mt-0">
            {/* Background + Image */}
            <div
              className="relative w-full h-[260px] md:h-[346px] rounded-[16px] md:rounded-[15.89px] bg-[#F3ECE8] overflow-hidden"
              style={{ boxShadow: "0px 0.99px 1.99px 0px rgba(0,0,0,0.05)" }}
            >
              <Image
                src="/testimonials/hero.jpg"
                alt="Solitaire diamond rings and fine rose gold jewellery"
                fill
                className="object-cover"
              />

              {/* Right Gradient Overlay */}
              <div
                className="absolute top-0 right-0 w-full md:w-[588px] h-full pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(250,247,246,0.4) 100%)",
                }}
              />

              {/* Editorial Floating Typography Card */}
              <div
                className="absolute bottom-[16px] md:bottom-[30px] right-[16px] md:right-[20px] flex flex-col gap-[6px] md:gap-[7.95px] pt-[12px] md:pt-[15.89px] pr-[16px] md:pr-[23.84px] pb-[12px] md:pb-[15.89px] pl-[16px] md:pl-[23.84px] rounded-[6px] md:rounded-[7.95px] border-[0.99px] border-[#EDE5E1] bg-[#FFFFFFF2]"
                style={{
                  boxShadow: "0px 0.99px 1.99px 0px rgba(0,0,0,0.05)",
                  backdropFilter: "blur(3.97px)",
                }}
              >
                <p className="font-sans font-medium text-[8px] md:text-xs leading-[12px] md:leading-[16.14px] tracking-[1.5px] md:tracking-[2.48px] text-[#554E4A] text-right uppercase w-[70px] md:w-[86px]">
                  MORE THAN JEWELLERY A PART OF YOUR STORY
                </p>
                {/* Horizontal Divider */}
                <div className="w-[20px] md:w-[31.78px] h-[1.5px] md:h-[1.99px] bg-[#A8354C] self-end" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
