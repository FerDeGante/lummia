"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BRAND_ASSETS, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavbarProps = {
  onOpenSpace: () => void;
};

export function Navbar({ onOpenSpace }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto sm:gap-6 sm:px-4",
          scrolled
            ? "bg-[rgba(255,251,245,0.82)] shadow-[0_24px_50px_-36px_rgba(79,50,23,0.32),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-[rgba(177,145,104,0.16)] backdrop-blur-xl"
            : "bg-[rgba(255,255,255,0.62)] shadow-[0_20px_44px_-34px_rgba(79,50,23,0.22),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-[rgba(177,145,104,0.12)] backdrop-blur-lg",
        )}
      >
        <a href="#top" className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(250,237,218,0.72))] ring-1 ring-[rgba(177,145,104,0.18)]">
            <Image
              src={BRAND_ASSETS.icon}
              alt="Ícono de Lúmmia"
              width={34}
              height={34}
              className="h-8 w-8 rounded-full object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.96rem] font-semibold tracking-[-0.04em] text-[var(--ink)]">
              Lúmmia
            </p>
            <p className="truncate text-[0.68rem] uppercase tracking-[0.22em] text-[var(--muted)] max-[380px]:hidden">
              Donde las ideas se encuentran
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.86rem] font-medium tracking-[-0.02em] text-[var(--muted)] transition hover:bg-white/70 hover:text-[var(--ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button size="sm" className="shrink-0 max-[380px]:px-3" onClick={onOpenSpace}>
          Solicitar espacio
        </Button>
      </div>
    </header>
  );
}
