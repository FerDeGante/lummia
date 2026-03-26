"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Reveal } from "@/components/motion/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURED_BRANDS } from "@/lib/constants";
import { cn, formatIndex } from "@/lib/utils";

export function BrandShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPlaying = !prefersReducedMotion && !isPaused;
  const totalSlides = useMemo(() => formatIndex(FEATURED_BRANDS.length - 1), []);
  const brand = FEATURED_BRANDS[activeIndex];

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % FEATURED_BRANDS.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="marcas" className="px-4 py-18 sm:px-6 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Curaduría"
            title={
              <>
                Marcas <ActivatedAccent>destacadas</ActivatedAccent>
              </>
            }
            text="Una curaduría que se siente real desde el primer vistazo."
          />
        </Reveal>

        <div className="mt-12">
          <div className="relative overflow-hidden rounded-[2.6rem] bg-[rgba(255,255,255,0.94)] p-2 shadow-[0_28px_72px_-52px_rgba(87,60,28,0.1)] ring-1 ring-[rgba(177,145,104,0.08)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={`${brand.name}-${activeIndex}`}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -22 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2.35rem] bg-white px-5 py-5 sm:px-7 sm:py-7 lg:px-8 lg:py-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(177,145,104,0.1)] bg-[rgba(255,255,255,0.94)] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.94)]">
                    <span className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                      Lúmmia Select
                    </span>
                    <span className="text-[0.76rem] font-semibold tracking-[0.18em] text-[var(--gold)]">
                      {formatIndex(activeIndex)} / {totalSlides}
                    </span>
                  </div>
                  <div className="inline-flex rounded-full border border-[rgba(177,145,104,0.1)] bg-[rgba(255,255,255,0.94)] px-4 py-2.5 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.94)]">
                    Marca destacada
                  </div>
                </div>

                <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                  <div className="relative min-h-[23rem] overflow-hidden rounded-[2.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(253,250,245,0.9))] p-4 sm:min-h-[30rem] sm:p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(205,168,116,0.12),transparent_24%),radial-gradient(circle_at_80%_82%,rgba(128,143,104,0.08),transparent_20%)]" />
                    <div className="absolute inset-[8%] overflow-hidden rounded-[2rem] border border-white/88 bg-white shadow-[0_38px_74px_-42px_rgba(84,55,27,0.12),inset_0_1px_0_rgba(255,255,255,0.98)]">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        className="object-contain p-8"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    </div>
                    <GlassPanel className="absolute left-4 top-4 rounded-full px-4 py-3 sm:left-6 sm:top-6">
                      <span className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        {brand.name}
                      </span>
                    </GlassPanel>
                    <GlassPanel className="absolute right-4 top-4 max-w-[13rem] rounded-[1.4rem] px-4 py-4 sm:right-6 sm:top-6">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Lúmmia
                      </p>
                      <p className="mt-3 text-[0.96rem] font-semibold leading-6 tracking-[-0.04em] text-[var(--ink)]">
                        Selección real de marcas para mostrar identidad y presencia visual.
                      </p>
                    </GlassPanel>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[rgba(46,35,26,0.46)]">
                          Marca local
                        </p>
                        <p className="mt-2 text-[clamp(1.5rem,3vw,2.6rem)] font-semibold tracking-[-0.06em] text-[var(--ink)]">
                          {brand.name}
                        </p>
                      </div>
                      <div className="hidden rounded-full border border-white/78 bg-white/72 px-4 py-3 text-[0.82rem] font-medium tracking-[-0.02em] text-[var(--muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.96)] sm:block">
                        {formatIndex(activeIndex)}
                      </div>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-between pb-1 pt-1 lg:pt-3">
                    <div>
                      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
                        Marca destacada
                      </p>
                      <h3 className="mt-4 max-w-xl text-balance text-[clamp(2.6rem,4.8vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--ink)]">
                        {brand.name}
                      </h3>
                      <p className="mt-5 max-w-lg text-[1.06rem] leading-8 tracking-[-0.025em] text-[var(--muted)]">
                        {brand.text}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <GlassPanel className="rounded-[1.6rem] p-5">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                          Selección
                        </p>
                        <p className="mt-3 text-[1.14rem] font-semibold leading-7 tracking-[-0.04em] text-[var(--ink)]">
                          Curaduría visual enfocada en una sola marca por slide.
                        </p>
                      </GlassPanel>
                      <GlassPanel className="rounded-[1.6rem] p-5">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                          Descripción
                        </p>
                        <p className="mt-3 text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)]">
                          {brand.text}
                        </p>
                      </GlassPanel>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-center gap-4">
            <div className="flex items-center gap-3 rounded-full bg-[rgba(244,242,238,0.52)] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.94)] ring-1 ring-[rgba(177,145,104,0.08)]">
              {FEATURED_BRANDS.map((brand, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={brand.name}
                    type="button"
                    aria-label={`Ir al slide ${index + 1}`}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "w-14 bg-[var(--ink)]"
                        : "w-2.5 bg-[rgba(33,24,17,0.28)] hover:bg-[rgba(33,24,17,0.44)]",
                    )}
                    onClick={() => setActiveIndex(index)}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(244,242,238,0.52)] text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.94)] ring-1 ring-[rgba(177,145,104,0.08)] transition hover:bg-white"
              onClick={() => setIsPaused((current) => !current)}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
