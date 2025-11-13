export default function AuthIllustration() {
  return (
    <svg
      className="w-64 h-64"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shapes */}
      <circle cx="60" cy="50" r="25" fill="rgba(255, 255, 255, 0.1)" />
      <circle cx="180" cy="140" r="20" fill="rgba(255, 255, 255, 0.08)" />
      <rect
        x="150"
        y="60"
        width="40"
        height="40"
        rx="8"
        fill="rgba(255, 255, 255, 0.05)"
        transform="rotate(20 170 80)"
      />

      {/* Main card/device illustration */}
      <g>
        {/* Card shadow */}
        <path
          d="M50 140 L80 160 L180 160 L150 140 Z"
          fill="rgba(0, 0, 0, 0.1)"
        />

        {/* Card body */}
        <path
          d="M60 70 Q50 60 50 50 L50 130 Q50 140 60 140 L170 140 Q180 140 180 130 L180 50 Q180 40 170 40 L60 40 Q50 40 50 50"
          fill="rgba(255, 255, 255, 0.95)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />

        {/* Checkmark circle */}
        <circle cx="90" cy="70" r="18" fill="#10B981" />
        <path
          d="M 85 72 L 88 75 L 95 68"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lock icon */}
        <rect
          x="125"
          y="75"
          width="30"
          height="35"
          rx="4"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.5"
        />
        <path
          d="M 133 75 Q 133 68 140 68 Q 147 68 147 75"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.5"
        />
        <circle cx="140" cy="92" r="2" fill="rgba(255, 255, 255, 0.6)" />

        {/* Text lines */}
        <line
          x1="60"
          y1="115"
          x2="100"
          y2="115"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="125"
          x2="125"
          y2="125"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* Decorative elements */}
      <circle cx="30" cy="180" r="15" fill="rgba(255, 255, 255, 0.08)" />
      <rect
        x="190"
        y="170"
        width="35"
        height="35"
        rx="6"
        fill="rgba(255, 255, 255, 0.06)"
        transform="rotate(-15 207 187)"
      />
    </svg>
  );
}
