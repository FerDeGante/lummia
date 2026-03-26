"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<
  HTMLMotionProps<"div"> & {
    delay?: number;
    y?: number;
    duration?: number;
  }
>;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.8,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
