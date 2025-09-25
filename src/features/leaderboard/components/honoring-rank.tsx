import { ComponentProps } from "react";

export interface HonoringRankProps extends ComponentProps<"svg"> {
  text?: string;
  bannerColor?: string;
  width?: number;
  height?: number;
  textColor?: string;
}

export const HonoringRank = ({
  text = "1",
  bannerColor = "#E63946", // default red
  width = 64,
  height = 80,
  textColor = "#FFFFFF",
}: HonoringRankProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Banner icon with label ${text}`}
    >
      {/* Outer banner / shield shape */}
      <path
        fill={bannerColor}
        d="M12 6a6 6 0 0 1 6-6h28a6 6 0 0 1 6 6v46L32 74 12 52V6Z"
      />
      {/* Inner cut / inset shape to give a “panel” look */}
      <path
        fill="rgba(0,0,0,0.1)"
        d="M18 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v38L32 66 18 48V10Z"
      />
      {/* Text in the middle */}
      <text
        x="50%"
        y="35%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24"
        fill={textColor}
        style={{ fontWeight: "bold" }}
      >
        {text}
      </text>
    </svg>
  );
};
