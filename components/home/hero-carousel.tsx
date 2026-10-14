"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import heroBanner1 from "@/public/Home/herobanner1.png";
import heroBanner1Mobile from "@/public/Home/herobanner1_mb.png";
import heroBanner2 from "@/public/Home/herobanner2.png";
import heroBanner2Mobile from "@/public/Home/herobanner2_mb.png";
import heroBanner3 from "@/public/Home/herobanner3.png";
import heroBanner3Mobile from "@/public/Home/herobanner3_mb.png";

const slides = [
  { image: heroBanner1, mobileImage: heroBanner1Mobile, label: "Special Occasions jewellery collection" },
  { image: heroBanner2, mobileImage: heroBanner2Mobile, label: "Discover Zen jewellery collection" },
  { image: heroBanner3, mobileImage: heroBanner3Mobile, label: "Explore the jewellery collection" },
];

const transitionMs = 850;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function goTo(index: number) {
    const nextIndex = (index + slides.length) % slides.length;
    if (animatingRef.current || nextIndex === activeIndex) return;

    animatingRef.current = true;
    setIsAnimating(true);
    setActiveIndex(nextIndex);
    timerRef.current = setTimeout(() => {
      animatingRef.current = false;
      setIsAnimating(false);
    }, transitionMs);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      className="relative mx-auto w-full max-w-[1100px] [--peek:10px] outline-none focus-visible:ring-2 focus-visible:ring-[#214E34] sm:[--peek:46px] md:[--peek:64px] lg:[--peek:92px]"
    >
      <div className="relative aspect-[1070/1470] sm:aspect-[1923/818]">
        {slides.map((slide, index) => {
          const distance = (index - activeIndex + slides.length) % slides.length;
          const position = distance === 0 ? "front" : distance === 1 ? "right" : "left";
          const transform = position === "front"
            ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
            : position === "right"
              ? "translate3d(calc(9% + var(--peek)), 14px, 0) scale(0.82) rotate(3deg)"
              : "translate3d(calc(-9% - var(--peek)), 14px, 0) scale(0.82) rotate(-3deg)";

          return (
            <div
              key={slide.image.src}
              className="absolute inset-0 overflow-hidden rounded-[10px] shadow-sm transition-[transform,box-shadow] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform, zIndex: position === "front" ? 3 : position === "right" ? 2 : 1 }}
            >
              <Image src={slide.mobileImage} alt={slide.label} fill priority={index === 0} sizes="(max-width: 640px) 92vw, 1px" className="object-cover sm:hidden" />
              <Image src={slide.image} alt="" fill priority={index === 0} sizes="(max-width: 1280px) 95vw, 1100px" className="hidden object-cover sm:block" />
              {position === "front" ? (
                <Link href="/collection" aria-label={`Explore ${slide.label}`} className="absolute inset-0" />
              ) : (
                <button type="button" onClick={() => goTo(index)} aria-label={`Show ${position === "left" ? "previous" : "next"} collection`} disabled={isAnimating} className="absolute inset-0 cursor-pointer disabled:cursor-default" />
              )}
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 z-10 -mx-2 flex items-center justify-between sm:-mx-5">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous banner" disabled={isAnimating} className="pointer-events-auto grid size-8 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#214E34] disabled:cursor-default sm:size-10">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next banner" disabled={isAnimating} className="pointer-events-auto grid size-8 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#214E34] disabled:cursor-default sm:size-10">
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((slide, index) => (
            <button key={slide.image.src} type="button" onClick={() => goTo(index)} aria-label={`Show banner ${index + 1}`} aria-current={activeIndex === index ? "true" : undefined} disabled={isAnimating} className={`h-1.5 rounded-full transition-[width,background-color] ${activeIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/60"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
