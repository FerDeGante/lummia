"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BENEFITS } from "@/lib/constants";
import { formatIndex } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type BenefitStoryProps = {
  onOpenSpace: () => void;
};

export function BenefitStory({ onOpenSpace }: BenefitStoryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const mm = gsap.matchMedia();

    const getBenefitMetrics = () => {
      const viewportHeight = window.innerHeight;
      const width = window.innerWidth;
      const isLandscape = width > viewportHeight;

      if (width >= 1024) {
        return {
          pinStart: `top top+=${isLandscape ? 88 : 118}`,
          pinEnd: `bottom bottom-=${isLandscape ? 28 : 40}`,
          itemRevealStart: isLandscape ? "top 82%" : "top 76%",
          itemActiveStart: isLandscape ? "top 64%" : "top 58%",
          itemActiveEnd: isLandscape ? "bottom 40%" : "bottom 44%",
        };
      }

      if (width >= 768) {
        return {
          pinStart: `top top+=${isLandscape ? 60 : 88}`,
          pinEnd: `bottom bottom-=${isLandscape ? 18 : 24}`,
          itemRevealStart: isLandscape ? "top 88%" : "top 84%",
          itemActiveStart: isLandscape ? "top 78%" : "top 72%",
          itemActiveEnd: isLandscape ? "bottom 34%" : "bottom 38%",
        };
      }

      return {
        pinStart: `top top+=${isLandscape ? 48 : 72}`,
        pinEnd: `bottom bottom-=${isLandscape ? 16 : 20}`,
        itemRevealStart: isLandscape ? "top 90%" : "top 86%",
        itemActiveStart: isLandscape ? "top 80%" : "top 76%",
        itemActiveEnd: isLandscape ? "bottom 32%" : "bottom 36%",
      };
    };

    const setupStory = (pinSpacing: boolean) => {
      const ctx = gsap.context(() => {
        if (sectionRef.current && leftColumnRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: () => getBenefitMetrics().pinStart,
            end: () => getBenefitMetrics().pinEnd,
            pin: leftColumnRef.current,
            pinSpacing,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        }

        itemsRef.current.forEach((item, index) => {
          if (!item) {
            return;
          }

          gsap.fromTo(
            item,
            { opacity: 0.68, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.56,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: () => getBenefitMetrics().itemRevealStart,
              },
            },
          );

          ScrollTrigger.create({
            trigger: item,
            start: () => getBenefitMetrics().itemActiveStart,
            end: () => getBenefitMetrics().itemActiveEnd,
            onToggle: (self) => {
              if (self.isActive) {
                setActiveIndex(index);
              }
            },
          });
        });
      });

      return () => ctx.revert();
    };

    mm.add("(min-width: 1024px)", () =>
      setupStory(false),
    );

    mm.add("(max-width: 1023px)", () =>
      setupStory(true),
    );

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="espacios" className="px-4 py-18 sm:px-6 lg:px-8 lg:py-30">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
        <div className="lg:self-start">
          <div ref={leftColumnRef}>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Espacios
            </p>
            <h2 className="mt-5 text-balance text-[clamp(2.2rem,5vw,4.85rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink)]">
              <ActivatedAccent gradientClassName="from-[var(--gold)] via-[var(--copper)] to-[var(--gold)]">
                Solicitar espacio
              </ActivatedAccent>{" "}
              tiene sentido cuando el sitio también{" "}
              <ActivatedAccent gradientClassName="from-[var(--copper)] via-[var(--gold)] to-[var(--olive)]">
                vende tu marca.
              </ActivatedAccent>
            </h2>
            <p className="mt-5 max-w-xl text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)]">
              Lúmmia ayuda a que la presencia física no se vea como un puesto más, sino como una
              propuesta con valor comercial.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`rounded-full px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.22em] transition-all duration-500 ${
                    activeIndex === index
                      ? "bg-[rgba(255,255,255,0.9)] text-[var(--ink)] ring-1 ring-[rgba(177,145,104,0.18)] shadow-[0_18px_30px_-24px_rgba(84,55,27,0.18)]"
                      : "bg-transparent text-[rgba(46,35,26,0.42)] ring-1 ring-transparent"
                  }`}
                >
                  {formatIndex(index)}
                </div>
              ))}
            </div>

            <Button className="mt-9" onClick={onOpenSpace}>
              Solicitar espacio
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              ref={(node) => {
                itemsRef.current[index] = node;
              }}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{
                delay: prefersReducedMotion ? 0 : index * 0.05,
                duration: prefersReducedMotion ? 0 : 0.82,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassPanel
                tone={activeIndex === index ? "strong" : "default"}
                className="rounded-[2rem] p-6 transition-all duration-500 sm:p-7 lg:min-h-[21rem] lg:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
                    Beneficio {formatIndex(index)}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(205,168,116,0.2),transparent_66%)]" />
                </div>
                <h3 className="mt-8 max-w-2xl text-balance text-[1.72rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] sm:text-[2rem] lg:text-[2.6rem]">
                  {benefit.title}
                </h3>
                <p className="mt-5 max-w-2xl text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)] lg:text-[1.04rem]">
                  {benefit.text}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
