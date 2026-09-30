import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";

export function TestimonialsHero() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 pt-[30px]">

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
        <div className="relative mt-[16px] flex flex-col lg:flex-row justify-between items-start">

          {/* Left Hero Content */}
          <div className="w-full lg:w-[553px] pt-[32px] flex flex-col gap-[27px]">
            {/* Top Content */}
            <div className="flex flex-col gap-[20px] max-w-[553px]">
              {/* Badge */}
              <div className="flex">
                <div className="bg-[#FCE9EC] rounded-full px-[13.5px] py-[4.5px] flex items-center justify-center">
                  <span className="font-sans font-semibold text-[12px] leading-[18px] text-[#CB485E] uppercase">
                    Customer Stories
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1>
                <span className="font-serif font-bold text-[64px] leading-[63px] text-[#454545] block" style={{ letterSpacing: "-1.57px" }}>
                  Loved, Worn &
                </span>
                <span className="font-serif font-bold italic text-[64px] leading-[72px] text-[#CB485E] block" style={{ letterSpacing: "-1.57px" }}>
                  Cherished
                </span>
              </h1>

              {/* Description */}
              <p className="font-sans font-normal text-[14px] leading-[20px] text-[#757575] max-w-[553px]">
                Real stories. Real moments. Real people. Discover how our jewellery becomes a part of  life's most beautiful chapters.
              </p>
            </div>

            {/* Rating Badge */}
            <div className="flex items-center gap-[13.5px] pt-[9px]">
              {/* Rating Number */}
              <span className="font-sans font-bold text-[24px] leading-[27px] text-[#252220]">
                4.9/5
              </span>

              {/* 5 Stars */}
              <div className="flex items-center gap-[4.5px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-[16.1px] h-[15.35px] text-[#FFB922] fill-[#FFB922]"
                    strokeWidth={0}
                    style={{ borderRadius: "0.5px" }}
                  />
                ))}
              </div>

              {/* Verified Reviews Text */}
              <span className="font-sans font-normal text-[14px] leading-[18px] text-[#7A726E]">
                from 1,200+ verified reviews
              </span>
            </div>
          </div>

          {/* Right Hero Editorial Visual */}
          <div className="relative w-full lg:w-[588px] mt-8 lg:mt-0">
            {/* Background + Image */}
            <div
              className="relative w-full h-[346px] rounded-[15.89px] bg-[#F3ECE8] overflow-hidden"
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
                className="absolute top-0 right-0 w-[588px] h-[295px] pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(250,247,246,0.4) 100%)",
                }}
              />

              {/* Editorial Floating Typography Card */}
              <div
                className="absolute bottom-[30px] right-[20px] flex flex-col gap-[7.95px] pt-[15.89px] pr-[23.84px] pb-[15.89px] pl-[23.84px] rounded-[7.95px] border-[0.99px] border-[#EDE5E1] bg-[#FFFFFFF2]"
                style={{
                  boxShadow: "0px 0.99px 1.99px 0px rgba(0,0,0,0.05)",
                  backdropFilter: "blur(3.97px)",
                }}
              >
                <p className="font-sans font-medium text-[9.93px] leading-[16.14px] tracking-[2.48px] text-[#554E4A] text-right uppercase w-[86px]">
                  MORE THAN JEWELLERY A PART OF YOUR STORY
                </p>
                {/* Horizontal Divider */}
                <div className="w-[31.78px] h-[1.99px] bg-[#A8354C] self-end" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
