"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/common/container";

type Review = { name: string; text: string };

const bubbles = [
  { image: 1, x: 15, y: 29, size: "regular", rotate: -18 },
  { image: 2, x: 32, y: 26, size: "regular", rotate: 14 },
  { image: 3, x: 50, y: 25, size: "large", rotate: -12 },
  { image: 4, x: 68, y: 26, size: "regular", rotate: 15 },
  { image: 5, x: 85, y: 29, size: "regular", rotate: -15 },
  { image: 6, x: 7, y: 52, size: "small", rotate: 20 },
  { image: 7, x: 27, y: 52, size: "regular", rotate: -16 },
  { image: 8, x: 73, y: 52, size: "regular", rotate: 18 },
  { image: 9, x: 93, y: 52, size: "small", rotate: -20 },
  { image: 10, x: 19, y: 73, size: "regular", rotate: 12 },
  { image: 11, x: 81, y: 73, size: "regular", rotate: -14 },
] as const;

const bubbleSizes = {
  small: "size-16 sm:size-24 md:size-28 lg:size-36",
  regular: "size-20 sm:size-28 md:size-36 lg:size-44",
  large: "size-32 sm:size-44 md:size-52 lg:size-64",
};

const slideMs = 750;

export function HomeTestimonialsAnimated({ reviews }: { reviews: Review[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  const lockRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [order, setOrder] = useState(reviews);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  function getStep() {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || "0");
  }

  function move(direction: -1 | 1) {
    if (lockRef.current || reviews.length < 2) return;
    if (reduceMotion) {
      setOrder((items) => direction === 1 ? [...items.slice(1), items[0]] : [items[items.length - 1], ...items.slice(0, -1)]);
      return;
    }

    const step = getStep();
    if (!step) return;
    lockRef.current = true;

    if (direction === 1) {
      setAnimate(true);
      setOffset(-step);
      timerRef.current = setTimeout(() => {
        setAnimate(false);
        setOrder((items) => [...items.slice(1), items[0]]);
        setOffset(0);
        lockRef.current = false;
      }, slideMs);
      return;
    }

    setAnimate(false);
    setOrder((items) => [items[items.length - 1], ...items.slice(0, -1)]);
    setOffset(-step);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(() => {
        setAnimate(true);
        setOffset(0);
        timerRef.current = setTimeout(() => { lockRef.current = false; }, slideMs);
      });
    });
  }

  return (
    <section ref={sectionRef} className="overflow-hidden pb-16 sm:pb-24">
      <Container>
        <div className="pb-5 pt-2 text-center sm:hidden">
          <div className="flex h-[70px] items-center justify-center" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((image, index) => (
              <div
                key={image}
                className={`relative -ml-2.5 size-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm first:ml-0 ${index === 2 ? "z-10 size-12" : ""}`}
                style={{
                  opacity: hasEntered || reduceMotion ? 1 : 0,
                  transform: hasEntered || reduceMotion ? "translateY(0)" : "translateY(24px)",
                  transition: reduceMotion ? "none" : `transform 600ms ease ${index * 80}ms, opacity 600ms ease ${index * 80}ms`,
                }}
              >
                <Image src={`/Home/circle_${image}.png`} alt="" fill sizes="48px" className="object-cover" />
              </div>
            ))}
          </div>
          <h2 className="mt-1 font-[family-name:var(--font-cormorant-garamond)] text-[31px] font-semibold leading-none text-[#252525]">Testimonials</h2>
          <p className="mt-1.5 text-xs text-[#898989]">Stories from our customers</p>
        </div>
        <div className="relative hidden h-[400px] w-full sm:block md:h-[460px] lg:h-[520px]">
          {bubbles.map((bubble, index) => {
            const entered = hasEntered || reduceMotion;
            return (
              <div
                key={bubble.image}
                className={`absolute overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${bubbleSizes[bubble.size]} ${[6, 9, 10, 11].includes(bubble.image) ? "max-sm:hidden" : ""}`}
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  zIndex: bubble.size === "large" ? 3 : 2,
                  opacity: entered ? 1 : 0,
                  transform: entered
                    ? "translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg) scale(1)"
                    : `translate(-50%, -50%) translate3d(0, ${160 + index * 18}px, 0) rotate(${bubble.rotate}deg) scale(0.65)`,
                  transition: reduceMotion ? "none" : `transform 1600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 85}ms, opacity 1000ms ease ${index * 85}ms`,
                }}
              >
                <Image src={`/Home/circle_${bubble.image}.png`} alt="" fill sizes="(max-width: 640px) 128px, (max-width: 1024px) 208px, 256px" className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            );
          })}

          <div className="absolute inset-x-0 bottom-[28%] z-10 text-center">
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-[31px] font-semibold leading-none text-[#252525] sm:text-[38px]">Testimonials</h2>
            <p className="mt-1.5 text-xs text-[#898989] sm:text-sm">Stories from our customers</p>
          </div>
        </div>

        <div className="relative z-10 w-full sm:-mt-24 lg:-mt-28">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonials" className="hidden size-10 shrink-0 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#214E34] lg:grid"><ArrowLeft size={18} /></button>
            <div className="min-w-0 flex-1 overflow-hidden" aria-label="Customer testimonials">
            <div
              ref={trackRef}
              className="flex gap-3 lg:gap-4"
              style={{ transform: `translate3d(${offset}px, 0, 0)`, transition: animate && !reduceMotion ? `transform ${slideMs}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none" }}
            >
              {[...order, ...order].map((item, index) => (
                <article key={`${item.name}-${index}`} aria-hidden={index >= order.length} className="flex h-[205px] w-[72%] shrink-0 flex-col justify-between overflow-hidden rounded-md border border-[#ececec] bg-white shadow-sm sm:h-[184px] sm:w-[calc(50%_-_6px)] lg:w-[calc(25%_-_12px)]">
                  <div className="px-3 py-3">
                    <div className="flex items-center justify-between gap-2"><div className="flex gap-0.5 text-[#E2BD60]">{Array.from({ length: 5 }, (_, star) => <Star key={star} size={13} fill="currentColor" />)}</div><span className="text-[9px] text-[#898989]">Customer review</span></div>
                    <p className="mt-2 text-[11px] leading-[1.35] text-[#5c5c5c]">“{item.text}”</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#214E34] px-3 py-2 text-[11px] text-white"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#E7FFE6] font-semibold text-[#214E34]">{item.name[0]}</span><span>{item.name}<span className="block text-[9px] text-white/75">Miraya customer</span></span></div>
                </article>
              ))}
            </div>
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonials" className="hidden size-10 shrink-0 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#214E34] lg:grid"><ArrowRight size={18} /></button>
          </div>
          <div className="mt-5 flex justify-center gap-3 lg:hidden">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonials" className="grid size-9 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#214E34] sm:size-10"><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonials" className="grid size-9 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#214E34] sm:size-10"><ArrowRight size={18} /></button>
          </div>
        </div>
      </Container>
    </section>
  );
}
