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
    <section className="w-full bg-[#FFFDFC] border-t-[1.05px] border-[#F3E5EC] pt-[40px] pb-[10px] md:pb-[40px] md:pt-[60px]">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 flex flex-col items-center gap-[12px] md:gap-[30px]">
        
        {/* Header - Mobile */}
        <div className="flex md:hidden w-full flex-col mb-0">
          <div className="flex items-center justify-between w-full mb-[6px]">
            <div className="flex items-center gap-[6px]">
              <div className="w-[20px] h-[1px] bg-[#CB485E]" />
              <span className="font-sans font-bold text-[9px] tracking-[1.5px] uppercase text-[#CB485E]">
                CURATED COLLECTIONS
              </span>
            </div>
            <Link href="/collections" className="font-sans font-bold text-[9px] uppercase text-[#CB485E]">
              VIEW ALL →
            </Link>
          </div>
          <h2 className="font-serif font-medium text-[26px] leading-[30px] tracking-[-0.38px] text-[#111827]">
            Designed for Every Chapter
          </h2>
        </div>

        {/* Header - Desktop */}
        <div className="hidden md:flex w-full max-w-[709px] flex-col items-center pt-[6px]">
          <span className="font-sans font-semibold text-[12px] leading-[16.88px] tracking-[3.16px] uppercase text-[#C96F91] text-center mb-[8px]">
            CURATED FOR LIFE&apos;S MOMENTS
          </span>
          <h2 className="font-serif font-bold text-[32px] md:text-[40px] leading-[50.64px] tracking-[-0.51px] text-[#3B2A30] text-center mb-[2px]">
            Designed for Every Chapter
          </h2>
          <p className="font-sans font-light text-[14px] leading-[25.32px] text-[#757575] text-center">
            Curated creations crafted to celebrate life&apos;s cherished milestones.
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="w-[calc(100%+32px)] -mx-4 px-4 md:w-full md:mx-0 flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-row items-stretch md:justify-center gap-[12px] md:gap-[33px] pt-[8px] pb-4 md:pb-0 hide-scrollbar">
          {collections.map((item) => (
            <div 
              key={item.title}
              className="w-[72vw] min-w-[260px] md:min-w-0 md:w-auto md:flex-1 snap-center shrink-0 bg-[#FFFDFC] md:bg-[#FCF9F8] border-[1.05px] border-[#F3E5EC] rounded-[16px] md:rounded-[25px] p-0 md:p-[25px] flex flex-col"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-[4/3] md:aspect-[352/337] rounded-t-[16px] md:rounded-[16.88px] overflow-hidden bg-[#FFFDFC] mb-0 md:mb-[25px]">
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
                  <span className="font-sans font-semibold text-[9px] md:text-[10.55px] leading-none md:leading-[15.82px] tracking-[0.53px] uppercase text-white mt-[1px] md:mt-0">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center flex-1 p-[20px] md:p-0">
                <h3 className="font-serif font-bold md:font-bold text-[20px] md:text-[24px] leading-[26px] md:leading-[33.76px] tracking-[-0.25px] text-[#111827] md:text-[#3B2A30] text-center mb-[8px] md:mb-[8px]">
                  {item.title}
                </h3>
                <p className="font-sans font-light md:font-normal text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#6B7280] md:text-[#806A72] text-center max-w-[315px] mb-[16px] flex-1">
                  {item.description}
                </p>
                <Link 
                  href={item.linkUrl}
                  className="inline-flex items-center gap-[4px] group pb-[4px] md:pb-0"
                >
                  <span className="font-sans font-bold md:font-semibold text-[12px] md:text-[14px] leading-[16.88px] tracking-[1.27px] uppercase text-[#CB485E]">
                    {item.linkText}
                  </span>
                  <span className="font-sans font-bold md:font-semibold text-[13px] md:text-[16px] leading-[16.88px] tracking-[1.27px] uppercase text-[#CB485E] md:text-[#C96F91] transition-transform group-hover:translate-x-1">
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
            href="/collections"
            className="inline-flex items-center gap-[10px] py-[16px] px-[24px] rounded-full bg-[#CB485E] shadow-sm"
          >
            <span className="font-sans font-semibold text-[14px] leading-[16px] text-white">
              Explore All Collection
            </span>
            <span className="font-sans font-semibold text-[16px] leading-[16.88px] tracking-[1.27px] text-white">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
