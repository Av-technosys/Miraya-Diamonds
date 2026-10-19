"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/container";

const faqs = [
  {
    question: "What materials are your jewellery pieces made from?",
    answer:
      "Our pieces include gold, platinum and certified natural diamonds. The metal and stone details are listed on each product page.",
  },
  {
    question: "How do I choose the right ring/bracelet/necklace size?",
    answer:
      "Use the size guide on the product page, or contact our atelier for help with a precise fit.",
  },
  {
    question: "How should I care for and maintain my jewellery?",
    answer:
      "Store each piece separately and clean gently with a soft cloth. Avoid harsh chemicals and remove jewellery before strenuous activity.",
  },
  {
    question: "Do you offer returns, exchanges, or refunds?",
    answer:
      "Eligibility depends on the piece and its customization. Please read our returns policy before ordering.",
  },
  {
    question: "How long does delivery take, and can I track my order?",
    answer:
      "Delivery timing depends on your location and the piece. Our team can confirm an estimate and tracking details for your order.",
  },
];

export function CustomizeFaq() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container className="grid items-start gap-8 md:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
        {/* Left Side: Brand Imagery */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[350px] overflow-hidden rounded-lg md:max-w-none">
          <Image
            src="/Home/FAQ.png"
            alt="Diamond ring worn on a hand beside a lace sleeve"
            fill
            sizes="(max-width: 767px) 350px, (max-width: 1280px) 28vw, 355px"
            className="object-cover"
          />
        </div>

        {/* Right Side: Accordion Items */}
        <div className="min-w-0 md:pt-6 lg:pt-8">
          <div className="mb-7 text-center sm:mb-9">
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-[31px] font-semibold leading-none text-[#252525] sm:text-[38px]">
              Frequently Asked Question
            </h2>
            <p className="mt-1.5 text-xs text-[#898989] sm:text-sm">
              Know the answer for your questions
            </p>
          </div>

          <div>
            {faqs.map((item, index) => (
              <details
                key={item.question}
                name="customize-faq"
                className="group border-b border-[#898989]"
              >
                <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214E34] sm:text-sm [&::-webkit-details-marker]:hidden">
                  <span className="flex gap-2">
                    <span>{index + 1}.</span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <p className="pb-5 pl-5 pr-7 text-xs leading-relaxed text-[#666] sm:text-sm">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

