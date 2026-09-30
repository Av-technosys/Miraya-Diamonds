"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const categories = ["All", "Rings", "Necklace", "Bracelets", "Earrings", "Bangles"];

const faqs = [
  {
    question: "What materials are your jewellery pieces made from?",
    answer: "Our jewellery is crafted using 18KT and 22KT BIS hallmarked gold, platinum, and natural diamonds certified by IGI and GIA. We source only ethically mined gemstones and conflict-free diamonds.",
  },
  {
    question: "How do I choose the right ring/bracelet/necklace size?",
    answer: "We provide a comprehensive size guide on each product page. You can also request a complimentary sizing kit delivered to your doorstep, or visit our studio for an in-person fitting with our experts.",
  },
  {
    question: "How should I care for and maintain my jewellery?",
    answer: "Store your jewellery in the provided velvet pouch or box. Avoid contact with perfumes, lotions, and harsh chemicals. Clean gently with a soft cloth. We also offer complimentary professional cleaning and polishing services.",
  },
  {
    question: "Do you offer returns, exchanges, or refunds?",
    answer: "Yes, we offer a 15-day return and exchange policy on all non-customized pieces. Custom and bespoke pieces are non-returnable. Refunds are processed within 7–10 business days after inspection.",
  },
  {
    question: "How long does delivery take, and can I track my order?",
    answer: "Standard delivery takes 5–7 business days across India. Express delivery is available in select cities within 2–3 days. All orders are fully insured and come with real-time tracking via SMS and email.",
  },
];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="h-[33.08px] rounded-[84.2px] px-[24.06px] py-[8.02px] text-[14px] leading-[100%] tracking-[-0.02em] text-center font-sans cursor-pointer transition-colors duration-300"
              style={{
                fontWeight: activeCategory === cat ? 600 : 500,
                backgroundColor: activeCategory === cat ? "#CB485E" : "#FFFFFF",
                color: activeCategory === cat ? "#FFFFFF" : "#373737",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-[10px] max-w-[659px] mx-auto w-full">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="w-full rounded-[20px] border-[1.5px] border-[#CB485E] bg-white overflow-hidden transition-all duration-300"
            >
              {/* Question Row */}
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between py-[15px] pr-[18px] pl-[25px] cursor-pointer"
              >
                <div className="flex items-center gap-[10px]">
                  <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#CB485E]">
                    {idx + 1}.
                  </span>
                  <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#454545] text-left">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-[24px] h-[24px] shrink-0 text-[#CB485E] transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                  strokeWidth={1.5}
                />
              </button>

              {/* Answer (Collapsible) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-[300px] pb-[15px] px-[25px]" : "max-h-0"}`}
              >
                <p className="font-sans font-normal text-[13px] leading-[20px] text-[#757575] pl-[24px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
