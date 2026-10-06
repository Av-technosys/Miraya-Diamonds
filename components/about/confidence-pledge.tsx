import Image from "next/image";

const pledgeCards = [
  {
    icon: "/about/shield-icon.png",
    title: "Diamond Certification",
    desc: "IGI & GIA laboratory certified solitaires with unique laser inscriptions.",
  },
  {
    icon: "/about/shining-star-icon.png",
    title: "Quality Assurance",
    desc: "100% BIS Hallmarked 750 (18KT) and 950 Platinum fineness guaranteed.",
  },
  {
    icon: "/about/lock-icon.png",
    title: "Secure Packaging",
    desc: "Tamper-evident vault boxes & insured armored doorstep transit.",
  },
  {
    icon: "/about/circular-icon.png",
    title: "Trusted Service",
    desc: "Complimentary lifetime ultrasonic cleaning & verified exchange policy.",
  },
];

export function ConfidencePledge() {
  return (
    <section className="w-full bg-[#FCF9F8] md:bg-[#FFFDFC] border-b-[1.05px] border-[#FCE9EC] pt-[20px] md:pt-[30px] pb-[20px] md:pb-[60px]">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 flex flex-col gap-[16px] md:gap-[30px]">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-[4px] md:gap-[15px]">
          <h2 className="font-serif font-medium md:font-bold text-[28px] md:text-[40px] leading-[32px] md:leading-[37.98px] tracking-[-0.32px] text-[#111827] md:text-[#454545] text-center">
            Confidence in Every Sparkle
          </h2>
          <p className="font-sans font-light text-[13px] md:text-[14px] leading-[18px] md:leading-[16.88px] text-[#9CA3AF] md:text-[#757575] text-center">
            Our unconditional pledge of purity & protection
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[33px] mt-[12px] md:mt-[10px] pb-4 md:pb-0 hide-scrollbar">
          {pledgeCards.map((card) => (
            <div 
              key={card.title}
              className="w-[280px] md:w-auto snap-center shrink-0 flex flex-col items-center bg-[#FFFDFC] md:bg-[#FCF9F8] border-[1px] border-[#FCE9EC] md:border-[1.05px] rounded-[16px] md:rounded-[16.88px] p-[24px] md:p-[25.32px]"
            >
              
              {/* Icon */}
              <div className="w-[50.64px] h-[50.64px] rounded-full bg-[#FCE9EC] flex items-center justify-center mb-[16.88px]">
                <div className="relative w-[25px] h-[25px]">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill
                    className="object-contain"
                    sizes="25px"
                  />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="font-serif font-medium md:font-semibold text-[22px] md:text-[24px] leading-[28px] md:leading-[30px] text-[#111827] md:text-[#454545] text-center mb-[8px] md:mb-[4px]">
                {card.title}
              </h3>
              <p className="font-sans font-light md:font-normal text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#6B7280] md:text-[#757575] text-center">
                {card.desc}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
