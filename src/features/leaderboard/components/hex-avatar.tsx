import { ComponentProps } from "react";

export interface HexAvatarProps extends ComponentProps<"svg"> {
  avatarUrl: string;
  size: number;
  strokeColor: string;
  strokeWidth: number;
}

export const HexAvatar = ({
  avatarUrl = "https://placekitten.com/300/300",
  size = 200,
  strokeColor = "#FF4A3D",
  strokeWidth = 8,
  ...props
}: HexAvatarProps) => {
  const hexPoints = "100,20 170,60 170,140 100,180 30,140 30,60";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      {...props}
    >
      <defs>
        <clipPath id="hex-clip">
          <polygon points={hexPoints} />
        </clipPath>
      </defs>

      {/* Avatar image */}
      <image
        href={avatarUrl}
        width="200"
        height="200"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#hex-clip)"
      />

      {/* Hexagon frame */}
      <polygon
        points={hexPoints}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
