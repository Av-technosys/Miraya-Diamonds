"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/container";
import { jewelleryFaqs } from "@/lib/jewellery-faqs";

const categories = ["Rings", "Necklaces", "Bracelets", "Earrings", "Bangles"] as const;

export function FaqSection() {
  const [faqTab, setFaqTab] = useState<(typeof categories)[number]>("Rings");
  const itemsId = useId();
  const faqs = jewelleryFaqs.filter((item) => item.category === faqTab);

  return (
    <section id="faq" className="bg-white py-10 font-inter text-[#353333] sm:py-14 lg:py-16">
      <Container className="grid items-start gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10 xl:gap-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[350px] overflow-hidden rounded-lg lg:mx-0 lg:max-w-none">
          <Image src="/Home/FAQ.png" alt="Diamond ring worn on a hand beside a lace sleeve" fill sizes="(min-width: 1024px) 360px, min(350px, calc(100vw - 32px))" className="object-cover" />
        </div>
        <div className="min-w-0 lg:pt-6">
          <div className="mb-5 text-center">
            <h2 className="font-serif text-[31px] font-semibold leading-none text-[#252525] sm:text-[38px]">Frequently Asked Questions</h2>
            <p className="mt-1.5 text-xs text-[#898989] sm:text-sm">Find answers to your jewellery questions.</p>
          </div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="FAQ categories">
            {categories.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFaqTab(tab)}
                aria-pressed={faqTab === tab}
                aria-controls={itemsId}
                className={`shrink-0 cursor-pointer rounded-full border border-[#214E34] px-4 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] ${faqTab === tab ? "bg-[#214E34] font-semibold text-white" : "bg-white text-[#214E34] hover:bg-[#F7FFF7]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div id={itemsId} key={faqTab}>
            {faqs.map((item, index) => (
              <details key={item.question} name={itemsId} className="group border-b border-[#898989] last:border-b-0">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214E34] sm:text-sm [&::-webkit-details-marker]:hidden">
                  <span className="flex gap-2"><span>{index + 1}.</span><span>{item.question}</span></span>
                  <ChevronDown size={14} className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <p className="pb-5 pl-5 pr-7 text-xs leading-relaxed text-[#666] sm:text-sm">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
