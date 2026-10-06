import Image from "next/image";

const values = [
  {
    iconMobile: "/about/full-star-icon.png",
    iconDesktop: "/about/star-icon.png",
    title: "Exceptional Quality",
    description: "Careful attention to finish and fine materials.",
  },
  {
    iconMobile: "/about/clock-icon.png",
    iconDesktop: "/about/time-icon.png",
    title: "Timeless Design",
    description: "Contemporary today, cherished for generations.",
  },
  {
    iconMobile: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 24 24' fill='%23CB485E' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E",
    iconDesktop: "/about/heart-icon.png",
    title: "Meaningful Craft",
    description: "Celebrate emotions, milestones, and stories that matter.",
  },
  {
    iconMobile: "/about/thumb-icon.png",
    iconDesktop: "/about/thumb-icon.png",
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
          <h2 className="font-serif font-medium md:font-bold text-[26px] md:text-[40px] leading-[32px] md:leading-[50.64px] tracking-[-0.51px] text-[#3B2A30] text-center pt-[6px]">
            What We Believe In
          </h2>
          <p className="font-sans font-light text-[13px] md:text-[14px] leading-[20px] md:leading-[25.32px] text-[#757575] text-center mt-[8px] md:-mt-1 max-w-[320px] md:max-w-none px-[10px] md:px-0">
            The founding pillars that guide every cut, polish, and custom commission.
          </p>
        </div>

        {/* Value Cards */}
        <div className="w-[calc(100%+32px)] -mx-4 px-4 md:w-full md:mx-0 flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-row items-stretch gap-[12px] md:gap-[25px] pb-6 md:pb-0 hide-scrollbar md:pl-0">
          {values.map((value) => (
            <div
              key={value.title}
              className="relative w-[42vw] min-w-[160px] md:min-w-0 md:w-auto md:flex-1 snap-center shrink-0 bg-[#FBF4F6] border-[1.05px] border-[#FCE9EC] rounded-[20px] md:rounded-[25px] flex flex-col items-center pt-[24px] md:pt-[43px] pb-[28px] md:pb-[40px] px-[10px] md:px-[36px]"
              style={{
                boxShadow: "0px 21.1px 47.47px -15.82px #C96F911F",
              }}
            >
              {/* Icon */}
              <div className="w-[44px] h-[44px] md:w-[59px] md:h-[59px] rounded-full md:rounded-[17px] bg-white md:bg-[#FCE9EC] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] md:shadow-none flex items-center justify-center mb-[16px] md:mb-[25px]">
                {/* Mobile Icon */}
                <Image
                  src={value.iconMobile}
                  alt={value.title}
                  width={18}
                  height={18}
                  className="object-contain md:hidden"
                />
                {/* Desktop Icon */}
                <Image
                  src={value.iconDesktop}
                  alt={value.title}
                  width={30}
                  height={30}
                  className="object-contain hidden md:block"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif font-semibold md:font-bold text-[15px] md:text-[24px] leading-[20px] md:leading-[34px] tracking-[-0.25px] text-[#3B2A30] text-center mb-[6px] md:mb-[10.55px]">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-sans font-normal md:font-light text-[12px] md:text-[14px] leading-[17px] md:leading-[20px] text-[#757575] text-center px-[4px] md:px-0">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
