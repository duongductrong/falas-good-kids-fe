"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { isEmpty, isNil } from "lodash-es";
import React, { createContext, useContext, useMemo } from "react";
import { useDurationQuery } from "../hooks/use-duration-query";
import { usePeriodConfigsSuspense } from "../queries";
import { PeriodItem } from "../types";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export interface PeriodContextType {
  periodConfigs: PeriodItem[];
  currentPeriod: PeriodItem | null;

  duration: string;
  setDuration: (duration: string) => void;
}

export const PeriodContext = createContext<PeriodContextType | null>(null);

export interface PeriodProviderProps {
  children: React.ReactNode;
}

export const PeriodProvider = (props: PeriodProviderProps) => {
  const [duration, setDuration] = useDurationQuery();
  const { data } = usePeriodConfigsSuspense();

  const periodConfigs = useMemo(() => {
    if (isEmpty(data?.data)) {
      return [];
    }

    return (data?.data || [])
      .map((config) => {
        const isCurrent = dayjs().isBetween(
          dayjs(config.startDate),
          dayjs(config.endDate),
          null,
          "[]"
        );
        return {
          startDate: config.startDate,
          endDate: config.endDate,
          label: config.label,
          isCurrent: isCurrent,
          isFuture: !isCurrent && dayjs(config.startDate).isAfter(dayjs()),
          isActive: duration === config.label,
        };
      })
      .filter((config) => !config.isFuture);
  }, [data, duration]);

  const currentPeriod = useMemo(() => {
    return periodConfigs.find((conf) => conf.isCurrent);
  }, [periodConfigs]);

  const value = useMemo<PeriodContextType>(() => {
    return {
      periodConfigs: periodConfigs,
      currentPeriod: currentPeriod || null,
      duration: duration,
      setDuration: setDuration,
    };
  }, [periodConfigs, currentPeriod, duration, setDuration]);

  return (
    <PeriodContext.Provider value={value}>
      {props.children}
    </PeriodContext.Provider>
  );
};

export const usePeriodContext = () => {
  const context = useContext(PeriodContext);

  if (isNil(context)) {
    throw new Error("usePeriodContext must be used within a PeriodProvider");
  }

  return context;
};
