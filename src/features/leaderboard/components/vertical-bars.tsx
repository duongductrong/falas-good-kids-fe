import React from "react";

export interface VerticalBarsProps {
  total?: number;
  activeRange?: [number, number];
  barGap?: number;
  width?: number;
  inactiveColor?: string;
  activeColor?: string;
  rotate?: "left" | "right";
}

export const VerticalBars = ({
  total = 20,
  activeRange = [9, 11], // index range of active bars
  barGap = 20,
  width = 40,
  inactiveColor = "#444a64",
  activeColor = "#1e90ff",
  rotate = "left",
}: VerticalBarsProps) => {
  const bars = Array.from({ length: total }, (_, i) => i);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={total * barGap + barGap}
      viewBox={`0 0 ${width} ${total * barGap + barGap}`}
    >
      {bars.map((i) => {
        const y = (i + 1) * barGap;
        const isActive = i >= activeRange[0] && i <= activeRange[1];
        return (
          <line
            key={i}
            x1={10}
            y1={y}
            x2={width - 10}
            y2={y}
            stroke={isActive ? activeColor : inactiveColor}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={isActive ? 1 : 0.4}
            transform={`rotate(${rotate === "left" ? 20 : -20} ${
              width / 2
            } ${y})`}
          />
        );
      })}
    </svg>
  );
};
