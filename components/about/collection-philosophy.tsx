import { Container } from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Rings",
    badge: "SOLITAIRES",
    description: "Symbols of love, commitment, and individuality.",
    linkText: "VIEW RINGS",
    linkUrl: "#",
    image: "/about/master.jpg",
  },
  {
    title: "Necklaces",
    badge: "PENDANTS",
    description: "Designed to add effortless elegance to every occasion.",
    linkText: "VIEW NECKLACES",
    linkUrl: "#",
    image: "/about/intro.jpg",
  },
  {
    title: "Bracelets & Bangles",
    badge: "BRACELETS",
    description: "Delicate details designed to become part of your everyday story.",
    linkText: "VIEW BRACELETS",
    linkUrl: "#",
    image: "/about/about-hero.jpg",
  },
];

export function CollectionPhilosophy() {
  return (
    <section className="w-full bg-[#FFFFFF] border-t-[1.05px] border-[#E5E7EB] py-10 sm:py-14">
      <Container className="flex flex-col items-center gap-[12px] md:gap-[30px]">
        
        {/* Header - Mobile */}
        <div className="flex md:hidden w-full flex-col mb-0">
          <div className="flex items-center justify-between w-full mb-[6px]">
            <div className="flex items-center gap-[6px]">
              <div className="w-[20px] h-[1px] bg-[#214E34]" />
              <span className="font-inter font-bold text-[10px] tracking-[1.5px] uppercase text-[#214E34]">
                CURATED COLLECTIONS
              </span>
            </div>
            <Link href="/collection" className="font-inter font-bold text-[10px] uppercase text-[#214E34]">
              VIEW ALL →
            </Link>
          </div>
          <h2 className=" font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            Designed for Every Chapter
          </h2>
        </div>

        {/* Header - Desktop */}
        <div className="hidden md:flex w-full max-w-[709px] flex-col items-center pt-[6px]">
          <span className="font-inter font-semibold text-[12px] leading-[16.88px] tracking-[3.16px] uppercase text-[#214E34] text-center mb-[8px]">
            CURATED FOR LIFE&apos;S MOMENTS
          </span>
          <h2 className="text-center mb-[2px] font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            Designed for Every Chapter
          </h2>
          <p className="font-inter text-[#757575] text-center text-sm font-normal leading-6">
            Curated creations crafted to celebrate life&apos;s cherished milestones.
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="w-[calc(100%+32px)] -mx-4 px-4 md:w-full md:mx-0 flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-row items-stretch md:justify-center gap-[12px] md:gap-[33px] pt-[8px] pb-4 md:pb-0 hide-scrollbar">
          {collections.map((item) => (
            <div 
              key={item.title}
              className="w-[72vw] min-w-[260px] md:min-w-0 md:w-auto md:flex-1 snap-center shrink-0 bg-[#FFFFFF] md:bg-[#F7FFF7] border-[1.05px] border-[#E5E7EB] rounded-[16px] md:rounded-[25px] p-0 md:p-[25px] flex flex-col"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-[4/3] md:aspect-[352/337] rounded-t-[16px] md:rounded-[16.88px] overflow-hidden bg-[#FFFFFF] mb-0 md:mb-[25px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Badge */}
                <div 
                  className="absolute top-[12px] right-[12px] py-[2px] px-[6px] md:py-[4px] md:px-[10px] rounded-[4px] md:rounded-full z-10 flex items-center justify-center"
                  style={{
                    background: "#000000B3",
                    backdropFilter: "blur(4.22px)"
                  }}
                >
                  <span className="font-inter font-semibold text-[10px] md:text-xs leading-none md:leading-4 tracking-[0.53px] uppercase text-white mt-[1px] md:mt-0">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center flex-1 p-[20px] md:p-0">
                <h3 className="text-center mb-[8px] md:mb-[8px] font-serif font-semibold leading-tight text-[#353333] text-xl sm:text-[27px]">
                  {item.title}
                </h3>
                <p className="font-inter text-[#6B7280] md:text-[#757575] text-center max-w-[315px] mb-[16px] flex-1 text-sm font-normal leading-6">
                  {item.description}
                </p>
                <Link 
                  href={item.linkUrl}
                  className="inline-flex items-center gap-[4px] group pb-[4px] md:pb-0"
                >
                  <span className="font-inter font-bold md:font-semibold text-[12px] md:text-[14px] leading-[16.88px] tracking-[1.27px] uppercase text-[#214E34]">
                    {item.linkText}
                  </span>
                  <span className="font-inter font-bold md:font-semibold text-[13px] md:text-[16px] leading-[16.88px] tracking-[1.27px] uppercase text-[#214E34] md:text-[#214E34] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Button - Desktop Only (Mobile has View All in Header) */}
        <div className="hidden md:flex w-full justify-center mt-[10px]">
          <Link
            href="/collection"
            className="inline-flex items-center gap-[10px] py-[16px] px-[24px] rounded-full bg-[#214E34] shadow-sm"
          >
            <span className="font-inter font-semibold text-[14px] leading-[16px] text-white">
              Explore All Collections
            </span>
            <span className="font-inter font-semibold text-[16px] leading-[16.88px] tracking-[1.27px] text-white">
              →
            </span>
          </Link>
        </div>

      </Container>
    </section>
  );
}
