"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock3, MapPin, MessageCircleMore } from "lucide-react";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LOCATION } from "@/lib/constants";

export function LocationSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="ubicacion" className="px-4 py-18 sm:px-6 lg:px-8 lg:py-30">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Ubicación y contacto
            </p>
            <h2 className="mt-5 text-balance text-[clamp(2.6rem,4.8vw,4.9rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink)]">
              Visítanos en el{" "}
              <ActivatedAccent gradientClassName="from-[var(--gold)] via-[var(--copper)] to-[var(--olive)]">
                Centro de Cuernavaca
              </ActivatedAccent>
            </h2>
            <p className="mt-5 text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)] sm:text-[1.05rem]">
              Nos encontramos a lado de Correos de México, junto a Palacio de Gobierno.
            </p>

            <div className="mt-10 space-y-4">
              <GlassPanel className="rounded-[1.6rem] p-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(250,237,218,0.72))] text-[var(--gold)] ring-1 ring-[rgba(177,145,104,0.16)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                      Dirección
                    </p>
                    <p className="mt-2 text-[1rem] leading-7 tracking-[-0.02em] text-[var(--ink)]">
                      {LOCATION.address}
                    </p>
                  </div>
                </div>
              </GlassPanel>

              <GlassPanel className="rounded-[1.6rem] p-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(250,237,218,0.72))] text-[var(--gold)] ring-1 ring-[rgba(177,145,104,0.16)]">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                      Horario
                    </p>
                    <p className="mt-2 text-[1rem] leading-7 tracking-[-0.02em] text-[var(--ink)]">
                      {LOCATION.hours}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={LOCATION.whatsappUrl} target="_blank" rel="noreferrer" icon>
                Abrir WhatsApp
              </Button>
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.64)] px-4 py-3 text-[0.82rem] font-medium tracking-[-0.02em] text-[var(--muted)] ring-1 ring-[rgba(177,145,104,0.14)]">
                <MessageCircleMore className="h-4 w-4 text-[var(--gold)]" />
                {LOCATION.whatsappLabel}
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 tracking-[-0.01em] text-[var(--muted)]">
              Si llegas por Instagram, aquí seguimos la conversación con más claridad y menos fricción.
            </p>
          </div>
        </Reveal>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassPanel tone="strong" className="relative rounded-[2.4rem] p-5 sm:p-7">
            <div className="absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_68%_20%,rgba(250,237,218,0.32),transparent_28%)]" />
            <a
              href={LOCATION.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="relative block min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/45 sm:min-h-[26rem]"
            >
              <iframe
                src={LOCATION.mapsEmbed}
                title="Lúmmia en Google Maps"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0, filter: "saturate(0.82) brightness(1.04)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[rgba(177,145,104,0.14)]" />
              <GlassPanel className="pointer-events-none absolute right-4 top-4 max-w-[13rem] rounded-[1.5rem] p-4 sm:right-6 sm:top-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                  Centro de Cuernavaca
                </p>
                <p className="mt-3 text-[1rem] font-semibold leading-6 tracking-[-0.04em] text-[var(--ink)]">
                  Toca para abrir en Google Maps
                </p>
              </GlassPanel>
            </a>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
