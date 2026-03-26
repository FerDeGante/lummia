"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { HERO_CHIPS } from "@/lib/constants";
import { HeroVisual } from "./HeroVisual";

type HeroProps = {
  onOpenSpace: () => void;
};

const headlineLines = ["Lúmmia:", "donde las ideas", "se encuentran"];

export function Hero({ onOpenSpace }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-14 pt-30 sm:px-6 sm:pt-34 lg:px-8 lg:pt-38">
      <div className="absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_50%_0%,rgba(251,239,220,0.24),transparent_58%),radial-gradient(circle_at_18%_24%,rgba(196,160,121,0.06),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(130,144,106,0.04),transparent_18%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="max-w-3xl">
          <motion.p
            className="inline-flex rounded-full bg-[rgba(255,255,255,0.72)] px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.3em] text-[var(--muted)] ring-1 ring-[rgba(177,145,104,0.14)] backdrop-blur-xl"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            Próxima apertura · Cuernavaca
          </motion.p>

          <h1 className="mt-7 text-balance text-[clamp(3.3rem,7.2vw,7rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-[var(--ink)]">
            {headlineLines.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.1 + index * 0.08,
                  duration: prefersReducedMotion ? 0 : 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {index === 1 ? (
                  <>
                    donde las{" "}
                    <ActivatedAccent gradientClassName="from-[var(--gold)] via-[var(--copper)] to-[var(--olive)]">
                      ideas
                    </ActivatedAccent>
                  </>
                ) : index === 2 ? (
                  <>
                    se{" "}
                    <ActivatedAccent gradientClassName="from-[var(--olive)] via-[var(--gold)] to-[var(--copper)]">
                      encuentran
                    </ActivatedAccent>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-2xl text-pretty text-[1.08rem] leading-8 tracking-[-0.025em] text-[var(--muted)] sm:text-[1.16rem]"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.32,
              duration: prefersReducedMotion ? 0 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Una tienda colectiva para descubrir marcas locales con identidad y para emprendedores que
            quieren crecer en un espacio que proyecta valor.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.46,
              duration: prefersReducedMotion ? 0 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Button size="lg" icon onClick={onOpenSpace}>
              Solicitar espacio
            </Button>
            <Button size="lg" variant="secondary" href="#marcas">
              Conocer marcas
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.56,
              duration: prefersReducedMotion ? 0 : 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {HERO_CHIPS.map((chip) => (
              <GlassPanel key={chip} className="rounded-full px-4 py-3">
                <span className="text-[0.82rem] font-medium tracking-[-0.02em] text-[var(--ink)]">
                  {chip}
                </span>
              </GlassPanel>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 0.22,
            duration: prefersReducedMotion ? 0 : 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
