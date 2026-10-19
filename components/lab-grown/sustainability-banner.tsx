"use client";

import Image from "next/image";
import { Leaf, Users, Gem, Infinity as InfinityIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const sustainabilityBadges = [
  {
    icon: Leaf,
    title: "Environment\nFriendly",
  },
  {
    icon: Users,
    title: "Ethically\nSourced",
  },
  {
    icon: Gem,
    title: "Exceptional\nQuality",
  },
  {
    icon: InfinityIcon,
    title: "A Sustainable\nFuture",
  },
];

export function SustainabilityBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Container with sleek reduced height */}
      <div className="relative flex min-h-[380px] w-full items-center py-8 sm:min-h-[420px] sm:py-10 md:min-h-[460px] lg:min-h-[490px] lg:py-12 xl:min-h-[510px]">
        {/* Landscape Nature & Sunlit Marble Background */}
        <Image
          src="/lab-grown/SAMEBRILLIANCEBG.png"
          alt="Sunlit marble podium and green leaves background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft Left Overlay for dark text readability on left side */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/55 sm:via-black/20 lg:w-[45%]"
        />

        {/* Inner Content Grid */}
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.9fr_1.1fr] lg:gap-6 xl:gap-10">
            
            {/* Column 1: Left Typography (Strictly 2 lines) */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 sm:text-[11px] md:text-[11.5px]">
                SAME BRILLIANCE
                <br />
                A BRIGHTER TOMORROW
              </span>

              <h2 className="mt-2.5 font-serif text-[26px] font-normal leading-[1.08] tracking-[-0.01em] text-white sm:mt-3 sm:text-[34px] md:text-[40px] lg:text-[46px] xl:text-[50px]">
                <span className="block whitespace-nowrap">Beauty Today.</span>
                <span className="block whitespace-nowrap">A Better Tomorrow.</span>
              </h2>
            </motion.div>

            {/* Column 2: Center Ring Image */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto flex w-full max-w-[220px] items-center justify-center sm:max-w-[260px] md:max-w-[290px] lg:max-w-[320px] xl:max-w-[350px]"
            >
              <div className="relative aspect-[1311/1200] w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                <Image
                  src="/lab-grown/SAMEBRILLIANCEinner.png"
                  alt="Solitaire Halo Gold Ring with Lab Grown Diamond"
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 400px"
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Column 3: Right 2x2 Sustainability Badges Grid */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-[320px] lg:ml-auto lg:mr-0 lg:max-w-[360px]"
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-8 sm:gap-y-9">
                {sustainabilityBadges.map((badge) => (
                  <div
                    key={badge.title}
                    className="flex flex-col items-center text-center"
                  >
                    {/* White Circular Icon Badge */}
                    <span className="grid size-12 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:size-14">
                      <badge.icon size={22} strokeWidth={1.5} />
                    </span>

                    {/* Label below Badge */}
                    <span className="mt-2.5 max-w-[120px] whitespace-pre-line font-[family-name:var(--font-inter)] text-[12px] font-medium leading-[1.3] text-[#292524] sm:text-[13px] sm:text-[#1C1917]">
                      {badge.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

