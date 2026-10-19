"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Share Your Idea",
    desc: "Tell us your vision, style, and inspiration. We'll shape it into a design.",
    image: "/customize/designprocess1.png",
  },
  {
    step: "02",
    title: "Choose Your Diamond",
    desc: "Select the perfect diamond based on shape, size, quality and budget.",
    image: "/customize/designprocess2.png",
  },
  {
    step: "03",
    title: "Select Your Metal",
    desc: "Choose from yellow gold, rose gold, white gold or platinum to suit your style.",
    image: "/customize/designprocess3.png",
  },
  {
    step: "04",
    title: "Personalise the Setting",
    desc: "Pick a setting that balances beauty, comfort and security.",
    image: "/customize/designprocess4.png",
  },
  {
    step: "05",
    title: "Your Perfect Piece",
    desc: "We craft and deliver a truly personal and meaningful jewellery.",
    image: "/customize/designprocess5.png",
  },
];

export function DesignProcess() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-[620px] text-center sm:mb-14 lg:mb-16">
          <h2 className="font-serif text-[32px] font-bold leading-tight text-[#1C1B1B] sm:text-[38px] lg:text-[42px]">
            The Design Process
          </h2>
          <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#757575] sm:text-[14px]">
            From an idea to a one-of-a-kind piece — we guide you through every step
            with care, expertise and attention to detail.
          </p>
        </div>

        {/* 5 Process Steps: Horizontal Scroll on Mobile, 5-col Grid on Desktop */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 xl:gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : index * 0.1,
              }}
              className="group flex w-[70vw] min-w-[210px] max-w-[280px] shrink-0 snap-center flex-col sm:w-[230px] lg:w-auto lg:max-w-none"
            >
              {/* Arched Image Container */}
              <div className="relative aspect-[225/288] w-full overflow-hidden rounded-t-[110px] rounded-b-[10px] bg-[#f8f6f3] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <Image
                  src={item.image}
                  alt={`${item.title} - Miraya Diamonds customization process`}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 230px, 220px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                
                {/* Step Number Badge */}
                <div
                  className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-white text-[10px] font-semibold tracking-wide text-[#252525] shadow-[0_2px_8px_rgba(0,0,0,0.16)] sm:size-8 sm:text-[11px]"
                  aria-hidden="true"
                >
                  {item.step}
                </div>
              </div>

              {/* Step Info */}
              <div className="mt-4 flex flex-col sm:mt-5">
                <h3 className="font-serif text-[17px] font-semibold leading-snug text-[#252525] sm:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-sans text-[12px] leading-[1.55] text-[#757575] sm:text-[13px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

