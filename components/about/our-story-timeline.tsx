import Image from "next/image";

const timelineSteps = [
  { num: "01", title: "Vision", sub: "Sketches", highlighted: false },
  { num: "02", title: "Craft", sub: "Karigari", highlighted: false },
  { num: "03", title: "Detail", sub: "Precision", highlighted: false },
  { num: "04", title: "You", sub: "Heirloom", highlighted: true },
];

export function OurStoryAndTimeline() {
  return (
    <section className="w-full bg-[#FCF9F8] border-t-[1.05px] border-[#F3E5EC] py-[30px]">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-[60px]">

        {/* Left Content */}
        <div className="w-full lg:w-[598px] flex flex-col gap-[21px]">
          {/* Label */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[34px] h-[1px] bg-[#CB485E]" />
            <span className="font-sans font-semibold text-[12px] leading-[17px] tracking-[3.16px] uppercase text-[#CB485E]">
              ORIGIN &amp; HERITAGE
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif font-bold text-[32px] md:text-[40px] leading-[42.2px] text-[#454545]">
            The Story Behind <span className="text-[#CB485E]">Miraya</span>
          </h2>

          {/* Description */}
          <p className="font-sans font-light text-[14px] leading-[20px] text-[#757575] max-w-[595px]">
            Miraya Diamonds was created with a simple vision — to bring together the brilliance of exceptional diamonds with thoughtful design and timeless craftsmanship. Our journey is driven by a passion for creating jewellery that feels personal, sophisticated, and effortlessly beautiful.
          </p>

          <p className="font-sans font-light text-[14px] leading-[20px] text-[#757575] max-w-[595px]">
            From the first sketch to the final polish, every detail is carefully considered to create pieces celebrating life&apos;s most meaningful milestones.
          </p>

          {/* OUR CREATIVE JOURNEY */}
          <div className="flex flex-col gap-[12.66px] pt-[17px]">
            <span className="font-sans font-bold text-[12px] leading-[17px] tracking-[1.27px] uppercase text-[#454545]">
              OUR CREATIVE JOURNEY
            </span>

            {/* Timeline cards */}
            <div className="flex items-center gap-[10.55px]">
              {timelineSteps.map((step) => (
                <div
                  key={step.num}
                  className={`flex flex-col items-center gap-[2px] w-[142px] pt-[21px] pr-[15px] pb-[15px] pl-[15px] rounded-[13px] border-[1.05px] ${
                    step.highlighted
                      ? "bg-[#F7E6ECCC] border-[#FF86B466]"
                      : "bg-[#FFFDFC] border-[#F3E5EC]"
                  }`}
                  style={{
                    boxShadow: "0px 10.55px 31.65px -10.55px #3B2A300D",
                  }}
                >
                  <span className="font-serif font-bold text-[20px] leading-[17px] text-[#CB485E] text-center">
                    {step.num}
                  </span>
                  <div className="pt-[2px]">
                    <span className="font-serif font-bold text-[16px] leading-[21px] tracking-[-0.15px] text-[#454545] text-center block">
                      {step.title}
                    </span>
                  </div>
                  <span className={`font-sans text-[12px] leading-[16px] text-[#CB485E] text-center ${step.highlighted ? "font-medium" : "font-normal"}`}>
                    {step.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[582px] relative pb-[25px]">
          {/* Image with border */}
          <div className="relative w-full aspect-[582/489] rounded-[12px] overflow-hidden border-[1.05px] border-[#FCE9EC]">
            <Image
              src="/about/master.jpg"
              alt="Master artisan jeweller setting diamond into rose gold ring"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 582px"
            />
          </div>

          {/* Floating card - HANDMADE IN INDIA */}
          <div
            className="absolute bottom-0 right-[16px] flex items-center gap-[12.66px] p-[17px] rounded-[17px] border-[1.05px] border-[#FCE9EC] max-w-[264px] z-20"
            style={{
              background: "#FFFDFCD1",
              backdropFilter: "blur(14.77px)",
              boxShadow: "0px 26.37px 52.75px -12.66px #C96F912E",
            }}
          >
            {/* Tick icon circle */}
            <div className="w-[34px] h-[34px] rounded-full bg-[#FCE9EC] flex items-center justify-center shrink-0">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6.5L5.5 10L11 3"
                  stroke="#CB485E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Card text */}
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[12px] leading-[17px] tracking-[0.58px] uppercase text-[#454545]">
                HANDMADE IN INDIA
              </span>
              <span className="font-sans font-normal text-[12px] leading-[16px] text-[#757575]">
                Where generational karigars shape timeless brilliance
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
