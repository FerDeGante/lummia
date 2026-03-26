"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const isTouchDevice =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      lerp: isTouchDevice ? 0.12 : 0.14,
      smoothWheel: true,
      syncTouch: isTouchDevice,
      wheelMultiplier: 1.08,
      touchMultiplier: isTouchDevice ? 1.12 : 1,
    });

    const onScroll = () => ScrollTrigger.update();
    const onResize = () => ScrollTrigger.refresh();
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    lenis.on("scroll", onScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.cancelAnimationFrame(refreshFrame);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
