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

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        if (sectionRef.current && leftColumnRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top+=118",
            end: "bottom bottom-=40",
            pin: leftColumnRef.current,
            pinSpacing: false,
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
                start: "top 76%",
              },
            },
          );

          ScrollTrigger.create({
            trigger: item,
            start: "top 58%",
            end: "bottom 44%",
            onToggle: (self) => {
              if (self.isActive) {
                setActiveIndex(index);
              }
            },
          });
        });
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="espacios" className="px-4 py-18 sm:px-6 lg:px-8 lg:py-30">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-10">
        <div className="md:self-start">
          <div ref={leftColumnRef}>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Espacios
          </p>
          <h2 className="mt-5 text-balance text-[clamp(2.6rem,4.7vw,4.85rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink)]">
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
                className="rounded-[2rem] p-7 transition-all duration-500 md:min-h-[21rem] md:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
                    Beneficio {formatIndex(index)}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(205,168,116,0.2),transparent_66%)]" />
                </div>
                <h3 className="mt-8 max-w-2xl text-balance text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] md:text-[2.6rem]">
                  {benefit.title}
                </h3>
                <p className="mt-5 max-w-2xl text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)] md:text-[1.04rem]">
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
