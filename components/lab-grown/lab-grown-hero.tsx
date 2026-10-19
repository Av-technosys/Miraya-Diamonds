"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Leaf, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Custom Stack of Coins/Cylinder icon matching the exact design
function ValueCylinderIcon({
  size = 20,
  strokeWidth = 1.4,
  className = "",
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="7" rx="6" ry="2.7" />
      <path d="M6 7v4.5c0 1.5 2.69 2.7 6 2.7s6-1.2 6-2.7V7" />
      <path d="M6 11.5v4.5c0 1.5 2.69 2.7 6 2.7s6-1.2 6-2.7v-4.5" />
    </svg>
  );
}

const trustFeatures = [
  {
    icon: Gem,
    title: "Real Diamonds",
    description: "Same beauty and quality",
  },
  {
    icon: Leaf,
    title: "More Sustainable",
    description: "A lighter footprint",
  },
  {
    icon: ValueCylinderIcon,
    title: "Better Value",
    description: "Bigger sparkle for less",
  },
  {
    icon: Heart,
    title: "Ethically Created",
    description: "Conflict-free and responsible",
  },
];

export function LabGrownHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background Banner Container with Responsive Aspect Ratio */}
      <div className="relative flex min-h-[460px] w-full items-center bg-[#FAF8F5] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[580px] xl:min-h-[620px]">
        {/* Background Image */}
        <Image
          src="/lab-grown/grownbanner.png"
          alt="Lab Grown Diamond Cushion Halo Ring on Marble with Baby's Breath Flowers"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-[68%_center] md:object-center"
        />

        {/* Soft Warm Vignette / Gradient Overlay to ensure crisp legibility on left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:from-white/90 sm:via-white/70 sm:to-transparent lg:w-[65%]"
        />

        {/* Hero Content Overlay */}
        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 py-12 sm:px-10 md:py-16 lg:px-16 xl:px-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-[520px] flex-col items-start"
          >
            {/* Eyebrow Label */}
            <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#44403C] sm:text-[11px] md:text-[12px]">
              A MODERN WAY TO SHINE
            </span>

            {/* Main Heading */}
            <h1 className="mt-3.5 font-serif text-[40px] font-normal leading-[1.02] tracking-[-0.01em] text-[#14120E] sm:mt-4 sm:text-[50px] md:text-[58px] lg:text-[66px]">
              <span className="block font-medium">Lab Grown</span>
              <span className="block font-normal italic">Diamonds</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-4 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[#44403C] sm:mt-5 sm:text-[14px] md:text-[15px]">
              The same brilliance.
              <br />
              A more conscious choice.
            </p>

            {/* Call to Action Button */}
            <div className="mt-6 sm:mt-8">
              <Link
                href="/collection?category=Lab+Grown"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0F261C] px-6 py-3 text-[12px] font-medium text-white shadow-[0_4px_18px_rgba(15,38,28,0.24)] transition-all duration-300 hover:bg-[#183d2e] hover:shadow-[0_6px_24px_rgba(15,38,28,0.32)] active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-[13px]"
              >
                <span>Explore Collection</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust & Value Proposition Features Section */}
      <div className="w-full bg-white px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto w-full max-w-[1240px] rounded-[18px] bg-[#F7FFF7] px-3 py-7 sm:rounded-[22px] sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid grid-cols-2 gap-x-2 gap-y-7 sm:gap-x-4 sm:gap-y-8 md:grid-cols-4 md:gap-0">
            {trustFeatures.map((item, index) => (
              <div
                key={item.title}
                className={`relative flex flex-col items-center px-2 text-center sm:px-4 ${
                  // Dividers on desktop (4 columns)
                  index < trustFeatures.length - 1
                    ? "md:after:absolute md:after:right-0 md:after:top-2 md:after:bottom-2 md:after:w-px md:after:bg-[#D5E6D8]"
                    : ""
                } ${
                  // Divider for 2-column layout on mobile & tablet
                  index % 2 === 0
                    ? "max-md:after:absolute max-md:after:right-0 max-md:after:top-2 max-md:after:bottom-2 max-md:after:w-px max-md:after:bg-[#D5E6D8]"
                    : ""
                }`}
              >
                {/* Circular Icon Badge */}
                <span className="mb-2.5 grid size-11 place-items-center rounded-full bg-[#E7FFE6] text-[#214E34] sm:mb-4 sm:size-[50px]">
                  <item.icon size={19} strokeWidth={1.4} className="sm:hidden" />
                  <item.icon size={21} strokeWidth={1.4} className="hidden sm:inline" />
                </span>

                {/* Feature Heading */}
                <h3 className="font-serif text-[15px] font-medium leading-snug text-[#1C1917] sm:text-[19px] lg:text-[20px]">
                  {item.title}
                </h3>

                {/* Feature Description */}
                <p className="mt-1 font-[family-name:var(--font-inter)] text-[11px] leading-tight text-[#57534E] sm:mt-1.5 sm:text-[13px] sm:leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
