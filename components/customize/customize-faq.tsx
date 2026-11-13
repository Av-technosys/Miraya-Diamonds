"use client";

import { jewelleryFaqs } from "@/lib/jewellery-faqs";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/container";

const faqs = jewelleryFaqs;

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
              Frequently Asked Questions
            </h2>
            <p className="mt-1.5 text-xs text-[#898989] sm:text-sm">
              Find answers to your jewellery questions.
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

