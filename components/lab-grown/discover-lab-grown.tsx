"use client";

import { motion, useReducedMotion } from "framer-motion";

const whyChoosePoints = [
  {
    title: "Exceptional Brilliance",
    description: "Enjoy the sparkle and fire of real diamonds.",
  },
  {
    title: "Better Value",
    description: "Explore more options within your budget.",
  },
  {
    title: "Modern Innovation",
    description: "Created using advanced diamond-growing technology.",
  },
  {
    title: "Your Personal Choice",
    description: "Choose a diamond that reflects your style and priorities.",
  },
];

export function DiscoverLabGrown() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-12">
        {/* Top Part: Discover The World Of Lab-Grown Diamonds */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <h2 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#1C1917] sm:text-[34px] md:text-[38px] lg:text-[42px]">
            Discover The World Of Lab-Grown Diamonds
          </h2>

          <p className="mt-4 font-[family-name:var(--font-inter)] text-[13px] leading-[1.78] text-[#57534E] sm:mt-5 sm:text-[14px] md:text-[14.5px]">
            Lab-grown diamonds bring together the timeless beauty of diamonds and
            the possibilities of modern science. Created in specialised
            laboratories, these gemstones develop through advanced processes that
            recreate key conditions of natural diamond formation. From their crystal
            structure to their light-reflecting properties, lab-grown diamonds share
            the essential characteristics of natural diamonds. The distinction lies
            in their journey — one shaped by geological forces over immense periods
            of time, the other guided by scientific innovation. For today&apos;s
            jewellery lovers, lab-grown diamonds offer another way to experience the
            beauty of a real diamond, with options that suit different styles,
            budgets and personal preferences.
          </p>
        </motion.div>

        {/* Bottom Part: Why Choose Lab-Grown Diamonds? */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:mt-16 lg:mt-20"
        >
          <h3 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#1C1917] sm:text-[34px] md:text-[38px] lg:text-[42px]">
            Why Choose Lab-Grown Diamonds?
          </h3>

          <p className="mt-3 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[#57534E] sm:mt-4 sm:text-[14px]">
            Lab-grown diamonds combine timeless brilliance with modern technology,
            offering beauty and value for every preference.
          </p>

          {/* Feature Highlights List */}
          <div className="mt-7 flex flex-col space-y-6 sm:mt-9 sm:space-y-7">
            {whyChoosePoints.map((point) => (
              <div key={point.title} className="flex flex-col">
                <h4 className="font-[family-name:var(--font-inter)] text-[13.5px] font-medium text-[#1C1917] sm:text-[14.5px]">
                  {point.title}
                </h4>
                <p className="mt-0.5 font-[family-name:var(--font-inter)] text-[12.5px] text-[#57534E] sm:text-[13px]">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <p className="mt-9 font-[family-name:var(--font-inter)] text-[12px] leading-relaxed text-[#57534E] sm:mt-11 sm:text-[13px]">
            Like natural diamonds, lab-grown diamonds are evaluated using the 4Cs:
            Cut, Colour, Clarity and Carat Weight.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

