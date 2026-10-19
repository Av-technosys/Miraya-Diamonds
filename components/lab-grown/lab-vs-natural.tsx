"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const labGrownFeatures = [
  "Same brilliance & fire",
  "More affordable",
  "Same chemical composition",
];

const naturalFeatures = [
  "Same chemical composition",
  "Same brilliance & fire",
  "Rarer and higher priced",
];

export function LabVsNatural() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      {/* Top Comparison Visual Banner - Extended Luxury Width */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5"
        >
          {/* Left Card: Lab Grown Diamond */}
          <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-[28px] bg-[#FAF8F5] shadow-[0_6px_28px_rgba(0,0,0,0.05)] sm:min-h-[420px] sm:rounded-[36px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[540px]">
            {/* Background Image (Diamond on left side) */}
            <Image
              src="/lab-grown/labvs.png"
              alt="Lab Grown Brilliant Cut Diamond"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[-35px_center] sm:object-left"
            />

            {/* Subtle Gradient Overlay for text contrast, leaving diamond crisp */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent from-30% via-white/50 to-white/90 sm:from-45% sm:via-white/30 sm:to-white/80"
            />

            {/* Content positioned firmly on the right side (VS side) away from diamond */}
            <div className="relative z-10 ml-auto flex w-full max-w-[170px] min-[380px]:max-w-[195px] min-[440px]:max-w-[220px] flex-col items-end p-4 pr-3 min-[380px]:pr-4 sm:max-w-[320px] sm:p-7 sm:pr-8 md:max-w-[360px] md:p-8 md:pr-10 lg:max-w-[390px] lg:p-9 lg:pr-12 xl:max-w-[420px] xl:pr-14">
              <div className="flex flex-col items-start">
                <h3 className="font-serif text-[20px] min-[380px]:text-[23px] font-normal leading-[1.08] tracking-[-0.01em] text-[#1C1917] sm:text-[36px] md:text-[40px] lg:text-[44px]">
                  <span className="block font-medium">Lab Grown</span>
                  <span className="block font-normal">Diamond</span>
                </h3>

                <ul className="mt-3.5 space-y-2 sm:mt-6 sm:space-y-3.5">
                  {labGrownFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 sm:gap-3.5"
                    >
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#1C3F29] text-white sm:size-5.5">
                        <Check size={9} strokeWidth={3} className="sm:hidden" />
                        <Check size={12} strokeWidth={2.8} className="hidden sm:inline" />
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-[11px] min-[380px]:text-[11.5px] font-medium leading-tight text-[#292524] sm:text-[13.5px] md:text-[14px]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Center VS Badge (Desktop) */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 hidden lg:flex">
            <span className="flex size-13 items-center justify-center rounded-full border border-black/5 bg-white font-[family-name:var(--font-montserrat)] text-xs font-bold tracking-widest text-[#1C1917] shadow-[0_8px_24px_rgba(0,0,0,0.15)] xl:size-14 xl:text-sm">
              VS
            </span>
          </div>

          {/* Mobile VS Badge (visible when stacked) */}
          <div className="flex items-center justify-center py-1 lg:hidden">
            <span className="flex size-11 items-center justify-center rounded-full border border-black/5 bg-white font-[family-name:var(--font-montserrat)] text-xs font-bold tracking-widest text-[#1C1917] shadow-[0_4px_18px_rgba(0,0,0,0.12)]">
              VS
            </span>
          </div>

          {/* Right Card: Natural Diamond */}
          <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-[28px] bg-[#FAF8F5] shadow-[0_6px_28px_rgba(0,0,0,0.05)] sm:min-h-[420px] sm:rounded-[36px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[540px]">
            {/* Background Image (Natural Diamond on right side) */}
            <Image
              src="/lab-grown/labvs2.png"
              alt="Natural Raw Diamond Crystal"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-right"
            />

            {/* Subtle Gradient Overlay for Left-Side Text Readability */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white/90 sm:via-white/40 sm:to-white/85"
            />

            {/* Content positioned on left side */}
            <div className="relative z-10 mr-auto flex w-full max-w-[280px] flex-col p-6 pl-5 sm:max-w-[340px] sm:p-8 sm:pl-8 md:max-w-[380px] md:p-10 lg:max-w-[400px] lg:p-12 xl:max-w-[420px]">
              <h3 className="font-serif text-[30px] font-normal leading-[1.05] tracking-[-0.01em] text-[#1C1917] sm:text-[38px] md:text-[44px] lg:text-[48px]">
                <span className="block font-medium">Natural</span>
                <span className="block font-normal">Diamond</span>
              </h3>

              <ul className="mt-5 space-y-3 sm:mt-7 sm:space-y-3.5">
                {naturalFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 sm:gap-3.5"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1C3F29] text-white sm:size-5.5">
                      <Check size={12} strokeWidth={2.8} />
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-[13px] font-medium leading-tight text-[#292524] sm:text-[14px] md:text-[14.5px]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Content - Perfectly proportioned for reading */}
      <div className="mx-auto mt-14 w-full max-w-[1140px] px-5 sm:mt-18 sm:px-8 lg:mt-24 lg:px-12">
        {/* Section 1: Lab-Grown Vs Natural Diamonds */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <h3 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#1C1917] sm:text-[34px] md:text-[38px] lg:text-[42px]">
            Lab-Grown Vs Natural Diamonds
          </h3>

          <p className="mt-4 font-[family-name:var(--font-inter)] text-[13px] leading-[1.78] text-[#57534E] sm:mt-5 sm:text-[14px] md:text-[14.5px]">
            Natural And Lab-Grown Diamonds Are Chemically And Structurally
            Identical, Offering Similar Beauty And Strength. The Primary
            Difference Lies In Their Origin. Natural Diamonds Are Formed Over
            Billions Of Years Beneath The Earth&apos;s Surface, Making Their
            Rarity A Defining Part Of Their Value And Appeal. Lab-Grown
            Diamonds Are Created Using Advanced Technology In Controlled
            Environments, Offering A Different Option For Buyers While Still
            Delivering Brilliance, Beauty, And Durability In Fine Jewelry.
          </p>
        </motion.div>

        {/* Section 2: Are Lab-Grown Diamonds Real Diamonds? */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:mt-16 lg:mt-20"
        >
          <h3 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#1C1917] sm:text-[34px] md:text-[38px] lg:text-[42px]">
            Are Lab-Grown Diamonds Real Diamonds?
          </h3>

          <div className="mt-4 space-y-3.5 font-[family-name:var(--font-inter)] text-[13px] leading-[1.78] text-[#57534E] sm:mt-5 sm:text-[14px] md:text-[14.5px]">
            <p>
              Yes. Lab-Grown Diamonds Are Genuine Diamonds, Not Imitations. They
              Consist Of Crystalline Carbon And Possess The Defining Material
              Properties That Distinguish Diamond From Other Gemstones. Their
              Hardness, Crystal Structure And Optical Behaviour Are
              Fundamentally Comparable To Those Of Natural Diamonds. This Is
              Why A Lab-Grown Diamond Can Display The Same Captivating
              Brilliance And Beauty.
            </p>
            <p>
              What Makes Them Different Is Their Origin. Natural Diamonds
              Develop Through Geological Processes Deep Within The Earth, While
              Lab-Grown Diamonds Form Through Specialised Technological Methods.
              The Result Is The Same Fundamental Diamond Material, Created
              Through Two Different Journeys.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
