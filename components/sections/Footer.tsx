"use client";

import Image from "next/image";
import { BRAND_ASSETS, NAV_LINKS, SOCIAL } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(177,145,104,0.1)] bg-[rgba(255,255,255,0.72)] px-4 py-12 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src={BRAND_ASSETS.icon}
                  alt="Lúmmia"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div>
                <p className="text-[1rem] font-semibold tracking-[-0.04em] text-[var(--ink)]">
                  Lúmmia
                </p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  Tienda Colectiva
                </p>
              </div>
            </div>
            <p className="max-w-xs text-[0.88rem] leading-6 tracking-[-0.01em] text-[var(--muted)]">
              Donde las ideas se encuentran. Un espacio para marcas locales con identidad, en el corazón de Cuernavaca.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Lúmmia"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(244,242,238,0.8)] text-[var(--muted)] ring-1 ring-[rgba(177,145,104,0.14)] transition-all duration-300 hover:bg-white hover:text-[var(--ink)] hover:shadow-[0_8px_24px_-12px_rgba(84,55,27,0.18)]"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de Lúmmia"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(244,242,238,0.8)] text-[var(--muted)] ring-1 ring-[rgba(177,145,104,0.14)] transition-all duration-300 hover:bg-white hover:text-[var(--ink)] hover:shadow-[0_8px_24px_-12px_rgba(84,55,27,0.18)]"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <nav className="grid gap-2">
            <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Secciones
            </p>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.88rem] tracking-[-0.01em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(177,145,104,0.1)] pt-6">
          <p className="text-[0.78rem] tracking-[-0.01em] text-[rgba(46,35,26,0.42)]">
            © {year} Lúmmia Tienda Colectiva. Todos los derechos reservados.
          </p>
          <p className="text-[0.78rem] tracking-[-0.01em] text-[rgba(46,35,26,0.36)]">
            Cuernavaca, Morelos
          </p>
        </div>
      </div>
    </footer>
  );
}
