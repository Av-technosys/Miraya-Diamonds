import { Container } from "@/components/common/container";
import { Gem, Clock, Heart, ThumbsUp } from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "Exceptional Quality",
    description: "Careful attention to finish and fine materials.",
  },
  {
    icon: Clock,
    title: "Timeless Design",
    description: "Contemporary today, cherished for generations.",
  },
  {
    icon: Heart,
    title: "Meaningful Craft",
    description: "Celebrate emotions, milestones, and stories that matter.",
  },
  {
    icon: ThumbsUp,
    title: "Customer First",
    description: "From discovery to delivery, a memorable experience.",
  },
];

export function OurValues() {
  return (
    <section className="w-full bg-[#FFFFFF] border-t-[1.05px] border-[#E5E7EB] py-10 sm:py-14">
      <Container className="flex flex-col items-center gap-[30px] md:gap-[50px]">
        {/* Header */}
        <div className="flex flex-col items-center pt-[6px] max-w-[709px]">
          <span className="font-inter font-semibold text-[13px] leading-[17px] tracking-[3.16px] uppercase text-[#214E34] text-center">
            THE PILLARS OF MIRAYA
          </span>
          <h2 className="text-center pt-[6px] font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            What We Believe In
          </h2>
          <p className="font-inter text-[#757575] text-center mt-[8px] md:-mt-1 max-w-[320px] md:max-w-none px-[10px] md:px-0 text-sm font-normal leading-6">
            The founding pillars that guide every cut, polish, and custom commission.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="relative min-w-0 bg-[#F7FFF7] border-[1.05px] border-[#F7FFF7] rounded-[20px] md:rounded-[25px] flex flex-col items-center pt-[24px] md:pt-[43px] pb-[28px] md:pb-[40px] px-5"
              style={{
                boxShadow: "0px 21.1px 47.47px -15.82px #214E340F",
              }}
            >
              {/* Icon */}
              <div className="w-[44px] h-[44px] md:w-[59px] md:h-[59px] rounded-full md:rounded-[17px] bg-white md:bg-[#F7FFF7] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] md:shadow-none flex items-center justify-center mb-[16px] md:mb-[25px]">
                <value.icon className="size-6 text-[#214E34]" strokeWidth={1.5} aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-center font-serif font-semibold leading-tight text-[#353333] text-xl sm:text-[27px]">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-[#757575] text-center px-[4px] md:px-0 text-sm font-normal leading-6">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
