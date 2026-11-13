"use client";

import { motion, useReducedMotion } from "framer-motion";

export function DiamondEducation() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-8 lg:px-12">
        {/* Section 1: Why Do Lab-Grown Diamonds Cost Less? */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <h2 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#1C1917] sm:text-[34px] md:text-[38px] lg:text-[42px]">
            Why Do Lab-Grown Diamonds Cost Less?
          </h2>

          <div className="mt-4 space-y-3.5 font-[family-name:var(--font-inter)] text-[13px] leading-[1.78] text-[#57534E] sm:mt-5 sm:text-[14px] md:text-[14.5px]">
            <p>
              One of the key differences between lab-grown and natural diamonds is their market price. Lab-grown diamonds are generally less expensive than natural diamonds with comparable grading characteristics. This price difference is influenced by production methods, manufacturing capacity, market supply and demand, and changing consumer preferences. Advances in diamond-growing technology have also made laboratory production more accessible.
            </p>
            <p>
              Natural diamonds have a finite geological supply, while lab-grown diamonds can be produced through specialised manufacturing processes. This creates different market dynamics that influence their pricing.
            </p>
            <p>
              For buyers, a lab-grown diamond may offer greater flexibility when choosing a preferred carat weight, cut or quality within a budget.
            </p>
            <p>
              The takeaway: compare diamonds by their grading characteristics, origin and price to find the option that best suits your priorities.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Diamond Certification & Grading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:mt-16 lg:mt-20"
        >
          <h2 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#1C1917] sm:text-[34px] md:text-[38px] lg:text-[42px]">
            Diamond Certification &amp; Grading
          </h2>

          <div className="mt-4 space-y-3.5 font-[family-name:var(--font-inter)] text-[13px] leading-[1.78] text-[#57534E] sm:mt-5 sm:text-[14px] md:text-[14.5px]">
            <p>
              How do you know what makes a diamond special? The 4Cs — cut, colour, clarity and carat weight — provide a recognised framework for understanding and comparing diamond quality.
            </p>
            <p>
              Both natural and lab-grown diamonds can be assessed using these characteristics. Cut influences how a diamond interacts with light, colour describes its appearance, clarity evaluates its internal and external characteristics, and carat weight measures its weight. Independent gemological laboratories can provide grading reports that help buyers understand a diamond&apos;s characteristics and origin. Report details, grading terminology and assessment practices may vary between laboratories and diamond types. Knowledge brings confidence. Understanding a diamond&apos;s grading report helps you make a more informed choice.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

