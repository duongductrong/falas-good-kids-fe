import React from "react";

const LaurelBadge = ({
  avatarUrl = "https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg",
  size = 300,
  glowColor1 = "#FF4A3D",
  glowColor2 = "#A02020",
}) => {
  const height = (size * 360) / 300;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={height}
      viewBox="0 0 300 360"
    >
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={glowColor1} />
          <stop offset="100%" stopColor={glowColor2} />
        </linearGradient>

        <clipPath id="avatar-clip">
          <polygon points="150,60 220,100 220,180 150,220 80,180 80,100" />
        </clipPath>
      </defs>

      {/* --- Left Laurel --- */}
      <g fill="url(#glow)">
        <path
          d="M60 110 C40 150,45 210,70 250"
          stroke="url(#glow)"
          strokeWidth="10"
        />
        <ellipse
          cx="55"
          cy="135"
          rx="12"
          ry="20"
          transform="rotate(-20 55 135)"
        />
        <ellipse
          cx="50"
          cy="165"
          rx="12"
          ry="20"
          transform="rotate(-20 50 165)"
        />
        <ellipse
          cx="55"
          cy="195"
          rx="12"
          ry="20"
          transform="rotate(-10 55 195)"
        />
        <ellipse
          cx="65"
          cy="225"
          rx="12"
          ry="20"
          transform="rotate(-5 65 225)"
        />
      </g>

      {/* --- Right Laurel (mirror) --- */}
      <g fill="url(#glow)">
        <path
          d="M240 110 C260 150,255 210,230 250"
          stroke="url(#glow)"
          strokeWidth="10"
        />
        <ellipse
          cx="245"
          cy="135"
          rx="12"
          ry="20"
          transform="rotate(20 245 135)"
        />
        <ellipse
          cx="250"
          cy="165"
          rx="12"
          ry="20"
          transform="rotate(20 250 165)"
        />
        <ellipse
          cx="245"
          cy="195"
          rx="12"
          ry="20"
          transform="rotate(10 245 195)"
        />
        <ellipse
          cx="235"
          cy="225"
          rx="12"
          ry="20"
          transform="rotate(5 235 225)"
        />
      </g>

      {/* --- Hexagon frame --- */}
      <polygon
        points="150,60 220,100 220,180 150,220 80,180 80,100"
        fill="none"
        stroke="url(#glow)"
        strokeWidth="10"
      />

      {/* Avatar inside hexagon */}
      <image
        href={avatarUrl}
        x="80"
        y="80"
        width="140"
        height="160"
        clipPath="url(#avatar-clip)"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Inner dark border */}
      <polygon
        points="150,60 220,100 220,180 150,220 80,180 80,100"
        fill="none"
        stroke="#111"
        strokeWidth="4"
      />

      {/* Bottom chevron */}
      <polygon
        points="150,260 185,310 115,310"
        fill="url(#glow)"
        stroke="none"
      />
    </svg>
  );
};

export default LaurelBadge;
