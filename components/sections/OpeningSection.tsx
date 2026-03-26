"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { OPENING_CHIPS } from "@/lib/constants";

type OpeningSectionProps = {
  onOpenSpace: () => void;
  onOpenUpdates: () => void;
};

export function OpeningSection({ onOpenSpace, onOpenUpdates }: OpeningSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassPanel tone="strong" className="rounded-[2.4rem] px-6 py-8 sm:px-10 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
              <div className="relative">
                <div className="absolute -left-10 top-4 h-42 w-42 rounded-full bg-[radial-gradient(circle,rgba(205,168,116,0.16),transparent_68%)] blur-3xl" />
                <p className="relative inline-flex rounded-full bg-white/70 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)] ring-1 ring-[rgba(177,145,104,0.16)]">
                  Apertura con intención
                </p>
                <h2 className="relative mt-6 max-w-4xl text-balance text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink)]">
                  Esta apertura no debe quedarse solo en{" "}
                  <ActivatedAccent gradientClassName="from-[var(--gold)] via-[var(--copper)] to-[var(--gold)]">
                    visitas del momento.
                  </ActivatedAccent>
                </h2>
                <p className="relative mt-5 max-w-2xl text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)] sm:text-[1.08rem]">
                  Debe convertirse en{" "}
                  <ActivatedAccent gradientClassName="from-[var(--olive)] via-[var(--gold)] to-[var(--copper)]">
                    comunidad, registros
                  </ActivatedAccent>{" "}
                  y nuevas oportunidades para crecer.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {OPENING_CHIPS.map((chip, index) => (
                    <motion.div
                      key={chip}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : index * 0.07,
                        duration: prefersReducedMotion ? 0 : 0.7,
                      }}
                    >
                      <GlassPanel className="rounded-full px-4 py-3">
                        <span className="text-[0.78rem] font-medium tracking-[-0.02em] text-[var(--ink)]">
                          {chip}
                        </span>
                      </GlassPanel>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:max-w-md lg:ml-auto">
                <GlassPanel className="rounded-[1.8rem] p-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                    Próxima apertura
                  </p>
                  <p className="mt-4 text-[1.55rem] font-semibold tracking-[-0.05em] text-[var(--ink)]">
                    Una oportunidad para construir atención antes de que empiece la rutina.
                  </p>
                </GlassPanel>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" icon onClick={onOpenSpace}>
                    Solicitar espacio
                  </Button>
                  <Button size="lg" variant="secondary" onClick={onOpenUpdates}>
                    Recibir novedades
                  </Button>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
