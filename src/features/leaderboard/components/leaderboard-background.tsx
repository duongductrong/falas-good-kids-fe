"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface LeaderboardBackgroundProps extends ComponentProps<"div"> {}

export const LeaderboardBackground = ({
  className,
  ...props
}: LeaderboardBackgroundProps) => {
  return (
    <div
      {...props}
      className={cn(
        "fixed inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
      aria-hidden="true"
    >
      {/* Base solid background */}
      <div
        className="absolute inset-0 bg-background"
      />

      {/* Base gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.25 0.08 264.376 / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 50%, oklch(0.2 0.06 303.9 / 0.2) 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at 0% 50%, oklch(0.2 0.08 264.376 / 0.15) 0%, transparent 40%),
            radial-gradient(ellipse 50% 30% at 50% 100%, oklch(0.18 0.05 22.24 / 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating orb - top center (championship glow) */}
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl animate-orb-float"
        style={{
          background:
            "radial-gradient(circle, oklch(0.35 0.15 264.376 / 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Floating orb - left side (2nd place accent) */}
      <div
        className="absolute top-[30%] -left-[10%] w-[400px] h-[400px] rounded-full blur-3xl animate-orb-float-delayed"
        style={{
          background:
            "radial-gradient(circle, oklch(0.3 0.12 264.376 / 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Floating orb - right side (3rd place accent) */}
      <div
        className="absolute top-[30%] -right-[10%] w-[400px] h-[400px] rounded-full blur-3xl animate-orb-float-delayed-2"
        style={{
          background:
            "radial-gradient(circle, oklch(0.35 0.1 142.52 / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)",
        }}
      />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, oklch(0.08 0.005 285.823 / 0.6) 100%)",
        }}
      />

      {/* Bottom fade for table readability */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, oklch(0.141 0.005 285.823) 0%, transparent 100%)",
        }}
      />

      {/* Accent light beams (subtle) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[30%] opacity-10"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.6 0.2 264.376 / 0.8) 0%, transparent 100%)",
          boxShadow: "0 0 40px 10px oklch(0.5 0.2 264.376 / 0.3)",
        }}
      />
    </div>
  );
};

