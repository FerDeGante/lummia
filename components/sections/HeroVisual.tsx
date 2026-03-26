"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { HERO_FLOATING_PANELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 100, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 100, damping: 18, mass: 0.6 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const deepLayerY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [20, -28]);
  const midLayerY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [6, -18]);
  const petalOneY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [18, -18]);
  const petalOneRotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-6, 6]);
  const petalTwoY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -20]);
  const petalTwoRotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [8, -4]);
  const petalThreeY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [12, -14]);
  const petalThreeRotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-10, 2]);
  const panelOneX = useTransform(springX, (value) => value * 0.22);
  const panelOneY = useTransform(springY, (value) => value * -0.18);
  const panelTwoX = useTransform(springX, (value) => value * -0.18);
  const panelTwoY = useTransform(springY, (value) => value * 0.2);
  const panelThreeX = useTransform(springX, (value) => value * 0.22);
  const panelThreeY = useTransform(springY, (value) => value * -0.18);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[0.96] w-full max-w-[42rem]"
      onPointerMove={(event) => {
        if (prefersReducedMotion) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 24;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 24;

        pointerX.set(x);
        pointerY.set(y);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_18%,rgba(253,244,228,0.92),transparent_48%),radial-gradient(circle_at_18%_88%,rgba(197,165,116,0.15),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(128,143,104,0.12),transparent_34%)]" />
      <motion.div
        className="absolute inset-[8%] rounded-[2.2rem]"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.96),transparent_32%),linear-gradient(140deg,rgba(255,255,255,0.88),rgba(255,250,244,0.4))] shadow-[inset_0_1px_0_rgba(255,255,255,0.94)]"
          style={{ y: deepLayerY }}
        />
        <motion.div
          className="absolute inset-[7%] rounded-[1.8rem] border border-white/50 bg-[radial-gradient(circle_at_62%_24%,rgba(250,236,214,0.72),transparent_26%),radial-gradient(circle_at_34%_64%,rgba(225,205,175,0.32),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,249,241,0.56))] shadow-[0_34px_80px_-42px_rgba(84,55,27,0.24),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl"
          style={{ y: midLayerY }}
        />

        <motion.div
          className="absolute left-[18%] top-[11%] h-[54%] w-[54%] rounded-[46%] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,230,208,0.78))] shadow-[0_38px_84px_-42px_rgba(84,55,27,0.24),inset_0_1px_0_rgba(255,255,255,0.96)]"
          style={{ y: petalOneY, rotate: petalOneRotate }}
        />
        <motion.div
          className="absolute right-[12%] top-[18%] h-[38%] w-[38%] rounded-[48%] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(227,210,180,0.68))] shadow-[0_26px_72px_-36px_rgba(84,55,27,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]"
          style={{ y: petalTwoY, rotate: petalTwoRotate }}
        />
        <motion.div
          className="absolute bottom-[9%] left-[29%] h-[34%] w-[34%] rounded-[46%] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(221,206,182,0.68))] shadow-[0_24px_70px_-36px_rgba(84,55,27,0.18),inset_0_1px_0_rgba(255,255,255,0.92)]"
          style={{ y: petalThreeY, rotate: petalThreeRotate }}
        />

        <GlassPanel
          tone="strong"
          className="absolute right-[8%] top-[50%] max-w-[15rem] rounded-[1.6rem] p-4 max-[480px]:right-[4%] max-[480px]:top-[54%] max-[480px]:max-w-[11.5rem] sm:p-5"
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Unveiling local
          </p>
          <p className="mt-3 text-[1.05rem] font-semibold leading-6 tracking-[-0.04em] text-[var(--ink)]">
            Una experiencia clara, curada y pensada para verse mejor.
          </p>
        </GlassPanel>
      </motion.div>

      {HERO_FLOATING_PANELS.map((panel, index) => (
        <motion.div
          key={panel.label}
          className={cn("absolute", panel.position)}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 0.5 + index * 0.12,
            duration: prefersReducedMotion ? 0 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={
            prefersReducedMotion
              ? undefined
              : index === 0
                ? { x: panelOneX, y: panelOneY }
                : index === 1
                  ? { x: panelTwoX, y: panelTwoY }
                  : { x: panelThreeX, y: panelThreeY }
          }
        >
          <GlassPanel className="rounded-full px-4 py-3">
            <p className="text-[0.78rem] font-medium tracking-[-0.02em] text-[var(--ink)]">
              {panel.label}
            </p>
          </GlassPanel>
        </motion.div>
      ))}
    </div>
  );
}
