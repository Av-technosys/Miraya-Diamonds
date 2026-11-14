"use client";

import { jewelleryFaqs } from "@/lib/jewellery-faqs";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const categories = ["All", "Rings", "Necklaces", "Bracelets", "Earrings", "Bangles"];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = jewelleryFaqs.filter(
    (faq) => activeCategory === "All" || faq.category === activeCategory,
  );

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="w-full pt-0 pb-[20px] md:py-[60px] px-4 md:px-[97px]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="w-full max-w-[1243px] mx-auto flex flex-col gap-[20px] md:gap-[30.07px]">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-[5.01px]">
          <h2 className="font-serif font-bold text-[32px] leading-[100%] tracking-[-0.02em] text-black text-center">
            Frequently Asked Questions
          </h2>
          <p className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#00000080] text-center">
            Find answers to your jewellery questions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-row md:flex-wrap items-center justify-start md:justify-center overflow-x-auto md:overflow-visible snap-x scrollbar-hide gap-[10.02px] pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              aria-pressed={activeCategory === cat}
              className={`shrink-0 snap-center h-[33.08px] rounded-[84.2px] px-[24.06px] py-[8.02px] text-[14px] leading-[100%] tracking-[-0.02em] text-center font-sans cursor-pointer transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-[#214E34] text-white font-semibold"
                  : "bg-white text-[#214E34] border border-[#214E34] font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-[10px] max-w-[659px] mx-auto w-full">
          {faqs.length === 0 && (
            <p className="text-center text-sm text-[#757575]">
              For questions about {activeCategory.toLowerCase()}, please contact our team.
            </p>
          )}
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="w-full rounded-[32px] border-[1.5px] border-[#214E34] bg-white overflow-hidden transition-all duration-300"
            >
              {/* Question Row */}
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-start justify-between py-[15px] pr-[18px] pl-[25px] cursor-pointer"
              >
                <div className="flex items-start gap-[10px]">
                  <span className="font-sans font-medium text-[14px] leading-[20px] tracking-[-0.02em] text-[#214E34]">
                    {idx + 1}.
                  </span>
                  <span className="font-sans font-medium text-[14px] leading-[20px] tracking-[-0.02em] text-[#454545] text-left pr-2">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-[20px] h-[20px] shrink-0 text-[#214E34] transition-transform duration-300 mt-[1px] ${openIndex === idx ? "rotate-180" : ""}`}
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
