"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || /^\/(admin|dashboard|account)(\/|$)/.test(pathname)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    function syncScrollLock() {
      if (!lenis) return;
      const locked = [document.documentElement, document.body].some(
        (element) => window.getComputedStyle(element).overflowY === "hidden"
      );
      if (locked) lenis.stop();
      else lenis.start();
    }

    function setup() {
      lenis?.destroy();
      lenis = undefined;
      if (motion.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
      syncScrollLock();
    }

    const observer = new MutationObserver(syncScrollLock);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    motion.addEventListener("change", setup);
    setup();

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", setup);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
