"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ActivatedAccent } from "@/components/motion/ActivatedAccent";
import { Reveal } from "@/components/motion/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSTAGRAM_POSTS, SOCIAL } from "@/lib/constants";

export function InstagramSection() {
  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Instagram"
              title={
                <>
                  Síguenos en{" "}
                  <ActivatedAccent gradientClassName="from-[var(--copper)] via-[var(--gold)] to-[var(--olive)]">
                    Instagram
                  </ActivatedAccent>
                </>
              }
              text="No te pierdas todas las novedades y sorpresas."
            />

            <Link
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[rgba(244,242,238,0.62)] px-5 py-3 text-[0.9rem] font-medium tracking-[-0.02em] text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.94)] ring-1 ring-[rgba(177,145,104,0.08)] transition hover:bg-white"
            >
              Ver perfil
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {INSTAGRAM_POSTS.map((post, index) => (
            <Reveal key={post} delay={index * 0.06}>
              <Link href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="block">
                <GlassPanel className="group overflow-hidden rounded-[2rem] p-2 transition-transform duration-500 hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-[1.6rem]">
                    <Image
                      src={post}
                      alt={`Vista de Instagram ${index + 1}`}
                      width={900}
                      height={1200}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1280px) 50vw, 25vw"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(20,14,10,0.22))]" />
                  </div>
                </GlassPanel>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
