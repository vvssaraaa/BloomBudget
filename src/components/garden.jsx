// src/components/GardenArt.jsx
// Detailed low poly night scene: moon, layered mountains, lake with reflection,
// glowing cabin, pine forest, crystal plant and fireflies.

function Pine({ x, s = 1, g = 196, o = 1 }) {
  const y = g - 132 * s;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x="-3" y="120" width="6" height="12" fill="#2a1a12" />
      {/* bottom tier */}
      <polygon points="0,84 26,126 -26,126" fill="#154f2b" />
      <polygon points="0,84 0,126 -26,126" fill="#1d6a3a" />
      {/* middle tier */}
      <polygon points="0,60 20,100 -20,100" fill="#1a6034" />
      <polygon points="0,60 0,100 -20,100" fill="#25804a" />
      {/* top tier */}
      <polygon points="0,40 14,72 -14,72" fill="#1d6a3a" />
      <polygon points="0,40 0,72 -14,72" fill="#2f9a58" />
    </g>
  );
}

function Mountain({ px, py, l, r, base = 190, dark, light }) {
  return (
    <g>
      <polygon points={`${l},${base} ${px},${py} ${r},${base}`} fill={dark} />
      <polygon points={`${l},${base} ${px},${py} ${px + 14},${base}`} fill={light} />
    </g>
  );
}

const STARS = [
  [600, 20], [660, 48], [720, 24], [790, 60], [860, 18],
  [900, 70], [1010, 75], [1040, 30], [1100, 60], [1160, 22],
];

const FIREFLIES = [
  [615, 128, 3.1], [705, 150, 2.4], [850, 158, 3.6],
  [905, 138, 2.8], [1000, 150, 3.3], [1070, 118, 2.6],
];

export default function GardenArt() {
  return (
    <div className="garden-art" aria-hidden="true">
      <svg viewBox="0 0 1200 220" preserveAspectRatio="xMaxYMax slice">
        <defs>
          <radialGradient id="cabinGlow">
            <stop offset="0%" stopColor="#f2d779" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f2d779" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lakeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2060" />
            <stop offset="100%" stopColor="#141a3a" />
          </linearGradient>
        </defs>

        {/* stars */}
        {STARS.map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 1.8 : 1.2} fill="#e9e0f5" opacity="0.65" />
        ))}

        {/* moon + glow */}
        <circle cx="960" cy="52" r="58" fill="#ed78a8" opacity="0.10" />
        <circle cx="960" cy="52" r="40" fill="#ed78a8" opacity="0.18" />
        <circle cx="960" cy="52" r="24" fill="#ed78a8" />
        <polygon points="960,28 982,42 940,42" fill="#ffb0c8" opacity="0.6" />
        <polygon points="946,60 970,66 952,76" fill="#c94a7d" opacity="0.5" />

        {/* far mountains */}
        <Mountain px={560} py={96} l={430} r={700} dark="#26164a" light="#33205f" />
        <Mountain px={770} py={64} l={640} r={920} dark="#2a1a52" light="#3a2670" />
        <Mountain px={990} py={98} l={860} r={1110} dark="#26164a" light="#33205f" />
        <Mountain px={1140} py={78} l={1040} r={1240} dark="#2a1a52" light="#3a2670" />

        {/* mid hills */}
        <polygon
          points="420,220 420,178 560,158 700,174 820,160 960,176 1100,158 1200,170 1200,220"
          fill="#12281d"
        />
        <polygon points="420,220 420,178 560,158 560,220" fill="#163326" />

        {/* distant pines */}
        <Pine x={832} s={0.4} g={178} o={0.8} />
        <Pine x={852} s={0.34} g={178} o={0.8} />
        <Pine x={992} s={0.4} g={178} o={0.8} />
        <Pine x={1012} s={0.34} g={178} o={0.8} />

        {/* lake + moon reflection */}
        <polygon points="822,182 1012,180 1042,198 802,198" fill="url(#lakeFill)" />
        <polygon points="948,181 972,181 968,198 952,198" fill="#ed78a8" opacity="0.3" />
        <line x1="930" y1="186" x2="990" y2="186" stroke="#ffb0c8" strokeWidth="1" opacity="0.35" />
        <line x1="900" y1="191" x2="1010" y2="191" stroke="#e9e0f5" strokeWidth="1" opacity="0.18" />
        <line x1="850" y1="194" x2="960" y2="194" stroke="#e9e0f5" strokeWidth="1" opacity="0.14" />

        {/* ground */}
        <polygon
          points="540,220 540,198 700,192 860,198 1000,196 1200,190 1200,220"
          fill="#0b1c13"
        />

        {/* cabin */}
        <circle cx="765" cy="176" r="46" fill="url(#cabinGlow)" />
        <rect x="735" y="164" width="60" height="30" fill="#3a2418" />
        <rect x="735" y="164" width="30" height="30" fill="#2f1c13" />
        <rect x="781" y="134" width="8" height="18" fill="#2a1a12" />
        <polygon points="725,164 765,136 805,164" fill="#6a2442" />
        <polygon points="725,164 765,136 765,164" fill="#521a34" />
        <rect x="746" y="172" width="11" height="11" fill="#f2d779" />
        <rect x="773" y="172" width="11" height="11" fill="#f2d779" />
        <rect x="763" y="180" width="8" height="14" fill="#1c100a" />

        {/* left forest cluster */}
        <Pine x={600} s={0.8} />
        <Pine x={642} s={1} g={198} />
        <Pine x={688} s={0.68} g={194} />

        {/* right forest cluster */}
        <Pine x={1052} s={0.9} g={197} />
        <Pine x={1098} s={1.08} g={200} />
        <Pine x={1142} s={0.82} g={196} />
        <Pine x={1182} s={1.02} g={200} />

        {/* crystal plant */}
        <g transform="translate(540 150)">
          <polygon points="20,2 32,16 20,30 8,16" fill="#b985f5" />
          <polygon points="20,2 32,16 20,16" fill="#d9b8ff" />
          <polygon points="8,24 13,31 8,38 3,31" fill="#ed78a8" />
          <polygon points="32,24 37,31 32,38 27,31" fill="#79d6a0" />
          <polygon points="20,30 22,46 18,46" fill="#1d6a3a" />
        </g>

        {/* fireflies */}
        {FIREFLIES.map(([fx, fy, dur], i) => (
          <circle key={i} cx={fx} cy={fy} r="2" fill="#f2d779">
            <animate
              attributeName="opacity"
              values="0.15;0.95;0.15"
              dur={`${dur}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}