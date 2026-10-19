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
              One Of The Key Differences Between Lab-Grown And Natural Diamonds Is
              Their Market Price. Lab-Grown Diamonds Are Generally Less Expensive
              Than Natural Diamonds With Comparable Grading Characteristics. This
              Price Difference Is Influenced By Production Methods, Manufacturing
              Capacity, Market Supply And Demand, And Changing Consumer
              Preferences. Advances In Diamond-Growing Technology Have Also Made
              Laboratory Production More Accessible.
            </p>
            <p>
              Natural Diamonds Have A Finite Geological Supply, While Lab-Grown
              Diamonds Can Be Produced Through Specialised Manufacturing
              Processes. This Creates Different Market Dynamics That Influence
              Their Pricing.
            </p>
            <p>
              For Buyers, A Lab-Grown Diamond May Offer Greater Flexibility When
              Choosing A Preferred Carat Weight, Cut Or Quality Within A Budget.
            </p>
            <p>
              The Takeaway: Compare Diamonds By Their Grading Characteristics,
              Origin And Price To Find The Option That Best Suits Your
              Priorities.
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
              How Do You Know What Makes A Diamond Special? The 4Cs — Cut, Colour,
              Clarity And Carat Weight — Provide A Recognised Framework For
              Understanding And Comparing Diamond Quality.
            </p>
            <p>
              Both Natural And Lab-Grown Diamonds Can Be Assessed Using These
              Characteristics. Cut Influences How A Diamond Interacts With Light,
              Colour Describes Its Appearance, Clarity Evaluates Its Internal And
              External Characteristics, And Carat Weight Measures Its Weight.
              Independent Gemological Laboratories Can Provide Grading Reports
              That Help Buyers Understand A Diamond&apos;s Characteristics And
              Origin. Report Details, Grading Terminology And Assessment Practices
              May Vary Between Laboratories And Diamond Types. Knowledge Brings
              Confidence. Understanding A Diamond&apos;s Grading Report Helps You
              Make A More Informed Choice.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

