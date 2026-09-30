import { ChevronDown } from "lucide-react";

const categories = ["All", "Rings", "Necklace", "Bracelets", "Earrings", "Bangles"];

const faqs = [
  "What materials are your jewellery pieces made from?",
  "How do I choose the right ring/bracelet/necklace size?",
  "How should I care for and maintain my jewellery?",
  "Do you offer returns, exchanges, or refunds?",
  "How long does delivery take, and can I track my order?",
];

export function FaqSection() {
  return (
    <section
      className="w-full py-[60px] px-4 md:px-[97px]"
      style={{ backgroundColor: "#FFFFFFB8" }}
    >
      <div className="w-full max-w-[1243px] mx-auto flex flex-col gap-[30.07px]">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-[5.01px]">
          <h2 className="font-serif font-bold text-[32px] leading-[100%] tracking-[-0.02em] text-black text-center">
            Frequently Asked Question
          </h2>
          <p className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#00000080] text-center">
            Know the answer for your questions
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-[10.02px]">
          {categories.map((cat, idx) => (
            <div
              key={cat}
              className="h-[33.08px] rounded-[84.2px] px-[24.06px] py-[8.02px] text-[14px] leading-[100%] tracking-[-0.02em] text-center font-sans cursor-pointer"
              style={{
                fontWeight: idx === 0 ? 600 : 500,
                backgroundColor: idx === 0 ? "#CB485E" : "#FFFFFF",
                color: idx === 0 ? "#FFFFFF" : "#373737",
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-[10px] max-w-[659px] mx-auto w-full">
          {faqs.map((question, idx) => (
            <div
              key={idx}
              className="w-full rounded-[40px] border-[1.5px] border-[#CB485E] bg-white flex items-center justify-between py-[15px] pr-[18px] pl-[25px]"
            >
              <div className="flex items-center gap-[10px]">
                <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#CB485E]">
                  {idx + 1}.
                </span>
                <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#454545] text-left">
                  {question}
                </span>
              </div>
              <ChevronDown
                className="w-[24px] h-[24px] shrink-0 text-[#CB485E]"
                strokeWidth={1.5}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
