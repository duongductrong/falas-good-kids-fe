"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePeriodContext } from "@/features/period";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { isEmpty, isNil } from "lodash-es";
import { CalendarDays, ChevronDown, Infinity, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  cloneElement,
  ComponentProps,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRangeQuery } from "../hooks/use-range-query";
import Container, { ContainerProps } from "../layout/container";
import { LeaderboardRange } from "../queries";
import {
  CelebrationParticles,
  CongratsBanner,
  GlowPulse,
  ShimmerEffect,
} from "./celebration-particles";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export interface LeaderboardPeriodProps extends ContainerProps {}

export const LeaderboardPeriod = ({
  className,
  ...props
}: LeaderboardPeriodProps) => {
  const [range, setRange] = useRangeQuery();
  const { periodConfigs, currentPeriod, duration, setDuration } =
    usePeriodContext();

  const [showCelebration, setShowCelebration] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [celebrationLabel, setCelebrationLabel] = useState<
    string | undefined
  >();
  const [buttonPulse, setButtonPulse] = useState(false);
  const isInitialMount = useRef(true);
  const previousRange = useRef(range);
  const previousDuration = useRef(duration);

  useEffect(() => {
    if (range === LeaderboardRange.ALL_TIME) {
      setDuration("");
      return;
    }

    const isMissingDuration =
      range === LeaderboardRange.MONTHLY && isNil(duration);

    if ((isMissingDuration || isEmpty(duration)) && currentPeriod) {
      setDuration(currentPeriod?.label);
    }
  }, [duration, currentPeriod, range, setDuration]);

  const triggerCelebration = useCallback((label?: string) => {
    setCelebrationLabel(label);
    setShowCelebration(true);
    setShowBanner(true);
    setButtonPulse(true);

    const celebrationTimer = setTimeout(() => {
      setShowCelebration(false);
    }, 2500);

    const bannerTimer = setTimeout(() => {
      setShowBanner(false);
    }, 3000);

    const pulseTimer = setTimeout(() => {
      setButtonPulse(false);
    }, 1000);

    return () => {
      clearTimeout(celebrationTimer);
      clearTimeout(bannerTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousRange.current = range;
      previousDuration.current = duration;
      return;
    }

    const rangeChanged = previousRange.current !== range;
    const durationChanged =
      previousDuration.current !== duration && duration !== "";

    if (rangeChanged || durationChanged) {
      const label =
        range === LeaderboardRange.ALL_TIME
          ? "All Time Leaders"
          : duration
          ? `T${duration}`
          : undefined;
      triggerCelebration(label);
    }

    previousRange.current = range;
    previousDuration.current = duration;
  }, [range, duration, triggerCelebration]);

  const handleRangeChange = (value: string) => {
    setRange(value as LeaderboardRange);
  };

  const handleDurationSelect = (label: string) => {
    setDuration(label);
  };

  return (
    <Drawer variant="tray">
      <Container
        {...props}
        className={cn(
          "relative flex flex-col items-center justify-center gap-4",
          className
        )}
      >
        <CelebrationParticles
          isActive={showCelebration}
          variant="burst"
          particleCount={40}
          duration={2500}
          className="min-h-[50vh]"
        />

        <CongratsBanner
          isVisible={showBanner}
          periodLabel={celebrationLabel}
          className="top-32"
        />

        <motion.div
          className="flex items-center flex-col md:flex-row gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            className={cn(
              "relative flex items-center gap-1 rounded-full bg-white/[0.03] p-1 backdrop-blur-xl border border-white/[0.08] shadow-[0_0_30px_-5px_rgba(124,58,237,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
              buttonPulse && "animate-border-glow-pulse"
            )}
          >
            <GlowPulse isActive={buttonPulse} color="#a855f7" />
            <ShimmerEffect isActive={buttonPulse} />

            <motion.div
              className={cn(
                "absolute top-1 h-[calc(100%-8px)] rounded-full",
                "bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20",
                "shadow-[0_0_20px_2px_rgba(139,92,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
                "border border-white/10"
              )}
              initial={false}
              animate={{
                left:
                  range === LeaderboardRange.ALL_TIME
                    ? "4px"
                    : "calc(50% + 1px)",
                width:
                  range === LeaderboardRange.ALL_TIME
                    ? "calc(50% - 6px)"
                    : "calc(50% - 6px)",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />

            <LeaderboardPeriodButton
              isActive={range === LeaderboardRange.ALL_TIME}
              icon={<Infinity className="size-4 transition-all duration-300" />}
              onClick={() => handleRangeChange(LeaderboardRange.ALL_TIME)}
            >
              <span>All time</span>
            </LeaderboardPeriodButton>

            <LeaderboardPeriodButton
              isActive={range === LeaderboardRange.MONTHLY}
              icon={
                <CalendarDays className="size-4 transition-all duration-300" />
              }
              onClick={() => handleRangeChange(LeaderboardRange.MONTHLY)}
            >
              <span>Monthly</span>
            </LeaderboardPeriodButton>
          </div>

          <AnimatePresence mode="wait">
            {range === LeaderboardRange.MONTHLY ? (
              <motion.div
                key="monthly-selector"
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{
                  duration: 0.3,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "group relative h-auto rounded-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 shadow-[0_0_20px_-5px_rgba(217,70,239,0.15)]",
                      "overflow-hidden"
                    )}
                  >
                    <motion.span
                      className="flex items-center gap-2 text-sm font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        className="text-fuchsia-400/90"
                        animate={
                          buttonPulse
                            ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 10, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        T
                      </motion.span>
                      <span className="text-white">{duration}</span>
                      <motion.div
                        animate={{ rotate: buttonPulse ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="size-3.5 text-white/50 group-hover:text-white/80 transition-colors duration-300" />
                      </motion.div>
                    </motion.span>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-fuchsia-500/20 to-violet-500/0"
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "100%", opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </DrawerTrigger>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <Button
          variant="ghost"
          className={cn(
            "group relative h-auto rounded-full px-4 py-2.5 mb-4",
            "overflow-hidden cursor-pointer hover:bg-transparent",
            "hidden sm:flex"
          )}
          onClick={() =>
            triggerCelebration(
              range === LeaderboardRange.ALL_TIME
                ? "All Time Leaders"
                : duration
                ? `T${duration}`
                : undefined
            )
          }
        >
          <Sparkles className="size-4" />
        </Button>
      </Container>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 justify-center">
            <Sparkles className="size-5 text-fuchsia-400" />
            Leaderboard Period
          </DrawerTitle>
          <DrawerDescription>
            Select the period you want to see the leaderboard for.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-8">
          <ScrollArea className="h-[400px]">
            <motion.div
              className="grid grid-cols-3 gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {periodConfigs?.map((periodItem, index) => (
                <motion.div
                  key={periodItem.label}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    },
                  }}
                >
                  <DrawerClose asChild>
                    <Button
                      variant={periodItem.isActive ? "default" : "outline"}
                      className={cn(
                        "h-auto w-full flex-col gap-1 py-4 relative overflow-hidden",
                        "transition-all duration-300",
                        periodItem.isActive &&
                          "shadow-[0_0_20px_2px_rgba(168,85,247,0.3)]"
                      )}
                      onClick={() => handleDurationSelect(periodItem.label)}
                    >
                      <motion.span
                        className="text-lg font-bold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {periodItem.label}
                      </motion.span>
                      <span className="text-xs font-normal opacity-70">
                        {dayjs(periodItem.startDate).format("DD.MM.YYYY")} -{" "}
                        {dayjs(periodItem.endDate).format("DD.MM.YYYY")}
                      </span>

                      {periodItem.isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-fuchsia-500/10 to-violet-500/0"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeatDelay: 1,
                          }}
                        />
                      )}
                    </Button>
                  </DrawerClose>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export interface LeaderboardPeriodButtonProps
  extends ComponentProps<typeof motion.button> {
  isActive?: boolean;
  icon: React.ReactNode;
  children: ReactNode;
}

export const LeaderboardPeriodButton = ({
  isActive,
  icon,
  children,
  ...props
}: LeaderboardPeriodButtonProps) => {
  return (
    <motion.button
      {...props}
      className={cn(
        "relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium",
        "cursor-pointer transition-colors duration-300",
        isActive ? "text-white" : "text-white/50 hover:text-white/80"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {icon &&
        cloneElement(icon as ReactElement<ComponentProps<"svg">>, {
          className: cn(
            "size-4 transition-all duration-300",
            isActive ? "text-fuchsia-400" : "text-white/40"
          ),
        })}

      <span>{children}</span>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -top-1 -right-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <motion.div
              className="size-2 rounded-full bg-fuchsia-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
