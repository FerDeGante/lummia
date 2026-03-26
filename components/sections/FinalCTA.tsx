"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

type FinalCTAProps = {
  onOpenSpace: () => void;
  onOpenUpdates: () => void;
};

export function FinalCTA({ onOpenSpace, onOpenUpdates }: FinalCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 pb-22 pt-18 sm:px-6 lg:px-8 lg:pb-28 lg:pt-22">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.88, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassPanel tone="strong" className="rounded-[2.5rem] px-6 py-10 sm:px-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div className="relative">
                <div className="absolute -left-6 top-0 h-46 w-46 rounded-full bg-[radial-gradient(circle,rgba(205,168,116,0.16),transparent_68%)] blur-3xl" />
                <p className="relative text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  Cierre
                </p>
                <h2 className="relative mt-5 max-w-4xl text-balance text-[clamp(2.8rem,5.2vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--ink)]">
                  No solo abrimos un espacio.{" "}
                  <ActivatedAccent gradientClassName="from-[var(--copper)] via-[var(--gold)] to-[var(--olive)]">
                    Construimos una comunidad.
                  </ActivatedAccent>
                </h2>
                <p className="relative mt-5 max-w-2xl text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)] sm:text-[1.08rem]">
                  La diferencia está en cómo presentas la marca, cómo captas la atención y cómo{" "}
                  <ActivatedAccent gradientClassName="from-[var(--gold)] via-[var(--copper)] to-[var(--gold)]">
                    conviertes una visita en relación.
                  </ActivatedAccent>
                </p>
              </div>

              <div className="grid gap-4 sm:max-w-md lg:ml-auto">
                <GlassPanel className="rounded-[1.8rem] p-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                    Lúmmia
                  </p>
                  <p className="mt-4 text-[1.28rem] font-semibold leading-7 tracking-[-0.04em] text-[var(--ink)]">
                    Un sitio pensado para vender mejor la experiencia, la comunidad y la presencia de
                    cada marca.
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
