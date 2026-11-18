import { Container } from "@/components/common/container";
import { ShieldCheck, Sparkles, LockKeyhole, RefreshCw } from "lucide-react";

const pledgeCards = [
  {
    icon: ShieldCheck,
    title: "Diamond Documentation",
    desc: "Ask our team about the grading report and origin of your selected diamond.",
  },
  {
    icon: Sparkles,
    title: "Metal Details",
    desc: "Review the metal, purity and hallmark details for your chosen piece.",
  },
  {
    icon: LockKeyhole,
    title: "Delivery Guidance",
    desc: "Contact our team to confirm packaging and delivery arrangements before ordering.",
  },
  {
    icon: RefreshCw,
    title: "Trusted Service",
    desc: "Get guidance on jewellery care, servicing and the terms that apply to your piece.",
  },
];

export function ConfidencePledge() {
  return (
    <section className="w-full bg-[#F7FFF7] md:bg-[#FFFFFF] border-b-[1.05px] border-[#F7FFF7] py-10 sm:py-14">
      <Container className="flex flex-col gap-[16px] md:gap-[30px]">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-[4px] md:gap-[15px]">
          <h2 className="text-center font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            Confidence in Every Sparkle
          </h2>
          <p className="font-inter text-[#9CA3AF] md:text-[#757575] text-center text-sm font-normal leading-6">
            Details to help you choose with confidence
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[33px] mt-[12px] md:mt-[10px] pb-4 md:pb-0 hide-scrollbar">
          {pledgeCards.map((card) => (
            <div 
              key={card.title}
              className="w-[280px] md:w-auto snap-center shrink-0 flex flex-col items-center bg-[#FFFFFF] md:bg-[#F7FFF7] border-[1px] border-[#F7FFF7] md:border-[1.05px] rounded-[16px] md:rounded-[16.88px] p-[24px] md:p-[25.32px]"
            >
              
              {/* Icon */}
              <div className="w-[50.64px] h-[50.64px] rounded-full bg-[#F7FFF7] flex items-center justify-center mb-[16.88px]">
                <card.icon className="size-6 text-[#214E34]" strokeWidth={1.5} aria-hidden="true" />
              </div>

              {/* Text Content */}
              <h3 className="text-center mb-[8px] md:mb-[4px] font-serif font-semibold leading-tight text-[#353333] text-xl sm:text-[27px]">
                {card.title}
              </h3>
              <p className="font-inter text-[#6B7280] md:text-[#757575] text-center text-sm font-normal leading-6">
                {card.desc}
              </p>
              
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
