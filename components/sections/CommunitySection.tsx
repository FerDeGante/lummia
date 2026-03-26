"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

type CommunitySectionProps = {
  onOpenUpdates: () => void;
};

export function CommunitySection({ onOpenUpdates }: CommunitySectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <GlassPanel tone="strong" className="rounded-[2.4rem] px-6 py-10 sm:px-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="relative">
                <div className="absolute -left-8 top-2 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(130,144,106,0.14),transparent_68%)] blur-3xl" />
                <p className="relative text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  Comunidad
                </p>
                <h2 className="relative mt-5 max-w-3xl text-balance text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink)]">
                  Únete a la comunidad{" "}
                  <ActivatedAccent gradientClassName="from-[var(--olive)] via-[var(--gold)] to-[var(--copper)]">
                    Lúmmia
                  </ActivatedAccent>
                </h2>
                <p className="relative mt-5 max-w-xl text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)] sm:text-[1.08rem]">
                  Recibe noticias sobre nuevas marcas, promociones, eventos y lanzamientos especiales.
                </p>
                <p className="relative mt-3 max-w-lg text-sm leading-6 tracking-[-0.01em] text-[var(--muted)]">
                  Un sitio que ordena la conversación que hoy empieza en Instagram y la convierte en comunidad.
                </p>
                <motion.div
                  className="mt-8"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: prefersReducedMotion ? 0 : 0.7 }}
                >
                  <Button size="lg" icon onClick={onOpenUpdates}>
                    Recibir novedades
                  </Button>
                </motion.div>
              </div>

              <div className="grid gap-4 sm:max-w-md lg:ml-auto">
                <GlassPanel className="rounded-[1.8rem] p-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                    Para clientes
                  </p>
                  <p className="mt-4 text-[1.28rem] font-semibold leading-7 tracking-[-0.04em] text-[var(--ink)]">
                    Entérate primero de nuevas marcas, eventos y promociones exclusivas.
                  </p>
                </GlassPanel>
                <GlassPanel className="rounded-[1.8rem] p-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                    Para emprendedores
                  </p>
                  <p className="mt-4 text-[1.28rem] font-semibold leading-7 tracking-[-0.04em] text-[var(--ink)]">
                    Una presencia clara para marcas que quieren crecer con comunidad real.
                  </p>
                </GlassPanel>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
