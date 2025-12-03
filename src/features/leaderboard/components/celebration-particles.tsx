"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useCallback, memo } from "react";

export interface CelebrationParticlesProps {
  isActive: boolean;
  variant?: "confetti" | "sparkle" | "burst";
  className?: string;
  duration?: number;
  particleCount?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
  type: "circle" | "star" | "diamond" | "line";
}

const CELEBRATION_COLORS = [
  "#a855f7", // violet-500
  "#d946ef", // fuchsia-500
  "#ec4899", // pink-500
  "#f472b6", // pink-400
  "#c084fc", // purple-400
  "#e879f9", // fuchsia-400
  "#fbbf24", // amber-400
  "#f59e0b", // amber-500
];

const PARTICLE_TYPES: Particle["type"][] = [
  "circle",
  "star",
  "diamond",
  "line",
];

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 1,
    color:
      CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)],
    delay: Math.random() * 0.3,
    type: PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)],
  }));
};

const ParticleShape = memo(
  ({ type, color }: { type: Particle["type"]; color: string }) => {
    switch (type) {
      case "star":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "diamond":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
            <path d="M12 2L2 12l10 10 10-10L12 2z" />
          </svg>
        );
      case "line":
        return (
          <div
            className="w-full h-1 rounded-full"
            style={{ backgroundColor: color }}
          />
        );
      default:
        return (
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        );
    }
  }
);

ParticleShape.displayName = "ParticleShape";

export const CelebrationParticles = memo(
  ({
    isActive,
    variant = "confetti",
    className,
    duration = 2000,
    particleCount = 30,
  }: CelebrationParticlesProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showParticles, setShowParticles] = useState(false);

    const triggerCelebration = useCallback(() => {
      setParticles(generateParticles(particleCount));
      setShowParticles(true);

      const timer = setTimeout(() => {
        setShowParticles(false);
      }, duration);

      return () => {
        clearTimeout(timer);
        setShowParticles(false);
        setParticles([]);
      };
    }, [particleCount, duration]);

    useEffect(() => {
      if (isActive) {
        const cleanup = triggerCelebration();
        return cleanup;
      }
    }, [isActive, triggerCelebration]);

    const getAnimationVariants = (particle: Particle) => {
      if (variant === "burst") {
        const angle = (particle.id / particleCount) * Math.PI * 2;
        const distance = 80 + Math.random() * 60;
        return {
          initial: {
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          },
          animate: {
            opacity: [0, 1, 1, 0],
            scale: [0, particle.scale, particle.scale, 0],
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotate: particle.rotation + 360,
          },
          exit: { opacity: 0, scale: 0 },
        };
      }

      if (variant === "sparkle") {
        return {
          initial: { opacity: 0, scale: 0 },
          animate: {
            opacity: [0, 1, 1, 0],
            scale: [0, particle.scale, particle.scale * 1.5, 0],
            rotate: [0, 180, 360],
          },
          exit: { opacity: 0, scale: 0 },
        };
      }

      // Default confetti
      return {
        initial: {
          opacity: 0,
          scale: 0,
          y: -20,
        },
        animate: {
          opacity: [0, 1, 1, 0.8, 0],
          scale: [0, particle.scale, particle.scale, particle.scale * 0.8, 0],
          y: [0, -30, 80, 150],
          x: [0, (Math.random() - 0.5) * 100],
          rotate: [0, particle.rotation, particle.rotation * 2],
        },
        exit: { opacity: 0, scale: 0, y: 200 },
      };
    };

    return (
      <div
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden z-50",
          className
        )}
      >
        <AnimatePresence>
          {showParticles &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${particle.x}%`,
                  top: variant === "confetti" ? "0%" : `${particle.y}%`,
                  width: particle.type === "line" ? "16px" : "8px",
                  height: particle.type === "line" ? "8px" : "8px",
                }}
                variants={getAnimationVariants(particle)}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: duration / 1000,
                  delay: particle.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ParticleShape type={particle.type} color={particle.color} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    );
  }
);

CelebrationParticles.displayName = "CelebrationParticles";

export interface ShimmerEffectProps {
  isActive: boolean;
  className?: string;
}

export const ShimmerEffect = memo(
  ({ isActive, className }: ShimmerEffectProps) => {
    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={cn(
              "absolute inset-0 overflow-hidden rounded-full pointer-events-none",
              className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ShimmerEffect.displayName = "ShimmerEffect";

export interface GlowPulseProps {
  isActive: boolean;
  color?: string;
  className?: string;
}

export const GlowPulse = memo(
  ({ isActive, color = "#a855f7", className }: GlowPulseProps) => {
    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full pointer-events-none",
              className
            )}
            style={{
              boxShadow: `0 0 0 0 ${color}`,
            }}
            initial={{
              opacity: 0,
              boxShadow: `0 0 0 0 ${color}40`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              boxShadow: [
                `0 0 0 0 ${color}40`,
                `0 0 30px 10px ${color}60`,
                `0 0 60px 20px ${color}00`,
              ],
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        )}
      </AnimatePresence>
    );
  }
);

GlowPulse.displayName = "GlowPulse";

export interface CongratsBannerProps {
  isVisible: boolean;
  periodLabel?: string;
  className?: string;
}

export const CongratsBanner = memo(
  ({ isVisible, periodLabel, className }: CongratsBannerProps) => {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 z-50",
              "px-6 py-2 rounded-full",
              "bg-gradient-to-r from-violet-500/20 via-fuchsia-500/30 to-violet-500/20",
              "border border-white/20 backdrop-blur-xl",
              "shadow-[0_0_40px_10px_rgba(168,85,247,0.3)]",
              className
            )}
            initial={{
              opacity: 0,
              y: -30,
              scale: 0.8,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.9,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="text-2xl"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
              >
                🎉
              </motion.span>
              <span className="text-sm font-semibold text-white">
                {periodLabel ? `Congratulations on ${periodLabel}` : "Congratulations!"}
              </span>
              <motion.span
                className="text-2xl"
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: "easeInOut",
                }}
              >
                🏆
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

CongratsBanner.displayName = "CongratsBanner";
