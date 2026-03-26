"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STORY_STEPS, STORY_SUPPORT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function StickyStorySection() {
  const prefersReducedMotion = useReducedMotion();
  const desktopRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copiesRef = useRef<Array<HTMLDivElement | null>>([]);
  const visualsRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !desktopRef.current || !pinRef.current) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const copies = copiesRef.current.filter(Boolean);
        const visuals = visualsRef.current.filter(Boolean);

        gsap.set([...copies, ...visuals], { autoAlpha: 0, y: 28, scale: 0.98 });
        gsap.set([copies[0], visuals[0]], { autoAlpha: 1, y: 0, scale: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: desktopRef.current,
            start: "top top+=24",
            end: "+=1520",
            scrub: 0.42,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        });

        visuals.forEach((_, index) => {
          if (index === 0) {
            return;
          }

          timeline
            .to([copies[index - 1], visuals[index - 1]], {
              autoAlpha: 0,
              y: -18,
              scale: 0.985,
              duration: 0.36,
            })
            .to(
              [copies[index], visuals[index]],
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.42,
              },
              "<0.02",
            );
        });
      }, desktopRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="concepto" className="relative px-4 py-18 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Concepto"
          title={
            <>
              Una narrativa que hace visible por qué Lúmmia{" "}
              <ActivatedAccent>se siente distinta.</ActivatedAccent>
            </>
          }
          text="La experiencia está pensada para que el valor se entienda sin fricción, tanto para quien descubre como para quien quiere crecer dentro del espacio."
        />
      </div>

      <div ref={desktopRef} className="relative mx-auto mt-14 hidden max-w-7xl md:block">
        <div ref={pinRef} className="grid min-h-screen grid-cols-[0.9fr_1.1fr] items-center gap-12">
          <div className="relative min-h-[25rem]">
            {STORY_STEPS.map((step, index) => (
              <div
                key={step}
                ref={(node) => {
                  copiesRef.current[index] = node;
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                  {`Paso 0${index + 1}`}
                </p>
                <h3 className="mt-5 max-w-xl text-balance text-[clamp(3rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--ink)]">
                  {index === 1 ? (
                    <>
                      Es visibilidad para marcas con{" "}
                      <ActivatedAccent gradientClassName="from-[var(--gold)] via-[var(--copper)] to-[var(--olive)]">
                        identidad.
                      </ActivatedAccent>
                    </>
                  ) : index === 2 ? (
                    <>
                      Es un destino para personas que quieren descubrir algo{" "}
                      <ActivatedAccent gradientClassName="from-[var(--olive)] via-[var(--gold)] to-[var(--copper)]">
                        real.
                      </ActivatedAccent>
                    </>
                  ) : (
                    step
                  )}
                </h3>
                <p className="mt-6 max-w-lg text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)]">
                  {STORY_SUPPORT}
                </p>
              </div>
            ))}
          </div>

          <div className="relative h-[38rem]">
            {STORY_STEPS.map((step, index) => (
              <div
                key={step}
                ref={(node) => {
                  visualsRef.current[index] = node;
                }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 rounded-[2.6rem] bg-[radial-gradient(circle_at_50%_12%,rgba(250,237,218,0.76),transparent_36%),radial-gradient(circle_at_16%_84%,rgba(130,144,106,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,249,241,0.45))]" />
                <GlassPanel
                  tone="strong"
                  className="absolute left-[8%] top-[10%] h-[68%] w-[52%] rounded-[2.2rem] p-8"
                >
                  <div className="h-full rounded-[1.8rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(245,233,215,0.5))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div
                      className="h-full rounded-[1.8rem]"
                      style={{
                        background:
                          index === 0
                            ? "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.95), transparent 26%), linear-gradient(180deg, rgba(255,249,241,0.82), rgba(239,227,207,0.54))"
                            : index === 1
                              ? "radial-gradient(circle at 66% 28%, rgba(255,255,255,0.95), transparent 22%), linear-gradient(180deg, rgba(255,252,246,0.82), rgba(220,228,208,0.58))"
                              : "radial-gradient(circle at 50% 24%, rgba(255,255,255,0.95), transparent 22%), linear-gradient(180deg, rgba(255,250,244,0.84), rgba(233,222,204,0.5))",
                      }}
                    />
                  </div>
                </GlassPanel>
                <GlassPanel className="absolute right-[10%] top-[18%] w-[38%] rounded-[1.8rem] p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    {index === 0 ? "Espacio editorial" : index === 1 ? "Presencia de marca" : "Descubrimiento"}
                  </p>
                  <p className="mt-3 text-[1.02rem] font-semibold leading-6 tracking-[-0.04em] text-[var(--ink)]">
                    {index === 0
                      ? "Una visita con intención empieza por un entorno que no se siente improvisado."
                      : index === 1
                        ? "Cada propuesta gana marco, contexto y claridad visual."
                        : "El recorrido invita a quedarse, explorar y volver."}
                  </p>
                </GlassPanel>
                <div className="absolute bottom-[10%] right-[14%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(205,168,116,0.28),transparent_66%)] blur-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:hidden">
        {STORY_STEPS.map((step, index) => (
          <motion.div
            key={step}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : index * 0.06 }}
          >
            <GlassPanel className="rounded-[2rem] p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                {`Paso 0${index + 1}`}
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">{step}</h3>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{STORY_SUPPORT}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
