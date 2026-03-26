"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ActivatedAccentProps = {
  children: React.ReactNode;
  className?: string;
  gradientClassName?: string;
  delay?: number;
};

export function ActivatedAccent({
  children,
  className,
  gradientClassName = "from-[var(--copper)] via-[var(--gold)] to-[var(--olive)]",
  delay = 0.12,
}: ActivatedAccentProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <span ref={ref} className={cn("relative inline-block align-baseline", className)}>
      <span className="text-[var(--ink)]">{children}</span>
      <motion.span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-r bg-clip-text text-transparent",
          gradientClassName,
        )}
        initial={
          prefersReducedMotion
            ? { opacity: 1, clipPath: "inset(0 0 0 0)" }
            : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
        }
        animate={
          isInView
            ? { opacity: 1, clipPath: "inset(0 0 0 0)" }
            : prefersReducedMotion
              ? { opacity: 1, clipPath: "inset(0 0 0 0)" }
              : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 0.9,
          delay: prefersReducedMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
