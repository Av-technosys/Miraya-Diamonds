"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

type BestSeller = { name: string; image: string; href: string };

const normalSpeed = 54;
const hoverSpeed = 18;

export function HomeBestSellerCarousel({ items }: { items: BestSeller[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const targetSpeedRef = useRef(normalSpeed);
  const currentSpeedRef = useRef(normalSpeed);
  const hoveredIndexRef = useRef(-1);
  const lastTimeRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !items.length) return;
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    let cardWidth = 0;
    let step = 0;
    let cycleWidth = 0;
    let viewportWidth = 0;
    let inView = false;

    function measure() {
      const oldCycle = cycleWidth;
      cardWidth = cards[0]?.offsetWidth ?? 0;
      const gap = parseFloat(getComputedStyle(track!).columnGap || "0");
      step = cardWidth + gap;
      cycleWidth = items.length * step;
      viewportWidth = viewport!.clientWidth;
      if (!cycleWidth) return;
      const relativeOffset = oldCycle ? offsetRef.current - oldCycle : -(viewportWidth - cardWidth) / 2;
      offsetRef.current = cycleWidth + relativeOffset;
      track!.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }

    function tick(time: number) {
      if (!inView || document.hidden || !cycleWidth) return;
      const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.05) : 0;
      lastTimeRef.current = time;
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * Math.min(dt * 8, 1);
      offsetRef.current += currentSpeedRef.current * (cardWidth / 290) * dt;
      if (offsetRef.current >= cycleWidth * 2) offsetRef.current -= cycleWidth;
      track!.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;

      const centerX = viewportWidth / 2;
      const curveWidth = Math.max(viewportWidth * 0.45, step * 2.7);
      for (let index = 0; index < cards.length; index++) {
        const cardCenter = index * step + cardWidth / 2 - offsetRef.current;
        if (cardCenter < -cardWidth || cardCenter > viewportWidth + cardWidth) continue;
        const normalized = Math.max(-1.4, Math.min(1.4, (cardCenter - centerX) / curveWidth));
        const rotation = normalized * 4.8;
        const archY = normalized * normalized * 32;
        const scale = hoveredIndexRef.current === index ? 1.04 : 1;
        cards[index].style.transform = `translate3d(0, ${archY}px, 0) rotate(${rotation}deg) scale(${scale})`;
      }
      animFrameIdRef.current = requestAnimationFrame(tick);
    }

    function start() {
      if (!inView || document.hidden || animFrameIdRef.current !== null) return;
      lastTimeRef.current = 0;
      animFrameIdRef.current = requestAnimationFrame(tick);
    }

    function stop() {
      if (animFrameIdRef.current !== null) cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
      lastTimeRef.current = 0;
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start(); else stop();
    }, { threshold: 0.05 });
    intersectionObserver.observe(section);
    const onVisibilityChange = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      track.style.transform = "";
      cards.forEach((card) => { card.style.transform = ""; });
    };
  }, [items, reduceMotion]);

  return (
    <div ref={sectionRef} className="w-full">
      <div
        ref={viewportRef}
        className={`overflow-hidden py-10 ${reduceMotion ? "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : ""}`}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") targetSpeedRef.current = hoverSpeed; }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") { targetSpeedRef.current = normalSpeed; hoveredIndexRef.current = -1; } }}
        onFocusCapture={() => { targetSpeedRef.current = 0; }}
        onBlurCapture={() => { targetSpeedRef.current = normalSpeed; }}
      >
        <div ref={trackRef} className="relative flex w-max gap-4 will-change-transform sm:gap-5 lg:gap-6">
          {Array.from({ length: 4 }, (_, repeat) => items.map((item, index) => {
            const cardIndex = repeat * items.length + index;
            return (
              <Link
                key={`${repeat}-${item.image}`}
                href={item.href}
                aria-label={item.name}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") hoveredIndexRef.current = cardIndex; }}
                onPointerLeave={(event) => { if (event.pointerType === "mouse") hoveredIndexRef.current = -1; }}
                className="group relative block w-[132px] shrink-0 overflow-hidden rounded-[14px] shadow-md will-change-transform sm:w-[260px] lg:w-[290px]"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={`/Home/${item.image}`} alt={repeat === 1 ? item.name : ""} fill sizes="(max-width: 640px) 132px, (max-width: 1024px) 260px, 290px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 to-transparent sm:h-28" />
                  <span className="absolute inset-x-2 bottom-2 border-y border-white/80 py-1 text-center text-[9px] font-medium text-white sm:inset-x-4 sm:bottom-4 sm:py-2 sm:text-xs">{item.name}</span>
                </div>
              </Link>
            );
          }))}
        </div>
      </div>
    </div>
  );
}
