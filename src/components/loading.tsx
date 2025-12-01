"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMount, useUnmount } from "react-use";
import { create } from "zustand";

const MotionImage = motion.create(Image);

interface SplashScreenProps {
  minDisplayTime?: number;
}

interface VisibleState {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const useVisible = create<VisibleState>()((set) => ({
  isVisible: true,
  setIsVisible: (isVisible: boolean) => {
    set({ isVisible });
  },
}));

export function SplashScreen({ minDisplayTime = 1200 }: SplashScreenProps) {
  const { isVisible, setIsVisible } = useVisible();

  useMount(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, minDisplayTime);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-screen grid place-items-center fixed top-0 left-0 z-50 bg-background overflow-hidden"
        >
          {/* Atmospheric gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.488 0.243 264.376 / 0.15) 0%, transparent 70%)",
                animation: "splash-orb-pulse 3s ease-in-out infinite",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.627 0.265 303.9 / 0.1) 0%, transparent 70%)",
                animation: "splash-orb-pulse 3s ease-in-out 1.5s infinite",
              }}
            />
          </div>

          {/* Main content */}
          <div className="flex flex-col items-center justify-center relative z-10">
            {/* Logo container with glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative mb-4"
            >
              {/* Glow behind logo */}
              <motion.div
                animate={{
                  opacity: [0.6, 0.9, 0.6],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 blur-xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.488 0.243 264.376 / 0.5) 0%, transparent 70%)",
                }}
              />
              <MotionImage
                src="/assets/logo/amanotes.png"
                alt="Amanotes"
                width={400}
                height={400}
                className="size-16 relative z-10"
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9,
                }}
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl font-bold mb-2 tracking-tight"
            >
              Amanotes x FALAS
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.6,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-sm text-muted-foreground text-center max-w-[280px] mb-4"
            >
              FALAS Good Kids - Recognizing outstanding achievements in our
              community.
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-1.5 mb-4"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary/80"
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.16,
                  }}
                />
              ))}
            </motion.div>

            {/* Version */}
            <motion.small
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xs text-muted-foreground/60"
            >
              Version 1.0.0 - Made with ❤️ by Amanotes
            </motion.small>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SplashScreenFallback() {
  const { setIsVisible } = useVisible();
  useMount(() => {
    setIsVisible(true);
    console.log("mount");
  });

  useUnmount(() => {
    setIsVisible(false);
    console.log("unmount");
  });

  return null;
}
interface SplashLoadingProps {
  className?: string;
}

export const SplashLoading = ({ className }: SplashLoadingProps) => {
  return (
    <div
      className={cn(
        "w-full h-screen grid place-items-center fixed top-0 left-0 z-[9999] bg-background overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="relative mb-4">
          <div
            className="absolute inset-0 blur-xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, oklch(0.488 0.243 264.376 / 0.5) 0%, transparent 70%)",
            }}
          />
          <Image
            src="/assets/logo/amanotes.png"
            alt="Amanotes"
            width={400}
            height={400}
            className="size-16 relative z-10 animate-pulse"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/80"
              style={{
                animation: `splash-dot-bounce 1.4s ease-in-out ${
                  i * 0.16
                }s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
