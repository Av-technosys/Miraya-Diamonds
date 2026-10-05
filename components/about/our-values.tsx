import Image from "next/image";

const values = [
  {
    icon: "/about/star-icon.png",
    title: "Exceptional Quality",
    description: "Careful attention to finish and fine materials.",
  },
  {
    icon: "/about/time-icon.png",
    title: "Timeless Design",
    description: "Contemporary today, cherished for generations.",
  },
  {
    icon: "/about/heart-icon.png",
    title: "Meaningful Craft",
    description: "Celebrate emotions, milestones, and stories that matter.",
  },
  {
    icon: "/about/thumb-icon.png",
    title: "Customer First",
    description: "From discovery to delivery, a memorable experience.",
  },
];

export function OurValues() {
  return (
    <section className="w-full bg-[#FFFDFC] border-t-[1.05px] border-[#F3E5EC] pt-[40px] pb-[40px] md:py-[60px]">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 flex flex-col items-center gap-[30px] md:gap-[50px]">
        {/* Header */}
        <div className="flex flex-col items-center pt-[6px] max-w-[709px]">
          <span className="font-sans font-semibold text-[13px] leading-[17px] tracking-[3.16px] uppercase text-[#CB485E] text-center">
            THE PILLARS OF MIRAYA
          </span>
          <h2 className="font-serif font-medium md:font-bold text-[28px] md:text-[40px] leading-[36px] md:leading-[50.64px] tracking-[-0.51px] text-[#3B2A30] text-center pt-[2.64px]">
            What We Believe In
          </h2>
          <p className="font-sans font-light text-[13px] md:text-[14px] leading-[20px] md:leading-[25.32px] text-[#757575] text-center mt-[4px] md:-mt-1 max-w-[280px] md:max-w-none">
            The founding pillars that guide every cut, polish, and custom commission.
          </p>
        </div>

        {/* Value Cards */}
        <div className="w-full flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-row items-stretch gap-[16px] md:gap-[25px] pb-4 md:pb-0 hide-scrollbar pl-4 md:pl-0">
          {values.map((value) => (
            <div
              key={value.title}
              className="relative min-w-[180px] md:min-w-0 flex-1 snap-center shrink-0 bg-[#FBF4F6] border-[1.05px] border-[#FCE9EC] rounded-[20px] md:rounded-[25px] flex flex-col items-center pt-[20px] md:pt-[43px] pb-[20px] md:pb-[40px] px-[16px] md:px-[36px]"
              style={{
                boxShadow: "0px 21.1px 47.47px -15.82px #C96F911F",
              }}
            >
              {/* Icon */}
              <div className="w-[59px] h-[59px] rounded-[17px] bg-[#FCE9EC] flex items-center justify-center mb-[25px]">
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-[16px] md:text-[24px] leading-[22px] md:leading-[34px] tracking-[-0.25px] text-[#3B2A30] text-center mb-[8px] md:mb-[10.55px]">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-sans font-light text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] text-[#757575] text-center max-w-[209px]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
