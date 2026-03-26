"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STORY_STEPS, STORY_SUPPORT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function StickyStorySection() {
  const prefersReducedMotion = useReducedMotion();
  const storyRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copiesRef = useRef<Array<HTMLDivElement | null>>([]);
  const visualsRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !storyRef.current || !pinRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const copies = copiesRef.current.filter(
        (node): node is HTMLDivElement => Boolean(node),
      );
      const visuals = visualsRef.current.filter(
        (node): node is HTMLDivElement => Boolean(node),
      );

      if (!copies.length || !visuals.length) {
        return;
      }

      const getScrollMetrics = () => {
        const viewportHeight = window.innerHeight;
        const width = window.innerWidth;
        const isLandscape = width > viewportHeight;

        if (width >= 1024) {
          return {
            startOffset: isLandscape ? 18 : 28,
            length: Math.max(viewportHeight * (isLandscape ? 1.25 : 1.5), isLandscape ? 1200 : 1440),
          };
        }

        if (width >= 768) {
          return {
            startOffset: isLandscape ? 12 : 20,
            length: Math.max(viewportHeight * (isLandscape ? 1.45 : 1.85), isLandscape ? 980 : 1600),
          };
        }

        return {
          startOffset: isLandscape ? 10 : 16,
          length: Math.max(viewportHeight * (isLandscape ? 1.6 : 2.05), isLandscape ? 900 : 1680),
        };
      };

      gsap.set([...copies, ...visuals], { autoAlpha: 0, y: 28, scale: 0.98 });
      gsap.set([copies[0], visuals[0]], { autoAlpha: 1, y: 0, scale: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: () => {
            const { startOffset } = getScrollMetrics();

            return `top top+=${startOffset}`;
          },
          end: () => {
            const { length } = getScrollMetrics();

            return `+=${length}`;
          },
          scrub: 0.42,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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
    }, storyRef);

    return () => ctx.revert();
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

      <div ref={storyRef} className="relative mx-auto mt-14 max-w-7xl">
        <div ref={pinRef} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <div className="relative min-h-[22rem] sm:min-h-[24rem] lg:min-h-[25rem]">
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
                <h3 className="mt-5 max-w-xl text-balance text-[clamp(2rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--ink)]">
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

          <div className="relative min-h-[25rem] sm:min-h-[31rem] lg:h-[38rem]">
            {STORY_STEPS.map((step, index) => (
              <div
                key={step}
                ref={(node) => {
                  visualsRef.current[index] = node;
                }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 rounded-[2.1rem] bg-[radial-gradient(circle_at_50%_12%,rgba(250,237,218,0.76),transparent_36%),radial-gradient(circle_at_16%_84%,rgba(130,144,106,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,249,241,0.45))] sm:rounded-[2.6rem]" />
                <GlassPanel
                  tone="strong"
                  className="absolute left-[6%] top-[12%] h-[64%] w-[58%] rounded-[1.9rem] p-5 sm:left-[8%] sm:top-[10%] sm:h-[68%] sm:w-[52%] sm:rounded-[2.2rem] sm:p-8"
                >
                  <div className="h-full rounded-[1.4rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(245,233,215,0.5))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:rounded-[1.8rem]">
                    <div
                      className="h-full rounded-[1.4rem] sm:rounded-[1.8rem]"
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
                <GlassPanel className="absolute right-[6%] top-[16%] w-[44%] max-w-[11.5rem] rounded-[1.4rem] p-4 sm:right-[10%] sm:top-[18%] sm:w-[38%] sm:max-w-[13rem] sm:rounded-[1.8rem] sm:p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    {index === 0 ? "Espacio editorial" : index === 1 ? "Presencia de marca" : "Descubrimiento"}
                  </p>
                  <p className="mt-3 text-[0.9rem] font-semibold leading-6 tracking-[-0.04em] text-[var(--ink)] sm:text-[1.02rem]">
                    {index === 0
                      ? "Una visita con intención empieza por un entorno que no se siente improvisado."
                      : index === 1
                        ? "Cada propuesta gana marco, contexto y claridad visual."
                        : "El recorrido invita a quedarse, explorar y volver."}
                  </p>
                </GlassPanel>
                <div className="absolute bottom-[10%] right-[14%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(205,168,116,0.28),transparent_66%)] blur-2xl sm:h-36 sm:w-36" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
