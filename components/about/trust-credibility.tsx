import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    num: "01",
    title: "Authentic Craftsmanship",
    desc: "Generational Jaipur & Mumbai artisan karigari with heirloom precision.",
    img: "/about/aurora-img1.jpg",
  },
  {
    num: "02",
    title: "Thoughtful Design",
    desc: "Ergonomically contoured fine jewellery made for daily grace.",
    img: "/about/aurora-img2.jpg",
  },
  {
    num: "03",
    title: "Premium Experience",
    desc: "Dedicated 1-on-1 virtual consultations & white-glove styling.",
    img: "/about/aurora-img3.jpg",
  },
  {
    num: "04",
    title: "Made for Milestones",
    desc: "Bespoke laser engravings and personalized celebration keepsakes.",
    img: "/about/aurora-img4.jpg",
  },
];

export function TrustAndCredibility() {
  return (
    <section className="w-full bg-[#FFFDFC] border-t-[1.05px] border-b-[1.05px] border-[#FCE9EC] pt-[20px] md:pt-[40px] pb-[20px] md:pb-[60px]">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 flex flex-col gap-[24px] md:gap-[30px]">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-[4px] md:gap-[15px]">
          <h2 className="font-serif font-medium md:font-bold text-[32px] md:text-[40px] leading-[36px] md:leading-[37.98px] tracking-[-0.32px] text-[#111827] md:text-[#454545] text-center">
            The Miraya Difference
          </h2>
          <p className="font-sans font-light text-[14px] leading-[20px] md:leading-[25.32px] text-[#6B7280] md:text-[#757575] text-center mb-0">
            A more meaningful tomorrow in fine diamond craft.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[28px] mt-0 md:mt-[10px] pb-4 md:pb-0 hide-scrollbar">
          {cards.map((card) => (
            <div 
              key={card.num}
              className="w-[280px] md:w-auto snap-center shrink-0 bg-white border-[1px] border-[#EDE3DC66] rounded-[16px] md:rounded-[12px] p-0 md:p-[12px] flex flex-col justify-between group"
              style={{ boxShadow: "0px 8px 25px 0px rgba(0, 0, 0, 0.05)" }}
            >
              
              {/* Top Section */}
              <div className="flex flex-col gap-0 md:gap-[8px]">
                {/* Image */}
                <div className="relative w-full aspect-[263/175] bg-[#F3EDE8] rounded-t-[16px] md:rounded-[8px] overflow-hidden">
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
                  <span className="font-sans font-medium text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] tracking-[0.35px] text-[#CB485E] mb-[4px] md:mb-[2px]">
                    {card.num}
                  </span>
                  <h3 className="font-serif font-medium md:font-semibold text-[22px] md:text-[24px] leading-[26px] md:leading-[33px] text-[#111827] md:text-[#454545] mb-[6px] md:mb-[4px]">
                    {card.title}
                  </h3>
                  <p className="font-sans font-light md:font-normal text-[13px] md:text-[14px] leading-[18px] md:leading-[16px] text-[#6B7280] md:text-[#757575] h-[40px] md:h-[35px]">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="w-full flex items-center justify-between mt-[16px] md:mt-[24px] pb-[16px] md:pb-0 pt-0 md:pt-[14px] px-[16px] md:px-[4px]">
                <Link href="#" className="flex items-center gap-[6px]">
                  <span className="font-sans font-semibold text-[11px] leading-[16.5px] tracking-[1.76px] uppercase text-[#CB485E]">
                    LEARN MORE
                  </span>
                  <span className="font-sans font-bold text-[11px] leading-[16.5px] tracking-[1.76px] uppercase text-[#CB485E]">
                    →
                  </span>
                </Link>
                
                <div className="w-[36px] h-[36px] rounded-full bg-[#FCE9EC] flex items-center justify-center shrink-0">
                  <svg 
                    width="12" 
                    height="10" 
                    viewBox="0 0 12 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-[2px]"
                  >
                    <path d="M1 5H11M11 5L7 1M11 5L7 9" stroke="#CB485E" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
