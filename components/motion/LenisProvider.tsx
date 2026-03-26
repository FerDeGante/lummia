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

    const lenis = new Lenis({
      lerp: 0.14,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.08,
      touchMultiplier: 1,
    });

    const onScroll = () => ScrollTrigger.update();
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", onScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
