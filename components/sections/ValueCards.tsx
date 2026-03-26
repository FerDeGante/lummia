"use client";

import { Compass, Sparkles, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Reveal } from "@/components/motion/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VALUE_CARDS } from "@/lib/constants";

const icons = {
  sparkles: Sparkles,
  compass: Compass,
  users: Users,
};

export function ValueCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Qué es Lúmmia"
            title={
              <>
                Un espacio con propósito para{" "}
                <ActivatedAccent gradientClassName="from-[var(--gold)] via-[var(--copper)] to-[var(--gold)]">
                  vender mejor
                </ActivatedAccent>{" "}
                y{" "}
                <ActivatedAccent gradientClassName="from-[var(--olive)] via-[var(--gold)] to-[var(--copper)]">
                  descubrir mejor
                </ActivatedAccent>
              </>
            }
            text="Tres formas de entender Lúmmia sin explicación de más."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {VALUE_CARDS.map((card, index) => {
            const Icon = icons[card.key as keyof typeof icons];

            return (
              <motion.div
                key={card.title}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.24 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  duration: prefersReducedMotion ? 0 : 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
              >
                <GlassPanel
                  tone="strong"
                  className="flex h-full flex-col rounded-[2rem] p-7 transition-shadow duration-500 hover:shadow-[0_34px_72px_-40px_rgba(84,55,27,0.22),inset_0_1px_0_rgba(255,255,255,0.98)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(250,237,218,0.74))] text-[var(--gold)] ring-1 ring-[rgba(177,145,104,0.14)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 text-[1.72rem] font-semibold leading-9 tracking-[-0.05em] text-[var(--ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 tracking-[-0.02em] text-[var(--muted)]">
                    {card.text}
                  </p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
