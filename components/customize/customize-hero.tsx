"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function CustomizeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#F9F6F3] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-16">
          
          {/* Left Column: Text Content */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            {/* Eyebrow Label */}
            <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#78716C] sm:text-[13px]">
              CUSTOMISED JUST FOR YOU
            </span>

            {/* Main Heading */}
            <h1 className="mt-4 font-serif text-[38px] font-bold leading-[1.08] tracking-[-0.02em] text-[#454545] sm:mt-5 sm:text-[48px] md:text-[54px] lg:text-[58px] xl:text-[62px]">
              Your Vision,
              <br />
              Our <span className="font-normal italic">Craftsmanship</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[440px] font-sans text-[14px] leading-[1.65] text-[#57534E] sm:mt-5 sm:text-[15px] lg:text-[16px]">
              Turn your ideas into timeless jewellery. From the first sketch to
              the final sparkle, we bring your story to life with precision,
              passion and perfection.
            </p>

            {/* Primary Action Button */}
            <div className="mt-7 sm:mt-9">
              <Link
                href="/contact#consultation-booking"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#214E34] px-7 py-3.5 text-xs font-semibold text-white shadow-[0_6px_22px_rgba(33,78,52,0.22)] transition-all duration-300 hover:bg-[#173d28] hover:shadow-[0_8px_28px_rgba(33,78,52,0.3)] active:scale-[0.98] sm:px-8 sm:py-4 sm:text-sm"
              >
                <span>Customise Your Ring</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual with Animated Straightening Image & Green Frame */}
          <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center sm:max-w-[420px] md:max-w-[480px] lg:max-w-[530px]">
            <div className="relative w-full aspect-[321/265]">
              
              {/* Green Frame behind the image */}
              <motion.div
                initial={reduceMotion ? false : { rotate: 0, opacity: 0.85 }}
                animate={reduceMotion ? undefined : { rotate: -4.5, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
                className="absolute inset-0 rounded-[24px] bg-[#214E34] shadow-[0_16px_40px_rgba(33,78,52,0.24)] sm:rounded-[32px]"
                aria-hidden="true"
              />

              {/* Foreground Image: starts aligned with tilted green frame, then animates to 0deg (straight) */}
              <motion.div
                initial={reduceMotion ? false : { rotate: -4.5, scale: 0.98 }}
                animate={reduceMotion ? undefined : { rotate: 0, scale: 1 }}
                transition={{
                  duration: 1.25,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.25,
                }}
                className="relative z-10 size-full overflow-hidden rounded-[24px] border-[2px] border-white/60 bg-white shadow-[0_14px_38px_rgba(0,0,0,0.12)] sm:rounded-[32px]"
              >
                <Image
                  src="/customize/customize_banner.png"
                  alt="Custom solitaire diamond ring crafted by Miraya Diamonds"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 530px"
                  className="object-cover"
                />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

