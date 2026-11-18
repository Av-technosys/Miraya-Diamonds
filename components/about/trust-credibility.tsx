import { Container } from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    num: "01",
    title: "Authentic Craftsmanship",
    desc: "Fine details and carefully considered finishes that celebrate the art of jewellery.",
    img: "/about/aurora-img1.jpg",
  },
  {
    num: "02",
    title: "Thoughtful Design",
    desc: "Considered silhouettes and fine details for a style that feels personal.",
    img: "/about/aurora-img2.jpg",
  },
  {
    num: "03",
    title: "Premium Experience",
    desc: "Personal guidance to help you explore designs and choose a piece with confidence.",
    img: "/about/aurora-img3.jpg",
  },
  {
    num: "04",
    title: "Made for Milestones",
    desc: "Personal design ideas inspired by the moments you want to celebrate.",
    img: "/about/aurora-img4.jpg",
  },
];

export function TrustAndCredibility() {
  return (
    <section className="w-full bg-[#FFFFFF] border-t-[1.05px] border-b-[1.05px] border-[#F7FFF7] py-10 sm:py-14">
      <Container className="flex flex-col gap-[24px] md:gap-[30px]">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-[4px] md:gap-[15px]">
          <h2 className="text-center font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            The Miraya Difference
          </h2>
          <p className="font-inter text-[#6B7280] md:text-[#757575] text-center mb-0 text-sm font-normal leading-6">
            Thoughtful details. Personal meaning. Lasting style.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[28px] mt-0 md:mt-[10px] pb-4 md:pb-0 hide-scrollbar">
          {cards.map((card) => (
            <div 
              key={card.num}
              className="w-[280px] md:w-auto snap-center shrink-0 bg-white border-[1px] border-[#E5E7EB] rounded-[16px] md:rounded-[12px] p-0 md:p-[12px] flex flex-col justify-between group"
              style={{ boxShadow: "0px 8px 25px 0px rgba(0, 0, 0, 0.05)" }}
            >
              
              {/* Top Section */}
              <div className="flex flex-col gap-0 md:gap-[8px]">
                {/* Image */}
                <div className="relative w-full aspect-[263/175] bg-[#F7FFF7] rounded-t-[16px] md:rounded-[8px] overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 263px"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col pt-[16px] px-[16px] md:px-[4px]">
                  <span className="font-inter font-medium text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] tracking-[0.35px] text-[#214E34] mb-[4px] md:mb-[2px]">
                    {card.num}
                  </span>
                  <h3 className="mb-[6px] md:mb-[4px] font-serif font-semibold leading-tight text-[#353333] text-xl sm:text-[27px]">
                    {card.title}
                  </h3>
                  <p className="font-inter text-[#6B7280] md:text-[#757575]  text-sm font-normal leading-6">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="w-full flex items-center justify-between mt-[16px] md:mt-[24px] pb-[16px] md:pb-0 pt-0 md:pt-[14px] px-[16px] md:px-[4px]">
                <Link href="#" className="flex items-center gap-[6px]">
                  <span className="font-inter font-semibold text-[11px] leading-[16.5px] tracking-[1.76px] uppercase text-[#214E34]">
                    LEARN MORE
                  </span>
                  <span className="font-inter font-bold text-[11px] leading-[16.5px] tracking-[1.76px] uppercase text-[#214E34]">
                    →
                  </span>
                </Link>
                
                <div className="w-[36px] h-[36px] rounded-full bg-[#F7FFF7] flex items-center justify-center shrink-0">
                  <svg 
                    width="12" 
                    height="10" 
                    viewBox="0 0 12 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-[2px]"
                  >
                    <path d="M1 5H11M11 5L7 1M11 5L7 9" stroke="#214E34" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
