"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, Info, PenLine, Star, Video, X } from "lucide-react";

export function ReviewModalTrigger({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastTouchYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      height: document.body.style.height,
      overscrollBehavior: document.body.style.overscrollBehavior,
      touchAction: document.body.style.touchAction,
    };
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.height = "100dvh";
    document.body.style.overscrollBehavior = "none";
    document.body.style.touchAction = "none";
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("wheel", preventBackgroundScroll, { capture: true, passive: false });
    document.addEventListener("touchmove", preventBackgroundScroll, { capture: true, passive: false });

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior;
      document.body.style.overflow = originalBodyStyle.overflow;
      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.width = originalBodyStyle.width;
      document.body.style.height = originalBodyStyle.height;
      document.body.style.overscrollBehavior = originalBodyStyle.overscrollBehavior;
      document.body.style.touchAction = originalBodyStyle.touchAction;
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("wheel", preventBackgroundScroll, { capture: true });
      document.removeEventListener("touchmove", preventBackgroundScroll, { capture: true });
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const scrollModalBy = (delta: number) => {
    if (!modalRef.current) return;
    modalRef.current.scrollTop += delta;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <PenLine size={14} className="md:h-3.5 md:w-3.5" />
        Write a Review
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex touch-none items-end justify-center overflow-hidden bg-black/55 px-3 py-4 backdrop-blur-[1px] md:items-center md:p-6">
          <div
            ref={modalRef}
            onWheel={(event) => {
              event.preventDefault();
              event.stopPropagation();
              scrollModalBy(event.deltaY);
            }}
            onTouchStart={(event) => {
              lastTouchYRef.current = event.touches[0]?.clientY ?? null;
            }}
            onTouchMove={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const nextY = event.touches[0]?.clientY;
              if (nextY == null || lastTouchYRef.current == null) return;
              scrollModalBy(lastTouchYRef.current - nextY);
              lastTouchYRef.current = nextY;
            }}
            onTouchEnd={() => {
              lastTouchYRef.current = null;
            }}
            className="relative max-h-[94vh] w-full max-w-[420px] touch-none overflow-y-auto overscroll-contain rounded-2xl bg-white p-4 shadow-2xl md:max-w-[560px] md:p-5"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close review modal"
              className="absolute right-4 top-4 text-[#8A8A8A] transition-colors hover:text-[#2F2B2B]"
            >
              <X size={22} />
            </button>

            <div className="pr-8">
              <h2 className="font-serif text-[32px] font-bold leading-none text-[#202020] md:text-[24px]">
                Write a Review
              </h2>
              <p className="mt-2 text-[15px] leading-[22px] text-[#6A6A6A] md:text-[12px] md:leading-[16px]">
                Share your experience and help others find their perfect piece.
              </p>
            </div>

            <div className="mt-6 flex gap-4 rounded-xl border border-[#F3D7DD] bg-[#FCF6F6] p-3 md:mt-4 md:gap-3">
              <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-lg bg-[#F0EDED] md:h-[76px] md:w-[76px]">
                <Image
                  src="/Dashboard/productimg.png"
                  alt="Aria Floral Pavé Stud Earrings"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="inline-flex max-w-full rounded-full bg-[#FBE3E8] px-3 py-1 text-[10px] font-semibold text-[#D44A62]">
                  IGI Certified Natural Diamonds
                </span>
                <h3 className="mt-2 truncate font-serif text-[18px] font-bold text-[#252525] md:text-[17px]">
                  Aria Floral Pavé Stud Earrings
                </h3>
                <p className="mt-1 text-[12px] leading-[18px] text-[#6F6F6F] md:text-[11px] md:leading-[15px]">
                  Metal: 18K Rose Gold <span className="mx-2 text-[#C7B5B8]">|</span>
                  Carat: 0.42 ct VVS-VS <span className="mx-2 text-[#C7B5B8]">|</span>
                  BIS Hallmarked
                </p>
                <p className="text-[12px] text-[#9A9A9A] md:text-[11px]">Order ID: #AJ-984210</p>
              </div>
            </div>

            <div className="mt-6 md:mt-4">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-[#333] md:text-[12px]">
                  Your Rating <span className="text-[#D44A62]">*</span>
                </label>
                <span className="text-[14px] font-medium text-[#D44A62] md:text-[11px]">Great</span>
              </div>
              <div className="mt-3 flex gap-2 text-[#B1394C] md:mt-2 md:gap-1.5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    fill={star < 4 ? "currentColor" : "none"}
                    strokeWidth={2}
                    className="md:h-[21px] md:w-[21px]"
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 md:mt-4">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[14px] font-bold text-[#333] md:text-[12px]">
                  Review Title <span className="text-[#D44A62]">*</span>
                </label>
                <span className="text-[11px] text-[#A7A7A7]">22/100</span>
              </div>
              <div className="flex h-11 items-center rounded-lg border border-[#DCDCDC] px-4 text-[14px] text-[#333]">
                Absolutely Stunning!
              </div>
            </div>

            <div className="mt-5 md:mt-4">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[14px] font-bold text-[#333] md:text-[12px]">
                  Your Review <span className="text-[#D44A62]">*</span>
                </label>
              </div>
              <div className="min-h-[140px] rounded-lg border border-[#DCDCDC] px-4 py-3 text-[14px] leading-[24px] text-[#444] md:min-h-[104px] md:text-[12px] md:leading-[18px]">
                The earrings are even more beautiful in person. The sparkle is amazing and the quality is top-notch. Packaging was also very elegant. Highly recommended!
                <div className="mt-2 text-right text-[11px] text-[#A7A7A7]">142/500</div>
              </div>
            </div>

            <div className="mt-5 md:mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[14px] font-bold text-[#333] md:text-[12px]">
                  Add Photos or Videos <span className="font-normal text-[#777]">(Optional)</span>
                </h3>
                <button type="button" className="inline-flex items-center gap-1 text-[12px] text-[#777] md:text-[10px]">
                  Upload Guidelines
                  <Info size={12} />
                </button>
              </div>
              <p className="mt-1 text-[13px] text-[#777] md:text-[11px]">
                Share real moments. Photos and videos help other customers.
              </p>

              <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                {["/Dashboard/productimg.png", "/testimonials/neha.jpg"].map((src) => (
                  <div key={src} className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-lg bg-[#F0EDED] md:h-[64px] md:w-[64px]">
                    <Image src={src} alt="Uploaded review media" fill sizes="80px" className="object-cover" />
                    <button
                      type="button"
                      aria-label="Remove media"
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/55 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button type="button" className="flex h-[78px] w-[92px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-[#F5B8C4] bg-[#FFF7F8] text-[12px] font-medium text-[#D44A62] md:h-[64px] md:w-[78px] md:text-[10px]">
                  <ImageIcon size={22} />
                  Add Photo
                </button>
                <button type="button" className="flex h-[78px] w-[92px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-[#F5B8C4] bg-[#FFF7F8] text-[12px] font-medium text-[#D44A62] md:h-[64px] md:w-[78px] md:text-[10px]">
                  <Video size={22} />
                  Add Video
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-[16px] text-[#9A9A9A] md:text-[10px]">
                You can upload up to 5 files (JPG, PNG, MP4, MOV). Max size 20MB each.
              </p>
            </div>

            <label className="mt-5 flex items-start gap-3 md:mt-4">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#CB485E] text-white">
                <CheckIcon />
              </span>
              <span>
                <span className="block text-[13px] font-semibold leading-[18px] text-[#333] md:text-[11px]">
                  I confirm that this review is based on my genuine experience.
                </span>
                <span className="mt-1 block text-[12px] text-[#8A8A8A] md:text-[10px]">
                  Inappropriate reviews may be removed.
                </span>
              </span>
            </label>

            <div className="mt-6 grid grid-cols-2 gap-3 md:mt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-11 rounded-full border border-[#F5B8C4] text-[13px] font-semibold text-[#D44A62]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-11 rounded-full bg-[#CB485E] text-[13px] font-semibold text-white"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none">
      <path d="M4 8.2 6.6 11 12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
