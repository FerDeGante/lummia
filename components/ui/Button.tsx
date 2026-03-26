import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<{
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
}> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">;

const variants = {
  primary:
    "bg-[linear-gradient(135deg,rgba(253,249,241,0.95),rgba(250,237,218,0.96))] text-[var(--ink)] shadow-[0_18px_40px_-22px_rgba(98,63,34,0.24),inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-[rgba(202,167,120,0.34)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-22px_rgba(98,63,34,0.32),inset_0_1px_0_rgba(255,255,255,0.92)]",
  secondary:
    "bg-[rgba(255,255,255,0.7)] text-[var(--ink)] backdrop-blur-xl ring-1 ring-[rgba(159,132,95,0.18)] shadow-[0_16px_40px_-24px_rgba(87,60,28,0.18),inset_0_1px_0_rgba(255,255,255,0.92)] hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.88)]",
  ghost:
    "bg-transparent text-[var(--ink)] hover:bg-[rgba(255,255,255,0.6)]",
};

const sizes = {
  sm: "h-11 px-4 text-[0.82rem]",
  md: "h-12 px-5 text-[0.88rem]",
  lg: "h-13 px-6 text-[0.94rem]",
};

const baseClassName =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.02em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(184,146,93,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  icon = false,
  ...props
}: ButtonProps) {
  const classes = cn(baseClassName, variants[variant], sizes[size], className);

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (href) {
    const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
