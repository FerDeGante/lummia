"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

type ModalLeadFormProps = {
  open: boolean;
  type: "space" | "updates" | null;
  onClose: () => void;
};

const defaults = {
  space: {
    title: "Solicitar espacio en Lúmmia",
    intro:
      "Déjanos tus datos y te contactaremos con información sobre espacios, dinámica de participación y siguientes pasos.",
    fields: [
      { name: "name", label: "Nombre", type: "text" },
      { name: "brand", label: "Marca", type: "text" },
      { name: "email", label: "Correo", type: "email" },
      { name: "whatsapp", label: "WhatsApp", type: "tel" },
    ],
    submit: "Enviar solicitud",
    success: "Gracias. Recibimos tu solicitud y te contactaremos pronto.",
  },
  updates: {
    title: "Recibir novedades de Lúmmia",
    intro:
      "Déjanos tus datos para enviarte noticias sobre nuevas marcas, eventos y promociones.",
    fields: [
      { name: "name", label: "Nombre", type: "text" },
      { name: "email", label: "Correo", type: "email" },
    ],
    submit: "Quiero enterarme",
    success: "Listo. Ya formas parte de la comunidad Lúmmia.",
  },
} as const;

export function ModalLeadForm({ open, type, onClose }: ModalLeadFormProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const config = useMemo(() => (type ? defaults[type] : null), [type]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && config ? (
        <ModalLeadFormContent
          key={type}
          config={config}
          onClose={onClose}
          prefersReducedMotion={prefersReducedMotion}
        />
      ) : null}
    </AnimatePresence>
  );
}

type ModalLeadFormContentProps = {
  config: (typeof defaults)["space"] | (typeof defaults)["updates"];
  onClose: () => void;
  prefersReducedMotion: boolean;
};

function ModalLeadFormContent({
  config,
  onClose,
  prefersReducedMotion,
}: ModalLeadFormContentProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(250,245,238,0.64)] px-4 pb-4 pt-24 backdrop-blur-md sm:items-center"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 36, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 26, scale: 0.98 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.46,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <GlassPanel tone="strong" className="overflow-hidden rounded-[2rem] px-5 py-5 sm:px-8 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-md">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                Lúmmia
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
                {config.title}
              </h3>
              <p className="mt-4 text-sm leading-6 tracking-[-0.01em] text-[var(--muted)] sm:text-[0.98rem]">
                {config.intro}
              </p>
            </div>
            <button
              type="button"
              aria-label="Cerrar modal"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,255,255,0.72)] text-[var(--ink)] ring-1 ring-[rgba(177,145,104,0.15)] transition hover:bg-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 rounded-[1.65rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.48))] p-1 ring-1 ring-[rgba(177,145,104,0.12)]">
            {submitted ? (
              <div className="rounded-[1.45rem] bg-white/65 px-5 py-8 text-center backdrop-blur-lg sm:px-8 sm:py-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(250,237,218,0.95),rgba(255,255,255,0.72))] ring-1 ring-[rgba(177,145,104,0.18)] shadow-[0_18px_32px_-24px_rgba(84,55,27,0.26)]">
                  <span className="text-lg font-semibold tracking-[-0.04em] text-[var(--gold)]">OK</span>
                </div>
                <p className="mt-6 text-[1.45rem] font-semibold tracking-[-0.05em] text-[var(--ink)]">
                  Registro enviado
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)] sm:text-[0.97rem]">
                  {config.success}
                </p>
                <Button className="mt-8" onClick={onClose}>
                  Cerrar
                </Button>
              </div>
            ) : (
              <form
                className="grid gap-4 rounded-[1.45rem] bg-white/60 px-4 py-5 backdrop-blur-lg sm:grid-cols-2 sm:px-6 sm:py-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                {config.fields.map((field) => (
                  <label
                    key={field.name}
                    className={field.name === "brand" || field.name === "email" ? "sm:col-span-2" : ""}
                  >
                    <span className="mb-2 block text-[0.82rem] font-medium tracking-[-0.02em] text-[var(--ink)]">
                      {field.label}
                    </span>
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      className="h-13 w-full rounded-[1rem] border border-[rgba(177,145,104,0.14)] bg-[rgba(255,255,255,0.78)] px-4 text-[0.95rem] tracking-[-0.02em] text-[var(--ink)] outline-none transition placeholder:text-[rgba(46,35,26,0.36)] focus:border-[rgba(177,145,104,0.32)] focus:bg-white"
                      placeholder={field.label}
                    />
                  </label>
                ))}

                <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-5 text-[var(--muted)]">
                    Estado local listo para conectarse después con backend, CRM o automatización.
                  </p>
                  <Button type="submit" icon>
                    Enviar
                  </Button>
                </div>
              </form>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}
