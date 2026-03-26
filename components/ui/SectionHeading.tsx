import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-[clamp(2.35rem,5vw,4.95rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--ink)]">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 max-w-2xl text-pretty text-[1rem] leading-7 tracking-[-0.02em] text-[var(--muted)]">
          {text}
        </p>
      ) : null}
    </div>
  );
}
