import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    tone?: "default" | "strong" | "soft";
  }
>;

const tones = {
  default:
    "bg-[var(--surface-glass)] ring-1 ring-[rgba(177,145,104,0.16)] shadow-[0_24px_60px_-34px_rgba(84,55,27,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl",
  strong:
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(251,247,240,0.78))] ring-1 ring-[rgba(177,145,104,0.2)] shadow-[0_28px_64px_-36px_rgba(84,55,27,0.22),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-xl",
  soft:
    "bg-[rgba(255,255,255,0.56)] ring-1 ring-[rgba(177,145,104,0.12)] shadow-[0_16px_42px_-32px_rgba(84,55,27,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-lg",
};

export function GlassPanel({
  children,
  className,
  tone = "default",
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
