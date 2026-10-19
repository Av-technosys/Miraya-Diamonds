"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const craftSteps = [
  {
    name: "Polishing & Finishing",
    image: "/customize/behindcraft1.png",
  },
  {
    name: "Precision Detailing",
    image: "/customize/behindcraft2.png",
  },
  {
    name: "Stone Setting",
    image: "/customize/behindcraft3.png",
  },
  {
    name: "Surface Refinement",
    image: "/customize/behindcraft4.png",
  },
  {
    name: "Ring Setting & Shaping",
    image: "/customize/behindcraft5.png",
  },
];

export function BehindTheCraft() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#214E34] py-14 sm:py-20 lg:py-24 text-white">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mx-auto mb-10 max-w-[620px] text-center sm:mb-14 lg:mb-16">
          <h2 className="font-serif text-[32px] font-bold leading-tight text-white sm:text-[38px] lg:text-[42px]">
            Behind the Craft
          </h2>
          <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#D6D3D1] sm:text-[14px]">
            Every piece is meticulously crafted by skilled artisans, blending
            precision, passion, and timeless elegance to bring your vision to life.
          </p>
        </div>

        {/* 5 Craft Steps: Horizontal Touch Scroll on Mobile, 5-col Grid on Desktop */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 xl:gap-6">
          {craftSteps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : index * 0.1,
              }}
              className="group flex w-[64vw] min-w-[200px] max-w-[260px] shrink-0 snap-center flex-col sm:w-[220px] lg:w-auto lg:max-w-none"
            >
              {/* Image Container with Rounded Corners */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[18px] sm:rounded-[22px] bg-[#1a402a] shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-shadow duration-300 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.32)]">
                <Image
                  src={step.image}
                  alt={`${step.name} - Miraya Diamonds artisan craftsmanship`}
                  fill
                  sizes="(max-width: 640px) 64vw, (max-width: 1024px) 220px, 226px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              </div>

              {/* Card Label */}
              <h3 className="mt-3.5 text-center font-sans text-[13px] font-medium leading-snug text-[#E7E5E4] sm:mt-4 sm:text-[14px]">
                {step.name}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

