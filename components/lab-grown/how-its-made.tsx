"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Seed",
    description: "A small diamond seed is placed in a lab.",
    image: "/lab-grown/seed.png",
  },
  {
    number: 2,
    title: "Growth",
    description: "Advanced technology recreates natural conditions.",
    image: "/lab-grown/growth.png",
  },
  {
    number: 3,
    title: "Formation",
    description: "A small diamond seed is placed in a lab.",
    image: "/lab-grown/formation.png",
  },
  {
    number: 4,
    title: "Cut & Polish",
    description: "A small diamond seed is placed in a lab.",
    image: "/lab-grown/cutpolish.png",
  },
];

export function HowItsMade() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#FAF7F2] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Section Header with Horizontal Rule */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-center sm:justify-between lg:mb-16"
        >
          <h2 className="shrink-0 font-serif text-[32px] font-normal tracking-[-0.01em] text-[#1C1917] sm:text-[38px] lg:text-[44px]">
            How It&apos;s Made
          </h2>

          <div
            aria-hidden="true"
            className="hidden h-px flex-1 bg-[#E2DBD1] sm:mx-6 sm:block lg:mx-8"
          />

          <span className="shrink-0 font-[family-name:var(--font-montserrat)] text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#78716C] sm:text-[11.5px] lg:text-[12px]">
            FROM SCIENCE TO A STUNNING DIAMOND
          </span>
        </motion.div>

        {/* 4 Process Step Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7 xl:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.65,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col"
            >
              {/* Image Container with Number Badge */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#EFECE6] shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:rounded-[24px]">
                <Image
                  src={step.image}
                  alt={`${step.title} - How Lab Grown Diamonds Are Made`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Circular Number Badge */}
                <span className="absolute bottom-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-white font-[family-name:var(--font-montserrat)] text-xs font-bold text-[#1C1917] shadow-[0_4px_14px_rgba(0,0,0,0.14)] sm:bottom-4 sm:right-4 sm:size-10 sm:text-sm">
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="mt-4 font-serif text-[20px] font-normal text-[#1C1917] sm:mt-5 sm:text-[22px] md:text-[24px]">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-1.5 font-[family-name:var(--font-inter)] text-[12.5px] leading-relaxed text-[#57534E] sm:text-[13px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

