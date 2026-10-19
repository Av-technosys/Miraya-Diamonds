"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const customDesigns = [
  {
    id: 1,
    title: "Diamond Tennis Bracelet",
    image: "/customize/custom1.png",
  },
  {
    id: 2,
    title: "Diamond Butterfly Motif",
    image: "/customize/custom2.png",
  },
  {
    id: 3,
    title: "Gold Open Cuff Bangle",
    image: "/customize/custom3.png",
  },
  {
    id: 4,
    title: "Infinity Diamond Teardrop Pendant",
    image: "/customize/custom4.png",
  },
  {
    id: 5,
    title: "Cushion Halo Diamond Earrings",
    image: "/customize/custom5.png",
  },
];

// Speed matching HomeBestSellerCarousel physics
const normalSpeed = 54;
const hoverSpeed = 18;

export function GlimpsePossibilities() {
  const sectionRef = useRef<HTMLElement>(null);
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
    if (reduceMotion || !customDesigns.length) return;
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
      cycleWidth = customDesigns.length * step;
      viewportWidth = viewport!.clientWidth;
      if (!cycleWidth) return;
      const relativeOffset = oldCycle
        ? offsetRef.current - oldCycle
        : -(viewportWidth - cardWidth) / 2;
      offsetRef.current = cycleWidth + relativeOffset;
      track!.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }

    function tick(time: number) {
      if (!inView || document.hidden || !cycleWidth) return;
      const dt = lastTimeRef.current
        ? Math.min((time - lastTimeRef.current) / 1000, 0.05)
        : 0;
      lastTimeRef.current = time;

      // Smooth deceleration/acceleration to targetSpeed
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * Math.min(dt * 8, 1);

      // Continuous offset calculation proportional to card scale
      offsetRef.current += currentSpeedRef.current * (cardWidth / 290) * dt;
      if (offsetRef.current >= cycleWidth * 2) {
        offsetRef.current -= cycleWidth;
      }

      track!.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      animFrameIdRef.current = requestAnimationFrame(tick);
    }

    function start() {
      if (!inView || document.hidden || animFrameIdRef.current !== null) return;
      lastTimeRef.current = 0;
      animFrameIdRef.current = requestAnimationFrame(tick);
    }

    function stop() {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      animFrameIdRef.current = null;
      lastTimeRef.current = 0;
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(section);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      track.style.transform = "";
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white py-14 sm:py-20 lg:py-24"
    >
      {/* Section Header */}
      <div className="mx-auto mb-10 max-w-[620px] px-5 text-center sm:mb-14 lg:mb-16">
        <h2 className="font-serif text-[32px] font-bold leading-tight text-[#1C1B1B] sm:text-[38px] lg:text-[42px]">
          A Glimpse of Possibilities
        </h2>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#757575] sm:text-[14px]">
          Explore some of our recent custom designs, created with love and
          precision for our customers.
        </p>
      </div>

      {/* Dynamic Physics Carousel Track */}
      <div className="relative w-full">
        <div
          ref={viewportRef}
          className={`overflow-hidden py-4 ${
            reduceMotion
              ? "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : ""
          }`}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              targetSpeedRef.current = hoverSpeed;
            }
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") {
              targetSpeedRef.current = normalSpeed;
              hoveredIndexRef.current = -1;
            }
          }}
          onFocusCapture={() => {
            targetSpeedRef.current = 0;
          }}
          onBlurCapture={() => {
            targetSpeedRef.current = normalSpeed;
          }}
        >
          <div
            ref={trackRef}
            className="relative flex w-max gap-4 will-change-transform sm:gap-5 lg:gap-6"
          >
            {Array.from({ length: 4 }, (_, repeat) =>
              customDesigns.map((item, index) => {
                const cardIndex = repeat * customDesigns.length + index;
                return (
                  <div
                    key={`${repeat}-${item.id}`}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        hoveredIndexRef.current = cardIndex;
                      }
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") {
                        hoveredIndexRef.current = -1;
                      }
                    }}
                    className="group relative aspect-square w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-[#F7F5F2] shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] will-change-transform sm:w-[240px] sm:rounded-[24px] md:w-[270px] lg:w-[290px]"
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} - Miraya Diamonds Custom Design`}
                      fill
                      sizes="(max-width: 640px) 200px, (max-width: 1024px) 270px, 290px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
